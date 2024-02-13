import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Checkbox, Input, CheckboxGroup,
  Button
} from '@nextui-org/react';


const FIXED_CONDITIONS = ['Sinusitis (disorder)', 'Rupture of appendix', 'Coronary Heart Disease', 'Laceration of thigh', 'Brain damage - traumatic', 'Injury of anterior cruciate ligament', 'Appendicitis', 'Laceration of hand', 'Myocardial Infarction', 'First degree burn', 'Fracture subluxation of wrist', 'Normal pregnancy', 'Chronic paralysis due to lesion of spinal cord', 'Chronic sinusitis (disorder)', 'Impacted molars', 'Sprain of ankle', 'Streptococcal sore throat (disorder)', 'Otitis media', 'Injury of tendon of the rotator cuff of shoulder', 'History of appendectomy', 'Injury of medial collateral ligament of knee', 'History of myocardial infarction (situation)', 'Viral sinusitis (disorder)', 'Cardiac Arrest', 'History of single seizure (situation)', 'Chronic pain', 'Childhood asthma', 'Drug overdose', 'Concussion with loss of consciousness', 'Acute viral pharyngitis (disorder)', 'Seizure disorder', 'Bullet wound', 'History of cardiac arrest (situation)', 'Epilepsy', 'Second degree burn', 'Fracture of ankle', 'Hypertension', 'Perennial allergic rhinitis', 'Acute bronchitis (disorder)', 'Concussion with no loss of consciousness', 'Laceration of forearm', 'Acute bacterial sinusitis (disorder)', 'Fracture of clavicle', 'Perennial allergic rhinitis with seasonal variation', 'Fracture of the vertebral column with spinal cord injury', 'Tear of meniscus of knee', 'Rupture of patellar tendon', 'Atopic dermatitis', 'Child attention deficit disorder', 'Seasonal allergic rhinitis', 'Malignant neoplasm of breast (disorder)', 'Acute allergic reaction', 'Fracture of forearm', 'Body mass index 30+ - obesity (finding)', 'Sprain of wrist', 'Closed fracture of hip', 'Facial laceration', 'Concussion injury of brain', 'Third degree burn', 'Whiplash injury to neck', 'Laceration of foot', 'Fracture of rib', 'Anemia (disorder)', 'Antepartum eclampsia', 'Chronic intractable migraine without aura'];


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
        <ModalContent style={{ overflowY: "auto", maxHeight: "90vh" }}>
          <ModalHeader>
            Add a user
          </ModalHeader>
          <ModalBody>
            <h2 className="text-xl">Name</h2>
            <Input value={name} placeholder="Enter Name" onChange={handleInputChange} />
            <h2 className="text-xl">Conditions</h2>
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
    </div>
  );
}

export default AddUserDialog;
