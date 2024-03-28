export interface ParamKey {
  name: string;
  isFocused: boolean;
}

export interface ParamKeys {
  [key: string]: ParamKey;
}
