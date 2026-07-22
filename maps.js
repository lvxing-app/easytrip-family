(function () {
  'use strict';

  const config = window.EasyTripMapConfig || {};
  const locationCatalog = {
    '成都': {
      center: [30.5728, 104.0668],
      points: {
        '成都大熊猫繁育研究基地': [30.7380, 104.1432],
        '文殊院与素斋午餐': [30.6801, 104.0727],
        '宽窄巷子与川菜晚餐': [30.6690, 104.0550],
        '杜甫草堂': [30.6600, 104.0289],
        '人民公园喝盖碗茶': [30.6574, 104.0559],
        '建设路小吃体验': [30.6758, 104.1008],
        '武侯祠': [30.6454, 104.0495],
        '锦里与午餐': [30.6450, 104.0485],
        '九眼桥夜景': [30.6408, 104.0896]
      }
    },
    '上海': {
      center: [31.2304, 121.4737],
      points: {
        '外滩与万国建筑群': [31.2400, 121.4900],
        '豫园与本帮午餐': [31.2272, 121.4921],
        '黄浦江夜景': [31.2395, 121.4977],
        '上海博物馆': [31.2304, 121.4751],
        '武康路街区': [31.2097, 121.4381],
        '淮海路晚餐': [31.2195, 121.4660]
      }
    },
    '北京': {
      center: [39.9042, 116.4074],
      points: {
        '故宫博物院': [39.9163, 116.3972],
        '景山公园与午休': [39.9251, 116.3968],
        '前门与京味晚餐': [39.8993, 116.3975]
      }
    },
    '东京': {
      center: [35.6762, 139.6503],
      points: {
        '浅草寺与仲见世': [35.7148, 139.7967],
        '上野公园与博物馆': [35.7153, 139.7730],
        '晴空塔夜景': [35.7101, 139.8107],
        '明治神宫': [35.6764, 139.6993],
        '原宿与表参道': [35.6696, 139.7066],
        '新宿晚餐': [35.6938, 139.7034],
        '筑地场外市场': [35.6655, 139.7707],
        '银座与皇居外苑': [35.6751, 139.7636],
        '东京湾夜景': [35.6267, 139.7753]
      }
    },
    '巴黎': {
      center: [48.8566, 2.3522],
      points: {
        '卢浮宫': [48.8606, 2.3376],
        '杜乐丽花园与咖啡': [48.8635, 2.3275],
        '塞纳河游船': [48.8584, 2.2945],
        '埃菲尔铁塔': [48.8584, 2.2945],
        '香榭丽舍与午餐': [48.8698, 2.3078],
        '凯旋门夜景': [48.8738, 2.2950]
      }
    },
    '新加坡': {
      center: [1.3521, 103.8198],
      points: {
        '滨海湾花园': [1.2816, 103.8636],
        '鱼尾狮公园': [1.2868, 103.8545],
        '滨海湾灯光秀': [1.2834, 103.8607]
      }
    }
  };

  let currentContext = null;
  let currentMode = 'walking';
  let activeMap = null;
  let activeProvider = '';
  let renderSequence = 0;
  let controlsBound = false;

  const $ = selector => document.querySelector(selector);
  const t = (key, variables) => window.EasyTripI18n ? window.EasyTripI18n.t(key, variables) : key;

  function loadStyle(id, href, integrity) {
    if (document.getElementById(id)) return;
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = href;
    link.crossOrigin = '';
    if (integrity) link.integrity = integrity;
    document.head.appendChild(link);
  }

  function loadScript(id, src, integrity) {
    const existing = document.getElementById(id);
    if (existing) {
      if (existing.dataset.loaded === 'true') return Promise.resolve();
      return new Promise((resolve, reject) => {
        existing.addEventListener('load', resolve, { once: true });
        existing.addEventListener('error', reject, { once: true });
      });
    }
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.id = id;
      script.src = src;
      script.async = true;
      script.crossOrigin = '';
      if (integrity) script.integrity = integrity;
      script.addEventListener('load', () => { script.dataset.loaded = 'true'; resolve(); }, { once: true });
      script.addEventListener('error', reject, { once: true });
      document.head.appendChild(script);
    });
  }

  function catalogFor(destination) {
    return locationCatalog[destination] || locationCatalog['成都'];
  }

  function resolvePoints(destination, activities) {
    const catalog = catalogFor(destination);
    const resolved = activities.map((activity, index) => {
      let coordinates = catalog.points[activity.name];
      if (!coordinates) {
        const key = Object.keys(catalog.points).find(name => activity.name.includes(name) || name.includes(activity.name));
        if (key) coordinates = catalog.points[key];
      }
      return coordinates ? { name: activity.name, time: activity.time, coordinates, order: index + 1 } : null;
    }).filter(Boolean);
    if (!resolved.length) return [{ name: destination, time: '', coordinates: catalog.center, order: 1 }];
    return resolved;
  }

  function destroyMap() {
    if (activeProvider === 'leaflet' && activeMap && typeof activeMap.remove === 'function') activeMap.remove();
    if (activeProvider === 'amap' && activeMap && typeof activeMap.destroy === 'function') activeMap.destroy();
    activeMap = null;
    activeProvider = '';
    const container = $('#tripMap');
    if (container) container.replaceChildren();
  }

  function setLoading(visible, message) {
    const container = $('#tripMap');
    if (!container) return;
    let loading = $('#mapLoading');
    if (!loading) {
      loading = document.createElement('div');
      loading.id = 'mapLoading';
      loading.className = 'map-loading';
      loading.innerHTML = '<span class="map-loading-dot" aria-hidden="true"></span><strong></strong>';
      container.appendChild(loading);
    }
    const text = loading.querySelector('strong');
    if (text) text.textContent = message || t('loadingMap');
    loading.hidden = !visible;
  }

  function setProviderLabel(label, state) {
    const providerLabel = $('#mapProviderLabel');
    const providerState = $('#mapProviderState');
    if (providerLabel) providerLabel.textContent = label;
    if (providerState) providerState.textContent = state;
  }

  async function ensureLeaflet() {
    if (window.L) return;
    loadStyle(
      'easytrip-leaflet-css',
      'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
      'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY='
    );
    await loadScript(
      'easytrip-leaflet-js',
      'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
      'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo='
    );
  }

  async function renderLeaflet(points, center, sequence) {
    await ensureLeaflet();
    if (sequence !== renderSequence) return;
    destroyMap();
    const container = $('#tripMap');
    activeProvider = 'leaflet';
    activeMap = window.L.map(container, { scrollWheelZoom: false, zoomControl: true, attributionControl: true });
    const tileLayer = window.L.tileLayer(config.fallback.tileUrl, {
      maxZoom: 19,
      attribution: config.fallback.attribution
    }).addTo(activeMap);
    const latLngs = points.map(point => point.coordinates);
    points.forEach(point => {
      window.L.circleMarker(point.coordinates, {
        radius: 8,
        color: '#ffffff',
        weight: 3,
        fillColor: '#167a6b',
        fillOpacity: 1
      }).addTo(activeMap).bindTooltip(`${point.order}. ${point.name}`, { direction: 'top' }).bindPopup(`<strong>${point.order}. ${point.name}</strong><br>${point.time}`);
    });
    if (latLngs.length > 1) {
      window.L.polyline(latLngs, { color: '#167a6b', weight: 5, opacity: 0.78 }).addTo(activeMap);
      activeMap.fitBounds(window.L.latLngBounds(latLngs), { padding: [28, 28], maxZoom: 14 });
    } else activeMap.setView(center, 13);
    await Promise.race([
      new Promise(resolve => tileLayer.once('load', resolve)),
      new Promise(resolve => window.setTimeout(resolve, 2600))
    ]);
    if (sequence === renderSequence) setLoading(false);
  }

  async function ensureAMap() {
    if (window.AMap) return;
    if (config.amap.serviceHost) window._AMapSecurityConfig = { serviceHost: config.amap.serviceHost };
    else if (config.amap.securityJsCode) window._AMapSecurityConfig = { securityJsCode: config.amap.securityJsCode };
    const url = `https://webapi.amap.com/maps?v=2.0&key=${encodeURIComponent(config.amap.key)}&plugin=AMap.Scale,AMap.ToolBar`;
    await loadScript('easytrip-amap-js', url);
  }

  async function renderAMap(points, center, sequence) {
    await ensureAMap();
    if (sequence !== renderSequence) return;
    destroyMap();
    const container = $('#tripMap');
    activeProvider = 'amap';
    activeMap = new window.AMap.Map(container, { zoom: 13, center: [center[1], center[0]], viewMode: '2D' });
    activeMap.addControl(new window.AMap.Scale());
    activeMap.addControl(new window.AMap.ToolBar({ position: 'RB' }));
    const markers = points.map(point => new window.AMap.Marker({
      position: [point.coordinates[1], point.coordinates[0]],
      title: `${point.order}. ${point.name}`,
      label: { content: `${point.order}`, direction: 'top' }
    }));
    activeMap.add(markers);
    if (points.length > 1) {
      const polyline = new window.AMap.Polyline({
        path: points.map(point => [point.coordinates[1], point.coordinates[0]]),
        strokeColor: '#167a6b', strokeWeight: 6, strokeOpacity: 0.82
      });
      activeMap.add(polyline);
      activeMap.setFitView([...markers, polyline], false, [46, 46, 46, 46]);
    }
    setLoading(false);
  }

  async function ensureGoogleMaps() {
    if (window.google && window.google.maps) return;
    await new Promise((resolve, reject) => {
      window.EasyTripGoogleMapsReady = resolve;
      const locale = (window.EasyTripI18n && window.EasyTripI18n.locale) || 'en';
      const region = currentContext && currentContext.regionCode ? `&region=${encodeURIComponent(currentContext.regionCode.toUpperCase())}` : '';
      const src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(config.google.apiKey)}&loading=async&callback=EasyTripGoogleMapsReady&v=weekly&language=${encodeURIComponent(locale)}${region}`;
      loadScript('easytrip-google-maps-js', src).catch(reject);
      window.setTimeout(() => reject(new Error('Google Maps load timeout')), 9000);
    });
  }

  async function renderGoogle(points, center, sequence) {
    await ensureGoogleMaps();
    if (sequence !== renderSequence) return;
    destroyMap();
    const container = $('#tripMap');
    activeProvider = 'google';
    activeMap = new window.google.maps.Map(container, {
      center: { lat: center[0], lng: center[1] },
      zoom: 13,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false
    });
    const bounds = new window.google.maps.LatLngBounds();
    points.forEach(point => {
      const position = { lat: point.coordinates[0], lng: point.coordinates[1] };
      new window.google.maps.Marker({ map: activeMap, position, title: `${point.order}. ${point.name}`, label: String(point.order) });
      bounds.extend(position);
    });
    if (points.length > 1) {
      new window.google.maps.Polyline({
        map: activeMap,
        path: points.map(point => ({ lat: point.coordinates[0], lng: point.coordinates[1] })),
        geodesic: true,
        strokeColor: '#167a6b', strokeOpacity: 0.82, strokeWeight: 6
      });
      activeMap.fitBounds(bounds, 42);
    }
    setLoading(false);
  }

  function renderUnavailable(message) {
    destroyMap();
    const container = $('#tripMap');
    const empty = document.createElement('div');
    empty.className = 'map-empty';
    empty.textContent = message;
    container.appendChild(empty);
    $('#mapStatus').textContent = message;
  }

  function externalMapUrl() {
    if (!currentContext) return '#';
    const catalog = catalogFor(currentContext.destination);
    const points = resolvePoints(currentContext.destination, currentContext.activities);
    const target = points[0] || { name: currentContext.destination, coordinates: catalog.center };
    const provider = currentContext.mapProvider || (currentContext.market === 'domestic' ? 'amap' : 'google');
    if (provider === 'amap') {
      const amapMode = { walking: 'walk', transit: 'bus', driving: 'car' }[currentMode];
      const params = new URLSearchParams({
        from: '',
        to: `${target.coordinates[1]},${target.coordinates[0]},${target.name}`,
        mode: amapMode,
        policy: currentMode === 'transit' ? '2' : '0',
        src: 'easytrip',
        callnative: '1'
      });
      return `https://uri.amap.com/navigation?${params.toString()}`;
    }
    const params = new URLSearchParams({
      api: '1',
      destination: `${target.name}, ${currentContext.destination}`,
      travelmode: currentMode,
      dir_action: 'navigate',
      region: currentContext.regionCode || ''
    });
    return `https://www.google.com/maps/dir/?${params.toString()}`;
  }

  function bindControls() {
    if (controlsBound) return;
    controlsBound = true;
    document.querySelectorAll('[data-map-mode]').forEach(button => {
      button.addEventListener('click', () => {
        currentMode = button.dataset.mapMode;
        document.querySelectorAll('[data-map-mode]').forEach(item => {
          const active = item === button;
          item.classList.toggle('active', active);
          item.setAttribute('aria-pressed', String(active));
        });
        const status = $('#mapStatus');
        if (status) status.textContent = t('mapModeReady', { mode: button.textContent.trim() });
      });
    });
    const openButton = $('#openLocalMapButton');
    if (openButton) openButton.addEventListener('click', () => {
      window.open(externalMapUrl(), '_blank', 'noopener,noreferrer');
    });
  }

  async function render(context) {
    const container = $('#tripMap');
    if (!container) return;
    bindControls();
    currentContext = context;
    const sequence = ++renderSequence;
    const catalog = catalogFor(context.destination);
    const points = resolvePoints(context.destination, context.activities);
    setLoading(true, t('loadingMap'));

    try {
      const provider = context.mapProvider || (context.market === 'domestic' ? 'amap' : 'google');
      if (provider === 'amap' && config.amap && config.amap.key) {
        setProviderLabel('高德地图 AMap', t('liveMap'));
        $('#mapStatus').textContent = t('amapRouteReady');
        await renderAMap(points, catalog.center, sequence);
        return;
      }
      if (provider === 'google' && config.google && config.google.apiKey) {
        setProviderLabel('Google Maps', t('liveMap'));
        $('#mapStatus').textContent = t('googleRouteReady');
        await renderGoogle(points, catalog.center, sequence);
        return;
      }
      if (config.fallback && config.fallback.enabled) {
        setProviderLabel(provider === 'amap' ? '高德地图 · AMap' : 'Google Maps', t('fallbackMap'));
        $('#mapStatus').textContent = provider === 'amap' ? t('amapExternalReady') : t('googleExternalReady');
        await renderLeaflet(points, catalog.center, sequence);
        return;
      }
      renderUnavailable(t('mapNeedsKey'));
    } catch (error) {
      if (sequence !== renderSequence) return;
      renderUnavailable(t('mapLoadFailed'));
    }
  }

  window.EasyTripMaps = { render, externalMapUrl };
})();
