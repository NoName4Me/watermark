import React, { Component } from 'react';
import { setWatermark } from '../../src';
import DemoContainer from '../svg-canvas/Demo';

export default class extends Component {
  componentDidMount() {
    setWatermark({
      content: 'watermark 1234 水印',
      mountEl: this.refs.el as HTMLElement,
      styles: {
        fontWeight: '200',
        backgroundColor: 'lightyellow',
      },
    });
  }
  render() {
    return (
      <div style={{ padding: '20px' }}>
        <DemoContainer title="使用 HTML div" desc="通过创建一个 div，挂载到元素中，并填充 div 文本。">
          <div
            ref="el"
            style={{
              width: '800px',
              height: '500px',
              padding: '10px',
              border: '1px solid',
            }}
          >
            <p>相濡以沫，不如相忘江湖。 You Know nothing</p>
            <button>————鲁迅</button>
          </div>
        </DemoContainer>
      </div>
    );
  }
}
