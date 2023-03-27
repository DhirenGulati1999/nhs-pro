import React, { useState, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

interface Option {
  label: string;
  value: string;
}

const SearchBox: React.FC = () => {
  const [options, setOptions] = useState<Option[]>([]);
  const [value, setValue] = useState<Option | null>(null);
  const [inputValue, setInputValue] = useState<string>("");

  const searchLocation = () => {};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://sprint-api.newhomesource.com/api/v2/Typeahead/Locations?partnerid=88&searchTerm=${inputValue}&includeAll=true`
        );
        const data = await response.json();
        const formattedOptions = data.map((item: any) => ({
          label: item.Name,
          value: item.Id,
        }));
        setOptions(formattedOptions);
      } catch (error) {
        console.error(error);
      }
    };

    if (inputValue.length >= 3) {
      fetchData();
    } else {
      setOptions([]);
    }
  }, [inputValue]);

  return (
    <>
      <Autocomplete
        options={options}
        getOptionLabel={(option: Option) => option.label}
        value={value}
        onInputChange={(event: any, newInputValue: string) => {
          setInputValue(newInputValue);
        }}
        onChange={(event: any, newValue: Option | null) => {
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
      <input
        type="button"
        color="orange"
        value="Search"
        onClick={searchLocation}
      />
    </>
  );
};

export default SearchBox;
