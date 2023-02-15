import { Title, Button, Text } from "@mantine/core";
import React, {useState} from "react";

export default function Main() {
  const [name, setName] = useState({name: ''})
  window.store.reciveName((arg:{name: string}) => setName(arg))
  window.store.getName()
  // console.log('here', test)

  return (
    <main>
      <Title order={2}>test</Title>
      <Text>{name.name}</Text>
      <Button onClick={() => {
        window.store.name('testing')
      }}>test</Button>
      <Button onClick={() =>
      window.store.getName()
      }>Getname</Button>
    </main>
  );
}
