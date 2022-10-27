import React, { FC, useState } from "react";
import {
  Button,
  Col,
  Container,
  Dropdown,
  Form,
  Image,
  InputGroup,
  ListGroup,
  Pagination,
  Row,
} from "react-bootstrap";
import CreateBrand from "../components/modals/CreateBrand";
import CreateDevice from "../components/modals/CreateDevice";
import CreateType from "../components/modals/CreateType";
import DeleteBrandOrType from "../components/modals/DeleteBrandOrType";

const Admin: FC = () => {
  const [typeVisible, setTypeVisible] = useState<boolean>(false);
  const [brandVisible, setBrandVisible] = useState<boolean>(false);
  const [deviceVisible, setDeviceVisible] = useState<boolean>(false);
  const [deleteBrandOrType, setDeleteBrandOrType] = useState<boolean>(false);

  return (
    <Container className="d-flex flex-column">
      <Button
        onClick={() => setTypeVisible(true)}
        variant="outline-dark"
        className="mt-4 p-2"
      >
        Добавить тип
      </Button>

      <Button
        onClick={() => setBrandVisible(true)}
        variant="outline-dark"
        className="mt-4 p-2"
      >
        Добавить брэнд
      </Button>

      <Button
        onClick={() => setDeviceVisible(true)}
        variant="outline-dark"
        className="mt-4 p-2"
      >
        Добавить устройство
      </Button>

      <Button
        onClick={() => setDeleteBrandOrType(true)}
        variant="outline-dark"
        className="mt-4 p-2"
      >
        Удалить тип или брэнд
      </Button>

      <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
      <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
      <CreateDevice
        show={deviceVisible}
        onHide={() => setDeviceVisible(false)}
      />
      <DeleteBrandOrType
        show={deleteBrandOrType}
        onHide={() => setDeleteBrandOrType(false)}
      />
    </Container>
  );
};

export default Admin;
