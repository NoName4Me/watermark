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
declare type Result = {
  backgroundImage: string;
  backgroundSize: string;
  dataUrl: string;
};
export declare const getWatermark: (config: WatermarkConfig) => Result;
export declare const setWatermark: (config: DomWatermarkConfig) => HTMLDivElement;
export {};
