import { useAppSelector } from "@/state/hooks";
import { RootState } from "@/state/store";
import React, { useState } from "react";
import { SignInModal } from "../Auth/SignInModal";

export const ProtectedProButton = ({
  buttonAction,
  children,
}: {
  buttonAction: () => void;
  children: JSX.Element;
}) => {
  const { IsUserLogedIn } = useAppSelector((state: RootState) => state.user);
  const [showSignInModal, setShowSignInModal] = useState<boolean>(false);

  if (IsUserLogedIn) {
    return <div onClick={buttonAction}>{children}</div>;
  } else {
    return (
      <>
        <div onClick={() => setShowSignInModal(true)}>{children}</div>
        {showSignInModal && (
          <SignInModal closeSingInModal={() => setShowSignInModal(false)} />
        )}
      </>
    );
  }
};