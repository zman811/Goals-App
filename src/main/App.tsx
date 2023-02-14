import { Title, Button, Text } from "@mantine/core";
import React from "react";

export default function Main() {
  let name = {}
  let test = window.store.reciveName()

  return (
    <main>
      <Title order={2}>test</Title>
      <Text>{name.name}</Text>
      <Button onClick={() => {
        window.store.name('testing')
      }}>test</Button>
    </main>
  );
}
