import {
  Button,
  Text,
  Input,
  Center,
  Title,
  Space,
  Modal,
} from "@mantine/core";
import React, { useState, useEffect } from "react";

export default function Main() {
  const [addGoal, setAddGoal] = useState(false);
  const [name, setName] = useState({ name: "" });
  const [val, setVal] = useState("");
  useEffect(() => {
    window.store.reciveName((arg: { name: string }) => setName(arg));
    window.store.getName();
  }, []);

  return (
    <main>
      <Center>
        <div style={{ textAlign: "center" }}>
          <Title order={1}>Get it done!</Title>
          <Space h="lg" />
          <Button onClick={() => setAddGoal(true)}>Add Goal/Task</Button>
          <Modal
            opened={addGoal}
            onClose={() => setAddGoal(false)}
            title="Add new goal"
          >
            <Text>What do you need to get done?</Text>
            <Space h="md" />
            <form>
              {/* set this up to change state and save the value to files */}
              <input />
              <Space h="lg" />
              <input type="submit" />
            </form>
          </Modal>
          <Space h="lg" />
          <Text>{name.name}</Text>
          <Input value={val} onChange={(e) => setVal(e.target.value)}></Input>
          <Button
            style={{ margin: "10px" }}
            onClick={() => {
              if (val === "") return;
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
