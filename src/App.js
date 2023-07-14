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
  const requestInfo={
    headers:{
      Authorization: token
    },
    body:{
      num1: Number(num1),
      num2: Number(num2),
    }
  }
  const data=await API.post('divideapi',' ')

  console.log({data})
    
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
