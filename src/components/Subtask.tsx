import { Input, Text } from "@zextras/carbonio-design-system"
import { useCallback, useState } from "react";

interface SubtaskProps {
 addSubtask: (id: string, label: string) => void;
 id: string;
 subtaskInputValue: string;
 setSubtaskInputValue: (e: string) => void;
}

export const Subtask:React.FC<SubtaskProps> = ({addSubtask, id, subtaskInputValue, setSubtaskInputValue}) => {
 return (
  <div>
   <Text size={"extralarge"}>Subtasks:</Text>
   <Input
    value={subtaskInputValue}
    onChange={(e) => setSubtaskInputValue(e.target.value)}
    onEnter={() => addSubtask(id, subtaskInputValue)}
   />
  </div>
 )
}