import { Modal, ModalBody, ModalContent, ModalHeader } from "@chakra-ui/modal";
import React, { useState } from "react";

const NodeModal = ({ isOpen, onClose, onSubmit }) => {
  const [txt, setTxt] = useState("");
  const [relationship, setRelationship] = useState("");

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalBody>
          <div className="input-form">
            <ModalHeader>Add family member</ModalHeader>
            <input
              type="text"
              placeholder="Name"
              value={txt || ""}
              onChange={(event) => setTxt(event.target.value)}
            />
            <input
              type="text"
              placeholder="Relationship"
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
            />
            <button onClick={() => onSubmit(txt)}>Add</button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default NodeModal;
