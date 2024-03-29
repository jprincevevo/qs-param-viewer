import { Checkbox, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { ParamKey, ParamKeys } from "../types";

interface Props {
  paramKeyData: ParamKeys;
  onChange: (paramKey: ParamKey) => void;
}

const ParamKeyList = ({ paramKeyData, onChange }: Props) => {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isFocused = event.target.checked;
    const name = event.target.name;
    onChange({ name, isFocused });
  };

  return (
    <Paper elevation={4} sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Keys
      </Typography>

      {Object.keys(paramKeyData).length === 0 ? (
        <Typography variant="body1" gutterBottom>
          No saved param keys to display
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table size="small" aria-label="param key data table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ pl: 3 }}>Key</TableCell>
                <TableCell align="left">Prioritize key?</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {Object.values(paramKeyData).map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" sx={{ pl: 3 }}>
                    {row.name}
                  </TableCell>
                  <TableCell align="left">
                    <Checkbox
                      name={row.name}
                      checked={row.isFocused}
                      inputProps={{ "aria-label": "controlled" }}
                      onChange={handleCheckboxChange}
                    />
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

export default ParamKeyList;
