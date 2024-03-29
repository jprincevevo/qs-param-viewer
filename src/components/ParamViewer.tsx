import React from "react";
import Paper from "@mui/material/Paper";
import { ParamKeys } from "../types";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

interface ParamViewerProps {
  params: { [key: string]: string };
  settings: ParamKeys;
}

const ParamViewer: React.FC<ParamViewerProps> = ({ params, settings }) => {
  const focusedParamKeys = Object.values(settings).filter(
    (param) => param.isFocused
  );
  const focusedParams: { [key: string]: string } = focusedParamKeys.reduce(
    (acc, param) => {
      return { ...acc, [param.name]: params[param.name] };
    },
    {}
  );

  const unfocusedParams: { [key: string]: string } = Object.keys(params).reduce(
    (acc, key) => {
      if (!(key in focusedParams)) {
        return { ...acc, [key]: params[key] };
      }
      return { ...acc };
    },
    {}
  );

  const hasParamsToDisplay =
    focusedParamKeys.length > 0 || Object.keys(params).length > 0;

  return (
    <Paper elevation={4} sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Params
      </Typography>

      {!hasParamsToDisplay ? (
        <p>No params to display</p>
      ) : (
        <TableContainer component={Paper}>
          <Table size="small" aria-label="param key data table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ pl: 3 }}>Key</TableCell>
                <TableCell align="left">Value</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {Object.entries(focusedParams).map(([key, value]) => (
                <TableRow
                  key={key}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  style={{ backgroundColor: "rgba(85, 108, 214, 0.075)", borderBottom: "1.5px solid #bbb"}}
                >
                  <TableCell component="th" scope="row" sx={{ pl: 3 }}>
                    <strong>{key}</strong>
                  </TableCell>
                  <TableCell align="left">
                    <strong>{value ?? "–"}</strong>
                  </TableCell>
                </TableRow>
              ))}

              {Object.entries(unfocusedParams).map(([key, value]) => (
                <TableRow
                  key={key}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" sx={{ pl: 3 }}>
                    {key}
                  </TableCell>
                  <TableCell align="left">{value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
};

export default ParamViewer;
