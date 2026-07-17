(function () {
  'use strict';

  window.EasyTripMapConfig = {
    amap: {
      key: '',
      securityJsCode: '',
      serviceHost: ''
    },
    google: {
      apiKey: ''
    },
    fallback: {
      enabled: true,
      tileUrl: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }
  };
})();
