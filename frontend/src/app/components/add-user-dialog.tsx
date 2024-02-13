import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Checkbox, Input, CheckboxGroup,
  Button
} from '@nextui-org/react';


const FIXED_CONDITIONS = [
  "Diabetes",
  "Asthma",
  "Chronic Depression",
  "Thingy"
];


const AddUserDialog = ({ isOpen,
  setIsOpen,
  name,
  setName,
  conditions,
  setConditions,
  onSubmit }: {
    isOpen: boolean,
    setIsOpen: (state: boolean) => void,
    name: string, setName: (state: string) => void,
    conditions: String[],
    setConditions: (state: string[]) => void,
    onSubmit: () => void
  }) => {
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  return (
    <div>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalContent>
          <ModalHeader>
            <Input value={name} placeholder="Enter Name" onChange={handleInputChange} />
          </ModalHeader>
          <ModalBody>
            <CheckboxGroup onChange={setConditions}>
              {FIXED_CONDITIONS.map((c) => (
                <Checkbox key={c} value={c} checked={c in conditions}>{c}</Checkbox>
              ))}
            </CheckboxGroup>
          </ModalBody>
          <ModalFooter>
            <Button aria-label="Submit" onClick={onSubmit}>Submit</Button >
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div >
  );
}

export default AddUserDialog;
