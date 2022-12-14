// страница готовая
import React, { FC } from "react";
import { Card, Col, Image } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import star from "../assets/star.png";
import { IDevice } from "../types/types";
import { DEVICE_ROUTE } from "../utils/consts";

interface DeviceItemProps {
  device: IDevice;
}

const DeviceItem: FC<DeviceItemProps> = ({ device }) => {
  const history = useHistory();
  // console.log(device.id);

  return (
    <Col
      md={3}
      className={"mt-3"}
      onClick={() => {
        history.push(DEVICE_ROUTE + "/" + device.id);
        // console.log(device.id);
      }}
    >
      <Card style={{ width: 150, cursor: "pointer" }} border={"light"}>
        <Image
          width={150}
          height={150}
          src={process.env.REACT_APP_API_URL + device.img}
        />
        <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
          <div>{device.price} руб</div>
          <div className="d-flex align-items-center">
            <div>{device.rating}</div>
            <Image width={18} height={18} src={star} />
          </div>
        </div>
        <div>{device.name}</div>
      </Card>
    </Col>
  );
};

export default DeviceItem;
