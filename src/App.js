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
import { API } from 'aws-amplify';
function App({ signOut }) {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [result, setResult] = useState(null);

const handleMultiply = async () => {
  const user = await Auth.currentAuthenticatedUser()
  const token=user.signInUserSession.idToken.jwtToken
  console.log(token)
  // const requestInfo={
  //   Headers:{
  //     Authorization: `Bearer ${(await Auth.currentSession())
  //       .getIdToken()
  //       .getJwtToken()}`,

  //   },
  //   body:{
  //     num1: Number(num1),
  //     num2: Number(num2),
  //   }
  // }
  const requestBody = {
    num1: Number(num1),
    num2: Number(num2),
  };

 
  const response = await fetch("https://wuzx3h67tj.execute-api.ap-southeast-1.amazonaws.com/backend", { 
    method: "POST",
    headers:{
      Authorization: token

    },
     body: JSON.stringify(requestBody),
    });

    // api gateway will invoke lambda function and return the response
    try {

    const data = await response.json(); // wait for the response from the API
    setResult(data.result);
 
    }
    catch (e) {
      return e;
  }    

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
