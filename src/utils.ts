import { ParamKey } from "./types";

export const extractParams = (paramString: string) => {
  let params: URLSearchParams;

  if (URL.canParse(paramString)) {
    const url = new URL(paramString);
    params = url.searchParams;
  } else {
    params = new URLSearchParams(paramString);
  }

  const entries = Array.from(params.entries());
  return entries.reduce((acc, [key, value]) => {
    return { ...acc, [key]: value };
  }, {});
};

export const sortParamKeys = (paramKeys: ParamKey[]) =>
  paramKeys.sort((a: ParamKey, b: ParamKey) => {
    if (a.isFocused && b.isFocused) {
      return a.name.localeCompare(b.name);
    } else {
      if (a.isFocused) {
        return -1;
      } else {
        return 1;
      }
    }
  });

export const addNewParamKeys = (
  existingKeys: ParamKey[],
  newKeys: string[]
) => {
  const filteredNewKeys = newKeys.filter(
    (key) => !existingKeys.find((paramKey) => paramKey.name === key)
  );

  const mergedParamKeys: ParamKey[] = [];
  for (const key of filteredNewKeys) {
    mergedParamKeys.push({ name: key, isFocused: true });
  }

  // const sortedParamKeyData: ParamKey[] = [];
  // sortedParamKeyDataArray.forEach((paramKey: ParamKey) => {
  //   sortedParamKeyData[paramKey.name] = mergedParamKeyData[paramKey.name];
  // });

  return mergedParamKeys;
};
