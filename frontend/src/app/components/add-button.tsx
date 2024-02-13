import { Button } from "@nextui-org/react";

const AddButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button aria-label="Queue New User" onClick={onClick}>Queue New User</Button >
  );
}

export default AddButton;
