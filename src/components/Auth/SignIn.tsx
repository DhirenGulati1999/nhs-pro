import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { getUser } from "../../api/user";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { RootState } from "@/state/store";
import { setIsUserLogedIn, setUser } from "@/state/slices/userSlice";
import { BaseResponse } from "@/interfaces/Response";
import { User } from "@/interfaces/User";

export const SignIn = () => {
  const dispatch = useAppDispatch();
  const partnerId: number = useAppSelector(
    (state: RootState) => state.partner.Partner.PartnerId || 0
  );
  const [open, setOpen] = React.useState<boolean>(false);
  const [userName, setUserName] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [userNameValidError, setUserNameValidError] = React.useState<boolean>(false);
  const [passwordRequiredError, setPasswordRequiredError] =
    React.useState<boolean>(false);
  const [shouldValidate, setShouldValidate] = React.useState<boolean>(false);
  const [responseError, setResponseError] = React.useState<string>("");

  const openSignInPopUp = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSignIn = async () => {
    setShouldValidate(true);
    if (!(userNameValidError && passwordRequiredError)) {
      var result: BaseResponse<User> = await getUser(userName, password, partnerId);
      if (result.StatusCode == 200) {
        dispatch(setIsUserLogedIn(true));
        setResponseError("");
        dispatch(setUser(result.Data));
      }else{
        setResponseError(result.Message);
      }
    }
  };

  const validateEmail = () => {
    if (shouldValidate) {
      if (!userName || !/^\S+@\S+\.\S+$/.test(userName.trim())) {
        setUserNameValidError(true);
      } else {
        setUserNameValidError(false);
      }
    }
  };

  const validatePassword = () => {
    if (shouldValidate) {
      if (!password) {
        setPasswordRequiredError(true);
      } else {
        setPasswordRequiredError(false);
      }
    }
  };

  useEffect(() => {
    validateEmail();
  }, [userName, shouldValidate]);

  useEffect(() => {
    validatePassword();
  }, [password, shouldValidate]);

  return (
    <>
      <Button onClick={openSignInPopUp}>SignIn</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Sign In</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Access agent-only data and tools that will make the new home buying
            process a piece of cake.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="username"
            label="Enter Email Address"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setUserName(e.target.value)}
            required
            error={userNameValidError}
            helperText={
              userNameValidError ? "Please enter a valid email address" : ""
            }
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            onChange={(e) => setPassword(e.target.value)}
            required
            error={passwordRequiredError}
            helperText={
              passwordRequiredError ? "Incorrect password. Try again!" : ""
            }
          />
          {responseError && (
            <DialogContentText color="error">
              {responseError}
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onSignIn}>Sign In</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
