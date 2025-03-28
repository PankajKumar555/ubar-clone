import * as React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

export default function UberProgressBar() {
  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgress
        sx={{
          height: 5,
          borderRadius: 10,
          marginBottom: "0.5rem",
        }}
      />
    </Box>
  );
}
