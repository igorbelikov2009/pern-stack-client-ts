// страница готовая
import { observer } from "mobx-react-lite";
import React, { FC, useContext } from "react";
import { ListGroup } from "react-bootstrap";
import { Context } from "..";
import { IType } from "../types/types";

const TypeBar: FC = observer(() => {
  // здесь получаем DeviceStore() из контекста
  const { device } = useContext(Context);
  //   console.log(device.types);

  const getAllDevices = () => {
    device.setSelectedType("all");
    device.setSelectedBrand("all");
  };

  return (
    <ListGroup>
      <ListGroup.Item
        style={{ cursor: "pointer" }}
        active={"all" === device.selectedType}
        onClick={getAllDevices}
      >
        Все типы устройств
      </ListGroup.Item>

      {device.types.map((type: IType) => (
        <ListGroup.Item
          style={{ cursor: "pointer" }}
          active={type.id === device.selectedType.id}
          // active даёт нам изменение цвета при клике через bootstrap
          key={type.id}
          onClick={() => device.setSelectedType(type)}
        >
          {type.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
});

export default TypeBar;
