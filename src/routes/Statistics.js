import React from "react";
import "./Statistics.css";
import { Chart } from "react-charts";

export default class Statistics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getEmployeeHappinessRatings = async (period) => {
    fetch(`http://localhost:4000/getEmployeeHappinessAverage/${period}`)
      .then((response) => response.json())
      .then((data) => this.setState({ responseMessage: data.responseMessage }));
  };

  render() {
    return (
      <div className="Statistics">
        <p>statistics</p>
        <div className="graph">
          <Chart
            data={[
              {
                label: "Series 1",
                data: [],
              },
            ]}
            axes={[
              { primary: true, type: "linear", position: "bottom" },
              { type: "linear", position: "left" },
            ]}
            tooltip
          />
        </div>
      </div>
    );
  }
}
