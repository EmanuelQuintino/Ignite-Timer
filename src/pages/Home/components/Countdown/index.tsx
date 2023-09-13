import { useEffect, useState } from "react";
import { CountdownContainer, Separator } from "./styles";
import { differenceInSeconds } from "date-fns";

export function Countdown() {
  const [secondsPassed, setSecondsPassed] = useState(0);
  const totalSeconds = activeTask ? activeTask.minutesAmount * 60 : 0;

  useEffect(() => {
    function handleFinishTask() {
      setArrayTasks((prevState) =>
        prevState.map((task) => {
          if (task.id === activeTaskID) {
            return { ...task, finishDate: new Date() };
          } else {
            return task;
          }
        })
      );
      setActiveTaskID(null);
    }

    let intervalID: number;

    if (activeTask) {
      intervalID = setInterval(() => {
        const secondsDiferrence = differenceInSeconds(new Date(), activeTask.startDate);

        if (secondsDiferrence > totalSeconds) {
          handleFinishTask();
        } else {
          setSecondsPassed(secondsDiferrence);
        }
      }, 1000);
    }

    return () => {
      clearInterval(intervalID);
    };
  }, [activeTask, totalSeconds, activeTaskID]);

  return (
    <CountdownContainer>
      <span>{amountMinutes[0]}</span>
      <span>{amountMinutes[1]}</span>

      <Separator>:</Separator>

      <span>{amountSeconds[0]}</span>
      <span>{amountSeconds[1]}</span>
    </CountdownContainer>
  );
}
