import React, { FC, useContext, useState } from "react";
import { Button, Dropdown, Form, Row, Col, Modal } from "react-bootstrap";
import { Context } from "../..";
import { IBrand, ICreateModalProps, IInfo, IType } from "../../types/types";
import { observer } from "mobx-react-lite";

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

  // info  =======================================
  const addInfo = () => {
    setInfo([...info, { title: "", description: "", number: Date.now() }]);
    console.log(info);
  };
  const removeInfo = (number: number | undefined) => {
    setInfo(info.filter((i) => i.number !== number));
    // console.log(info);
  };

  // changeInfo принимает параметрами:
  // 1. ключ - это либо title либо description
  // 2. value - значение, которое по этому ключу мы будем устанавливать
  // 3. number - номер характеристики, у которой значение мы будем изменять
  // Пробегаем по массиву информации
  // Проверяем, если номер совпадает с номером элемента итерации
  // то, тогда мы возвращаем объект, новый объект. Разворачиваем в него характеристику, и по ключу (title либо description) заменяем у неё поле value
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

  const addDevice: React.MouseEventHandler<HTMLButtonElement> = () => {
    console.log("Added");
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
