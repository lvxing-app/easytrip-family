(function () {
  'use strict';

  // CloudBase is intentionally disabled until a real environment is created.
  // Only the environment ID and Publishable Key belong here. Never place a
  // Tencent Cloud SecretId, SecretKey or SMS credential in browser code.
  window.EasyTripCloudConfig = Object.freeze({
    enabled: false,
    provider: 'cloudbase',
    envId: '',
    region: 'ap-shanghai',
    accessKey: '',
    familyFunctionName: 'family-service',
    sdkUrl: 'https://static.cloudbase.net/cloudbase-js-sdk/3.6.3/cloudbase.full.js',
    collections: Object.freeze({
      messages: 'family_messages'
    })
  });
})();
