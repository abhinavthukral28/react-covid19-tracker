import React, { useEffect, useState } from "react";
import { fetchDailyData } from "../../api";
import { Line, Bar } from "react-chartjs-2";
import styles from "./Chart.module.css";

const Chart = (props) => {
  const [dailyData, setDailyData] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      setDailyData(await fetchDailyData());
    };
    fetchApi();
  }, []);
  const lineChart = dailyData.length ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            data: dailyData.map(({ confirmed }) => confirmed),
            label: "infected",
            borderColor: "#3333ff",
            fill: true,
          },
          {
            data: dailyData.map(({ deaths }) => deaths),
            label: "Deaths",
            borderColor: "red",
            backgroundColor: "rgba(255,0,0,0.5)",
          },
        ],
      }}
    ></Line>
  ) : null;

  const barChart = props.data.confirmed ? (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: [
              "rgba(0, 0, 255,0.5)",
              "rgba(0, 255, 0,0.5)",
              "rgba(255, 0, 0,0.5)",
            ],
            data: [
              props.data.confirmed.value,
              props.data.recovered.value,
              props.data.deaths.value,
            ],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Current State in ${props.country}` },
      }}
    ></Bar>
  ) : null;

  if (props.country.length === 0 || props.country === "global") {
    return <div className={styles.container}>{lineChart}</div>;
  } else {
    return <div className={styles.container}>{barChart}</div>;
  }
};
export default Chart;
