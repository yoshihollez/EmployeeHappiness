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
      message: "Please login via github to authenticate you are a manager.",
      isManager: false,
      showChart: "none",
      timePeriod: "day",
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
      `http://${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/getEmployeeHappinessAverage/${period}/${process.env.REACT_APP_API_PASSWORD}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (!data.error) {
          console.log(data);
          if (!(data.averageEmployeeHappiness == 0)) {
            this.setState({
              responseMessage: data.responseMessage,
              averageEmployeeHappiness: data.averageEmployeeHappiness,
              totalEmployeeMoods: data.totalEmployeeMoods,
              showChart: "inline",
            });
          } else {
            this.setState({
              showChart: "none",
              responseMessage: data.responseMessage,
              averageEmployeeHappiness: data.averageEmployeeHappiness,
            });
          }
        } else console.log(data.error);
      })
      .catch(console.log);
  };

  onSuccess = (response) => {
    fetch(
      `http://${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/managerLogin`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: process.env.REACT_APP_API_PASSWORD,
          code: response.code,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          this.setState({ isManager: data.isManager, message: data.message });
        } else console.log(data.error);
      })
      .catch(console.log);
  };
  onFailure = (response) => console.error(response);
  render() {
    if (this.state.isManager) {
      return (
        <div className="Statistics">
          <p>{this.state.responseMessage}</p>
          <Button
            onClick={() => {
              this.setState({ timePeriod: "day" });
              this.getEmployeeHappinessRatings("day");
            }}
          >
            day
          </Button>
          <Button
            onClick={() => {
              this.setState({ timePeriod: "week" });
              this.getEmployeeHappinessRatings("week");
            }}
          >
            week
          </Button>
          <Button
            onClick={() => {
              this.setState({ timePeriod: "month" });
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
                The average Happiness of the past {this.state.timePeriod} is:{" "}
                {this.state.averageEmployeeHappiness}
              </p>
            </div>
          </div>

          <div className="graph">
            <PieChart
              style={{ display: this.state.showChart }}
              label={({ dataEntry }) =>
                `${dataEntry.title}: \n ${Math.round(dataEntry.percentage)} %`
              }
              labelStyle={{ fontSize: "25%", fontFamily: "sans-serif" }}
              animate
              data={[
                {
                  title: "Dissatisfied",
                  value: this.state.totalEmployeeMoods
                    .totalEmployeesDissatisfied,
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
    } else {
      return (
        <>
          <h2 style={{ padding: "10px" }}>{this.state.message}</h2>
          <div
            style={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <GitHubLogin
              clientId={process.env.REACT_APP_CLIENT_ID}
              onSuccess={this.onSuccess}
              onFailure={this.onFailure}
              // scope={"read:user"}
              redirectUri={
                "http://" +
                process.env.REACT_APP_HOSTIP +
                ":" +
                process.env.REACT_APP_HOSTPORT +
                "/statistics"
              }
              className={"btn waves-effect waves-light"}
            />
          </div>
        </>
      );
    }
  }
}
