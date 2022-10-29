import React, { FC, useContext, useState } from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import bigStar from "../assets/bigStar.png";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { IInfo } from "../types/types";

const DevicePage: FC = observer(() => {
  // здесь получаем UserStore() и BasketStore()  из контекста
  const { user, basket } = useContext(Context);
  // const [device, setDevice] = useState({ info: [] });
  const device = {
    id: 1,
    name: "Iphone 12 pro",
    price: 25000,
    rating: 5,
    img: "image",
  };

  const description: IInfo[] = [
    { id: 1, title: "Оперативная память", description: "5 гб" },
    { id: 2, title: "Камера", description: "12 мп" },
    { id: 3, title: "Процессор", description: "Пентиум 3" },
    { id: 4, title: "Кол-во ядер", description: "2" },
    { id: 5, title: "Аккумулятор", description: "4000" },
  ];

  return (
    <Container className="mt-3">
      <Row>
        <Col md={4}>
          <Image width={300} height={300} src={device.img} />
        </Col>

        <Col md={4}>
          <Row className="d-flex flex-column align-items-center">
            <h2>{device.name}</h2>
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                background: `url(${bigStar}) no-repeat`,
                backgroundSize: "cover",
                width: 180,
                height: 180,
                fontSize: 28,
              }}
            >
              {device?.rating || 0}
            </div>
          </Row>
        </Col>

        <Col md={4}>
          <Card
            className="d-flex flex-column align-items-center justify-content-around"
            style={{
              width: 300,
              height: 300,
              fontSize: 32,
              border: "5px solid lightgray",
            }}
          >
            <h3> От {device?.price || 0} руб</h3>
            <Button variant="outline-dark"> Добавить в корзину</Button>
          </Card>
        </Col>
      </Row>

      <Row className="d-flex flex-column m-3">
        <h1>Характеристики</h1>
        {description.map((info, index) => (
          <Row
            key={info.id}
            style={{
              background: index % 2 === 0 ? "lightgray" : "transparent",
              padding: 10,
            }}
          >
            {info.title}: {info.description}
          </Row>
        ))}
      </Row>
    </Container>
  );
});

export default DevicePage;
