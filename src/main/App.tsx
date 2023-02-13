import { Title, Button } from "@mantine/core";
import React from "react";

export default function Main() {
  return (
    <main>
      <Title order={2}>test</Title>
      <Button onClick={() => {
        window.store.name('testing')
      }}>test</Button>
    </main>
  );
}
