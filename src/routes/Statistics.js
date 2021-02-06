import React from "react";
import "./Statistics.css";
import { Button } from "react-materialize";
import { PieChart } from "react-minimal-pie-chart";

export default class Statistics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      responseMessage: "",
      averageEmployeeHappiness: 0,
      totalEmployeeHappiness: {
        totalEmployeesDissatisfied: 1,
        totalEmployeesNeutral: 1,
        totalEmployeesSatisfied: 1,
      },
    };
  }

  componentDidMount = () => {
    this.getEmployeeHappinessRatings("day");
  };

  getEmployeeHappinessRatings = async (period) => {
    fetch(`http://localhost:4000/getEmployeeHappinessAverage/${period}`)
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          responseMessage: data.responseMessage,
          averageEmployeeHappiness: data.averageEmployeeHappiness,
          totalEmployeeHappiness: JSON.parse(data.totalEmployeeHappiness),
        })
      );
  };

  render() {
    return (
      <div className="Statistics">
        <p>{this.state.responseMessage}</p>
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
          <PieChart
            label={({ dataEntry }) =>
              `${dataEntry.title}: \n ${Math.round(dataEntry.percentage)} %`
            }
            labelStyle={{ fontSize: "25%", fontFamily: "sans-serif" }}
            animate
            data={[
              {
                title: "Dissatisfied",
                value: this.state.totalEmployeeHappiness
                  .totalEmployeesDissatisfied,
                color: "#E38627",
              },
              {
                title: "Neutral",
                value: this.state.totalEmployeeHappiness.totalEmployeesNeutral,
                color: "#C13C37",
              },
              {
                title: "Satisfied",
                value: this.state.totalEmployeeHappiness
                  .totalEmployeesSatisfied,
                color: "#6A2135",
              },
            ]}
          />
        </div>
      </div>
    );
  }
}
