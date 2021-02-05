import React from "react";
import "./Rating.css";
import { Button, Icon } from "react-materialize";

export default class Rating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <p>rating</p>
        <div className="buttonContainer">
          <div>
            <Button
              large
              className="red"
              floating
              icon={<Icon large>sentiment_very_dissatisfied</Icon>}
              node="button"
            />
          </div>
          <div>
            <Button
              large
              className="red"
              floating
              icon={<Icon large>sentiment_neutral</Icon>}
              node="button"
            />
          </div>
          <div>
            <Button
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
