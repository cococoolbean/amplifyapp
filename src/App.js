import React, { useState } from "react";
import logo from "./logo.svg";
import "@aws-amplify/ui-react/styles.css";
import {
  withAuthenticator,
  Button,
  Heading,
  Image,
  View,
  Card,
  TextField,
} from "@aws-amplify/ui-react";
import { Auth } from 'aws-amplify';

function App({ signOut }) {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [result, setResult] = useState(null);

const handleMultiply = async () => {
  const requestBody = {
    num1: Number(num1),
    num2: Number(num2),
  };

  // get the current session
  const session = await Auth.currentSession();
  // get the JWT token
  const token = session.getIdToken().getJwtToken();

  /* async operation to call multiply API */
  const response = await fetch("https://6isewmqh2d.execute-api.ap-southeast-1.amazonaws.com/beta/multiply", {
    method: "POST",

    // pass the JWT token as the Authorization header -- for API Gateway to recognize that this is a valid request from an authenticated user
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },

    body: JSON.stringify(requestBody),
  });

    // api gateway will invoke lambda function and return the response

    const data = await response.json(); // wait for the response from the API 

    setResult(data.result);
  };

  // displaying on screen 
  return (
    <View className="App">
      <Card>
        <Image src={logo} className="App-logo" alt="logo" />
        <Heading level={1}>We now have Auth!</Heading>

        <Heading level={3}>Multiply two numbers</Heading>
        <TextField
          label="Number 1"
          value={num1}
          onChange={(event) => setNum1(event.target.value)}
        />
        <TextField
          label="Number 2"
          value={num2}
          onChange={(event) => setNum2(event.target.value)}
        />
        <Button onClick={handleMultiply}>Multiply</Button>
        {result !== null && (
          <Heading level={3}>
            Result: {num1} x {num2} = {result}
          </Heading>
        )}
      </Card>
      <Button onClick={signOut}>Sign Out</Button>
    </View>
  );
}

export default withAuthenticator(App);
