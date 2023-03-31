import { useAppSelector } from "@/state/hooks";
import { RootState } from "@/state/store";
import React, { useState } from "react";
import { SignInModal } from "../Auth/SignInModal";
import { ProLink } from "./ProLink";

export const ProtectedProLink = ({
  url,
  urlText,
}: {
  url: string;
  urlText: string;
}) => {
  const { IsUserLogedIn } = useAppSelector((state: RootState) => state.userData);
  const [showSignInModal, setShowSignInModal] = useState<boolean>(false);

  if (IsUserLogedIn) {
    return <ProLink url={url} urlText={urlText} />;
  } else {
    return (
      <>
        <div onClick={() => setShowSignInModal(true)}>{urlText}</div>
        {
            showSignInModal && <SignInModal redirectionLink={url} closeSingInModal={()=>setShowSignInModal(false)}/>
        }
      </>
    );
  }
};
