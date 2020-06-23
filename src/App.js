import React from "react";
import { Cards, Chart, CountryPicker } from "./components";
import styles from "./App.module.css";
import { fetchData } from "./api/";
import coronaImage from "./images/image.png";

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
    const { data, selectedCountry } = this.state;
    return (
      <div className={styles.container}>
        <img className={styles.image} src={coronaImage} alt="CoronaImage"></img>
        <Cards data={data}></Cards>
        <CountryPicker
          handleCountryChange={this.handleCountryChange}
        ></CountryPicker>
        <Chart data={data} country={selectedCountry}></Chart>
      </div>
    );
  }
}
export default App;
