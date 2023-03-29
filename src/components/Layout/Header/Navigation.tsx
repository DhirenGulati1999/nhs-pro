import { SignIn } from "@/components/Auth/SignIn";
import { ProLink } from "@/components/Html/ProLink";
import { useAppSelector } from "@/state/hooks";
import { RootState } from "@/state/store";
import Link from "next/link";

function Navigation() {
  const { Partner } = useAppSelector((state: RootState) => state.partner);
  const { IsUserLogedIn, User } = useAppSelector((state: RootState) => state.user);

  return (
    <div>
      <ul>
        <li>
          <ProLink url="/"></ProLink>
        </li>
        <li>{IsUserLogedIn ? <span>Welcome {User.FirstName}</span> : <SignIn></SignIn>}</li>
      </ul>
    </div>
  );
}

export default Navigation;
