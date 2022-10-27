import { observer } from "mobx-react-lite";
import React, { FC, useContext } from "react";
import { Context } from "..";
import { Container, Row, Col } from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";

const Shop: FC = observer(() => {
  // здесь получаем DeviceStore() из контекста
  const { device } = useContext(Context);
  // console.log(device);

  return (
    <Container>
      <Row className="mt-3">
        <Col md={3}>
          <TypeBar />
        </Col>

        <Col md={9}>
          <BrandBar />
          <DeviceList />
          Pages
        </Col>
      </Row>
    </Container>
  );
});

export default Shop;
