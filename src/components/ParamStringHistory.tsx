import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
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

  console.log(paramStrings, currentParamStringEntry);

  return (
    <div>
      <h2>History</h2>

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
    </div>
  );
};

export default ParamStringHistory;
