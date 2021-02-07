import React from "react";
import "./Rating.css";
import { Button, Icon } from "react-materialize";

export default class Rating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      responseMessage: "",
      userVoted: false,
    };
  }

  sendEmployeeHappiness = (moodValue) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mood: moodValue }),
    };
    fetch(
      `http://${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/addEmployeeHappiness/${process.env.REACT_APP_API_PASSWORD}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          responseMessage: data.responseMessage,
          userVoted: data.userVoted,
        })
      );
  };

  render() {
    if (this.state.userVoted) {
      return (
        <div className="voteCast">
          <h2>{this.state.responseMessage}</h2>
        </div>
      );
    } else {
      return (
        <div>
          <h2>
            Please rate how your day was. All data will be stored anonymously.
          </h2>
          <div className="buttonContainer">
            <div>
              <Button
                onClick={() => {
                  this.sendEmployeeHappiness("dissatisfied");
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
                  this.sendEmployeeHappiness("neutral");
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
                  this.sendEmployeeHappiness("satisfied");
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
      );
    }
  }
}
