import React, { FC, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { CreateModalProps } from "../../types/types";

const DeleteBrandOrType: FC<CreateModalProps> = ({ show, onHide }) => {
  const [value, setValue] = useState<string>("");

  const Delete: React.MouseEventHandler<HTMLButtonElement> = () => {
    console.log("Delete");
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Удалить тип или брэнд
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Control
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={"Введите название брэнда"}
          />
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Закрыть
        </Button>

        <Button variant="outline-success" onClick={Delete}>
          Удалить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteBrandOrType;
