(function () {
  'use strict';

  const STORAGE_KEY = 'easytrip-family-chat-v1';
  const DEMO_CODE = '123456';
  const app = window.EasyTripApp;
  const I18n = window.EasyTripI18n;
  const $ = selector => document.querySelector(selector);
  const t = (key, variables) => I18n.t(key, variables);
  let authMode = 'register';
  let replyTimer = null;

  const state = {
    loggedIn: false,
    account: null,
    family: null,
    messages: [],
    pendingShare: false
  };

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>'"]/g, character => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    })[character]);
  }

  function load() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      if (!saved || typeof saved !== 'object') return;
      state.loggedIn = Boolean(saved.loggedIn);
      state.account = saved.account && typeof saved.account === 'object' ? saved.account : null;
      state.family = saved.family && typeof saved.family === 'object' ? saved.family : null;
      state.messages = Array.isArray(saved.messages) ? saved.messages.slice(-100) : [];
      if (!state.account) state.loggedIn = false;
    } catch (error) { /* Start with a clean local demo account. */ }
  }

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        loggedIn: state.loggedIn,
        account: state.account,
        family: state.family,
        messages: state.messages.slice(-100)
      }));
    } catch (error) { /* The demo remains usable without persistence. */ }
    app.refreshFamilyStatus();
  }

  function messageId(prefix = 'message') {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  }

  function memberInitial(name) {
    const characters = Array.from(String(name || '家').trim());
    return (characters[0] || '家').toUpperCase();
  }

  function maskAccount(value) {
    const text = String(value || '');
    if (text.includes('@')) {
      const [name, domain] = text.split('@');
      return `${name.slice(0, 2)}***@${domain || ''}`;
    }
    if (text.length > 7) return `${text.slice(0, 3)}****${text.slice(-4)}`;
    return text;
  }

  function formatMessageTime(value) {
    try { return I18n.formatDate(new Date(value), { hour: '2-digit', minute: '2-digit' }); }
    catch (error) { return ''; }
  }

  function status() {
    if (!state.loggedIn) return t('familyChatLoginHint');
    if (!state.family) return t('familyNoRoomHint');
    return t('familyRoomStatus', { count: state.family.members.length });
  }

  function setAuthMode(mode) {
    authMode = mode === 'login' ? 'login' : 'register';
    document.querySelectorAll('[data-family-auth-mode]').forEach(button => {
      const active = button.dataset.familyAuthMode === authMode;
      button.classList.toggle('active', active);
      button.setAttribute('aria-selected', String(active));
    });
    document.querySelectorAll('[data-family-auth-form]').forEach(form => {
      const active = form.dataset.familyAuthForm === authMode;
      form.hidden = !active;
      form.classList.toggle('active', active);
    });
  }

  function renderAuth() {
    setAuthMode(authMode);
    $('#familyRegisterNickname').placeholder = t('nicknamePlaceholder');
    $('#familyRegisterAccount').placeholder = t('accountPlaceholder');
    $('#familyLoginAccount').placeholder = t('loginAccountPlaceholder');
    $('#familyRegisterCode').placeholder = t('codePlaceholder');
    $('#familyLoginCode').placeholder = t('codePlaceholder');
  }

  function renderHome() {
    const name = state.account.nickname || t('travelerName');
    $('#familyAccountAvatar').textContent = memberInitial(name);
    $('#familyAccountName').textContent = name;
    $('#familyAccountId').textContent = maskAccount(state.account.contact);
    $('#newFamilyName').placeholder = t('familyNamePlaceholder');
    $('#joinFamilyCode').placeholder = t('inviteCodePlaceholder');
  }

  function renderTripMessage(message) {
    const trip = message.trip;
    return `
      <article class="family-itinerary-card">
        <div class="family-itinerary-heading">
          <span aria-hidden="true">▤</span>
          <span><strong>${escapeHtml(t('sharedTripTitle', { destination: trip.destination }))}</strong><small>${escapeHtml(trip.date)} · ${escapeHtml(t('tripDaysCount', { count: trip.days }))}</small></span>
        </div>
        <div class="family-itinerary-stops">${trip.schedule.map(item => `<span><time>${escapeHtml(item.time)}</time><strong>${escapeHtml(item.name)}</strong></span>`).join('')}</div>
        <button class="small-button" type="button" data-open-shared-trip>${escapeHtml(t('viewFullTrip'))}</button>
      </article>`;
  }

  function renderMessage(message) {
    if (message.type === 'system') {
      return `<div class="family-system-message">${escapeHtml(message.text)}</div>`;
    }
    const own = message.senderId === state.account.id;
    const content = message.type === 'trip'
      ? renderTripMessage(message)
      : `<div class="family-message-bubble">${escapeHtml(message.text)}</div>`;
    return `
      <article class="family-chat-message ${own ? 'outgoing' : 'incoming'}">
        ${own ? '' : `<span class="family-message-avatar" aria-hidden="true">${escapeHtml(memberInitial(message.senderName))}</span>`}
        <div class="family-message-content">
          <span class="family-message-meta">${own ? escapeHtml(t('me')) : escapeHtml(message.senderName)} · ${escapeHtml(formatMessageTime(message.createdAt))}</span>
          ${content}
        </div>
      </article>`;
  }

  function renderChat() {
    const family = state.family;
    $('#familyRoomName').textContent = family.name;
    $('#familyRoomMeta').textContent = t('familyRoomMeta', { count: family.members.length, online: Math.max(1, family.members.filter(member => member.online !== false).length) });
    $('#familyRoomAvatars').innerHTML = family.members.slice(0, 3).map(member => `<span>${escapeHtml(memberInitial(member.name))}</span>`).join('');
    const plan = app.getPlan();
    $('#familyShareTripHint').textContent = `${app.destinationLabel()} · ${t('tripDaysCount', { count: plan.days.length })}`;
    $('#familyChatInput').placeholder = t('chatInputPlaceholder');
    $('#familyChatMessages').innerHTML = state.messages.map(renderMessage).join('') || `<div class="family-chat-empty"><span aria-hidden="true">聊</span><strong>${escapeHtml(t('chatEmptyTitle'))}</strong><small>${escapeHtml(t('chatEmptyHelp'))}</small></div>`;
  }

  function addTripMessage() {
    const plan = app.getPlan();
    state.messages.push({
      id: messageId('trip'),
      type: 'trip',
      senderId: state.account.id,
      senderName: state.account.nickname,
      createdAt: new Date().toISOString(),
      trip: {
        destination: app.destinationLabel(),
        days: plan.days.length,
        date: app.formatDate(plan.startDate, 0),
        schedule: plan.days[0].slice(0, 3).map(item => ({ time: item.time, name: item.name }))
      }
    });
  }

  function render(options = {}) {
    if (options.shareTrip) state.pendingShare = true;
    const showAuth = !state.loggedIn;
    const showHome = state.loggedIn && !state.family;
    const showChat = state.loggedIn && Boolean(state.family);
    $('#familyAuthPanel').hidden = !showAuth;
    $('#familyHomePanel').hidden = !showHome;
    $('#familyChatPanel').hidden = !showChat;
    if (showAuth) renderAuth();
    if (showHome) renderHome();
    if (showChat) {
      if (state.pendingShare) {
        state.pendingShare = false;
        addTripMessage();
        save();
        app.toast(t('tripSharedToFamily'));
      }
      renderChat();
    }
    app.refreshFamilyStatus();
  }

  function sendDemoCode(kind) {
    const input = kind === 'login' ? $('#familyLoginCode') : $('#familyRegisterCode');
    input.value = DEMO_CODE;
    input.focus();
    app.toast(t('demoCodeSent', { code: DEMO_CODE }));
  }

  function register(event) {
    event.preventDefault();
    const nickname = $('#familyRegisterNickname').value.trim();
    const contact = $('#familyRegisterAccount').value.trim();
    const code = $('#familyRegisterCode').value.trim();
    if (!nickname || contact.length < 4) {
      app.toast(t('completeAccountInfo'));
      return;
    }
    if (code !== DEMO_CODE) {
      app.toast(t('codeIncorrect'));
      return;
    }
    state.account = { id: `user-${Date.now()}`, nickname, contact };
    state.loggedIn = true;
    save();
    render();
    app.toast(t('accountCreated'));
  }

  function login(event) {
    event.preventDefault();
    const contact = $('#familyLoginAccount').value.trim();
    const code = $('#familyLoginCode').value.trim();
    if (!state.account || state.account.contact.toLowerCase() !== contact.toLowerCase()) {
      app.toast(t('accountNotFound'));
      return;
    }
    if (code !== DEMO_CODE) {
      app.toast(t('codeIncorrect'));
      return;
    }
    state.loggedIn = true;
    save();
    render();
    app.toast(t('loginSuccessful'));
  }

  function createFamily(event) {
    event.preventDefault();
    const name = $('#newFamilyName').value.trim();
    if (!name) {
      app.toast(t('enterFamilyName'));
      return;
    }
    state.family = {
      id: `family-${Date.now()}`,
      name,
      inviteCode: `ET${Math.floor(1000 + Math.random() * 9000)}`,
      members: [{ id: state.account.id, name: state.account.nickname, online: true }]
    };
    state.messages = [{ id: messageId('system'), type: 'system', text: t('familyCreatedMessage', { name }), createdAt: new Date().toISOString() }];
    save();
    render();
    app.toast(t('familyCreated'));
  }

  function joinFamily(event) {
    event.preventDefault();
    const code = $('#joinFamilyCode').value.trim().toUpperCase();
    if (code.length < 4) {
      app.toast(t('enterValidInviteCode'));
      return;
    }
    state.family = {
      id: `family-${code}`,
      name: t('demoFamilyName'),
      inviteCode: code,
      members: [
        { id: state.account.id, name: state.account.nickname, online: true },
        { id: 'mother', name: t('familyMemberMother'), online: true },
        { id: 'brother', name: t('familyMemberBrother'), online: false }
      ]
    };
    state.messages = [
      { id: messageId('system'), type: 'system', text: t('joinedFamilyMessage'), createdAt: new Date().toISOString() },
      { id: messageId('welcome'), type: 'text', senderId: 'mother', senderName: t('familyMemberMother'), text: t('familyWelcomeMessage'), createdAt: new Date().toISOString() }
    ];
    save();
    render();
    app.toast(t('joinedFamily'));
  }

  function sendMessage(event) {
    event.preventDefault();
    const input = $('#familyChatInput');
    const text = input.value.trim();
    if (!text) return;
    state.messages.push({ id: messageId(), type: 'text', senderId: state.account.id, senderName: state.account.nickname, text, createdAt: new Date().toISOString() });
    input.value = '';
    save();
    render();
    if (state.family.members.some(member => member.id === 'mother')) {
      window.clearTimeout(replyTimer);
      replyTimer = window.setTimeout(() => {
        state.messages.push({ id: messageId('reply'), type: 'text', senderId: 'mother', senderName: t('familyMemberMother'), text: t('familyAutoReply'), createdAt: new Date().toISOString() });
        save();
        render();
      }, 650);
    }
  }

  function shareTrip() {
    if (!state.loggedIn || !state.family) {
      state.pendingShare = true;
      render();
      app.toast(t('enterFamilyBeforeShare'));
      return;
    }
    addTripMessage();
    save();
    render();
    app.toast(t('tripSharedToFamily'));
  }

  async function copyInviteCode() {
    const message = `${t('familyInviteChatMessage', { family: state.family.name, code: state.family.inviteCode })}`;
    try { await navigator.clipboard.writeText(message); } catch (error) { /* Clipboard may be unavailable in local file previews. */ }
    app.toast(t('inviteCodeCopied', { code: state.family.inviteCode }));
  }

  function logout() {
    state.loggedIn = false;
    save();
    $('#familyRoomActions').hidden = true;
    render();
    setAuthMode('login');
  }

  function leaveFamily() {
    state.family = null;
    state.messages = [];
    state.pendingShare = false;
    save();
    $('#familyRoomActions').hidden = true;
    render();
    app.toast(t('leftFamily'));
  }

  function bindEvents() {
    document.querySelectorAll('[data-family-auth-mode]').forEach(button => button.addEventListener('click', () => setAuthMode(button.dataset.familyAuthMode)));
    document.querySelectorAll('[data-send-family-code]').forEach(button => button.addEventListener('click', () => sendDemoCode(button.dataset.sendFamilyCode)));
    $('#familyRegisterForm').addEventListener('submit', register);
    $('#familyLoginForm').addEventListener('submit', login);
    $('#createFamilyForm').addEventListener('submit', createFamily);
    $('#joinFamilyForm').addEventListener('submit', joinFamily);
    $('#familyChatForm').addEventListener('submit', sendMessage);
    $('#shareTripToFamilyButton').addEventListener('click', shareTrip);
    $('#copyFamilyCodeButton').addEventListener('click', copyInviteCode);
    $('#familyLogoutButton').addEventListener('click', logout);
    $('#chatLogoutButton').addEventListener('click', logout);
    $('#leaveFamilyButton').addEventListener('click', leaveFamily);
    $('#familyRoomMenuButton').addEventListener('click', () => { $('#familyRoomActions').hidden = !$('#familyRoomActions').hidden; });
    $('#familyChatMessages').addEventListener('click', event => {
      if (event.target.closest('[data-open-shared-trip]')) app.showView('itinerary');
    });
    document.addEventListener('easytrip:localechange', () => render());
  }

  load();
  bindEvents();
  window.EasyTripFamilyChat = { render, status };
  app.refreshFamilyStatus();
})();
