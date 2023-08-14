// import {
//   Button,
//   Text,
//   Input,
//   Center,
//   Title,
//   Space,
//   Modal,
// } from "@mantine/core";
// import Timer from "../helpers/timer";
import React from "react";
import Task from "./Task"
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
  // set up logic for switching pages here possibly
  return (<Task />)
}
