import SearchBox from "../SearchBox";
import { useRouter } from "next/router";
import "../../styles/Home.module.css";

export const Home = () => {
  const router = useRouter();

  const navigateToSearchResults = (
    LocationState?: string,
    locationName?: string
  ) => {
    router.push(
      `/homes/${LocationState?.toLowerCase()}/${locationName?.toLowerCase()}`
    );
  };

  const handleClick = () => {
    // Handle button click logic here
    console.log("Button clicked!");
    // Redirect to a new page
    router.push("/armls/sso/startsso");
  };

  return (
    <div
      className="main-div"
      id="home-search"
      style={{ backgroundImage: "url(/homepage_search.jpg)", backgroundRepeat:"no-repeat", backgroundSize:"cover", padding:"30px 0" }}
    >
      <button onClick={handleClick}>ARMLS Login</button>
      <SearchBox navigateToSearchResults={navigateToSearchResults} />{" "}
      {/* Pass the function as a prop */}
      {/* Rest of your component */}
    </div>
  );
};
