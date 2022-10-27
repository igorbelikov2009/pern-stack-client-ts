// страница готовая
import { observer } from "mobx-react-lite";
import React, { FC, useContext } from "react";
import { Row } from "react-bootstrap";
import { Context } from "..";
import { IDevice } from "../types/types";
import DeviceItem from "./DeviceItem";

const DeviceList: FC = observer(() => {
  // здесь получаем DeviceStore() из контекста
  const { device } = useContext(Context);

  return (
    <Row className="d-flex">
      {device.devices.map((device: IDevice) => (
        <DeviceItem key={device.id} device={device} />
      ))}
    </Row>
  );
});

export default DeviceList;
