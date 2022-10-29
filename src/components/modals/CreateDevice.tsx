// Страница готовая
import React, { FC, useContext, useState, useEffect } from "react";
import { Button, Dropdown, Form, Row, Col, Modal } from "react-bootstrap";
import { Context } from "../..";
import { createDevice, fetchBrands, fetchTypes } from "../../http/deviceApi";
import { observer } from "mobx-react-lite";
import { IBrand, ICreateModalProps, IInfo, IType } from "../../types/types";

// Оборачиваем модальное окно в observer, чтобы мы могли типы(или брэнды)
// выбирать и сразу видеть рендеринг.
const CreateDevice: FC<ICreateModalProps> = observer(({ show, onHide }) => {
  const { device } = useContext(Context);
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [file, setFile] = useState<any | null>(null);
  const [info, setInfo] = useState<IInfo[]>([]);
  // const [type, setType] = useState(null);
  // const [brand, setBrand] = useState(null); эти состояния можно убрать, поскольку
  // в DeviceStore у нас уже есть объекты  this._selectedType = {}
  // и this._selectedBrand = {}, отвечающие за выбранные тип и брэнд

  useEffect(() => {
    // каждый раз, при загрузке модального окна, будем подгружать брэнды и типы
    // из которых в селектах будем выбирать нужные нам тип и брэнд
    fetchTypes().then((data) => device.setTypes(data));
    fetchBrands().then((data) => device.setBrands(data));
  }, [device]);

  // info  =======================================
  const addInfo = () => {
    // Здесь вызываем функцию setInfo, которая изменяет состояние. В неё передаём массив,
    // в нём разворачиваем старый массив информации и добавляем в него новый элемент:
    //   { title: "", description: "", number: Date.now() }.
    // number, своего рода идентификатор, получаем из времени.
    setInfo([...info, { title: "", description: "", number: Date.now() }]);
    console.log(info);
  };

  // Параметром передаём номер number, полученный из времени
  const removeInfo = (number: number | undefined) => {
    // Здесь вызываем функцию setInfo, которая изменяет состояние. По существующему массиву
    // с помощью фунции filter пробегаемся и проверяем: совпадает ли номер элемента
    // с номером, который мы передали параметром.
    setInfo(info.filter((i) => i.number !== number));
    // console.log(info);
  };

  // changeInfo принимает параметрами:
  // 1. ключ - это либо title либо description
  // 2. value - значение, которое по этому ключу мы будем устанавливать
  // 3. number - номер характеристики, у которой значение мы будем изменять
  // Пробегаем по массиву информации
  // Проверяем, если номер совпадает с номером элемента итерации
  // то, тогда мы возвращаем объект, новый объект. Разворачиваем в него характеристику,
  // и по ключу (title либо description) заменяем у неё поле value
  // Если номер не совпадает, то мы возвращаем объект неизменённым
  const changeInfo = (
    key: string,
    value: string,
    number: number | undefined
  ) => {
    setInfo(
      info.map((i) => (i.number === number ? { ...i, [key]: value } : i))
    );
  };

  // В этом случае:  const selectFile = (e) => {
  //                   setFile(e.target.files[0]);
  //                 };
  // компилятор TypeScript не знает, что вы возвращаете inputэлемент, и у нас нет
  // специального Eventкласса для этого. Таким образом, вы можете создать его,
  // как следующий код:
  const selectFile = (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    setFile(file);
  };

  //  остаётся отправлять запрос на сервис
  const addDevice: React.MouseEventHandler<HTMLButtonElement> = () => {
    //  создаём объект formData
    const formData = new FormData();
    // и с помощью функции append передаём первым параметром ключ, а вторым значение
    formData.append("name", name);
    // У price тип: number. Значение для отправки запроса должно быть либо строковым,
    // либо блоковым. Грубо говоря блок - это набор битов, поэтому отправляем файл.
    // Для этого price сконвентируем в строку
    formData.append("price", `${price}`);
    // как "img" передаём file, который потом выбираем из компьютера
    formData.append("img", file);
    // "brandId" и "typeId" получаем из DeviceStore из выбранного элемента,
    // не забываем нам нужен только id, а не целиком объект
    formData.append("brandId", device.selectedBrand.id);
    formData.append("typeId", device.selectedType.id);
    // Массив info невозможно передать, либо строка, либо блок.
    // Поэтому массив перегоняем в строку: JSON.stringify(info)
    // А на сервере эта JSON-строка будет парситься обратно в массив.
    formData.append("info", JSON.stringify(info));

    // Функция createDevice() отправляет запрос на сервис.
    // Передаём formData как параметр функции, и, если запрос прошёл успешно, будем закрывать модалку
    createDevice(formData).then((data) => onHide());
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить устройство
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>
              {device.selectedType.name || "Выберите тип"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {device.types.map((type: IType) => (
                <Dropdown.Item
                  onClick={() => device.setSelectedType(type)}
                  key={type.id}
                >
                  {type.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>
              {device.selectedBrand.name || "Выберите брэнд"}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {device.brands.map((brand: IBrand) => (
                <Dropdown.Item
                  onClick={() => device.setSelectedBrand(brand)}
                  key={brand.id}
                >
                  {brand.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-3"
            placeholder="Введите название устройства"
          />

          <Form.Control
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="mt-3"
            placeholder="Введите стоимость устройства"
            type="number"
          />
          <Form.Control className="mt-3" type="file" onChange={selectFile} />
          <hr />

          <h4>Характеристики</h4>
          {/* onClick={() => addInfo()} одно и тоже  onClick={addInfo}  */}
          <Button
            className="mt-1"
            variant={"outline-dark"}
            onClick={() => addInfo()}
          >
            Добавить новое свойство
          </Button>

          {info.map((i) => (
            <Row className="mt-4" key={i.number}>
              <Col md={4}>
                <Form.Control
                  placeholder="Введите название свойства"
                  value={i.title}
                  onChange={
                    (e) =>
                      //  const changeInfo = (key, value, number) => ...
                      changeInfo("title", e.target.value, i.number)
                    //  номер получаем из элемента текущей итерации
                  }
                />
              </Col>

              <Col md={4}>
                <Form.Control
                  placeholder="Введите описание свойства"
                  value={i.description}
                  onChange={
                    (e) =>
                      //  const changeInfo = (key, value, number) => ...
                      changeInfo("description", e.target.value, i.number)
                    //  номер получаем из элемента текущей итерации
                  }
                />
              </Col>

              <Col md={4}>
                <Button
                  variant={"outline-danger"}
                  onClick={() => removeInfo(i.number)}
                  // Запомни это. Без такой конфигурации этот onClick работать не будет
                >
                  Удалить
                </Button>
              </Col>
            </Row>
          ))}
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Закрыть
        </Button>
        <Button variant="outline-success" onClick={addDevice}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateDevice;
