import {
  Button,
  Text,
  Input,
  Center,
  Title,
  Space,
  Modal,
} from "@mantine/core";
import Timer from "../helpers/timer";
import React, { useState, useEffect } from "react";
declare global {
  interface Window {
    store: {
      reciveName: (arg: { name: string }) => void;
      getName: () => void;
      name: (a: string) => void;

      newTask: (a: { title: string; des: string }) => void;
      getTask: () => void;
      // * this is disabled because of a werid typeing error, it is type checked later
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      reciveTask: (a: any) => void;
      delTask: (a: string) => void;
    };
  }
}

export default function Main() {
  const [addGoal, setAddGoal] = useState(false);
  // const [name, setName] = useState({ name: "" });
  const [val, setVal] = useState("");
  const [description, setDescription] = useState("");
  const [task, setTask] = useState([]);

  // useEffect(() => {
  //   window.store.reciveName((arg: { name: string }) => setName(arg));
  //   window.store.getName();
  // }, []);
  useEffect(() => {
    window.store.reciveTask((a: Record<string, unknown>) => {
      const temp = [];
      for (const [key, value] of Object.entries(a)) {
        temp.push([key, value]);
      }
      setTask(temp);
    });
    window.store.getTask();
  }, []);

  return (
    <main>
      <Center>
        <div style={{ textAlign: "center" }}>
          <Title order={1}>Get it done!</Title>
          <Timer initialMinute={0} initialSeconds={50} />
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
              onSubmit={(e) => {
                e.preventDefault();
                if (val === "") return;
                const obj = { title: val, des: description };
                window.store.name(val);
                window.store.newTask(obj);
                setVal("");
                setDescription("");
                setAddGoal(false);
              }}
            >
              <Input
                placeholder="Title"
                value={val}
                onChange={(e) => setVal(e.target.value)}
              ></Input>
              <Space h="lg" />
              <Input
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Space h="lg" />
              <input type="submit" />
            </form>
          </Modal>
          <Space h="lg" />
          <Space h="lg" />
          {task.map((val) => (
            <div key={val[0]}>
              <Space h="lg" />
              <div>
                <Text size="xl">{val[0]}</Text>
                <Text>{val[1]}</Text>
                <Button onClick={() => window.store.delTask(val[0])}>
                  Remove
                </Button>
                {/* need to add in a way to add a timer to each task */}
              </div>
              <Space h="lg" />
            </div>
          ))}
        </div>
      </Center>
    </main>
  );
}
