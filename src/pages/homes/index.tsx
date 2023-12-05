// pages/search-results.tsx

import React from "react";
import { useRouter } from "next/router";

const SearchResults = () => {
  const router = useRouter();
  const { location } = router.query; // Access the location parameter from the query string

  return (
    <div>
      <h1>Search Results</h1>
      <p>Location: {location}</p> {/* Display the selected location */}
      {/* Add logic to fetch and display search results here */}
    </div>
  );
};

export default SearchResults;
