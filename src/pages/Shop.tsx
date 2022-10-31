// Страница готовая
import { observer } from "mobx-react-lite";
import React, { FC, useContext, useEffect } from "react";
import { Context } from "..";
import { Container, Row, Col } from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import { fetchBrands, fetchDevices, fetchTypes } from "../http/deviceApi";
import Pages from "../components/Pages";

const Shop: FC = observer(() => {
  // здесь получаем DeviceStore() из контекста
  const { device } = useContext(Context);
  // console.log(device);

  // Единожды, при открытии страницы Shop, нам необходимо подгружать устройства.
  // В случае успешного запроса, вызываем device.setTypes из DeviceStore.js через observer()
  // и передаём туда то, что нам вернулось в запросе.
  // Так же вызываем device.setBrands и передаём туда то, что нам вернулось в запросе.

  useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data));
    fetchBrands().then((data) => device.setBrands(data));
    // После получения товара, нам надо посчитать, сколько товара мы получили, чтобы посчитать количество страниц
    // Смотри deviceApi функцию fetchDevices = async (typeId, brandId, page, limit = 5)
    fetchDevices(null, null, 1, 9).then((data) => {
      device.setDevices(data.rows);
      // data.rows из бэкенда. Всё дело в том, что мы добавляли пагинацию на получение девайсов
      // и, помимо самих девайсов, нам так же приходит их количество.
      // Поэтому здесь девайс мы получаем из поля rows (data.rows)
      device.setTotalCount(data.count); // общее количество товара находится в поле (count) в ответе от сервера
      // смотри DeviceStore: setTotalCount(count) { this._totalCount = count }
    });
    // setBrands(), setTypes() и setDevices() из контекста смотри index.js device: new DeviceStore()
  }, [device]);

  // Чтобы менять содержимое страницы магазина при нажатии на номер страницы в пагинации( на стр. Pages)
  // создаём новый useEffect(),
  // useEffect() вторым параметром принимает массив зависимостей. Передаём в него номер страницы [device.page].
  // Теперь, при каждой смене номера страницы, будет вызываться внутренняя функция fetchDevices() (первый параметр),
  // и будет меняться содержимое страницы магазина
  useEffect(() => {
    if (device.selectedType === "all") {
      fetchDevices(null, device.selectedBrand.id, device.page, 9).then(
        (data) => {
          device.setDevices(data.rows);
          device.setTotalCount(data.count);
        }
      );
    } else {
      // Смотри deviceApi на параметры функции fetchDevices = async (typeId, brandId, page, limit = 5)
      fetchDevices(
        device.selectedType.id,
        device.selectedBrand.id,
        device.page,
        9
      ).then((data) => {
        device.setDevices(data.rows);
        device.setTotalCount(data.count);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [device.page, device.selectedType, device.selectedBrand]);

  return (
    <Container>
      <Row className="mt-3">
        <Col md={3}>
          <TypeBar />
        </Col>

        <Col md={9}>
          <BrandBar />
          <DeviceList />
          <Pages />
        </Col>
      </Row>
    </Container>
  );
});

export default Shop;
