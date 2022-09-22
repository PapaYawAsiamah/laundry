import { Alert, Button, Snackbar, Stack } from "@mui/material";
import PropTpes from "prop-types";

const CustomSnackbar = ({ open, message, type, handleClose }) => {
  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert variant="filled" onClose={handleClose} severity={type} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

CustomSnackbar.defaultProps = {
  type: "success",
  open: false,
};

CustomSnackbar.propTypes = {
  open: PropTpes.bool,
  type: PropTpes.string,
  message: PropTpes.string,
  handleClose: PropTpes.func,
};
export default CustomSnackbar;
