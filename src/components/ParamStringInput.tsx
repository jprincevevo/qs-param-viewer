import { useState } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";

interface Props {
  onSubmit: (value: string) => void;
}

const ParamStringInput = ({ onSubmit }: Props) => {
  const [value, setValue] = useState<string>("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(value);
    setValue("");
  };

  return (
    <Box sx={{ flexGrow: 1, my: 2 }}>
      <Paper elevation={4} sx={{ px: 4, py: 4 }}>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container>
            <Grid item xs={11}>
              <TextField
                id="qs-param-string"
                label="QS param string or URL"
                variant="outlined"
                sx={{ width: "100%" }}
                value={value}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={1} alignItems="stretch" style={{ display: "flex" }}>
              <Button type="submit" variant="contained" sx={{ ml: 2 }} style={{ height: "100%" }}>
                Parse
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default ParamStringInput;
