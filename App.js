import React from 'react';

import { Text, Container, Button } from './src/components/atoms'
import theme from './src/styles'

const styles = theme.templates.Base_Light

export default function App() {
  return (
    <Container style={styles}>
      <Container>
        <Text>Open your app 1 !!</Text>
        <Text
          style={{color:'red'}}
        >Open your app 2 !!</Text>
        <Text
          style={{color:'yellow'}}
        >Open your app 3 !!</Text>
      </Container>
      <Button onPress={() => console.log("HIHIHIHI")}>
        <Text>onPress</Text>
      </Button>
    </Container>
  );
}