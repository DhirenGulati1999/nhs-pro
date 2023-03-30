import { ProLink } from "@/components/Html/ProLink";
import { ProtectedProButton } from "@/components/Html/ProtectedProButton";
import { ProtectedProLink } from "@/components/Html/ProtectedProLink";
import { useAppSelector } from "@/state/hooks";
import { RootState } from "@/state/store";

function Navigation() {
  const liStyle = {
    display: "-webkit-flex",
    marginLeft: "16px"
  };

  const ulStyle = {
    display: "inline-flex",
    listStyle: "none",
  };

  const { IsUserLogedIn, User } = useAppSelector(
    (state: RootState) => state.user
  );

  return (
    <div>
      <ul style={ulStyle}>
        <li style={liStyle}>
          <ProLink url="/webinars" urlText="Resources" />
        </li>
        <li style={liStyle}>
          <ProtectedProLink url="/savedlistings" urlText="Save Listings" />
        </li>
        <li style={liStyle}>
          <ProtectedProLink url="/webinars" urlText="Save Searches" />
        </li>
        <li style={liStyle}>
          <ProtectedProLink url="/webinars" urlText="My Clients" />
        </li>
        <li style={liStyle}>
          {IsUserLogedIn ? (
            <button>{User.FirstName}</button>
          ) : (
            <ProtectedProButton buttonAction={() => alert("Button clickable")}>
              <button>Sign In</button>
            </ProtectedProButton>
          )}
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
