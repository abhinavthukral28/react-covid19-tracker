import React from "react";
import { Cards, Chart, CountryPicker } from "./components";
import styles from "./App.module.css";
import { fetchData } from "./api/";

class App extends React.Component {
  state = {
    data: {},
    selectedCountry: "",
  };
  async componentDidMount() {
    this.fetchData();
  }
  handleCountryChange = async (country) => {
    this.setState({ selectedCountry: country });
    this.fetchData(country);
  };
  async fetchData(country) {
    const fetchedData = await fetchData(country);
    this.setState({ data: fetchedData });
  }
  render() {
    console.log(this.state);

    return (
      <div className={styles.container}>
        <Cards data={this.state.data}></Cards>
        <CountryPicker
          handleCountryChange={this.handleCountryChange}
        ></CountryPicker>
        <Chart></Chart>
      </div>
    );
  }
}
export default App;
