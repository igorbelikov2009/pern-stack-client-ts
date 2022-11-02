// Страница готовая
import React, { FC, useEffect, useState } from "react";
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
import { getAllDevicesInAdminPage } from "../http/deviceApi";
import { NavLink } from "react-router-dom";
import { DEVICE_EDIT_ROUTE } from "../utils/consts";
import DeleteBrandOrType from "../components/modals/DeleteBrandOrType";

const Admin: FC = () => {
  const [typeVisible, setTypeVisible] = useState<boolean>(false);
  const [brandVisible, setBrandVisible] = useState<boolean>(false);
  const [deviceVisible, setDeviceVisible] = useState<boolean>(false);
  const [deleteBrandOrType, setDeleteBrandOrType] = useState<boolean>(false);

  const [searchDevice, setSearchDevice] = useState<string>("");
  const [searchedDevice, setSearchedDevice] = useState<any[]>([]);
  const [filter, setFilter] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [count, setCount] = useState<number>(1);

  const [successMsg, setSuccessMsg] = useState<string>("");
  const [showSuccessMsg, setShowSuccessMsg] = useState<boolean>(false);

  // pagination
  const limit: number = 5;
  const pageCount = Math.ceil(Number(count) / limit);
  const pages: any[] = [];

  for (let number = 1; number < pageCount + 1; number++) {
    pages.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => setCurrentPage(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  useEffect(() => {
    getAllDevicesInAdminPage(searchDevice, currentPage, filter).then(
      ({ count, rows }) => {
        setSearchedDevice(rows);
        setCount(count);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  useEffect(() => {
    getAllDevicesInAdminPage(searchDevice, 1, filter).then(
      ({ count, rows }) => {
        setSearchedDevice(rows);
        setCount(count);
        setCurrentPage(1);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, successMsg]);

  const fetchDevice = () => {
    getAllDevicesInAdminPage(searchDevice, currentPage, filter).then(
      ({ count, rows }) => {
        setSearchedDevice(rows);
        setCount(count);
      }
    );
  };

  const showSuccessMsgFunc = (msg: any) => {
    setSuccessMsg(msg);
    setShowSuccessMsg(true);
    setTimeout(() => setShowSuccessMsg(false), 5000);
  };

  return (
    <Container className="d-flex flex-column">
      {/* {showSuccessMsg && <p>{successMsg}</p>} */}
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

      {showSuccessMsg && (
        <p style={{ fontSize: 34, color: "blue", textAlign: "center" }}>
          {successMsg}
        </p>
      )}

      <CreateDevice
        show={deviceVisible}
        onHide={() => setDeviceVisible(false)}
      />
      <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
      <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />

      <DeleteBrandOrType
        show={deleteBrandOrType}
        onHide={() => setDeleteBrandOrType(false)}
        showSuccessMsgFunc={showSuccessMsgFunc}
      />

      <Dropdown className="mt-5 mb-3" style={{ margin: "0 auto" }}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {filter === "All" ? "Все товары" : "Товары без бренда или типа"}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {filter === "All" ? (
            <Dropdown.Item disabled>Все товары</Dropdown.Item>
          ) : (
            <Dropdown.Item onClick={() => setFilter("All")}>
              Все товары
            </Dropdown.Item>
          )}

          {filter === "Without Brand or Type" ? (
            <Dropdown.Item disabled>Товары без бренда или типа</Dropdown.Item>
          ) : (
            <Dropdown.Item onClick={() => setFilter("Without Brand or Type")}>
              Товары без бренда или типа
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>

      <InputGroup className="mb-3">
        <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          value={searchDevice}
          onChange={(e) => setSearchDevice(e.target.value)}
          placeholder="Введите имя устройства..."
        />
        <Button onClick={fetchDevice} variant="outline-dark" className="ml-2">
          Нажмите для поиска
        </Button>
      </InputGroup>

      {/* список товара на странице админа */}
      <ListGroup>
        {searchedDevice &&
          searchedDevice.map(({ id, img, brand, type, price, name }) => {
            return (
              <ListGroup.Item className="mt-3" key={id}>
                <Row>
                  <Col xs={5}>
                    <Image
                      width={150}
                      src={process.env.REACT_APP_API_URL + img}
                    />
                  </Col>

                  <Col xs={5}>
                    <Row>
                      <Col xs={12}>
                        <NavLink
                          to={DEVICE_EDIT_ROUTE + `/${id}`}
                          // onClick={() => console.log(id)}
                        >
                          Позиция: {id}
                        </NavLink>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12}>Название: {name}</Col>
                    </Row>
                    <Row>
                      <Col xs={12}>Стоимость: {price}</Col>
                    </Row>
                    <Row>
                      <Col xs={12}>Бренд: {brand.name}</Col>
                    </Row>
                    <Row>
                      <Col xs={12}>Тип: {type.name}</Col>
                    </Row>
                  </Col>

                  <Col xs={2}>
                    <NavLink to={DEVICE_EDIT_ROUTE + `/${id}`}>Выйти</NavLink>
                  </Col>
                </Row>
              </ListGroup.Item>
            );
          })}
      </ListGroup>

      <Pagination size="sm" className="mt-4 mb-4" style={{ margin: "0 auto" }}>
        {searchedDevice && searchedDevice.length > 0 ? pages : false}
      </Pagination>
    </Container>
  );
};

export default Admin;
