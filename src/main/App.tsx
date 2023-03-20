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
declare global {
  interface Window {
    store: {
      reciveName: (arg: { name: string }) => void;
      getName: () => void;
      name: (a: string) => void;

      newTask: (a: string) => void;
      getTask: () => void;
      reciveTask: (a: any) => void;
      delTask: (a: string) => void;
    };
  }
}

export default function Main() {
  const [addGoal, setAddGoal] = useState(false);
  const [name, setName] = useState({ name: "" });
  const [val, setVal] = useState("");

  useEffect(() => {
    window.store.reciveName((arg: { name: string }) => setName(arg));
    window.store.getName();
  }, []);
  useEffect(() => {
    window.store.reciveTask((a) => console.log(a));
    window.store.getTask();
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
            <form
              onSubmit={() => {
                if (val === "") return;
                window.store.name(val);
                setVal("");
              }}
            >
              {/* set this up to change state and save the value to files */}
              <Input
                value={val}
                onChange={(e) => setVal(e.target.value)}
              ></Input>
              <Space h="lg" />
              <input type="submit" />
            </form>
          </Modal>
          <Space h="lg" />
          <Text>{name.name}</Text>
        </div>
        <Button onClick={() => window.store.newTask('testing3')}>test add</Button>
        <Button onClick={() => window.store.delTask('testing3')}>test del</Button>
      </Center>
    </main>
  );
}
