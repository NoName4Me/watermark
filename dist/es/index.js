const t = new Map(),
  e = t => 0 | t,
  n = t => {
    const {
      marginTop: e = 48,
      marginLeft: n = 60,
      fontSize: o = 14,
      fontFamily: i = 'PingFang SC,Microsoft YaHei,sans-serif',
      color: a = 'rgba(191, 195, 199, 0.3)',
      content: s = '',
      rotate: l = -30,
      type: r = 'canvas',
      mountEl: c = document.body,
      styles: d = {},
    } = t;
    return {
      marginTop: e,
      marginLeft: n,
      fontSize: o,
      fontFamily: i,
      color: a,
      content: s,
      rotate: l,
      mountEl: c,
      type: 'svg' === r ? r : 'canvas',
      styles: d,
    };
  },
  o = o => {
    const { marginTop: i, marginLeft: a, fontSize: l, fontFamily: r, color: c, content: d, rotate: p, type: g } = n(o);
    if (t.has(d) && t.get(d).backgroundImage) return t.get(d);
    const [m, h] = s(d, l, r),
      y = (Math.PI / 180) * p,
      x = Math.abs(Math.cos(y)),
      f = Math.abs(Math.sin(y)),
      u = e(m * x + h * f + a),
      w = e(h * x + m * f + i),
      $ =
        'svg' === g
          ? (() => {
              const t = `\n    <svg xmlns="http://www.w3.org/2000/svg" width="${u}" height="${w}">\n      <text xml:space="preserve"\n        x="${(u -
                m) /
                2}"\n        y="${w /
                2}"\n        fill="${c}"\n        stroke="none"\n        transform="rotate(${p}, ${u / 2} ${w /
                2})"\n        style="font-size: ${l}px; font-family: ${r};font-weight: 300;">\n        ${d}\n      </text>\n    </svg>`;
              return `data:image/svg+xml;base64,${window.btoa(unescape(encodeURIComponent(t)))}`;
            })()
          : (() => {
              const t = document.createElement('canvas'),
                e = t.getContext('2d'),
                n = (function(t) {
                  const e =
                    t.backingStorePixelRatio ||
                    t.webkitBackingStorePixelRatio ||
                    t.mozBackingStorePixelRatio ||
                    t.msBackingStorePixelRatio ||
                    t.oBackingStorePixelRatio ||
                    1;
                  return (window.devicePixelRatio || 1) / e;
                })(e);
              t.setAttribute('width', u * n + 'px'), t.setAttribute('height', w * n + 'px'), e.scale(n, n);
              const o = `200 ${l}px "${r}"`;
              return (
                (e.font = o),
                (e.fillStyle = c),
                (e.textBaseline = 'top'),
                e.translate(u / 2, w / 2),
                e.rotate(y),
                e.fillText(d, -m / 2, -h / 2),
                t.toDataURL()
              );
            })();
    return { backgroundImage: `url(${$})`, backgroundSize: `${u}px ${w}px`, dataUrl: $ };
  },
  i = t => {
    const {
        marginTop: e,
        marginLeft: o,
        fontSize: i,
        fontFamily: l,
        color: r,
        content: c,
        rotate: d,
        mountEl: p,
        styles: g,
      } = n(t),
      m = p.clientWidth,
      h = p.clientHeight,
      y = Math.sqrt(m * m + h * h),
      [x, f] = s(c, i, l),
      u = (Math.PI / 180) * d,
      w = Math.abs(Math.cos(u)),
      $ = Math.abs(Math.sin(u));
    let b, v;
    d % 90 == 0 ? ((b = x + o), (v = f + e)) : ((b = (f * $ + o) / w + x), (v = (f * w + e) / $ + f));
    const S = document.createElement('div'),
      M = {
        pointerEvents: 'none',
        position: 'absolute',
        left: '0',
        top: '0',
        width: `${m}px`,
        height: `${h}px`,
        margin: '0px',
        padding: '0px',
        overflow: 'hidden',
        fontSize: `${i}px`,
        fontFamily: l,
        boxSizing: 'border-box',
        zIndex: '-1',
        color: r,
        ...g,
      };
    Object.assign(S.style, M);
    const C = document.createElement('div');
    (C.style.position = 'absolute'),
      (C.style.left = `${(m - y) / 2}px`),
      (C.style.top = `${(h - y) / 2}px`),
      (C.style.transform = `rotate3d(0,0,1,${d}deg)`),
      (C.style.width = `${y}px`),
      (C.style.height = `${y}px`),
      (C.style.overflow = 'hidden');
    let z = 0,
      k = 0;
    const E = Math.ceil(y / b),
      I = Math.ceil(y / v);
    for (let t = 0; t < E; t++) {
      z = b * t;
      for (let t = 0; t < I; t++) {
        k = v * t;
        const e = a({ content: c, left: z, top: k, width: b, height: v, rotate: d });
        C.appendChild(e);
      }
    }
    S.appendChild(C);
    const { position: P } = getComputedStyle(p);
    return (P && 'static' !== P) || (p.style.position = 'relative'), p.appendChild(S), S;
  };
function a({ content: t, left: e, top: n, width: o, height: i }) {
  const a = document.createElement('div');
  return (
    a.appendChild(document.createTextNode(t)),
    (a.style.position = 'absolute'),
    (a.style.width = `${o}px`),
    (a.style.height = `${i}px`),
    (a.style.left = `${e}px`),
    (a.style.top = `${n}px`),
    (a.style.display = 'flex'),
    (a.style.justifyContent = 'center'),
    (a.style.alignItems = 'center'),
    (a.style.alignItems = 'center'),
    a
  );
}
const s = (t, e, n) => {
  const o = document.createElement('span');
  (o.style.fontSize = `${e}px`),
    (o.style.visibility = 'hidden'),
    (o.style.position = 'fixed'),
    (o.style.left = '0'),
    (o.style.top = '0'),
    (o.style.zIndex = '-1'),
    (o.style.padding = '0px'),
    (o.style.margin = '0px'),
    (o.style.fontFamily = n),
    (o.style.whiteSpace = 'pre');
  const i = document.createTextNode(t);
  o.appendChild(i);
  let a = window;
  try {
    window.top !== a && (a = window.top), a.document.body.appendChild(o);
  } catch (t) {
    (a = window), window.document.body.appendChild(o);
  }
  const { top: s, bottom: l, left: r, right: c } = o.getBoundingClientRect();
  return o.remove ? o.remove() : a.document.body.removeChild(o), [c - r, l - s];
};
export { o as getWatermark, i as setWatermark };
