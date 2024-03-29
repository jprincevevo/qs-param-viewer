import { useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";

import ParamStringInput from "./components/ParamStringInput";
import { ParamKey, ParamKeys } from "./types";
import { extractParams } from "./utils";
import ParamKeyList from "./components/ParamKeyList";
import ParamStringHistory from "./components/ParamStringHistory";
import ParamViewer from "./components/ParamViewer";

function App() {
  const [paramStringEntries, setParamStringEntries] = useState<string[]>([]);
  const [paramKeySettings, setParamsKeySettings] = useState<ParamKeys>(() => {
    const storedParamKeySettings =
      window.localStorage.getItem("paramKeySettings");
    return storedParamKeySettings ? JSON.parse(storedParamKeySettings) : {};
  });
  const [currentParamStringEntry, setCurrentParamStringEntry] =
    useState<number>(0);

  const handleParamStringSubmit = (paramString: string) => {
    const existingParamStringIndex = paramStringEntries.findIndex(
      (string) => string === paramString
    );

    if (existingParamStringIndex === -1) {
      setParamStringEntries((prev) => [...prev, paramString]);
      setCurrentParamStringEntry(paramStringEntries.length);
    } else {
      setCurrentParamStringEntry(existingParamStringIndex);
    }

    const paramKeys = Object.keys(extractParams(paramString));

    const newSettings = paramKeys.reduce((acc, param) => {
      if (!(param in paramKeySettings)) {
        return { ...acc, [param]: { name: param, isFocused: false } };
      }
      return { ...acc };
    }, {});

    setParamsKeySettings((prev) => {
      window.localStorage.setItem(
        "paramKeySettings",
        JSON.stringify({ ...prev, ...newSettings })
      );
      return { ...prev, ...newSettings };
    });
  };

  const handleParamKeySettingChange = (paramKey: ParamKey) => {
    setParamsKeySettings((prev) => {
      window.localStorage.setItem(
        "paramKeySettings",
        JSON.stringify({ ...prev, [paramKey.name]: paramKey })
      );
      return { ...prev, [paramKey.name]: paramKey };
    });
  };

  const handleParamStringHistoryClick = (index: number) => {
    setCurrentParamStringEntry(index);
  };

  const params = extractParams(paramStringEntries[currentParamStringEntry]);

  return (
    <>
      <Container maxWidth="xl">
        <ParamStringInput onSubmit={handleParamStringSubmit} />

        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid xs={7}>
              <ParamViewer params={params} settings={paramKeySettings} />
            </Grid>

            <Grid xs={5}>
              <ParamKeyList
                paramKeyData={paramKeySettings}
                onChange={handleParamKeySettingChange}
              />
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ flexGrow: 1, mt: 4 }}>
          <ParamStringHistory
            paramStrings={paramStringEntries}
            onClick={handleParamStringHistoryClick}
            currentParamStringEntry={currentParamStringEntry}
          />
        </Box>
      </Container>
    </>
  );
}

export default App;
