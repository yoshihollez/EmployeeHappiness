import React from "react";
import "./Statistics.css";
import { Chart } from "react-charts";

export default class Statistics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="Statistics">
        <p>statistics</p>
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
              {
                label: "Series 2",
                data: [
                  [0, 3],
                  [1, 1],
                  [2, 5],
                  [3, 6],
                  [4, 4],
                ],
              },
              {
                label: "Series 3",
                data: [
                  [0, 5],
                  [1, 1],
                  [2, 1],
                  [3, 1],
                  [4, 4],
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
