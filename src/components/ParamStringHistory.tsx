import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";

interface Props {
  paramStrings: string[];
  onClick: (index: number) => void;
  currentParamStringEntry: number;
}

const ParamStringHistory: React.FC<Props> = ({
  paramStrings,
  onClick,
  currentParamStringEntry,
}: Props) => {
  const handleClick = (index: number) => {
    onClick(index);
  };

  return (
    <Paper elevation={4} sx={{ p: 2, mb: 8 }}>
      <Typography variant="h5" gutterBottom>
        History
      </Typography>

      {paramStrings.length === 0 ? (
        <Paper elevation={4} sx={{ p: 2 }}>
          <p>No query strings to display</p>
        </Paper>
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="param key data table">
            <TableBody>
              {paramStrings.map((paramString) => (
                <TableRow
                  key={paramString}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  style={{
                    cursor: "pointer",
                    backgroundColor:
                      currentParamStringEntry ===
                      paramStrings.indexOf(paramString)
                        ? "#ddd"
                        : "inherit",
                  }}
                  onClick={() => handleClick(paramStrings.indexOf(paramString))}
                >
                  <TableCell component="th" scope="row" sx={{ pl: 3 }}>
                    {paramString}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
};

export default ParamStringHistory;
