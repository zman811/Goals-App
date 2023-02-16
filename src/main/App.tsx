import { Title, Button, Text, Input, Center } from "@mantine/core";
import React, { useState } from "react";

export default function Main() {
  const [name, setName] = useState({ name: "" });
  const [val, setVal] = useState("");
  window.store.reciveName((arg: { name: string }) => setName(arg));
  window.store.getName();
  // console.log('here', test)

  return (
    <main>
      <Center>
        <div style={{textAlign: 'center'}}>
          <Text>{name.name}</Text>
          <Input value={val} onChange={(e) => setVal(e.target.value)}></Input>
          <Button
          style={{margin: '10px'}}
            onClick={() => {
              window.store.name(val);
              setVal("");
            }}
          >
            Set val
          </Button>
        </div>
      </Center>
    </main>
  );
}
