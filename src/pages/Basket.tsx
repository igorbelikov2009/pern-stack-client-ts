// Страница готовая
import React, { FC, useContext } from "react";
import { observer } from "mobx-react-lite";

import { Context } from "..";
import { Button, Col, Image, Row } from "react-bootstrap";
import OneItemInBasket from "../components/OneItemInBasket";

import emptyBasket from "../assets/emptyBasket.jpg";
import { ORDERING_ROUTE } from "../utils/consts";
import { NavLink } from "react-router-dom";
import { IDevice } from "../types/types";

const Basket: FC = observer(() => {
  const { basket } = useContext(Context);

  if (basket.Basket.length === 0) {
    return (
      <div className="d-flex flex-column align-items-center mt-5">
        <Image src={emptyBasket} />
        <div className="text-center mt-5" style={{ fontSize: 28 }}>
          <b>Корзина для покупок пустая</b>
        </div>
      </div>
    );
  }

  return (
    <>
      <br />
      <NavLink to={ORDERING_ROUTE}>
        <Button>Проверить в заказах</Button>
      </NavLink>
      <Row className="mt-3">
        <Col xs={12}>
          {basket.Basket.map((device: IDevice) => (
            <OneItemInBasket key={device.id} device={device} />
          ))}
        </Col>
      </Row>
    </>
  );
});

export default Basket;
