import React, { useState, useEffect } from "react";
import { NativeSelect, FormControl } from "@material-ui/core";
import styles from "./CountryPicker.module.css";
import { fetchCountries } from "../../api";

const CountryPicker = () => {
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    const getCountries = async () => {
      const data = await fetchCountries();
      setCountries(data);
    };
    setCountries(getCountries());
  }, []);
  const listCountries = countries.length
    ? countries.map((country) => {
        return (
          <option key={country} value={country}>
            {country}
          </option>
        );
      })
    : null;

  return (
    <FormControl>
      <NativeSelect>
        <option value="global">Global</option>
        {listCountries}
      </NativeSelect>
    </FormControl>
  );
};
export default CountryPicker;
