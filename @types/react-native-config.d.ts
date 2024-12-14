declare module 'react-native-config' {
  export interface NativeConfig {
    COINCAP_BASE_URL: string;
    COINCAP_TOKEN: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
