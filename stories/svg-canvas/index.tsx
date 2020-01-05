import React, { Component } from 'react';
import { getWatermark } from '../../src';
import DemoContainer from './Demo';
const content = '隆镄一二啊 好幻觉';
const rotate = -90;
const config = { content, rotate };
const El = ({ style = {} }) => (
  <div
    style={{
      ...style,
      backgroundColor: 'rgba(255,255,255,1)',
      width: '800px',
      height: '500px',
      padding: '10px',
      border: '1px solid',
    }}
  >
    <p>早。</p>
    <button>————鲁迅</button>
  </div>
);

class DemoEl extends Component {
  render() {
    const { backgroundImage, backgroundSize } = getWatermark(config);
    return <El style={{ backgroundImage, backgroundSize }} />;
  }
}

class DemoElSvg extends Component {
  render() {
    const { backgroundImage, backgroundSize } = getWatermark({
      type: 'svg',
      ...config,
    });
    return <El style={{ backgroundImage, backgroundSize }} />;
  }
}

export default class extends Component {
  render() {
    return (
      <div style={{ padding: '20px' }}>
        <DemoContainer
          title="canvas 方式生成水印"
          desc="通过 canavs 绘制水印图片，导出为图片，然后设置到某个节点的背景中。"
        >
          <DemoEl />
        </DemoContainer>
        <DemoContainer title="svg 方式生成水印" desc="用 svg#text 绘制水印矢量图，然后设置到某个节点的背景中。">
          <DemoElSvg />
        </DemoContainer>
      </div>
    );
  }
}
