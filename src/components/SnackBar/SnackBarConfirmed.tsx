import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useEffect } from "react";

interface SnackBarConfimedProps {
  openSnackBar: boolean;
  onCloseSnackBar: () => void;
}

const SnackBarConfirmed: React.FC<SnackBarConfimedProps> = (props) => {
  useEffect(() => {}, [props.openSnackBar]);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    props.onCloseSnackBar();
  };

  return (
    <div>
      <Snackbar
        open={props.openSnackBar}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          El stock se ha actualizado con Exito!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SnackBarConfirmed;
