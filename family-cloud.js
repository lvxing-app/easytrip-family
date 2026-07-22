(function () {
  'use strict';

  const config = window.EasyTripCloudConfig || {};
  let cloudApp = null;
  let auth = null;
  let database = null;
  let readyPromise = null;
  let pendingOtp = null;

  function makeError(code, message) {
    const error = new Error(message || code);
    error.code = code;
    return error;
  }

  function isConfigured() {
    return config.enabled === true && Boolean(config.envId);
  }

  function loadSdk() {
    if (window.cloudbase) return Promise.resolve();
    if (!config.sdkUrl) return Promise.reject(makeError('SDK_URL_MISSING', 'CloudBase SDK URL is missing'));
    return new Promise((resolve, reject) => {
      const existing = document.querySelector('script[data-easytrip-cloudbase-sdk]');
      if (existing) {
        existing.addEventListener('load', resolve, { once: true });
        existing.addEventListener('error', () => reject(makeError('SDK_LOAD_FAILED', 'CloudBase SDK failed to load')), { once: true });
        return;
      }
      const script = document.createElement('script');
      script.src = config.sdkUrl;
      script.async = true;
      script.dataset.easytripCloudbaseSdk = 'true';
      script.addEventListener('load', resolve, { once: true });
      script.addEventListener('error', () => reject(makeError('SDK_LOAD_FAILED', 'CloudBase SDK failed to load')), { once: true });
      document.head.appendChild(script);
    });
  }

  async function ready() {
    if (!isConfigured()) return { mode: 'demo' };
    if (readyPromise) return readyPromise;
    readyPromise = (async () => {
      await loadSdk();
      const options = {
        env: config.envId,
        region: config.region || 'ap-shanghai'
      };
      if (config.accessKey) options.accessKey = config.accessKey;
      cloudApp = window.cloudbase.init(options);
      auth = cloudApp.auth({ persistence: 'local' });
      database = cloudApp.database();
      return { mode: 'cloud' };
    })().catch(error => {
      readyPromise = null;
      throw error;
    });
    return readyPromise;
  }

  function normalizeContact(rawContact) {
    const value = String(rawContact || '').trim();
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return { kind: 'email', value: value.toLowerCase() };
    }

    const compact = value.replace(/[\s()-]/g, '');
    if (/^1\d{10}$/.test(compact)) {
      return { kind: 'phone', value: `+86 ${compact}` };
    }
    if (/^\+861\d{10}$/.test(compact)) {
      return { kind: 'phone', value: `+86 ${compact.slice(3)}` };
    }
    if (/^\+/.test(compact)) {
      throw makeError('OVERSEAS_PHONE_NOT_ENABLED', 'International SMS is not enabled for this pilot');
    }
    throw makeError('INVALID_CONTACT', 'Enter a valid email address or mainland China mobile number');
  }

  function unwrapAuthResponse(response) {
    if (response && response.error) {
      throw makeError(response.error.code || 'AUTH_FAILED', response.error.message || 'Authentication failed');
    }
    return response && response.data ? response.data : response;
  }

  async function sendOtp(rawContact) {
    await ready();
    const contact = normalizeContact(rawContact);
    const params = contact.kind === 'email' ? { email: contact.value } : { phone: contact.value };
    params.options = { shouldCreateUser: true };
    const data = unwrapAuthResponse(await auth.signInWithOtp(params));
    if (!data || typeof data.verifyOtp !== 'function') {
      throw makeError('OTP_FLOW_UNAVAILABLE', 'Verification flow was not returned by CloudBase');
    }
    pendingOtp = { contact, verify: data.verifyOtp };
    return contact;
  }

  async function verifyOtp(rawContact, token) {
    await ready();
    const contact = normalizeContact(rawContact);
    if (!pendingOtp || pendingOtp.contact.value !== contact.value) {
      throw makeError('OTP_NOT_REQUESTED', 'Request a verification code first');
    }
    const data = unwrapAuthResponse(await pendingOtp.verify({ token: String(token || '').trim() }));
    pendingOtp = null;
    return data;
  }

  async function hasSession() {
    await ready();
    const loginState = await auth.getLoginState();
    return Boolean(loginState && loginState.user);
  }

  function parseFunctionResult(response) {
    if (!response) throw makeError('EMPTY_RESPONSE', 'The family service returned no data');
    let result = response.result;
    if (typeof result === 'string') {
      try { result = JSON.parse(result); } catch (error) { /* Keep the original value for the error below. */ }
    }
    if (!result || typeof result !== 'object') throw makeError('INVALID_RESPONSE', 'The family service returned invalid data');
    if (result.ok === false) throw makeError(result.error?.code || 'FAMILY_SERVICE_FAILED', result.error?.message || 'Family service failed');
    return result.data;
  }

  async function call(action, payload) {
    await ready();
    const response = await cloudApp.callFunction({
      name: config.familyFunctionName || 'family-service',
      data: { action, ...(payload || {}) },
      parse: true
    });
    if (response && response.code) throw makeError(response.code, response.message || response.code);
    return parseFunctionResult(response);
  }

  async function bootstrap(profile) {
    return call('bootstrap', profile || {});
  }

  function normalizeDate(value) {
    if (!value) return new Date().toISOString();
    if (value instanceof Date) return value.toISOString();
    if (typeof value.toDate === 'function') return value.toDate().toISOString();
    if (typeof value.$date === 'number') return new Date(value.$date).toISOString();
    return value;
  }

  function watchMessages(familyId, onChange, onError) {
    if (!database || !familyId) return null;
    const collectionName = config.collections?.messages || 'family_messages';
    const watcher = database.collection(collectionName)
      .where({ familyId })
      .orderBy('createdAt', 'asc')
      .limit(100)
      .watch({
        onChange(snapshot) {
          const messages = (snapshot.docs || []).map(document => ({
            ...document,
            id: document.id || document._id,
            createdAt: normalizeDate(document.createdAt)
          }));
          onChange(messages);
        },
        onError(error) {
          if (typeof onError === 'function') onError(error);
        }
      });
    return () => {
      try { watcher.close(); } catch (error) { /* Watcher may already be closed. */ }
    };
  }

  async function signOut() {
    await ready();
    pendingOtp = null;
    const response = await auth.signOut();
    unwrapAuthResponse(response);
  }

  window.EasyTripFamilyCloud = Object.freeze({
    isConfigured,
    ready,
    normalizeContact,
    sendOtp,
    verifyOtp,
    hasSession,
    bootstrap,
    createFamily: name => call('createFamily', { name }),
    joinFamily: inviteCode => call('joinFamily', { inviteCode }),
    leaveFamily: () => call('leaveFamily'),
    sendMessage: text => call('sendMessage', { text }),
    shareTrip: trip => call('shareTrip', { trip }),
    watchMessages,
    signOut
  });
})();
