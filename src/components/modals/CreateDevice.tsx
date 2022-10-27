import React, { FC, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { CreateModalProps } from "../../types/types";

const CreateDevice: FC<CreateModalProps> = ({ show, onHide }) => {
  const [value, setValue] = useState<string>("");

  const addDevice: React.MouseEventHandler<HTMLButtonElement> = () => {
    console.log("Added");
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить новое устройство
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Control
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={"Введите название устройства"}
          />
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Закрыть
        </Button>

        {/*   <Button variant="outline-success" onClick={addDevice}> */}
        <Button variant="outline-success" onClick={addDevice}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateDevice;
