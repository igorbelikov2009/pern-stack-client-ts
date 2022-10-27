// страница готовая
import { observer } from "mobx-react-lite";
import React, { FC, useContext } from "react";
import { Card, Row } from "react-bootstrap";
import { Context } from "..";
import { IBrand } from "../types/types";

const BrandBar: FC = observer(() => {
  // здесь получаем DeviceStore() из контекста
  const { device } = useContext(Context);
  //   console.log(device.brands);

  return (
    <Row className="d-flex">
      {device.brands.map((brand: IBrand) => (
        <Card
          style={{ cursor: "pointer" }}
          border={brand.id === device.selectedBrand.id ? "danger" : "light"}
          onClick={() => device.setSelectedBrand(brand)}
          key={brand.id}
          className="p-3"
        >
          {brand.name}
        </Card>
      ))}
    </Row>
  );
});

export default BrandBar;
