import { Button, Container, IconButton } from "@zextras/carbonio-design-system";

interface SelectionActiveProps {
  toggleSelection: () => void;
  handleDeleteSelectedTasks: () => void;
}

export const SelectionActive: React.FC<SelectionActiveProps> = ({
  toggleSelection,
  handleDeleteSelectedTasks
}) => {
  return (
    <Container orientation="horizontal">
      <Container orientation="horizontal" mainAlignment="flex-start">
        <IconButton
          icon="ArrowBack"
          iconColor="primary"
          size="large"
          onClick={toggleSelection}
        />
        <Button
          size="large"
          color="primary"
          type="ghost"
          label="SELEZIONA TUTTI"
          onClick={() => {}}
        />
      </Container>
      <IconButton icon={"Checkmark"} onClick={() => {}} size="large" label="Complete"/>
      <IconButton icon={"Checkmark"} onClick={handleDeleteSelectedTasks} size="large" label="Delete"/>
    </Container>
  );
};
