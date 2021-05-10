import React, { useState, useEffect } from "react";
import "./Statistics.css";
import { Button, Icon } from "react-materialize";
import { PieChart } from "react-minimal-pie-chart";
import gql from "graphql-tag";
import { useLazyQuery } from "@apollo/client";
// API call to graphql backend for an array of the employee happiness.
const EMPLOYEEHAPPINESS = gql`
  query {
    happiness {
      mood
    }
  }
`;

export default function Statistics(props) {
  //hooks
  const [responseMessage, setResponseMessage] = useState("");
  const [showChart, setShowChart] = useState("none");
  const [timePeriod, setTimePeriod] = useState("day");
  const [averageEmployeeHappiness, setAverageEmployeeHappiness] = useState(0);
  const [processData, setProcessData] = useState(true);
  const [graphData, setGraphData] = useState([]);

  const [getEmployeeHappiness, { loading, error, data }] = useLazyQuery(
    EMPLOYEEHAPPINESS,
    {
      variables: {
        // currently not yet implemented
        timePeriod: timePeriod,
      },
    }
  );
  // get the day data from the database when the page is first loaded.
  //  the [] are needed at the end otherwise the code wil be run repeatedly.
  useEffect(() => {
    getEmployeeHappiness();
  }, []);

  // runs if the backend succesfully sent employee happiness data.
  if (data && processData) {
    let amountOfVotes = [0, 0, 0];
    let totalHappinessScore = 0;
    let graph = [];
    // goes through the backend data and adds scores/votes.
    data.happiness.forEach((element) => {
      switch (element.mood) {
        case "dissatisfied":
          amountOfVotes[0]++;
          totalHappinessScore++;

          break;
        case "neutral":
          amountOfVotes[1]++;
          totalHappinessScore += 2;

          break;
        case "satisfied":
          amountOfVotes[2]++;
          totalHappinessScore += 3;

          break;

        default:
          break;
      }
    });
    // only allows the graph to to thow data if there are votes for it.
    if (amountOfVotes[0] > 0) {
      graph.push({
        title: "Dissatisfied",
        value: amountOfVotes[0],
        color: "#E38627",
      });
    }
    if (amountOfVotes[1] > 0) {
      graph.push({
        title: "Neutral",
        value: amountOfVotes[1],
        color: "#C13C37",
      });
    }
    if (amountOfVotes[2] > 0) {
      graph.push({
        title: "Satisfied",
        value: amountOfVotes[2],
        color: "#6A2135",
      });
    }
    setProcessData(false);
    setShowChart(true);
    setGraphData(graph);
    setAverageEmployeeHappiness(totalHappinessScore);
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
