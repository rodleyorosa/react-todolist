import {
  AccordionItemType,
  Badge,
  Checkbox,
  Container,
  IconButton,
  Text,
} from "@zextras/carbonio-design-system";
import { useCallback, useContext, useState } from "react";
import { Context } from "../TodoListContainer";

interface CustomComponentProps {
  item: AccordionItemType;
}

export const CheckboxComponent: React.FC<CustomComponentProps> = ({ item }) => {
  const isSelectionActive = useContext<boolean>(Context);
  const [checked, setChecked] = useState<boolean>(false);
  const [selected, setSelected] = useState<string[]>([]);

  const handleCheckbox = useCallback(() => {
    setChecked((prev) => !prev);

    if (checked) {
        setSelected(prev => {
          const newSelectedTasks = [...prev, item.id];
          console.log(newSelectedTasks)
          return newSelectedTasks;
        });
      } else {
        setSelected(prev => {
          const newSelectedTasks = prev.filter(id => id !== item.id);
          console.log(newSelectedTasks)
          return newSelectedTasks;
        });
      }
    }, [checked, item.id])

  return (
    <Container
      orientation="horizontal"
      mainAlignment="space-between"
      padding={"10px"}
      crossAlignment="center"
    >
      <Container orientation="horizontal" mainAlignment="flex-start">
        {checked ? 'checkato' : 'non checkato'}
        {selected}
        {isSelectionActive ? (
          <Checkbox padding={"10px"} value={checked} onClick={handleCheckbox} />
        ) : (
          <IconButton
            size="extralarge"
            icon="InstanceOutline"
            borderRadius="round"
            onClick={() => {}}
          />
        )}
        <Text>{item.label}</Text>
      </Container>
      {item.badgeCounter ? (
        <Badge value={item.badgeCounter} type="unread" />
      ) : null}
    </Container>
  );
};
