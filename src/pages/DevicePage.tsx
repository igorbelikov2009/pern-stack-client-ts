// Страница готовая
import React, { FC, useContext, useEffect, useState } from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import bigStar from "../assets/bigStar.png";
import { useParams } from "react-router-dom";
import {
  addDeviceToBasket,
  addRating,
  checkRating,
  fetchOneDevice,
} from "../http/deviceApi";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { IInfo, IDevice } from "../types/types";
import RatingStars from "../components/RatingStars";

const DevicePage: FC = observer(() => {
  // здесь получаем UserStore() и BasketStore()  из контекста
  const { user, basket } = useContext(Context);
  const [device, setDevice] = useState<any>({ info: [] });
  const [resRate, setResRate] = useState<string>("");
  const [isAccessRating, setSsAccessRating] = useState<boolean>(false);

  // Для отправления запроса fetchOneDevice() на сервер, нам надо знать id устройства,
  // которое мы будем получать из хука useParams();
  // useParams является общим. Нужно указать для typescript, какие параметры мы используем,
  // указав в дженерике значение. В нашем случае это:
  const { id } = useParams<{ id?: string }>();

  // При открытии страницы, каждый раз, единожды мы будем подгружать выбранное устройство,
  // на которое нажали
  useEffect(() => {
    fetchOneDevice(Number(id)).then((data: any) => setDevice(data));
    if (user.isAuth) {
      checkRating({ deviceId: id }).then((res) => setSsAccessRating(res.allow));
    }
  }, [id, resRate, user.isAuth]);

  const isDeviceInBasket = () => {
    const findDevice = basket.Basket.findIndex(
      ///   (item: { id: number })
      (item: { id: number }) => Number(item.id) === Number(device.id)
    );
    return findDevice < 0;
  };

  const addDeviceInBasket = (device: IDevice) => {
    if (user.isAuth) {
      addDeviceToBasket(device).then(() => {
        // console.log(basket);
        basket.setBasket(device, true);
      });
    } else {
      basket.setBasket(device);
    }
  };

  const ratingChanged = (rate: any) => {
    addRating({
      rate,
      deviceId: id,
    }).then((res) => {
      setResRate(res);
    });
  };
  return (
    <Container className="mt-3">
      <Row>
        <Col md={4}>
          <Image
            width={300}
            height={300}
            src={process.env.REACT_APP_API_URL + device.img}
          />
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
            <RatingStars
              ratingChanged={ratingChanged}
              ratingVal={device?.rating || 0}
              isAuth={user.isAuth}
              isAccessRating={isAccessRating}
            />
            {resRate}
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
            {isDeviceInBasket() ? (
              <Button
                variant="outline-dark"
                onClick={() => addDeviceInBasket(device)}
              >
                Добавить в корзину
              </Button>
            ) : (
              <Button variant="outline-dark" disabled>
                Устройство уже в корзине
              </Button>
            )}
          </Card>
        </Col>
      </Row>

      <Row className="d-flex flex-column m-3">
        <h1>Характеристики</h1>
        {device.info.map((info: IInfo, index: number) => (
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
