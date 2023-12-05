import React from "react";
import { useRouter } from "next/router";

const SearchLocation = () => {
  const router = useRouter();
  const { state, location } = router.query;
  console.log(router.query);

  return (
    <div>
      <h1>Homes in {location}</h1>
    </div>
  );
};

export default SearchLocation;
