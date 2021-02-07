import React from "react";
import "./Statistics.css";
import { Button, Icon } from "react-materialize";
import { PieChart } from "react-minimal-pie-chart";
import GitHubLogin from "react-github-login";

export default class Statistics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      responseMessage: "",
      averageEmployeeHappiness: 0,
      totalEmployeeMoods: {
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
    fetch(
      `http://${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/getEmployeeHappinessAverage/${period}`
    )
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          responseMessage: data.responseMessage,
          averageEmployeeHappiness: data.averageEmployeeHappiness,
          totalEmployeeMoods: data.totalEmployeeMoods,
        })
      );
  };

  render() {
    console.log(this.state.totalEmployeeMoods);
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

        <div>
          <div>
            <Icon medium>sentiment_very_dissatisfied</Icon>
            <p>A dissatisfied employee gets a score of 1.</p>
          </div>
          <div>
            <Icon medium>sentiment_neutral</Icon>
            <p>A neutral employee gets a score of 2.</p>
          </div>
          <div>
            <Icon medium>sentiment_very_satisfied</Icon>
            <p>A satisfied employee gets a score of 3.</p>
          </div>
          <div>
            <Icon medium>assessment</Icon>
            <p>
              The average Happiness is {this.state.averageEmployeeHappiness}
            </p>
          </div>
        </div>

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
                value: this.state.totalEmployeeMoods.totalEmployeesDissatisfied,
                color: "#E38627",
              },
              {
                title: "Neutral",
                value: this.state.totalEmployeeMoods.totalEmployeesNeutral,
                color: "#C13C37",
              },
              {
                title: "Satisfied",
                value: this.state.totalEmployeeMoods.totalEmployeesSatisfied,
                color: "#6A2135",
              },
            ]}
          />
        </div>
      </div>
    );
  }
}
