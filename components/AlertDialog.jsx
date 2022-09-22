import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import PropTypes from "prop-types";

const AlertDialog = ({ triggerDialog, handleClose, message, title, action }) => {
  return (
    <div>
      <Dialog
        open={triggerDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color={"error"}>
            No, Cancel
          </Button>
          <Button onClick={action} autoFocus color="success">
            Yes, Proceed
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

AlertDialog.defaultProps = {
  title: "Confirm Action",
};

AlertDialog.propTypes = {
  handleClose: PropTypes.func,
  action: PropTypes.func,
};
export default AlertDialog;
