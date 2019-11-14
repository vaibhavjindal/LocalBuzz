import React from 'react';
import { Card, CardItem, Body, Text, Right, Left, Button } from 'native-base';

// Functional component
const ToDoNote = props => {
  // Syntax: select "note" and "deleteNote" from props
  const { note } = props;
  return (
    <Card>
      <CardItem header>
        <Text>{note.heading}</Text>
      </CardItem>
      <CardItem>
        <Body>
          <Text>{note.message}</Text>
        </Body>
      </CardItem>
      <CardItem footer>
        <Text>{note.time}</Text>
      </CardItem>
    </Card>
  );
};

export default ToDoNote;
