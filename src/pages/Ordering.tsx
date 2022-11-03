// Страница готовая
import React, { FC, useContext, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Context } from "..";
import { sendOrder } from "../http/ordersApi";
import { SHOP_ROUTE } from "../utils/consts";

const Ordering: FC = () => {
  const { basket, user } = useContext(Context);
  const [phone, setPhone] = useState<string | number | string[] | undefined>(
    undefined
  );
  const history = useHistory();

  const buy = () => {
    console.log("button buy");
    let order = {
      mobile: phone,
      basket: basket.Basket,
      auth: false,
    };

    if (user.isAuth) {
      order.auth = true;
    }

    sendOrder(order).then((data) => {
      console.log(data, "Купить");
      basket.setDeleteAllDeviceFromBasket();
      history.push(SHOP_ROUTE);
    });
  };

  return (
    <>
      <Form>
        <Form.Control
          placeholder="Введите свой телефон..."
          value={phone}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPhone(e.target.value)
          }
        />
      </Form>
      <Row className="mt-3">
        <Col xs={12}>
          <Button variant="secondary" onClick={buy}>
            Купить
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default Ordering;
