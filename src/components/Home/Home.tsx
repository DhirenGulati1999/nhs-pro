import SearchBox from "../SearchBox";
import { useRouter } from "next/router";
import "../../styles/Home.module.css";

/* eslint-disable react/no-unescaped-entities */
export const Home = () => {
  const router = useRouter();

  const handleClick = () => {
    // Handle button click logic here
    console.log("Button clicked!");
    // Redirect to a new page
    router.push("/armls/sso/startsso");
  };
  return (
    <div
      className="main-div"
      id="homesearch"
      style={{ backgroundImage: "url(/homepage_search.jpg)" }}
    >
      <button onClick={handleClick}>ARMLS Login</button>
      <SearchBox />
      <div>Banner</div>
      <div>Learn how to Sell and Show New Homes</div>
      <div>TrustBuilder®: Honest Reviews from Real Homebuyers</div>
      <div>We feature 1000+ of America's premier new homebuilders</div>
    </div>
  );
};
