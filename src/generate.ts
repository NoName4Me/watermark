const cache = new Map();
export interface WatermarkConfig {
  content: string;
  rotate?: number;
  color?: string;
  fontSize?: number;
  fontFamily?: string;
  marginTop?: number;
  marginLeft?: number;
  type?: string;
}

export interface DomWatermarkConfig extends WatermarkConfig {
  styles?: any;
  mountEl?: HTMLElement;
}

type Result = {
  backgroundImage: string;
  backgroundSize: string;
  dataUrl: string;
};

const removeDigits = (n: number) => {
  return n | 0;
};

const normalize = (config: DomWatermarkConfig) => {
  const {
    // 字符间垂直间距
    marginTop = 48,
    // 字符间水平间距
    marginLeft = 60,
    fontSize = 14,
    fontFamily = 'PingFang SC,Microsoft YaHei,sans-serif',
    // 字符颜色
    color = 'rgba(191, 195, 199, 0.3)',
    // 字符内容
    content = '',
    // 字符旋转角度（顺时针）
    rotate = -30,
    type = 'canvas',
    mountEl = document.body,
    styles = {},
  } = config;

  const svgOrCanvas = type === 'svg' ? type : 'canvas';
  return {
    marginTop,
    marginLeft,
    fontSize,
    fontFamily,
    color,
    content,
    rotate,
    mountEl,
    type: svgOrCanvas,
    styles,
  };
};

export const getWatermark = (config: WatermarkConfig): Result => {
  const { marginTop, marginLeft, fontSize, fontFamily, color, content, rotate, type } = normalize(config);

  if (cache.has(content) && cache.get(content)['backgroundImage']) {
    return cache.get(content);
  }

  const useSvg = () => {
    const svgStr = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <text xml:space="preserve"
        x="${(width - textWidth) / 2}"
        y="${height / 2}"
        fill="${color}"
        stroke="none"
        transform="rotate(${rotate}, ${width / 2} ${height / 2})"
        style="font-size: ${fontSize}px; font-family: ${fontFamily};font-weight: 300;">
        ${content}
      </text>
    </svg>`;

    const dataUrl = `data:image/svg+xml;base64,${window.btoa(unescape(encodeURIComponent(svgStr)))}`;

    return dataUrl;
  };

  const useCanvas = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;

    const ratio = getPixelRatio(ctx);
    canvas.setAttribute('width', width * ratio + 'px');
    canvas.setAttribute('height', height * ratio + 'px');
    ctx.scale(ratio, ratio);

    const font = `200 ${fontSize}px "${fontFamily}"`;
    ctx.font = font;
    ctx.fillStyle = color;
    ctx.textBaseline = 'top';

    ctx.translate(width / 2, height / 2);
    ctx.rotate(angle);
    ctx.fillText(content, -textWidth / 2, -textHeight / 2);

    const dataUrl = canvas.toDataURL();

    return dataUrl;
  };

  const [textWidth, textHeight] = getTextRect(content, fontSize, fontFamily);

  // 倾斜后字符串所占空间宽高
  const angle = (Math.PI / 180) * rotate;
  const absCos = Math.abs(Math.cos(angle));
  const absSin = Math.abs(Math.sin(angle));

  const width = removeDigits(textWidth * absCos + textHeight * absSin + marginLeft);
  const height = removeDigits(textHeight * absCos + textWidth * absSin + marginTop);

  const dataUrl = type === 'svg' ? useSvg() : useCanvas();

  return {
    backgroundImage: `url(${dataUrl})`,
    backgroundSize: `${width}px ${height}px`,
    dataUrl,
  };
};

export const setWatermark = (config: DomWatermarkConfig): HTMLDivElement => {
  const { marginTop, marginLeft, fontSize, fontFamily, color, content, rotate, mountEl, styles } = normalize(config);

  const width = mountEl.clientWidth;
  const height = mountEl.clientHeight;
  const containerSize = Math.sqrt(width * width + height * height);

  const [textWidth, textHeight] = getTextRect(content, fontSize, fontFamily);

  // 倾斜后字符串所占空间宽高
  const angle = (Math.PI / 180) * rotate;
  const absCos = Math.abs(Math.cos(angle));
  const absSin = Math.abs(Math.sin(angle));

  let tileWidth, tileHeight;
  if (rotate % 90 === 0) {
    tileWidth = textWidth + marginLeft;
    tileHeight = textHeight + marginTop;
  } else {
    tileWidth = (textHeight * absSin + marginLeft) / absCos + textWidth;
    tileHeight = (textHeight * absCos + marginTop) / absSin + textHeight;
  }

  const wmWrapper = document.createElement('div');
  const wmStyles = {
    pointerEvents: 'none',
    position: 'absolute',
    left: '0',
    top: '0',
    width: `${width}px`,
    height: `${height}px`,
    margin: '0px',
    padding: '0px',
    overflow: 'hidden',
    fontSize: `${fontSize}px`,
    fontFamily: fontFamily,
    boxSizing: 'border-box',
    zIndex: '-1',
    color: color,
    ...styles,
  };

  Object.assign(wmWrapper.style, wmStyles);
  const box = document.createElement('div');
  box.style.position = 'absolute';
  box.style.left = `${(width - containerSize) / 2}px`;
  box.style.top = `${(height - containerSize) / 2}px`;
  box.style.transform = `rotate3d(0,0,1,${rotate}deg)`;
  box.style.width = `${containerSize}px`;
  box.style.height = `${containerSize}px`;
  box.style.overflow = 'hidden';

  let left = 0;
  let top = 0;
  const cN = Math.ceil(containerSize / tileWidth);
  const rN = Math.ceil(containerSize / tileHeight);
  for (let i = 0; i < cN; i++) {
    left = tileWidth * i;
    for (let j = 0; j < rN; j++) {
      top = tileHeight * j;
      const textEl = createTile({
        content,
        left,
        top,
        width: tileWidth,
        height: tileHeight,
        rotate,
      });
      box.appendChild(textEl);
    }
  }
  wmWrapper.appendChild(box);

  const { position } = getComputedStyle(mountEl);
  if (!position || position === 'static') {
    mountEl.style.position = 'relative';
  }

  mountEl.appendChild(wmWrapper);
  return wmWrapper;
};

function createTile({ content, left, top, width, height }: any) {
  const textEl = document.createElement('div');
  textEl.appendChild(document.createTextNode(content));
  textEl.style.position = 'absolute';
  textEl.style.width = `${width}px`;
  textEl.style.height = `${height}px`;
  textEl.style.left = `${left}px`;
  textEl.style.top = `${top}px`;
  textEl.style.display = 'flex';
  textEl.style.justifyContent = 'center';
  textEl.style.alignItems = 'center';
  textEl.style.alignItems = 'center';
  return textEl;
}

/**
 * 计算文本宽高
 * @param content
 * @param fontSize
 * @param fontFamily
 * @returns [width, height]
 */
const getTextRect = (content: string, fontSize: number, fontFamily: string) => {
  const span = document.createElement('span');
  span.style.fontSize = `${fontSize}px`;
  span.style.visibility = 'hidden';
  span.style.position = 'fixed';
  span.style.left = '0';
  span.style.top = '0';
  span.style.zIndex = '-1';
  span.style.padding = '0px';
  span.style.margin = '0px';
  span.style.fontFamily = fontFamily;
  span.style.whiteSpace = 'pre';

  const textNode = document.createTextNode(content);
  span.appendChild(textNode);

  let mountWindow: Window = window;
  try {
    if (window.top !== mountWindow) {
      mountWindow = window.top;
    }
    mountWindow.document.body.appendChild(span);
  } catch (e) {
    // 跨域场景
    mountWindow = window;
    window.document.body.appendChild(span);
  }

  const { top, bottom, left, right } = span.getBoundingClientRect();
  span.remove ? span.remove() : mountWindow.document.body.removeChild(span);
  const rect = [right - left, bottom - top];
  return rect;
};

/**
 * 获取缩放比例
 * @param context
 */
function getPixelRatio(context: any) {
  const backingStore =
    context.backingStorePixelRatio ||
    context.webkitBackingStorePixelRatio ||
    context.mozBackingStorePixelRatio ||
    context.msBackingStorePixelRatio ||
    context.oBackingStorePixelRatio ||
    1;
  return (window.devicePixelRatio || 1) / backingStore;
}
