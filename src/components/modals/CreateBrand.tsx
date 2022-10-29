// Страница готовая
import React, { FC, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { createBrand } from "../../http/deviceApi";
import { ICreateModalProps } from "../../types/types";

const CreateBrand: FC<ICreateModalProps> = ({ show, onHide }) => {
  const [value, setValue] = useState<string>("");

  const addBrand: React.MouseEventHandler<HTMLButtonElement> = () => {
    createBrand({ name: value }).then((data) => {
      setValue(""); // то есть инпут будем обнулять
      onHide(); // после чего вызываем функцию закрытия модального окна
    });
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить новый брэнд
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

        {/*   <Button variant="outline-success" onClick={addBrand}> */}
        <Button variant="outline-success" onClick={addBrand}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateBrand;
