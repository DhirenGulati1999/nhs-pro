import React, { useState, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Location } from "@/interfaces/Location";
import { getLocations } from "@/api/LocationService";
import FilterOptions from "./FilterOptions";

const handlePriceSelect = () => {};

const SearchBox: React.FC = () => {
  const [locations, setlocations] = useState<Location[]>([]);
  const [value, setValue] = useState<Location | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  interface Option {
    value: string;
    label: string;
  }

  const priceOptions: Option[] = [
    { value: "1000", label: "$1000" },
    { value: "2000", label: "$2000" },
    { value: "3000", label: "$3000" },
  ];

  const bedroomsOptions: Option[] = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
  ];

  const bathroomsOptions: Option[] = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
  ];

  const searchLocation = () => {
    console.log(value);
  };
  const handleClear = () => {
    setValue(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLocations(inputValue);
        // const formattedOptions = data.map((item: Location) => ({
        //   label: item.Name,
        //   value: item.Id,
        // }));
        setlocations(data);
      } catch (error: any) {
        console.error();
      }
    };

    if (inputValue.length >= 3) {
      fetchData();
    } else {
      setlocations([]);
    }
  }, [inputValue]);

  return (
    <div>
      <h1 style={{ color: "#fff" }}>
        {" "}
        Your MLS Companion for New Construction Homes
      </h1>
      <form>
        <Autocomplete
          style={{
            maxWidth: "700px",
            marginLeft: "5%",
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
          onChange={(event: any, newValue: Location | null) => {
            setValue(newValue);
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
          type="button"
          className="pro_ResetSearchBar searchBarLocationBox"
          id="searchBarLocationBox"
          value="Clear"
          onClick={() => handleClear()}
        />
        <input
          type="submit"
          className="btn HomeSearchBtn"
          id="HomeSearchBtn"
          value="Find Homes"
        />
      </form>
    </div>
  );
};

export default SearchBox;
