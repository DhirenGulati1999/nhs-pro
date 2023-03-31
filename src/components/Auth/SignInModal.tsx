import React, {  useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { getUser } from "../../api/user";
import { useAppSelector } from "@/state/hooks";
import { RootState } from "@/state/store";
import { setIsUserLogedIn, setUser } from "@/state/slices/userSlice";
import { BaseResponse } from "@/interfaces/Response";
import { User } from "@/interfaces/User";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

export const SignInModal = ({closeSingInModal, redirectionLink}: {closeSingInModal: () => void,redirectionLink?: string}) => {
  const dispatch = useDispatch();
  const partnerId: number = useAppSelector(
    (state: RootState) => state.partnerData.Partner.PartnerId || 0
  );
  
  const [userName, setUserName] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [userNameValidError, setUserNameValidError] = React.useState<boolean>(false);
  const [passwordRequiredError, setPasswordRequiredError] =
    React.useState<boolean>(false);
  const [shouldValidate, setShouldValidate] = React.useState<boolean>(false);
  const [responseError, setResponseError] = React.useState<string>("");
  const router = useRouter();

  const handleClose = () => {
    setUserNameValidError(false);
    setPasswordRequiredError(false);
    setShouldValidate(false);
    setResponseError("");
    closeSingInModal();
  };

  const onSignIn = async () => {
    setShouldValidate(true);
    const isEmailValid = validateEmail(true);
    const isPasswordValid = validatePassword(true);
    if (isEmailValid && isPasswordValid) {
      var result: BaseResponse<User> = await getUser(userName, password, partnerId);
      if (result.StatusCode == 200) {
        dispatch(setIsUserLogedIn(true));
        dispatch(setUser(result.Data));
        redirectionLink && router.push(redirectionLink);
      }else{
        setResponseError(result.Message);
      }
    }
  };

  const validateEmail = (isValidate?: boolean) => {
    if (shouldValidate || isValidate) {
      if (!userName || !/^\S+@\S+\.\S+$/.test(userName.trim())) {
        setUserNameValidError(true);
        return false;
      } else {
        setUserNameValidError(false);
        return true;
      }
    }
  };

  const validatePassword = (isValidate?: boolean) => {
    if (shouldValidate || isValidate) {
      if (!password) {
        setPasswordRequiredError(true);
        return false;
      } else {
        setPasswordRequiredError(false);
        return true;
      }
    }
  };

  useEffect(() => {
    validateEmail();
  }, [userName])

  useEffect(() => {
    validatePassword();
  }, [password])
  
  return (
    <>
      <Dialog open={true} onClose={handleClose}>
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
            onChange={(e) =>setUserName(e.target.value)}
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
            onChange={(e) =>setPassword(e.target.value)}
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
