import React, { useState } from "react";
import "./Statistics.css";
import { Button, Icon } from "react-materialize";
import { PieChart } from "react-minimal-pie-chart";
import GitHubLogin from "react-github-login";
import DatePicker from "react-date-picker";
import dateFormat from "dateformat";

//component for manager to see employee happiness statistics.
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
      onChange: "",
      value: "",
      totalEmployeeMoods: {
        totalEmployeesDissatisfied: 1,
        totalEmployeesNeutral: 1,
        totalEmployeesSatisfied: 1,
      },
    };
  }

  componentDidMount = () => {
    this.getEmployeeHappinessRatings("day");
    if (process.env.REACT_APP_USE_GITHUB_LOGIN == "false") {
      this.setState({ isManager: true });
    }
  };

  // Gets data from database.
  getEmployeeHappinessRatings = async (period) => {
    fetch(
      `http://${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/getEmployeeHappinessData/${period}/${process.env.REACT_APP_API_PASSWORD}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (!data.error) {
          // Only shows graph if there is data about the asked period.
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
              averageEmployeeHappiness: "Unavailable",
            });
          }
        } else console.log(data.error);
      })
      .catch(console.log);
  };

  // onSucces from github oauth
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
  onChange = (value) => {
    this.setState({ value: value });
  };

  // Adds test data to the database.
  addTestData = (moodValue) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mood: moodValue,
        date: dateFormat(this.state.value, "isoDateTime").substr(0, 10),
        password: process.env.REACT_APP_API_PASSWORD,
      }),
    };
    fetch(
      `http://${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/addTestData`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        if (!data.error) {
          this.setState({
            responseMessage: data.responseMessage,
          });
        } else console.log(data.error);
      });
  };
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
          <div>
            <p>
              For testing purposes you can manually choose date and add votes to
              the database.
            </p>
            <DatePicker
              onChange={(value) => {
                this.onChange(value);
              }}
              value={this.state.value}
              format="y-MM-dd"
              monthAriaLabel="Month"
            />
            <div className="testButtonsContainer">
              <div>
                <Button
                  onClick={() => {
                    this.addTestData("dissatisfied");
                  }}
                  large
                  className="red"
                  floating
                  icon={<Icon large>sentiment_very_dissatisfied</Icon>}
                  node="button"
                />
              </div>
              <div>
                <Button
                  onClick={() => {
                    this.addTestData("neutral");
                  }}
                  large
                  className="red"
                  floating
                  icon={<Icon large>sentiment_neutral</Icon>}
                  node="button"
                />
              </div>
              <div>
                <Button
                  onClick={() => {
                    this.addTestData("satisfied");
                  }}
                  large
                  className="red"
                  floating
                  icon={<Icon large>sentiment_very_satisfied</Icon>}
                  node="button"
                />
              </div>
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
          <h2 className="titleMessage">{this.state.message}</h2>
          <div className="githubContainer">
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
