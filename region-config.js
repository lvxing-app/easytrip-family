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
    '首尔': {
      destination: '首尔', countryCode: 'KR', countryName: { zh: '韩国', en: 'South Korea' }, flag: '🇰🇷',
      currency: 'KRW', timeZone: 'Asia/Seoul', locale: 'ko-KR', language: '한국어', units: 'metric',
      mapProvider: 'google', mapLabel: 'Google Maps', regionCode: 'kr', estimatedTotal: 3200000,
      emergency: {
        police: '112', fire: '119', medical: '119', general: '',
        sourceUrl: 'https://global.seoul.go.kr/web/news/senw/bordContDetail.do?brd_no=5&lang=EN&mode=W&post_no=497D85F505A500BCE063C0A8A023AF3F'
      },
      servicePrices: {
        transport: [950000, 720000, 1180000], hotel: [230000, 320000, 180000],
        attraction: [120000, 180000, 85000], local: [150000, 90000, 220000]
      },
      bookingAddition: 210000
    },
    '曼谷': {
      destination: '曼谷', countryCode: 'TH', countryName: { zh: '泰国', en: 'Thailand' }, flag: '🇹🇭',
      currency: 'THB', timeZone: 'Asia/Bangkok', locale: 'th-TH', language: 'ไทย', units: 'metric',
      mapProvider: 'google', mapLabel: 'Google Maps', regionCode: 'th', estimatedTotal: 85000,
      emergency: {
        police: '191', fire: '199', medical: '1669', general: '',
        sourceUrl: 'https://www.thailand.go.th/useful-information-detail/003_003'
      },
      servicePrices: {
        transport: [22000, 16500, 28000], hotel: [4200, 5800, 3200],
        attraction: [3800, 5200, 2600], local: [3200, 2400, 4800]
      },
      bookingAddition: 4800
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
    '伦敦': {
      destination: '伦敦', countryCode: 'GB', countryName: { zh: '英国', en: 'United Kingdom' }, flag: '🇬🇧',
      currency: 'GBP', timeZone: 'Europe/London', locale: 'en-GB', language: 'English', units: 'metric',
      mapProvider: 'google', mapLabel: 'Google Maps', regionCode: 'gb', estimatedTotal: 3200,
      emergency: {
        police: '999', fire: '999', medical: '999', general: '112',
        sourceUrl: 'https://www.gov.uk/guidance/999-and-112-the-uks-national-emergency-numbers'
      },
      servicePrices: {
        transport: [980, 760, 1280], hotel: [230, 310, 180],
        attraction: [140, 190, 95], local: [110, 80, 160]
      },
      bookingAddition: 180
    },
    '纽约': {
      destination: '纽约', countryCode: 'US', countryName: { zh: '美国', en: 'United States' }, flag: '🇺🇸',
      currency: 'USD', timeZone: 'America/New_York', locale: 'en-US', language: 'English', units: 'imperial',
      mapProvider: 'google', mapLabel: 'Google Maps', regionCode: 'us', estimatedTotal: 4500,
      emergency: {
        police: '911', fire: '911', medical: '911', general: '',
        sourceUrl: 'https://www.911.gov/calling-911/'
      },
      servicePrices: {
        transport: [1280, 980, 1560], hotel: [320, 430, 250],
        attraction: [180, 240, 130], local: [140, 100, 210]
      },
      bookingAddition: 240
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
