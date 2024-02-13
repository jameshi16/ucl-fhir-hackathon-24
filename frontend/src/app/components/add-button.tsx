import { Button } from "@nextui-org/react";

const AddButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button color="primary" aria-label="Queue New User" onClick={onClick}>Queue New User</Button >
  );
}

export default AddButton;
