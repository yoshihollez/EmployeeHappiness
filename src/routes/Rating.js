import React, { useState } from "react";
import "./Rating.css";
import { Button, Icon } from "react-materialize";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import gql from "graphql-tag";

// API call to graphql backend to add and employees happiness to the backend.
const CREATE_HAPPINESS = gql`
  mutation createHappiness($mood: String!) {
    createHappiness(mood: $mood) {
      errors {
        field
        message
      }
      happiness {
        id
        mood
        createdAt
      }
    }
  }
`;
export default function Rating(props) {
  //react hooks
  const [responseMessage, setResponseMessage] = useState(
    "Please rate how your day was. All data will be stored anonymously."
  );
  const [mood, setMood] = useState("");
  const [createHappiness] = useMutation(CREATE_HAPPINESS, {
    variables: {
      mood: mood,
    },
  });

  const sendEmployeeHappiness = async (moodValue) => {
    //await is needed otherwise and empty mood will be sent.
    await setMood(moodValue);
    try {
      let response = await createHappiness();
      //checks if an error is returned and give that error message otherwise give normal message.
      if (response.data.createHappiness.errors) {
        setResponseMessage(response.data.createHappiness.errors[0].message);
      } else {
        setResponseMessage("succesfully voted");
      }
    } catch (error) {
      setResponseMessage("You are not logged in.");
      console.log(error);
    }
  };

  return (
    <div>
      <h2>{responseMessage}</h2>
      <div className="buttonContainer">
        <div>
          <Button
            onClick={() => {
              sendEmployeeHappiness("dissatisfied");
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
              sendEmployeeHappiness("neutral");
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
              sendEmployeeHappiness("satisfied");
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
