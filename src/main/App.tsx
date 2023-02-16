import { Title, Button, Text, Input } from "@mantine/core";
import React, {useState} from "react";

export default function Main() {
  const [name, setName] = useState({name: ''})
  const [val, setVal] = useState('')
  window.store.reciveName((arg:{name: string}) => setName(arg))
  window.store.getName()
  // console.log('here', test)

  return (
    <main>
      <Title order={2}>test</Title>
      <Text>{name.name}</Text>
      <Input value={val} onChange={(e) => setVal(e.target.value)}></Input>
      <Button onClick={() => {
        window.store.name(val)
      }}>Set val</Button>
    </main>
  );
}
