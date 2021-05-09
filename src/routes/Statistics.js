import React, { useState } from "react";
import "./Statistics.css";
import { Button, Icon } from "react-materialize";
import { PieChart } from "react-minimal-pie-chart";
import gql from "graphql-tag";
import { useLazyQuery } from "@apollo/client";

const EMPLOYEEHAPPINESS = gql`
  query {
    happiness {
      mood
    }
  }
`;
export default function Statistics(props) {
  const [responseMessage, setResponseMessage] = useState("");
  const [showChart, setShowChart] = useState("none");
  const [timePeriod, setTimePeriod] = useState("day");
  const [averageEmployeeHappiness, setAverageEmployeeHappiness] = useState(0);
  const [processData, setProcessData] = useState(true);
  const [graphData, setGraphData] = useState();

  const [getEmployeeHappiness, { loading, error, data }] = useLazyQuery(
    EMPLOYEEHAPPINESS,
    {
      variables: {
        // currently not yet implemented
        timePeriod: timePeriod,
      },
    }
  );

  if (data && processData) {
    let temp = [0, 0, 0];
    let score = 0;
    let graph = [];
    data.happiness.forEach((element) => {
      switch (element.mood) {
        case "dissatisfied":
          temp[0]++;
          score++;

          break;
        case "neutral":
          temp[1]++;
          score += 2;

          break;
        case "satisfied":
          temp[2]++;
          score += 3;

          break;

        default:
          break;
      }
    });
    if (temp[0] > 0) {
      graph.push({
        title: "Dissatisfied",
        value: temp[0],
        color: "#E38627",
      });
    }
    if (temp[1] > 0) {
      graph.push({
        title: "Neutral",
        value: temp[1],
        color: "#C13C37",
      });
    }
    if (temp[2] > 0) {
      graph.push({
        title: "Satisfied",
        value: temp[2],
        color: "#6A2135",
      });
    }
    setProcessData(false);
    setShowChart(true);
    setGraphData(graph);
    setAverageEmployeeHappiness(score);
  }

  if (true) {
    return (
      <div className="Statistics">
        {/* <p>{responseMessage}</p> */}
        <Button
          onClick={() => {
            setTimePeriod("day");
            setProcessData(true);
            getEmployeeHappiness();
          }}
        >
          day
        </Button>
        <Button
          onClick={() => {
            setTimePeriod("week");
            setProcessData(true);
            getEmployeeHappiness();
          }}
        >
          week
        </Button>
        <Button
          onClick={() => {
            setTimePeriod("month");
            setProcessData(true);
            getEmployeeHappiness();
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
              The average Happiness of the past {timePeriod} is:{" "}
              {averageEmployeeHappiness}
            </p>
          </div>
        </div>
        <div className="graph">
          <PieChart
            style={{ display: showChart }}
            label={({ dataEntry }) =>
              `${dataEntry.title}: \n ${Math.round(dataEntry.percentage)} %`
            }
            labelStyle={{ fontSize: "25%", fontFamily: "sans-serif" }}
            animate
            data={graphData}
          />
        </div>
      </div>
    );
  }
}
