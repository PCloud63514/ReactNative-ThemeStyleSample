import React from 'react';

import { Text, Container } from './src/components/atoms'
import theme from './src/styles'

const styles = theme.templates.Base_Light

export default function App() {
  return (
    <Container style={styles}>

      <Text
        style={{color:'pink'}}
      >Opeon your app!!</Text>
    </Container>
  );
}