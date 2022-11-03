// Страница готовая
//   return <Spinner animation="grow" />;
import React, { FC, useEffect, useState } from "react";
import { fetchOrders } from "../http/ordersApi";
import ItemOneOrderInAdmin from "../components/ItemOneOrderInAdmin";
import {
  Col,
  Container,
  Dropdown,
  ListGroup,
  Pagination,
  Row,
  // Spinner,
} from "react-bootstrap";
import { IOrder } from "../types/types";

const Orders: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [orders, setOrders] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState<number>(0);
  const [filter, setFilter] = useState<string>("Все заказы");
  const [rerender, setRerender] = useState<boolean>(false);

  //pagination
  const limit = 5;
  const pageCount = Math.ceil(Number(count) / limit);
  const pages = [];

  useEffect(() => {
    fetchOrders({ limit, page: 1 }).then((data) => {
      setOrders(data);
      setLoading(false);
      setCount(data.count);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchOrders({ limit, page: currentPage }).then((data) => {
      setOrders(data);
      setLoading(false);
    });
  }, [currentPage]);

  useEffect(() => {
    setLoading(true);
    fetchOrders({ limit, page: 1, complete: filter }).then((data) => {
      setOrders(data);
      setLoading(false);
      setCount(data.count);
      setCurrentPage(1);
    });
  }, [filter]);

  // re-render перерендерит после изменения статуса или удаления какого либо заказа
  useEffect(() => {
    setLoading(true);
    fetchOrders({ limit, page: currentPage, complete: filter }).then((data) => {
      setOrders(data);
      setLoading(false);
      setCount(data.count);
      setCurrentPage(1);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rerender]);

  const reRender = () => {
    setRerender(!rerender);
  };

  console.log(loading, "страница Orders");
  // if (loading) {
  //   return <Spinner animation="grow" />;
  // }

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

  return (
    <Container className="d-flex flex-column">
      <Row>
        <Col
          xs={12}
          className="mt-3 d-flex justify-content-center align-items-center"
        >
          <div className="mr-3">Выбрать заказы :</div>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {filter}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {filter === "Все заказы" ? (
                <Dropdown.Item disabled>Все заказы</Dropdown.Item>
              ) : (
                <Dropdown.Item onClick={() => setFilter("Все заказы")}>
                  Все заказы
                </Dropdown.Item>
              )}

              {filter === "Завершенные" ? (
                <Dropdown.Item disabled>Завершенные</Dropdown.Item>
              ) : (
                <Dropdown.Item onClick={() => setFilter("Завершенные")}>
                  Завершенные
                </Dropdown.Item>
              )}

              {filter === "Не завершенные" ? (
                <Dropdown.Item disabled>Не завершенные</Dropdown.Item>
              ) : (
                <Dropdown.Item onClick={() => setFilter("Не завершенные")}>
                  Не завершенные
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>

      <ListGroup>
        {orders.rows?.map(
          ({ id, complete, mobile, createdAt, updatedAt, userId }: IOrder) => (
            <ItemOneOrderInAdmin
              key={id}
              id={id}
              complete={complete}
              mobile={mobile}
              createdAt={createdAt}
              updatedAt={updatedAt}
              userId={userId}
              reRender={reRender}
            />
          )
        )}
        заказы
      </ListGroup>

      <Pagination size="sm" className="mt-4 mb-4" style={{ margin: "0 auto" }}>
        {pages} страницы
      </Pagination>
    </Container>
  );
};

export default Orders;
