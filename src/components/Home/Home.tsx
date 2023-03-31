import SearchBox from "../SearchBox";
import "../../styles/Home.module.css";

/* eslint-disable react/no-unescaped-entities */
export const Home = () => {
  return (
    <div
      className="main-div"
      id="homesearch"
      style={{ backgroundImage: "url(/homepage_search.jpg)" }}
    >
      <SearchBox />
      <div>Banner</div>
      <div>Learn how to Sell and Show New Homes</div>
      <div>TrustBuilder®: Honest Reviews from Real Homebuyers</div>
      <div>We feature 1000+ of America's premier new homebuilders</div>
    </div>
  );
};
