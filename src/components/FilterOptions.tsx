import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const FilterOptions: React.FC = () => {
  const [price, setPrice] = React.useState("");

  const handlePriceChange = (event: SelectChangeEvent) => {
    setPrice(event.target.value);
  };

  return (
    <div style={{ marginTop: "10px", marginLeft: "-15px", display:"flex", justifyContent:"space-between" }}>
      <FormControl
        sx={{ m: 2, backgroundColor: "#fff", minWidth: 120 }}
        size="small"
      >
        <InputLabel id="price-select-small">Price</InputLabel>
        <Select
          labelId="price-select-small"
          id="price-select-small"
          value={price}
          label="Price"
          onChange={handlePriceChange}
        >
          <MenuItem value="">
            <em>Price</em>
          </MenuItem>
          <MenuItem value={1000000}>$1000000</MenuItem>
          <MenuItem value={1025000}>$1025000</MenuItem>
          <MenuItem value={1050000}>1050000</MenuItem>
          <MenuItem value={2000000}>$2000000</MenuItem>
        </Select>
      </FormControl>

      <FormControl
        sx={{ m: 2, backgroundColor: "#fff", minWidth: 120 }}
        size="small"
      >
        <InputLabel id="beds-select-small">Beds</InputLabel>
        <Select
          labelId="beds-select-small"
          id="beds-select-small"
          value={price}
          label="Beds"
          onChange={handlePriceChange}
        >
          <MenuItem value="">
            <em>Beds</em>
          </MenuItem>
          <MenuItem value={1}>1+</MenuItem>
          <MenuItem value={2}>2+</MenuItem>
          <MenuItem value={3}>3+</MenuItem>
          <MenuItem value={4}>4+</MenuItem>
          <MenuItem value={4}>5+</MenuItem>
        </Select>
      </FormControl>
      <FormControl
        sx={{ m: 2, backgroundColor: "#fff", minWidth: 120 }}
        size="small"
      >
        <InputLabel id="baths-select-small">Baths</InputLabel>
        <Select
          labelId="baths-select-small"
          id="baths-select-small"
          value={price}
          label="baths"
          onChange={handlePriceChange}
        >
          <MenuItem value="">
            <em>Baths</em>
          </MenuItem>
          <MenuItem value={1}>1+</MenuItem>
          <MenuItem value={2}>2+</MenuItem>
          <MenuItem value={3}>3+</MenuItem>
          <MenuItem value={4}>4+</MenuItem>
          <MenuItem value={4}>5+</MenuItem>
        </Select>
      </FormControl>
      <FormControl
        sx={{ m: 2, backgroundColor: "#fff", minWidth: 120 }}
        size="small"
      >
        <InputLabel id="baths-select-small">Square Feet</InputLabel>
        <Select
          labelId="baths-select-small"
          id="baths-select-small"
          value={price}
          label="sqft"
          onChange={handlePriceChange}
        >
          <MenuItem value="">
            <em>Square Feet</em>
          </MenuItem>
          <MenuItem value={500}>500+</MenuItem>
          <MenuItem value={2}>1000+</MenuItem>
          <MenuItem value={3}>1500+</MenuItem>
          <MenuItem value={4}>2000+</MenuItem>
          <MenuItem value={4}>2500+</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};
export default FilterOptions;
