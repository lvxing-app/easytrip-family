(function () {
  'use strict';

  const profiles = {
    '成都': chinaProfile('成都'),
    '上海': chinaProfile('上海'),
    '北京': chinaProfile('北京'),
    '东京': {
      destination: '东京', countryCode: 'JP', countryName: { zh: '日本', en: 'Japan' }, flag: '🇯🇵',
      currency: 'JPY', timeZone: 'Asia/Tokyo', locale: 'ja-JP', language: '日本語', units: 'metric',
      mapProvider: 'google', mapLabel: 'Google Maps', regionCode: 'jp', estimatedTotal: 300000,
      emergency: {
        police: '110', fire: '119', medical: '119', general: '',
        sourceUrl: 'https://www.japan.travel/en/plan/hotline/'
      },
      servicePrices: {
        transport: [90000, 70000, 110000], hotel: [20000, 28000, 16000],
        attraction: [15000, 22000, 10000], local: [12000, 8000, 18000]
      },
      bookingAddition: 18000
    },
    '巴黎': {
      destination: '巴黎', countryCode: 'FR', countryName: { zh: '法国', en: 'France' }, flag: '🇫🇷',
      currency: 'EUR', timeZone: 'Europe/Paris', locale: 'fr-FR', language: 'Français', units: 'metric',
      mapProvider: 'google', mapLabel: 'Google Maps', regionCode: 'fr', estimatedTotal: 2500,
      emergency: {
        police: '17', fire: '18', medical: '15', general: '112',
        sourceUrl: 'https://www.service-public.fr/particuliers/actualites/A17758'
      },
      servicePrices: {
        transport: [850, 650, 1100], hotel: [180, 240, 140],
        attraction: [120, 160, 90], local: [80, 60, 130]
      },
      bookingAddition: 150
    },
    '新加坡': {
      destination: '新加坡', countryCode: 'SG', countryName: { zh: '新加坡', en: 'Singapore' }, flag: '🇸🇬',
      currency: 'SGD', timeZone: 'Asia/Singapore', locale: 'en-SG', language: 'English', units: 'metric',
      mapProvider: 'google', mapLabel: 'Google Maps', regionCode: 'sg', estimatedTotal: 2100,
      emergency: {
        police: '999', fire: '995', medical: '995', general: '',
        sourceUrl: 'https://www.gov.sg/contact-us/'
      },
      servicePrices: {
        transport: [650, 480, 800], hotel: [240, 320, 190],
        attraction: [120, 180, 85], local: [90, 70, 140]
      },
      bookingAddition: 120
    }
  };

  function chinaProfile(destination) {
    const totals = { '成都': 4860, '上海': 5680, '北京': 5980 };
    return {
      destination, countryCode: 'CN', countryName: { zh: '中国', en: 'China' }, flag: '🇨🇳',
      currency: 'CNY', timeZone: 'Asia/Shanghai', locale: 'zh-CN', language: '普通话', units: 'metric',
      mapProvider: 'amap', mapLabel: '高德地图 AMap', regionCode: 'cn', estimatedTotal: totals[destination],
      emergency: {
        police: '110', fire: '119', medical: '120', general: '',
        sourceUrl: 'https://english.shanghai.gov.cn/en-EmergencyNumbers/20240104/8eec5a3d2b864187af8f383cc6b94ae5.html'
      },
      servicePrices: {
        transport: [1080, 1360, 720], hotel: [560, 680, 460],
        attraction: [220, 320, 160], local: [168, 120, 1280]
      },
      bookingAddition: 260
    };
  }

  function get(destination) {
    return profiles[destination] || profiles['成都'];
  }

  function formatMoney(amount, currency, locale) {
    try {
      return new Intl.NumberFormat(locale || 'zh-CN', {
        style: 'currency', currency, currencyDisplay: 'narrowSymbol',
        maximumFractionDigits: currency === 'JPY' ? 0 : 0
      }).format(amount);
    } catch (error) {
      return `${currency} ${Number(amount).toLocaleString()}`;
    }
  }

  function browserContext() {
    let timeZone = '';
    try { timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (error) { /* Optional browser hint. */ }
    return { locale: navigator.language || 'zh-CN', timeZone };
  }

  window.EasyTripRegional = { profiles, get, formatMoney, browserContext };
})();
