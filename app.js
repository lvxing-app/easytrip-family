(function () {
  'use strict';

  const destinations = {
    '成都': {
      market: 'domestic', scope: '国内家庭旅行', currency: '¥', total: 4860,
      weather: ['24–30°C', '多云，适合出行'], walk: ['约 3.8 km', '约 2.6 km', '约 3.2 km', '约 1.8 km'],
      medical: '拨打 120', language: '普通话',
      days: [
        [
          { time: '09:20', name: '成都大熊猫繁育研究基地', detail: '上午人少凉爽 · 入口步行约400米', alternatives: ['成都动物园熊猫馆', '熊猫谷'] },
          { time: '13:30', name: '文殊院与素斋午餐', detail: '安静慢游 · 安排60分钟休息', alternatives: ['杜甫草堂', '人民公园茶馆'] },
          { time: '18:00', name: '宽窄巷子与川菜晚餐', detail: '路线平缓 · 可提前返回酒店', alternatives: ['奎星楼街', '玉林路晚餐'] }
        ],
        [
          { time: '09:30', name: '杜甫草堂', detail: '园林步行约1.2公里', alternatives: ['金沙遗址博物馆', '四川博物院'] },
          { time: '13:30', name: '人民公园喝盖碗茶', detail: '午后慢节奏 · 室外休息', alternatives: ['望江楼公园', '东郊记忆'] },
          { time: '17:30', name: '建设路小吃体验', detail: '按口味推荐低辣选择', alternatives: ['春熙路晚餐', '玉林生活广场'] }
        ],
        [
          { time: '09:00', name: '武侯祠', detail: '文化讲解已加入行程', alternatives: ['金沙遗址博物馆', '四川博物院'] },
          { time: '12:30', name: '锦里与午餐', detail: '景点相邻，减少换乘', alternatives: ['铁像寺水街', '安顺廊桥'] },
          { time: '19:00', name: '九眼桥夜景', detail: '预留网约车回酒店', alternatives: ['天府熊猫塔', '太古里夜景'] }
        ],
        [
          { time: '09:30', name: '酒店早餐与退房', detail: '前台可寄存行李', alternatives: ['附近早茶', '酒店延迟退房'] },
          { time: '11:00', name: '伴手礼采购', detail: '距离酒店约900米', alternatives: ['人民公园散步', '太古里自由活动'] },
          { time: '14:30', name: '前往车站或机场', detail: '预留充足安检时间', alternatives: ['酒店专车送站', '地铁前往机场'] }
        ]
      ]
    },
    '上海': {
      market: 'domestic', scope: '国内城市旅行', currency: '¥', total: 5680,
      weather: ['22–28°C', '晴间多云'], walk: ['约 4.2 km', '约 3.6 km', '约 3.1 km', '约 2.0 km'],
      medical: '拨打 120', language: '普通话',
      days: [
        [
          { time: '09:30', name: '外滩与万国建筑群', detail: '地铁直达 · 江边平缓路线', alternatives: ['北外滩', '陆家嘴滨江'] },
          { time: '13:30', name: '豫园与本帮午餐', detail: '避开高峰 · 已预留休息', alternatives: ['新天地', '田子坊'] },
          { time: '18:30', name: '黄浦江夜景', detail: '可选择游船或滨江散步', alternatives: ['上海中心观景台', '南京东路'] }
        ],
        [
          { time: '09:30', name: '上海博物馆', detail: '室内参观 · 支持语音讲解', alternatives: ['中华艺术宫', '上海自然博物馆'] },
          { time: '14:00', name: '武康路街区', detail: '精选短步行路线', alternatives: ['思南公馆', '愚园路'] },
          { time: '18:00', name: '淮海路晚餐', detail: '餐厅已按预算筛选', alternatives: ['静安寺晚餐', '新天地晚餐'] }
        ]
      ]
    },
    '北京': {
      market: 'domestic', scope: '国内文化旅行', currency: '¥', total: 5980,
      weather: ['19–27°C', '晴朗，早晚温差较大'], walk: ['约 4.5 km', '约 3.8 km', '约 3.2 km', '约 2.1 km'],
      medical: '拨打 120', language: '普通话',
      days: [
        [
          { time: '08:30', name: '故宫博物院', detail: '预约时段已匹配 · 无障碍路线', alternatives: ['国家博物馆', '天坛公园'] },
          { time: '13:30', name: '景山公园与午休', detail: '可按体力跳过登高', alternatives: ['北海公园', '什刹海'] },
          { time: '17:30', name: '前门与京味晚餐', detail: '地铁直达 · 少换乘', alternatives: ['王府井', '簋街'] }
        ]
      ]
    },
    '东京': {
      market: 'international', scope: '日本自由行', currency: 'JPY', total: 300000,
      weather: ['20–27°C', '局部阵雨，建议带伞'], walk: ['约 5.2 km', '约 4.6 km', '约 4.1 km', '约 2.5 km'],
      medical: '拨打 119', language: '日语',
      days: [
        [
          { time: '09:00', name: '浅草寺与仲见世', detail: '地铁直达 · 提供中文导航', alternatives: ['明治神宫', '上野公园'] },
          { time: '13:00', name: '上野公园与博物馆', detail: '室内外结合 · 预留休息', alternatives: ['东京国立博物馆', '银座街区'] },
          { time: '18:00', name: '晴空塔夜景', detail: '门票已匹配中文预约', alternatives: ['东京塔', '涩谷展望台'] }
        ],
        [
          { time: '09:30', name: '明治神宫', detail: '路线平缓 · 避开人流', alternatives: ['新宿御苑', '皇居外苑'] },
          { time: '13:30', name: '原宿与表参道', detail: '购物与咖啡休息', alternatives: ['银座', '代官山'] },
          { time: '18:30', name: '新宿晚餐', detail: '提供中文菜单餐厅', alternatives: ['涩谷晚餐', '东京站晚餐'] }
        ],
        [
          { time: '09:00', name: '筑地场外市场', detail: '早餐与海鲜体验', alternatives: ['丰洲市场', '东京站一番街'] },
          { time: '13:00', name: '银座与皇居外苑', detail: '少步行组合路线', alternatives: ['台场海滨', '六本木'] },
          { time: '18:00', name: '东京湾夜景', detail: '电车返程无需换乘', alternatives: ['台场夜景', '东京塔'] }
        ],
        [
          { time: '09:30', name: '酒店早餐与退房', detail: '行李寄存日语卡片已准备', alternatives: ['附近早餐', '延迟退房'] },
          { time: '11:00', name: '东京站伴手礼', detail: '室内购物 · 交通方便', alternatives: ['银座购物', '机场免税店'] },
          { time: '14:00', name: '前往成田或羽田机场', detail: '已预留值机与退税时间', alternatives: ['机场巴士', '铁路快线'] }
        ]
      ]
    },
    '巴黎': {
      market: 'international', scope: '法国文化旅行', currency: 'EUR', total: 2500,
      weather: ['14–22°C', '多云，偶有小雨'], walk: ['约 5.0 km', '约 4.3 km', '约 4.8 km', '约 2.7 km'],
      medical: '拨打 112', language: '法语',
      days: [
        [
          { time: '09:30', name: '卢浮宫', detail: '预约入场 · 中文重点路线', alternatives: ['奥赛博物馆', '橘园美术馆'] },
          { time: '14:00', name: '杜乐丽花园与咖啡', detail: '平缓步行 · 充分休息', alternatives: ['卢森堡公园', '塞纳河畔'] },
          { time: '18:30', name: '塞纳河游船', detail: '已匹配中文语音讲解', alternatives: ['埃菲尔铁塔夜景', '蒙帕纳斯观景台'] }
        ],
        [
          { time: '09:30', name: '埃菲尔铁塔', detail: '电梯票优先 · 避开排队', alternatives: ['凯旋门', '荣军院'] },
          { time: '13:30', name: '香榭丽舍与午餐', detail: '餐厅支持英文菜单', alternatives: ['玛黑区', '圣日耳曼'] },
          { time: '18:30', name: '凯旋门夜景', detail: '可选择不登顶路线', alternatives: ['塞纳河夜景', '巴黎歌剧院'] }
        ]
      ]
    },
    '新加坡': {
      market: 'international', scope: '新加坡家庭旅行', currency: 'SGD', total: 2100,
      weather: ['26–32°C', '炎热有阵雨'], walk: ['约 4.1 km', '约 3.8 km', '约 4.0 km', '约 2.4 km'],
      medical: '拨打 995', language: '英语',
      days: [
        [
          { time: '09:30', name: '滨海湾花园', detail: '室内冷室优先 · 避开午间高温', alternatives: ['新加坡植物园', '国家美术馆'] },
          { time: '14:00', name: '鱼尾狮公园', detail: '短步行路线 · 附近休息点', alternatives: ['滨海艺术中心', '克拉码头'] },
          { time: '18:30', name: '滨海湾灯光秀', detail: '地铁直达 · 免费活动', alternatives: ['摩天观景轮', '金沙观景台'] }
        ]
      ]
    }
  };

  const serviceDefinitions = [
    { type: 'transport', icon: '行', name: '往返交通', nameEn: 'Round-trip transport' },
    { type: 'hotel', icon: '住', name: '酒店住宿', nameEn: 'Hotel stay' },
    { type: 'attraction', icon: '票', name: '景点门票', nameEn: 'Attraction tickets' },
    { type: 'local', icon: '地', name: '当地服务', nameEn: 'Local services' }
  ];

  const integrationDefinitions = [
    { icon: '图', name: '地图与路线', domestic: '高德地图接口', international: 'Google Maps 接口' },
    { icon: '住', name: '酒店库存', domestic: '携程酒店接口', international: 'Booking / 酒店聚合接口' },
    { icon: '行', name: '交通票务', domestic: '12306 / 航班聚合', international: '航司与 GDS 聚合接口' },
    { icon: '票', name: '景点门票', domestic: '景区票务聚合接口', international: '全球活动票务接口' },
    { icon: '天', name: '实时天气', domestic: '国内天气接口', international: '全球天气接口' },
    { icon: '译', name: '翻译与语音', domestic: '文字与语音能力', international: '多语言翻译接口' },
    { icon: '汇', name: '汇率与支付', domestic: '人民币结算', international: '实时汇率与多币种' },
    { icon: '安', name: '安全与求助', domestic: '家人及急救信息', international: '领事、保险与急救信息' }
  ];

  const state = {
    market: 'domestic',
    destination: '成都',
    days: 4,
    currentDay: 0,
    currentView: 'planner',
    currentTripPanel: 'schedule',
    plan: null,
    booked: new Set(),
    familySharing: false,
    family: {
      members: [
        { id: 'mother', nameKey: 'familyMemberMother', relation: 'family', status: 'joined' },
        { id: 'brother', nameKey: 'familyMemberBrother', relation: 'family', status: 'invited' }
      ],
      itinerary: true,
      location: false,
      bookings: true,
      alerts: true,
      duration: 'trip',
      checkInAt: ''
    },
    currentService: null,
    toastTimer: null,
    promptTouched: false
  };

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const delay = (ms) => new Promise(resolve => window.setTimeout(resolve, ms));
  const I18n = window.EasyTripI18n;
  const Regional = window.EasyTripRegional;
  const t = (key, variables) => I18n.t(key, variables);

  function formatMoney(amount, plan = state.plan) {
    const currency = plan && plan.region ? plan.region.currency : (plan && plan.currency) || 'CNY';
    return Regional.formatMoney(amount, currency, I18n.locale);
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, character => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    })[character]);
  }

  function loadFamilyState() {
    try {
      const saved = JSON.parse(localStorage.getItem('easytrip-family-sharing') || 'null');
      if (!saved || typeof saved !== 'object') return;
      state.familySharing = Boolean(saved.enabled);
      if (Array.isArray(saved.members)) {
        state.family.members = saved.members.filter(member => member && (member.name || member.nameKey)).slice(0, 8);
      }
      ['itinerary', 'location', 'bookings', 'alerts'].forEach(key => {
        if (typeof saved[key] === 'boolean') state.family[key] = saved[key];
      });
      if (['trip', '24h', 'manual'].includes(saved.duration)) state.family.duration = saved.duration;
      if (typeof saved.checkInAt === 'string') state.family.checkInAt = saved.checkInAt;
    } catch (error) { /* Keep safe demo defaults when storage is unavailable. */ }
  }

  function saveFamilyState() {
    try {
      localStorage.setItem('easytrip-family-sharing', JSON.stringify({
        enabled: state.familySharing,
        ...state.family
      }));
    } catch (error) { /* The demo still works without persistence. */ }
  }

  const destinationNames = {
    '成都': { en: 'Chengdu', ja: '成都', ko: '청두', th: 'เฉิงตู', ar: 'تشنغدو', ru: 'Чэнду' },
    '上海': { en: 'Shanghai', ja: '上海', ko: '상하이', th: 'เซี่ยงไฮ้', ar: 'شنغهاي', ru: 'Шанхай' },
    '北京': { en: 'Beijing', ja: '北京', ko: '베이징', th: 'ปักกิ่ง', ar: 'بكين', ru: 'Пекин' },
    '东京': { en: 'Tokyo', ja: '東京', ko: '도쿄', th: 'โตเกียว', ar: 'طوكيو', ru: 'Токио' },
    '巴黎': { en: 'Paris', ja: 'パリ', ko: '파리', th: 'ปารีส', ar: 'باريس', ru: 'Париж' },
    '新加坡': { en: 'Singapore', ja: 'シンガポール', ko: '싱가포르', th: 'สิงคโปร์', ar: 'سنغافورة', ru: 'Сингапур' }
  };

  function localizedDestination(name) {
    if (I18n.locale === 'zh-CN') return name;
    const names = destinationNames[name] || {};
    return names[I18n.locale] || names.en || name;
  }

  function localizeDestinationButtons() {
    $$('.suggestion').forEach(button => {
      button.textContent = localizedDestination(button.dataset.destination);
    });
  }

  function localizedActivityDetail(activity) {
    return I18n.locale === 'zh-CN' ? activity.detail : t('translatedDetail');
  }

  function localizedServiceName(service) {
    return I18n.locale === 'zh-CN' ? service.name : service.nameEn;
  }

  const IntegrationHub = {
    mode: 'demo',
    async createPlan(context) {
      await delay(250);
      return buildPlan(context);
    },
    async refreshWeather(plan) {
      await delay(450);
      const variants = plan.market === 'international'
        ? [['18–25°C', '天气已更新，午后可能有阵雨'], ['20–27°C', '天气稳定，适合步行']]
        : [['23–29°C', '天气已更新，体感舒适'], ['25–31°C', '午后较热，已增加室内休息']];
      return variants[Math.floor(Math.random() * variants.length)];
    },
    async search(type, plan) {
      await delay(260);
      const overseas = plan.market === 'international';
      const prices = plan.region.servicePrices[type];
      const money = amount => formatMoney(amount, plan);
      const options = {
        transport: overseas ? [
          ['直飞往返 · 含托运行李', `${money(prices[0])}/人 · 演示估算`],
          ['一次中转 · 含托运行李', `${money(prices[1])}/人 · 演示估算`],
          ['灵活退改直飞', `${money(prices[2])}/人 · 演示估算`]
        ] : [
          ['高铁往返 · 一等座', `${money(prices[0])}/人 · 车站出发`],
          ['直飞往返 · 经济舱', `${money(prices[1])}/人 · 含接送建议`],
          ['高铁往返 · 二等座', `${money(prices[2])}/人 · 性价比优先`]
        ],
        hotel: [
          ['市中心舒适酒店', `${money(prices[0])}/晚 · 近公共交通`],
          ['安静家庭房', `${money(prices[1])}/晚 · 可加床 · 电梯房`],
          ['交通枢纽酒店', `${money(prices[2])}/晚 · 换乘方便`]
        ],
        attraction: [
          ['热门景点预约组合', `${money(prices[0])}/人 · 数字凭证`],
          ['重点景点快速入场', `${money(prices[1])}/人 · 减少排队`],
          ['基础门票组合', `${money(prices[2])}/人 · 自由调整`]
        ],
        local: overseas ? [
          ['机场接送 + 7日上网卡', `${money(prices[0])}/人 · 到达即用`],
          ['交通卡 + 旅行保险', `${money(prices[1])}/人 · 含基础保障`],
          ['全套安心服务', `${money(prices[2])}/人 · 接送、上网、保险`]
        ] : [
          ['机场/车站接送', `${money(prices[0])}/程 · 车型适合4人`],
          ['市内交通与保险', `${money(prices[1])}/人 · 出行更安心`],
          ['全程用车服务', `${money(prices[2])}/天 · 少走路优先`]
        ]
      };
      return options[type] || [];
    }
  };

  function getSelectedInterests() {
    return $$('input[name="interest"]:checked').map(input => input.value);
  }

  function inferDestination(prompt, market) {
    const names = Object.keys(destinations);
    const found = names.find(name => prompt.includes(name));
    if (found && destinations[found].market === market) return found;
    return state.destination && destinations[state.destination].market === market
      ? state.destination
      : market === 'international' ? '东京' : '成都';
  }

  function parseDays(prompt) {
    const match = prompt.match(/(\d{1,2})\s*天/);
    if (!match) return Number($('#tripDays').value);
    return Math.min(10, Math.max(2, Number(match[1])));
  }

  function getContext() {
    const prompt = $('#tripPrompt').value.trim();
    const destination = inferDestination(prompt, state.market);
    const paceInput = $('input[name="pace"]:checked');
    return {
      market: state.market,
      destination,
      days: parseDays(prompt),
      prompt,
      startDate: $('#startDate').value,
      travelers: $('#travelers').value,
      budget: $('#budget').value,
      pace: paceInput ? paceInput.value : 'relaxed',
      interests: getSelectedInterests()
    };
  }

  function cloneActivity(activity) {
    return { ...activity, alternatives: [...activity.alternatives] };
  }

  function buildPlan(context) {
    const base = destinations[context.destination];
    const region = Regional.get(context.destination);
    const days = [];
    for (let index = 0; index < context.days; index += 1) {
      const source = base.days[index % base.days.length];
      days.push(source.map(cloneActivity));
    }
    return {
      ...context,
      ...base,
      region,
      currency: region.currency,
      total: region.estimatedTotal,
      medical: `拨打 ${region.emergency.medical}`,
      language: region.language,
      days,
      title: context.destination
    };
  }

  function formatDate(dateString, offset = 0) {
    const date = new Date(`${dateString}T12:00:00`);
    date.setDate(date.getDate() + offset);
    return I18n.formatDate(date, { month: 'short', day: 'numeric' });
  }

  function formatFullDate(dateString) {
    const date = new Date(`${dateString}T12:00:00`);
    return I18n.formatDate(date, { year: 'numeric', month: 'long', day: 'numeric' });
  }

  function showToast(message) {
    const toast = $('#toast');
    toast.textContent = message;
    toast.hidden = false;
    window.clearTimeout(state.toastTimer);
    state.toastTimer = window.setTimeout(() => { toast.hidden = true; }, 2800);
  }

  function setMarket(market, updatePrompt = true) {
    state.market = market;
    document.body.classList.toggle('market-international', market === 'international');
    $$('[data-market]').forEach(button => {
      const active = button.dataset.market === market;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    if (market === 'international') {
      if (destinations[state.destination].market !== 'international') state.destination = '东京';
      if (updatePrompt) {
        $('#tripPrompt').value = t('sampleInternational');
        state.promptTouched = false;
      }
      $('#promptHint').textContent = t('promptHintInternational');
    } else {
      if (destinations[state.destination].market !== 'domestic') state.destination = '成都';
      if (updatePrompt) {
        $('#tripPrompt').value = t('sampleDomestic');
        state.promptTouched = false;
      }
      $('#promptHint').textContent = t('promptHintDomestic');
    }
    selectDestination(state.destination, false);
    localizeDestinationButtons();
    renderIntegrations();
  }

  function selectDestination(destination, updatePrompt = true) {
    if (!destinations[destination]) return;
    state.destination = destination;
    $$('.suggestion').forEach(button => button.classList.toggle('active', button.dataset.destination === destination));
    if (updatePrompt) {
      const city = localizedDestination(destination);
      $('#tripPrompt').value = destinations[destination].market === 'international'
        ? t('sampleInternational').replace(/Tokyo|东京/g, city)
        : t('sampleDomestic').replace(/Chengdu|成都/g, city);
      state.promptTouched = false;
    }
  }

  function setLoadingStep(title, subtitle) {
    $('#loadingText').textContent = title;
    $('#loadingSubtext').textContent = subtitle;
  }

  async function generatePlan() {
    const context = getContext();
    const loading = $('#loadingLayer');
    loading.hidden = false;
    setLoadingStep(I18n.locale === 'zh-CN' ? '正在理解旅行需求…' : 'Understanding your trip…', I18n.locale === 'zh-CN' ? '识别目的地、同行人和旅行节奏' : 'Reading destination, travelers and pace');
    await delay(520);
    setLoadingStep(I18n.locale === 'zh-CN' ? '正在连接旅行服务…' : 'Connecting travel services…', I18n.locale === 'zh-CN' ? '匹配地图、酒店、交通、门票与天气' : 'Matching maps, hotels, transport, tickets and weather');
    await delay(620);
    setLoadingStep(I18n.locale === 'zh-CN' ? '正在优化每日路线…' : 'Optimizing each day…', I18n.locale === 'zh-CN' ? '减少换乘、步行和等待时间' : 'Reducing transfers, walking and waiting');
    state.plan = await IntegrationHub.createPlan(context);
    state.destination = context.destination;
    state.days = context.days;
    state.currentDay = 0;
    state.booked = new Set();
    renderPlan();
    await delay(430);
    loading.hidden = true;
    showView('itinerary');
    showTripPanel('schedule');
    showToast(t('planGenerated'));
  }

  function ensurePlan() {
    if (!state.plan) state.plan = buildPlan(getContext());
  }

  function showView(view) {
    ensurePlan();
    state.currentView = view;
    $$('.app-view').forEach(section => section.classList.toggle('active', section.dataset.view === view));
    $$('.nav-item').forEach(button => {
      const active = button.dataset.viewTarget === view;
      button.classList.toggle('active', active);
      if (active) button.setAttribute('aria-current', 'page');
      else button.removeAttribute('aria-current');
    });
    if (view === 'itinerary') {
      renderPlan();
      window.setTimeout(renderCurrentMap, 0);
    }
    if (view === 'journey') renderJourney();
    if (view === 'family' && window.EasyTripFamilyChat) window.EasyTripFamilyChat.render();
    $('.app-frame').scrollTo({ top: 0, behavior: 'smooth' });
  }

  function openFamilyChat(options = {}) {
    showView('family');
    window.setTimeout(() => {
      if (window.EasyTripFamilyChat) window.EasyTripFamilyChat.render(options);
    }, 0);
  }

  function showTripPanel(panel) {
    state.currentTripPanel = panel;
    $$('.trip-tab').forEach(button => {
      const active = button.dataset.tripPanel === panel;
      button.classList.toggle('active', active);
      button.setAttribute('aria-selected', String(active));
    });
    $$('[data-trip-panel-content]').forEach(content => content.classList.toggle('active', content.dataset.tripPanelContent === panel));
  }

  function renderRegionalContext(plan) {
    const region = plan.region;
    const country = I18n.locale === 'zh-CN' ? region.countryName.zh : region.countryName.en;
    $('#regionalContext').textContent = `${region.flag} ${t('localProfile', {
      country, currency: region.currency, timeZone: region.timeZone, map: region.mapLabel
    })}`;
    $('#emergencyRegion').textContent = t('emergencyRegion', { country });

    const callTargets = [
      ['medicalCall', 'medicalNumber', region.emergency.medical],
      ['policeCall', 'policeNumber', region.emergency.police],
      ['fireCall', 'fireNumber', region.emergency.fire]
    ];
    callTargets.forEach(([linkId, numberId, number]) => {
      $(`#${linkId}`).href = `tel:${number}`;
      $(`#${numberId}`).textContent = t('callNumber', { number });
    });
    const generalLink = $('#generalEmergencyCall');
    generalLink.hidden = !region.emergency.general;
    if (region.emergency.general) {
      generalLink.href = `tel:${region.emergency.general}`;
      $('#generalEmergencyNumber').textContent = t('callNumber', { number: region.emergency.general });
    }
    $('#emergencyOfficialSource').href = region.emergency.sourceUrl;
  }

  function renderPlan() {
    ensurePlan();
    const plan = state.plan;
    setMarket(plan.market, false);
    const paceLabel = t({ relaxed: 'paceRelaxed', balanced: 'paceBalanced', packed: 'pacePacked' }[plan.pace]);
    const budgetLabel = t({ value: 'budgetValue', balanced: 'budgetBalanced', premium: 'budgetPremium' }[plan.budget]);
    const peopleNumber = { couple: 2, family: 4, kids: 3, solo: 1 }[plan.travelers];
    const peopleLabel = t(`people${peopleNumber}`);
    const destinationLabel = localizedDestination(plan.destination);
    $('#tripScope').textContent = t(plan.market === 'international' ? 'scopeInternational' : 'scopeDomestic');
    $('#tripTitle').textContent = t('tripTitle', { destination: destinationLabel, days: plan.days.length, pace: paceLabel });
    $('#tripMeta').textContent = t('tripMeta', { date: formatFullDate(plan.startDate), people: peopleLabel, budget: budgetLabel });
    renderRegionalContext(plan);
    $('#shareButton').textContent = t('share');
    $('#documentHint').textContent = I18n.locale === 'zh-CN'
      ? (plan.market === 'international' ? '同行人的护照与签证材料' : '同行人的身份证')
      : (plan.market === 'international' ? 'Passports and visa documents for all travelers' : 'Identity documents for all travelers');
    $('#weatherTemp').textContent = plan.weather[0];
    $('#weatherText').textContent = I18n.locale === 'zh-CN' ? plan.weather[1] : t('weatherSuitable');
    const walkLabel = $('#walkDistance').nextElementSibling;
    if (walkLabel) walkLabel.textContent = t('todayWalk');
    const bookingLabels = $$('.booking-summary span');
    if (bookingLabels[0]) bookingLabels[0].textContent = `${t('estimatedTotal')} · ${t('localEstimate')}`;
    if (bookingLabels[1]) bookingLabels[1].textContent = t('bookingAutoAdd');
    renderDays();
    renderServices();
    renderIntegrations();
    renderJourney();
    I18n.apply();
    localizeDestinationButtons();
  }

  function renderDays() {
    const plan = state.plan;
    const selector = $('#daySelector');
    selector.innerHTML = plan.days.map((day, index) => `
      <button class="day-button ${index === state.currentDay ? 'active' : ''}" type="button" data-day="${index}">
        <small>${t('dayNumber', { number: index + 1 })}</small><strong>${formatDate(plan.startDate, index)}</strong>
      </button>
    `).join('');
    const activities = plan.days[state.currentDay];
    const walk = plan.walk[state.currentDay % plan.walk.length];
    $('#walkDistance').textContent = I18n.locale === 'zh-CN' ? walk : walk.replace(/^约\s*/, '');
    $('#routeLine').innerHTML = activities.map(activity => `<span class="route-node">${activity.name.replace(/与.+$/, '').slice(0, 7)}</span>`).join('');
    $('#timeline').innerHTML = activities.map((activity, index) => `
      <article class="timeline-item">
        <time class="timeline-time">${activity.time}</time>
        <span class="timeline-marker" aria-hidden="true"></span>
        <div class="timeline-content">
          <h3>${activity.name}</h3>
          <p>${localizedActivityDetail(activity)}</p>
          <div class="timeline-actions">
            <button class="inline-action" type="button" data-replace="${index}">${t('replace')}</button>
            <button class="inline-action" type="button" data-map="${index}">${t('viewRoute')}</button>
          </div>
        </div>
      </article>
    `).join('');
    if ($('#itineraryView').classList.contains('active')) window.setTimeout(renderCurrentMap, 0);
  }

  function renderCurrentMap() {
    if (!state.plan || !window.EasyTripMaps || !$('#itineraryView').classList.contains('active')) return;
    window.EasyTripMaps.render({
      market: state.plan.market,
      destination: state.plan.destination,
      activities: state.plan.days[state.currentDay],
      day: state.currentDay,
      locale: I18n.locale,
      mapProvider: state.plan.region.mapProvider,
      regionCode: state.plan.region.regionCode
    });
  }

  function getServiceCopy(type) {
    const overseas = state.plan.market === 'international';
    const prices = state.plan.region.servicePrices[type];
    const from = formatMoney(Math.min(...prices));
    if (I18n.locale !== 'zh-CN') {
      const globalCopies = {
        transport: overseas ? ['Flight options · checked baggage', `From ${from}/person · demo`] : ['Rail and flights compared', `From ${from}/person · demo`],
        hotel: overseas ? ['Central · near transit · language support', `From ${from}/night · demo`] : ['Central · breakfast · less walking', `From ${from}/night · demo`],
        attraction: overseas ? ['Digital voucher · flexible changes', `From ${from}/person · demo`] : ['Popular time slots held', `From ${from}/person · demo`],
        local: overseas ? ['Transfer · eSIM · insurance', `From ${from}/person · demo`] : ['Transfer · car · travel cover', `From ${from} · demo`]
      };
      return globalCopies[type];
    }
    const copies = {
      transport: overseas ? ['航班方案 · 含托运行李', `${from}/人起 · 演示估算`] : ['高铁与航班已比较', `${from}/人起 · 演示估算`],
      hotel: overseas ? ['市中心 · 近公共交通', `${from}/晚起 · 演示估算`] : ['市中心 · 含早餐 · 少步行', `${from}/晚起 · 演示估算`],
      attraction: overseas ? ['数字凭证 · 可退改', `${from}/人起 · 演示估算`] : ['热门时段已预留', `${from}/人起 · 演示估算`],
      local: overseas ? ['接送 · 上网卡 · 保险', `${from}/人起 · 演示估算`] : ['接送 · 用车 · 旅行保障', `${from}起 · 演示估算`]
    };
    return copies[type];
  }

  function renderServices() {
    $('#serviceList').innerHTML = serviceDefinitions.map(service => {
      const copy = getServiceCopy(service.type);
      const booked = state.booked.has(service.type);
      return `
        <article class="service-card">
          <span class="service-icon" aria-hidden="true">${service.icon}</span>
          <span class="service-copy"><strong>${localizedServiceName(service)}</strong><span>${copy[0]}</span><span>${copy[1]}</span></span>
          <span class="service-state"><small>${booked ? t('added') : t('available')}</small><button class="service-action" type="button" data-service="${service.type}">${booked ? t('view') : t('select')}</button></span>
        </article>
      `;
    }).join('');
    $('#bookingSaved').textContent = t('lockedCount', { count: state.booked.size });
    const addition = state.booked.size * state.plan.region.bookingAddition;
    $('#bookingTotal').textContent = formatMoney(state.plan.total + addition);
  }

  async function openService(type) {
    state.currentService = type;
    const definition = serviceDefinitions.find(service => service.type === type);
    const dialog = $('#serviceDialog');
    const serviceName = localizedServiceName(definition);
    $('#serviceDialogEyebrow').textContent = serviceName;
    $('#serviceDialogTitle').textContent = I18n.locale === 'zh-CN' ? `为${state.plan.destination}行程选择${serviceName}` : `${serviceName} · ${localizedDestination(state.plan.destination)}`;
    $('#serviceDialogContent').innerHTML = `<p class="secondary-copy">${I18n.locale === 'zh-CN' ? '正在查询演示库存与价格…' : 'Checking demo availability and prices…'}</p>`;
    $('#serviceConfirmButton').textContent = state.booked.has(type) ? (I18n.locale === 'zh-CN' ? '保留当前选择' : 'Keep current choice') : (I18n.locale === 'zh-CN' ? '确认演示预订' : 'Confirm demo booking');
    dialog.showModal();
    const options = await IntegrationHub.search(type, state.plan);
    $('#serviceDialogContent').innerHTML = `<div class="option-list">${options.map((option, index) => `
      <label class="option-card"><input type="radio" name="serviceOption" value="${index}" ${index === 0 ? 'checked' : ''}><span><strong>${option[0]}</strong><small>${option[1]}</small></span></label>
    `).join('')}</div><p class="secondary-copy">演示预订不会产生真实订单或费用。</p>`;
  }

  function renderIntegrations() {
    const international = state.market === 'international';
    $('#integrationList').innerHTML = integrationDefinitions.map(item => `
      <div class="integration-row">
        <span class="service-icon" aria-hidden="true">${item.icon}</span>
        <span><strong>${item.name}</strong><small>${international ? item.international : item.domestic}</small></span>
        <span class="status-badge">模拟已连接</span>
      </div>
    `).join('');
  }

  function renderJourney() {
    ensurePlan();
    const activities = state.plan.days[state.currentDay];
    const first = activities[0];
    $('#journeyDate').textContent = t('tripDate', { destination: localizedDestination(state.plan.destination), day: state.currentDay + 1, date: formatDate(state.plan.startDate, state.currentDay) });
    $('#nextStopName').textContent = first.name;
    $('#nextStopTime').textContent = t('departAt', { time: first.time });
    $('#nextStopRoute').textContent = localizedActivityDetail(first);
    renderFamilyStatus();
    $('#todayTasks').innerHTML = activities.map((activity, index) => `
      <label class="today-task"><input class="task-check" type="checkbox" data-task="${index}"><span class="today-task-copy"><strong>${activity.name}</strong><small>${localizedActivityDetail(activity)}</small></span><span>${activity.time}</span></label>
    `).join('');
    updateTaskProgress();
  }

  function familyMemberName(member) {
    return member.nameKey ? t(member.nameKey) : member.name;
  }

  function familyInitial(member) {
    const name = familyMemberName(member).trim();
    return name ? Array.from(name)[0].toUpperCase() : '家';
  }

  function renderFamilyStatus() {
    const count = state.family.members.length;
    const status = $('#familyStatus');
    if (!status) return;
    const chatStatus = window.EasyTripFamilyChat ? window.EasyTripFamilyChat.status() : null;
    status.textContent = chatStatus || (state.familySharing
      ? (state.family.location ? t('familyShared') : t('familyPlanShared', { count }))
      : t('familyChatLoginHint'));
    $('#familyButton').classList.toggle('sharing-on', Boolean(chatStatus));
  }

  function renderFamilyMembers() {
    const list = $('#familyMemberList');
    list.innerHTML = state.family.members.map(member => {
      const name = escapeHtml(familyMemberName(member));
      const relation = t(`relation${member.relation.charAt(0).toUpperCase()}${member.relation.slice(1)}`);
      const status = t(member.status === 'joined' ? 'memberJoined' : 'memberInvited');
      return `
        <div class="family-member-row">
          <span class="family-avatar" aria-hidden="true">${escapeHtml(familyInitial(member))}</span>
          <span><strong>${name}</strong><small>${relation} · ${status}</small></span>
          <button class="family-remove-button" type="button" data-remove-family-member="${escapeHtml(member.id)}" aria-label="${escapeHtml(t('removeMember'))}">×</button>
        </div>`;
    }).join('') || `<p class="family-empty">${t('familyNoMembers')}</p>`;
  }

  function renderFamilyDialog() {
    const count = state.family.members.length;
    $('#familyAvatars').innerHTML = state.family.members.slice(0, 3).map(member => `<span>${escapeHtml(familyInitial(member))}</span>`).join('');
    $('#familyMemberCount').textContent = t('familyMemberCount', { count });
    $('#familySummaryTitle').textContent = state.familySharing ? t('familySummaryActive') : t('familySummaryOff');
    $('#familySummaryMeta').textContent = state.familySharing
      ? t('familySummaryMeta', { count })
      : t('familyPrivacy');
    $('#familyShareBadge').textContent = state.familySharing ? t('familyBadgeOn') : t('familyBadgeOff');
    $('#familyShareBadge').classList.toggle('active', state.familySharing);
    $('#shareItineraryOption').checked = state.family.itinerary;
    $('#shareLocationOption').checked = state.family.location;
    $('#shareBookingsOption').checked = state.family.bookings;
    $('#shareAlertsOption').checked = state.family.alerts;
    $('#familyShareDuration').value = state.family.duration;
    $('#familyMemberInput').placeholder = t('familyInvitePlaceholder');
    $('#saveFamilySharingButton').textContent = t(state.familySharing ? 'updateFamilySharing' : 'startFamilySharing');
    $('#stopFamilySharingButton').hidden = !state.familySharing;
    $('#familyCheckInButton').disabled = count === 0;
    $('#copyFamilyInviteButton').disabled = count === 0;
    $('#familyLastUpdate').textContent = state.family.checkInAt
      ? t('familyCheckInSent', { time: I18n.formatDate(new Date(state.family.checkInAt), { hour: '2-digit', minute: '2-digit' }) })
      : t('familyCheckInNone');
    renderFamilyMembers();
    renderFamilyStatus();
  }

  function openFamilyDialog() {
    ensurePlan();
    renderFamilyDialog();
    $('#familyDialog').showModal();
  }

  function readFamilyOptions() {
    state.family.itinerary = $('#shareItineraryOption').checked;
    state.family.location = $('#shareLocationOption').checked;
    state.family.bookings = $('#shareBookingsOption').checked;
    state.family.alerts = $('#shareAlertsOption').checked;
    state.family.duration = $('#familyShareDuration').value;
  }

  function saveFamilySharing() {
    readFamilyOptions();
    if (!state.family.members.length) {
      showToast(t('familyNoMembers'));
      $('#familyMemberInput').focus();
      return;
    }
    if (![state.family.itinerary, state.family.location, state.family.bookings, state.family.alerts].some(Boolean)) {
      showToast(t('familySelectOne'));
      return;
    }
    state.familySharing = true;
    saveFamilyState();
    renderFamilyDialog();
    showToast(t('familySharingSaved'));
  }

  function addFamilyMember() {
    const input = $('#familyMemberInput');
    const name = input.value.trim();
    if (!name) {
      showToast(t('familyInvitePlaceholder'));
      input.focus();
      return;
    }
    state.family.members.push({
      id: `member-${Date.now()}`,
      name,
      relation: $('#familyRelationSelect').value,
      status: 'invited'
    });
    input.value = '';
    saveFamilyState();
    renderFamilyDialog();
    showToast(t('familyMemberAdded'));
  }

  async function copyFamilyInvite() {
    ensurePlan();
    const inviteUrl = new URL('./', window.location.href);
    inviteUrl.searchParams.set('family', `ET-${String(Date.now()).slice(-6)}`);
    const text = `${t('familyInviteMessage', { destination: localizedDestination(state.plan.destination) })} ${inviteUrl.toString()}`;
    try { await navigator.clipboard.writeText(text); } catch (error) { /* Clipboard can be unavailable in local previews. */ }
    showToast(t('familyInviteCopied'));
  }

  function updateTaskProgress() {
    const tasks = $$('.task-check');
    const done = tasks.filter(task => task.checked).length;
    $('#todayProgress').textContent = t('completed', { done, total: tasks.length });
    const next = tasks.find(task => !task.checked);
    if (next) {
      const activity = state.plan.days[state.currentDay][Number(next.dataset.task)];
      $('#nextStopName').textContent = activity.name;
      $('#nextStopTime').textContent = t('departAt', { time: activity.time });
      $('#nextStopRoute').textContent = localizedActivityDetail(activity);
    } else if (tasks.length) {
      $('#nextStopName').textContent = '今天的行程已全部完成';
      $('#nextStopTime').textContent = '好好休息';
      $('#nextStopRoute').textContent = '明天的出发提醒会提前发送';
    }
  }

  function replaceActivity(index) {
    const activity = state.plan.days[state.currentDay][index];
    const next = activity.alternatives.shift();
    if (!next) {
      showToast(I18n.locale === 'zh-CN' ? '当前没有更多合适的替代景点' : 'No more suitable alternatives are available');
      return;
    }
    activity.alternatives.push(activity.name);
    activity.name = next;
    activity.detail = state.plan.pace === 'relaxed' ? '已按少步行和休息条件重新匹配' : '已根据时间与距离重新匹配';
    renderDays();
    renderJourney();
    showToast(I18n.locale === 'zh-CN' ? '已更换景点，并重新计算路线' : 'Stop replaced and route recalculated');
  }

  function renderLanguageGrid() {
    const grid = $('#languageGrid');
    grid.innerHTML = I18n.supported.map(language => `
      <button class="language-option ${language.code === I18n.locale ? 'active' : ''}" type="button" data-locale="${language.code}" aria-pressed="${language.code === I18n.locale}">
        <span class="language-flag" aria-hidden="true">${language.flag}</span>
        <span class="language-copy"><strong>${language.native}</strong><small>${language.name}</small></span>
      </button>
    `).join('');
  }

  function openLanguageDialog() {
    renderLanguageGrid();
    $('#languageDialog').showModal();
  }

  function toggleLargeMode(enabled) {
    document.body.classList.toggle('large-mode', enabled);
    $('#accessibilityButton').setAttribute('aria-pressed', String(enabled));
    $('#accessibilityButton').setAttribute('aria-label', enabled ? '关闭大字简洁模式' : '开启大字简洁模式');
    $('#largeModeSwitch').checked = enabled;
    showToast(enabled
      ? (I18n.locale === 'zh-CN' ? '已开启大字简洁模式' : 'Large, simplified display enabled')
      : (I18n.locale === 'zh-CN' ? '已恢复标准显示' : 'Standard display restored'));
  }

  function toggleDrawer(open) {
    $('#profileDrawer').hidden = !open;
    if (open) $('#drawerClose').focus();
  }

  function translatedPhrase(text, language) {
    const normalized = text.trim();
    const dictionary = {
      '日语': {
        '请问洗手间在哪里？': 'お手洗いはどこですか？',
        '请问这个多少钱？': 'これはいくらですか？',
        '请帮我叫一辆出租车。': 'タクシーを呼んでください。'
      },
      '法语': {
        '请问洗手间在哪里？': 'Où sont les toilettes, s’il vous plaît ?',
        '请问这个多少钱？': 'Combien cela coûte-t-il ?',
        '请帮我叫一辆出租车。': 'Pouvez-vous m’appeler un taxi ?'
      },
      '英语': {
        '请问洗手间在哪里？': 'Where is the restroom, please?',
        '请问这个多少钱？': 'How much does this cost?',
        '请帮我叫一辆出租车。': 'Please call a taxi for me.'
      }
    };
    const languagePack = dictionary[language] || dictionary['英语'];
    return languagePack[normalized] || `[${language}演示翻译] ${normalized}`;
  }

  async function copyShareText() {
    const text = `我的${state.plan.destination}${state.plan.days.length}天旅行计划：${state.plan.days[0].map(item => item.name).join('、')}`;
    try {
      await navigator.clipboard.writeText(text);
      showToast(I18n.locale === 'zh-CN' ? '行程摘要已复制，可以发送给家人' : 'Trip summary copied and ready to share');
    } catch (error) {
      showToast(I18n.locale === 'zh-CN' ? '演示分享已准备好，可以发送给家人' : 'Demo share is ready for your family');
    }
  }

  function bindEvents() {
    $('#languageButton').addEventListener('click', openLanguageDialog);
    $('#drawerLanguageButton').addEventListener('click', () => { toggleDrawer(false); openLanguageDialog(); });
    $('#languageGrid').addEventListener('click', event => {
      const button = event.target.closest('[data-locale]');
      if (!button) return;
      const locale = button.dataset.locale;
      $('#languageDialog').close();
      window.setTimeout(() => I18n.setLocale(locale), 0);
    });
    document.addEventListener('easytrip:localechange', event => {
      setMarket(state.market, false);
      if (!state.promptTouched) selectDestination(state.destination, true);
      renderPlan();
      renderLanguageGrid();
      if (event.detail.announce) showToast(t('languageChanged', { language: event.detail.info.native }));
    });

    $$('[data-market]').forEach(button => button.addEventListener('click', () => setMarket(button.dataset.market)));
    $$('.suggestion').forEach(button => button.addEventListener('click', () => selectDestination(button.dataset.destination)));
    $('#tripPrompt').addEventListener('input', () => { state.promptTouched = true; });
    $('#generateButton').addEventListener('click', generatePlan);

    $$('[data-view-target]').forEach(button => button.addEventListener('click', () => showView(button.dataset.viewTarget)));
    $$('.trip-tab').forEach(button => button.addEventListener('click', () => showTripPanel(button.dataset.tripPanel)));

    $('#daySelector').addEventListener('click', event => {
      const button = event.target.closest('[data-day]');
      if (!button) return;
      state.currentDay = Number(button.dataset.day);
      renderDays();
      renderJourney();
    });

    $('#timeline').addEventListener('click', event => {
      const replaceButton = event.target.closest('[data-replace]');
      const mapButton = event.target.closest('[data-map]');
      if (replaceButton) replaceActivity(Number(replaceButton.dataset.replace));
      if (mapButton) {
        $('#tripMap').scrollIntoView({ behavior: 'smooth', block: 'center' });
        showToast(I18n.locale === 'zh-CN' ? '已在地图中显示当天路线' : 'The daily route is shown on the map');
      }
    });

    $('#serviceList').addEventListener('click', event => {
      const button = event.target.closest('[data-service]');
      if (button) openService(button.dataset.service);
    });

    $('#serviceConfirmButton').addEventListener('click', () => {
      if (!state.currentService) return;
      state.booked.add(state.currentService);
      renderServices();
      showToast(t('bookingConfirmed'));
    });

    $('#optimizeButton').addEventListener('click', async () => {
      $('#optimizeButton').textContent = I18n.locale === 'zh-CN' ? '正在重新计算…' : 'Recalculating…';
      await delay(650);
      $('#optimizeButton').textContent = t('optimizeRoute');
      state.plan.walk[state.currentDay % state.plan.walk.length] = '约 2.9 km';
      renderDays();
      showToast(t('routeOptimized'));
    });

    $('#refreshWeather').addEventListener('click', async () => {
      $('#refreshWeather').disabled = true;
      $('#refreshWeather').textContent = I18n.locale === 'zh-CN' ? '更新中' : 'Updating';
      const weather = await IntegrationHub.refreshWeather(state.plan);
      state.plan.weather = weather;
      $('#weatherTemp').textContent = weather[0];
      $('#weatherText').textContent = weather[1];
      $('#refreshWeather').disabled = false;
      $('#refreshWeather').textContent = t('refreshWeather');
      showToast(t('weatherUpdated'));
    });

    $('#downloadOfflineButton').addEventListener('click', () => showToast(t('offlineSaved')));
    $('#shareButton').addEventListener('click', () => openFamilyChat({ shareTrip: true }));

    $('#navigationButton').addEventListener('click', event => {
      event.currentTarget.textContent = t('navigationActive');
      if (window.EasyTripMaps) window.open(window.EasyTripMaps.externalMapUrl(), '_blank', 'noopener,noreferrer');
      showToast(t('demoMap'));
    });
    $('#ticketButton').addEventListener('click', () => openService('attraction'));
    $('#ordersButton').addEventListener('click', () => { showView('itinerary'); showTripPanel('bookings'); });
    $('#familyButton').addEventListener('click', () => openFamilyChat());
    $('#addFamilyMemberButton').addEventListener('click', addFamilyMember);
    $('#familyMemberInput').addEventListener('keydown', event => {
      if (event.key === 'Enter') { event.preventDefault(); addFamilyMember(); }
    });
    $('#familyMemberList').addEventListener('click', event => {
      const button = event.target.closest('[data-remove-family-member]');
      if (!button) return;
      state.family.members = state.family.members.filter(member => member.id !== button.dataset.removeFamilyMember);
      if (!state.family.members.length) state.familySharing = false;
      saveFamilyState();
      renderFamilyDialog();
    });
    $('#saveFamilySharingButton').addEventListener('click', saveFamilySharing);
    $('#stopFamilySharingButton').addEventListener('click', () => {
      state.familySharing = false;
      state.family.location = false;
      saveFamilyState();
      renderFamilyDialog();
      showToast(t('familySharingStopped'));
    });
    $('#familyCheckInButton').addEventListener('click', () => {
      if (!state.family.members.length) return;
      state.family.checkInAt = new Date().toISOString();
      saveFamilyState();
      renderFamilyDialog();
      showToast(t('familyCheckInDelivered', { count: state.family.members.length }));
    });
    $('#copyFamilyInviteButton').addEventListener('click', copyFamilyInvite);

    $('#translationButton').addEventListener('click', () => {
      $('#translationResult').textContent = translatedPhrase($('#translationInput').value, state.plan.language);
      $('#translationDialog').showModal();
    });
    $('#translateNowButton').addEventListener('click', () => {
      $('#translationResult').textContent = translatedPhrase($('#translationInput').value, state.plan.language);
    });
    $('#speakTranslationButton').addEventListener('click', event => {
      const phrase = $('#translationResult').textContent;
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(new SpeechSynthesisUtterance(phrase));
        event.currentTarget.textContent = '正在播放…';
        window.setTimeout(() => { event.currentTarget.textContent = '大声播放'; }, 1200);
      } else showToast('当前浏览器暂不支持语音播放');
    });

    $('#emergencyButton').addEventListener('click', () => $('#emergencyDialog').showModal());
    $$('.emergency-option').forEach(button => button.addEventListener('click', () => {
      if (button.tagName === 'A') {
        $('#emergencyDialog').close();
        return;
      }
      const messages = {
        family: '已准备向紧急联系人发送当前位置',
        consulate: '已打开领事保护与目的地紧急信息演示'
      };
      $('#emergencyDialog').close();
      showToast(messages[button.dataset.emergency]);
    }));

    $('#todayTasks').addEventListener('change', updateTaskProgress);

    $('#accessibilityButton').addEventListener('click', () => toggleLargeMode(!document.body.classList.contains('large-mode')));
    $('#largeModeSwitch').addEventListener('change', event => toggleLargeMode(event.target.checked));
    $('#profileButton').addEventListener('click', () => toggleDrawer(true));
    $('#drawerClose').addEventListener('click', () => toggleDrawer(false));
    $('#drawerBackdrop').addEventListener('click', () => toggleDrawer(false));
    $('#liveModeButton').addEventListener('click', () => showToast('切换真实服务需要配置各平台 API 密钥与商务授权'));

    $('#voiceButton').addEventListener('click', () => {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        $('#tripPrompt').value = state.market === 'international'
          ? '带父母去东京4天，预算适中，少走路，需要翻译和机场接送'
          : '带父母去成都4天，预算适中，少走路，想看熊猫和吃美食';
        showToast('已填入一段语音需求示例');
        return;
      }
      const recognition = new SpeechRecognition();
      recognition.lang = I18n.localeInfo().voice;
      recognition.interimResults = false;
      recognition.onstart = () => { $('#voiceButton').textContent = '正在听，请说话…'; };
      recognition.onresult = event => { $('#tripPrompt').value = event.results[0][0].transcript; };
      recognition.onerror = () => showToast('没有听清，请再试一次');
      recognition.onend = () => { $('#voiceButton').innerHTML = `<span aria-hidden="true">◉</span> <span data-i18n="voiceInput">${t('voiceInput')}</span>`; };
      recognition.start();
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && !$('#profileDrawer').hidden) toggleDrawer(false);
    });
  }

  window.EasyTripApp = {
    showView,
    openFamilySettings: openFamilyDialog,
    getPlan() { ensurePlan(); return state.plan; },
    getRegion() { ensurePlan(); return state.plan.region; },
    destinationLabel() { ensurePlan(); return localizedDestination(state.plan.destination); },
    formatDate,
    t,
    refreshFamilyStatus: renderFamilyStatus,
    toast: showToast
  };

  function initialize() {
    I18n.init();
    loadFamilyState();
    setMarket('domestic', true);
    state.plan = buildPlan(getContext());
    bindEvents();
    renderPlan();
    renderLanguageGrid();
    setMarket('domestic', false);
    if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
      navigator.serviceWorker.register('./service-worker.js').catch(() => {});
    }
  }

  initialize();
})();
