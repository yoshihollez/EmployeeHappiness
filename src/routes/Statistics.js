import React from "react";
import "./Statistics.css";
import { Chart } from "react-charts";
import { Button } from "react-materialize";

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
        <Button
          onClick={() => {
            this.getEmployeeHappinessRatings("day");
          }}
        >
          day
        </Button>
        <Button
          onClick={() => {
            this.getEmployeeHappinessRatings("week");
          }}
        >
          week
        </Button>
        <Button
          onClick={() => {
            this.getEmployeeHappinessRatings("month");
          }}
        >
          month
        </Button>
        <div className="graph">
          <Chart
            data={[
              {
                label: "Series 1",
                data: [
                  [0, 1],
                  [1, 2],
                  [2, 4],
                  [3, 2],
                  [4, 7],
                ],
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
