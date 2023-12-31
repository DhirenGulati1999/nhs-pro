import React, { useState, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Location } from "@/interfaces/Location";
import { getLocations } from "@/api/LocationService";
import FilterOptions from "./FilterOptions";

const SearchBox: React.FC<{
  navigateToSearchResults: (
    locationState?: string,
    LocationName?: string
  ) => void;
}> = ({ navigateToSearchResults }) => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [value, setValue] = useState<Location | null>(null);
  const [inputValue, setInputValue] = useState<string>("");

  const searchLocation = () => {
    console.log(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLocations(inputValue);
        setLocations(data);
      } catch (error: any) {
        console.error();
      }
    };

    if (inputValue.length >= 3) {
      fetchData();
    } else {
      setLocations([]);
    }
  }, [inputValue]);

  return (
    <div className="clearfix homepage-searchbox" style={{background:"rgba(255, 255, 255 ,0.9)", maxWidth:"568px",  margin:" 10px auto", padding:"32px", borderRadius:"8px"}}>
      <h1 style={{
        color:"#454545"
      }}>
        Your MLS Companion for New Construction Homes
      </h1>
      <form>
        <Autocomplete
          style={{
            maxWidth: "700px",
            backgroundColor: "#fff",
          }}
          fullWidth={false}
          multiple={false}
          options={locations}
          getOptionLabel={(location: Location) => location.Name}
          isOptionEqualToValue={(option, value) => option.Name === value.Name}
          value={value}
          onInputChange={(event: any, newInputValue: string) => {
            setInputValue(newInputValue);
          }}
          onChange={(event: any, newItem: Location | null) => {
            setValue(newItem);
            if (newItem) {
              navigateToSearchResults(newItem.State, newItem.Name); // Call the function here
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Enter City, Zip Code, School District or Community Name"
              variant="outlined"
            />
          )}
        />
        <FilterOptions />
        <input
          type="submit"
          className="btn HomeSearchBtn"
          id="HomeSearchBtn"
          value="Find Homes"
          style={{
            padding:"10px 15px",
            background:"#f58220",
          border:"transparent",
          width:"100%"
          }}
        />
        
      </form>
    </div>
  );
};

export default SearchBox;
