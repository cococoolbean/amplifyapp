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
Amplify.configure({
  //Auth is the same as before
  Auth: {
    region: "us-east-1",
    userPoolId: "us-east-1_T2ZfRqx59",
    userPoolWebClientId: "61l5lp494qnb60ek6h0ohonspp",
  },
  // Add in our new API, "name" can be whatever we want
  API: {
    endpoints: [
      {
        name: "multiplier",
        endpoint:
          "https://4b39guzzz0.execute-api.ap-southeast-1.amazonaws.com/dev",
      },
    ],
  },
});
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
  // const session = await Auth.currentSession();
  // // get the JWT token
  // const token = session.getIdToken().getJwtToken();

  /* async operation to call multiply API */
  const data=API.post('multiplier', '')
  .then(response => {
    console.log(response);
    setResult(response.json.result);
  })
  .catch(error => {
    console.error(error);
  });
console.log(data)

    // api gateway will invoke lambda function and return the response


    
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
