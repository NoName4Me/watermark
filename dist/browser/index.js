var ReactRollupStorybook = (function(t) {
  'use strict';
  const e = new Map(),
    n = t => 0 | t,
    o = t => {
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
    };
  function i({ content: t, left: e, top: n, width: o, height: i }) {
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
  const a = (t, e, n) => {
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
  return (
    (t.getWatermark = t => {
      const { marginTop: i, marginLeft: s, fontSize: l, fontFamily: r, color: c, content: d, rotate: p, type: m } = o(
        t,
      );
      if (e.has(d) && e.get(d).backgroundImage) return e.get(d);
      const [g, y] = a(d, l, r),
        h = (Math.PI / 180) * p,
        f = Math.abs(Math.cos(h)),
        x = Math.abs(Math.sin(h)),
        u = n(g * f + y * x + s),
        w = n(y * f + g * x + i),
        $ =
          'svg' === m
            ? (() => {
                const t = `\n    <svg xmlns="http://www.w3.org/2000/svg" width="${u}" height="${w}">\n      <text xml:space="preserve"\n        x="${(u -
                  g) /
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
                  e.rotate(h),
                  e.fillText(d, -g / 2, -y / 2),
                  t.toDataURL()
                );
              })();
      return { backgroundImage: `url(${$})`, backgroundSize: `${u}px ${w}px`, dataUrl: $ };
    }),
    (t.setWatermark = t => {
      const {
          marginTop: e,
          marginLeft: n,
          fontSize: s,
          fontFamily: l,
          color: r,
          content: c,
          rotate: d,
          mountEl: p,
          styles: m,
        } = o(t),
        g = p.clientWidth,
        y = p.clientHeight,
        h = Math.sqrt(g * g + y * y),
        [f, x] = a(c, s, l),
        u = (Math.PI / 180) * d,
        w = Math.abs(Math.cos(u)),
        $ = Math.abs(Math.sin(u));
      let b, v;
      d % 90 == 0 ? ((b = f + n), (v = x + e)) : ((b = (x * $ + n) / w + f), (v = (x * w + e) / $ + x));
      const S = document.createElement('div'),
        M = {
          pointerEvents: 'none',
          position: 'absolute',
          left: '0',
          top: '0',
          width: `${g}px`,
          height: `${y}px`,
          margin: '0px',
          padding: '0px',
          overflow: 'hidden',
          fontSize: `${s}px`,
          fontFamily: l,
          boxSizing: 'border-box',
          zIndex: '-1',
          color: r,
          ...m,
        };
      Object.assign(S.style, M);
      const C = document.createElement('div');
      (C.style.position = 'absolute'),
        (C.style.left = `${(g - h) / 2}px`),
        (C.style.top = `${(y - h) / 2}px`),
        (C.style.transform = `rotate3d(0,0,1,${d}deg)`),
        (C.style.width = `${h}px`),
        (C.style.height = `${h}px`),
        (C.style.overflow = 'hidden');
      let k = 0,
        z = 0;
      const R = Math.ceil(h / b),
        E = Math.ceil(h / v);
      for (let t = 0; t < R; t++) {
        k = b * t;
        for (let t = 0; t < E; t++) {
          z = v * t;
          const e = i({ content: c, left: k, top: z, width: b, height: v, rotate: d });
          C.appendChild(e);
        }
      }
      S.appendChild(C);
      const { position: I } = getComputedStyle(p);
      return (I && 'static' !== I) || (p.style.position = 'relative'), p.appendChild(S), S;
    }),
    t
  );
})({});
