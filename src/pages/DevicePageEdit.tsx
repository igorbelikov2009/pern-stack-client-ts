// Страница готовая
import { observer } from "mobx-react-lite";
import React, { FC, useContext, useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Dropdown,
  Form,
  Image,
  Modal,
  Row,
} from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { Context } from "..";
import {
  fetchDeleteDevice,
  fetchOneDevice,
  updateDevices,
} from "../http/deviceApi";
import { IBrand, IInfo, IType } from "../types/types";
import { ADMIN_ROUTE } from "../utils/consts";

const DevicePageEdit: FC = observer(() => {
  const { device } = useContext(Context);
  const history = useHistory();
  const { id } = useParams<{ id?: string }>();
  const [deviceCurr, setDeviceCurr] = useState<any>({}); // ?????????????????
  const [showMsg, setShowMsg] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("");
  const [selectBrand, setSelectBrand] = useState<any>({});
  const [selectType, setSelectType] = useState<any>({});
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [img, setImg] = useState<string>("");
  const [imgFile, setImgFile] = useState<any | null>(null);
  const [info, setInfo] = useState<IInfo[]>([]);
  const [isDisabledPutBtn, setDisabledPutBtn] = useState<boolean>(true);

  const deleteDevice = () => {
    fetchDeleteDevice(Number(id)).then(() => {
      history.push(ADMIN_ROUTE);
    });
  };

  const [show, setShow] = useState<boolean>(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const imgHandler = (event: React.ChangeEvent) => {
    event.preventDefault();

    const reader: any = new FileReader();
    reader.onload = () => {
      setImg(reader.result);
    };

    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    reader.readAsDataURL(file);
    setImgFile(file);
  };

  // info
  const addInfo = () => {
    setInfo([...info, { title: "", description: "", id: Date.now() }]);
    // // console.log(info);
  };

  // const removeInfo = (id) => {
  //   setInfo(info.filter((i) => i.id !== id));
  //   // // console.log(info);
  // };

  const changeInfo = (key: string, value: string, id: number | undefined) => {
    setInfo(info.map((i) => (i.id === id ? { ...i, [key]: value } : i)));
    // console.log(info);
  };

  //  остаётся отправлять запрос на сервис
  const putDevice = () => {
    //  создаём объект formData
    const formData = new FormData();
    // и с помощью функции append передаём первым параметром ключ, а вторым значение
    formData.append("name", name);
    // У price тип: number. Значение для отправки запроса должно быть либо строковым,
    // либо блоковым. Грубо говоря блок - это набор битов, поэтому отправляем файл.
    // Для этого price сконвентируем в строку
    formData.append("price", `${price}`);
    // как "img" передаём file, который потом выбираем из компьютера
    formData.append("img", imgFile);

    // не забываем нам нужен только id, а не целиком объект
    formData.append("brandId", selectBrand.id);
    formData.append("typeId", selectType.id);
    // Массив info невозможно передать, либо строка, либо блок.
    // Поэтому массив перегоняем в строку: JSON.stringify(info)
    // А на сервере эта JSON-строка будет парситься обратно в массив.
    formData.append("info", JSON.stringify(info));

    // Функция updateDevices() отправляет запрос на сервис.
    // Передаём id и formData как параметры функции, и, если запрос прошёл успешно,
    updateDevices(Number(id), formData).then((data) => {
      // // console.log(data);
      // будем показывать сообщение
      setShowMsg(true);
      // с обновлённым девайсом
      setMsg(data);
      // через 500 ms закрываем сообщение
      setTimeout(() => setShowMsg(false), 500);
      // ещё через 3000 ms переходим на страницу админа
      setTimeout(() => {
        history.push(ADMIN_ROUTE);
      }, 3000);
    });
  };

  // проверяем наличие характеристик у девайса
  const checkInfo = () => {
    let isInfoEmpty = true;
    info.forEach((item) => {
      for (let key in item) {
        if (key === "title" || key === "description") {
          if (!item[key]) {
            isInfoEmpty = false;
          }
        }
      }
    });
    return isInfoEmpty;
  };

  useEffect(() => {
    let checkInfoVal = false;
    if (deviceCurr.info && deviceCurr.info.length !== info.length) {
      checkInfoVal = checkInfo();
    }

    if (deviceCurr && deviceCurr.brand && deviceCurr.type) {
      if (
        deviceCurr.brand.name !== selectBrand.name ||
        deviceCurr.type.name !== selectType.name ||
        deviceCurr.name !== name ||
        deviceCurr.price !== price ||
        checkInfoVal ||
        img
      ) {
        setDisabledPutBtn(false);
      } else {
        setDisabledPutBtn(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, selectBrand, selectType, price, img, info, deviceCurr]);

  useEffect(() => {
    fetchOneDevice(Number(id)).then((data: any) => {
      // // console.log(data);
      setDeviceCurr(data);
      setSelectBrand(data.brand);
      setSelectType(data.type);
      setName(data.name);
      setPrice(data.price);
      setInfo(data.info);
      // console.log(data.info);
    });
  }, [id]);

  return (
    <Container className="mt-3">
      {showMsg && (
        <Row className="d-flex justify-content-center ">
          <h1 className="text-center"> {msg} </h1>
        </Row>
      )}

      {!showMsg && (
        <div>
          <Row>
            <Col xs={12}>
              <Row>
                <Col xs={2} className="d-flex align-items-center">
                  id:
                </Col>
                <Col xs={10}>{deviceCurr.id}</Col>
              </Row>

              <Row>
                <Col xs={2} className="d-flex align-items-center">
                  Брэнд:
                </Col>
                <Col xs={10}>
                  <Dropdown className="mt-2 mb-2">
                    <Dropdown.Toggle>
                      {selectBrand.name || "Выберите брэнд"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {device.brands.map((brand: IBrand) => {
                        return brand.name === selectBrand.name ? (
                          <Dropdown.Item key={brand.id} disabled>
                            {brand.name}
                          </Dropdown.Item>
                        ) : (
                          <Dropdown.Item
                            key={brand.id}
                            onClick={() => setSelectBrand(brand)}
                          >
                            {brand.name}
                          </Dropdown.Item>
                        );
                      })}
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
              </Row>

              <Row>
                <Col xs={2} className="d-flex align-items-center">
                  Типы:
                </Col>
                <Col xs={10}>
                  <Dropdown className="mt-2 mb-2">
                    <Dropdown.Toggle>
                      {selectType.name || "Выберите тип"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {device.types.map((type: IType) => {
                        return type.name === selectType.name ? (
                          <Dropdown.Item key={type.id} disabled>
                            {type.name}
                          </Dropdown.Item>
                        ) : (
                          <Dropdown.Item
                            key={type.id}
                            onClick={() => setSelectType(type)}
                          >
                            {type.name}
                          </Dropdown.Item>
                        );
                      })}
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
              </Row>

              <Row>
                <Col xs={2} className="d-flex align-items-center">
                  Название:
                </Col>
                <Col xs={7}>
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Col>

                <Col xs={3} className="d-flex align-items-center">
                  {name.length === 0 && (
                    <b style={{ color: "red" }}>Введите название устройства</b>
                  )}
                </Col>
              </Row>

              <Row className="mt-2">
                <Col xs={2} className="d-flex align-items-center">
                  Стоимость:
                </Col>

                <Col xs={7}>
                  <Form.Control
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                  />
                </Col>

                <Col xs={3} className="d-flex align-items-center">
                  {price === 0 && (
                    <b style={{ color: "red" }}>Введите стоимость устройства</b>
                  )}
                </Col>
              </Row>

              <Row className="mt-4">
                <Col
                  xs={6}
                  className="d-flex flex-column justify-content-center text-center"
                >
                  Текущая картинка: <br />
                  <Image
                    style={{ margin: "0 auto", marginTop: 15 }}
                    width={150}
                    src={process.env.REACT_APP_API_URL + deviceCurr.img}
                  />
                </Col>

                {img && (
                  <Col
                    xs={6}
                    className="d-flex flex-column justify-content-center text-center"
                  >
                    Новая картинка: <br />
                    <Image
                      style={{ margin: "0 auto", marginTop: 15 }}
                      width={150}
                      height={150}
                      src={img}
                    />
                  </Col>
                )}
              </Row>

              <Form.Control
                className="mt-3"
                type="file"
                onChange={imgHandler}
              />
              <hr />

              <Row className="d-flex flex-column m-3">
                <h4>Характеристики</h4>

                <Button
                  className="mt-1"
                  variant={"outline-dark"}
                  onClick={() => addInfo()}
                >
                  Добавить новое свойство
                </Button>

                {info.map((i, index) => (
                  <Row className="mt-4" key={index}>
                    <Col md={4}>
                      <Form.Control
                        placeholder="Введите название свойства"
                        value={i.title}
                        onChange={(e) =>
                          changeInfo("title", e.target.value, i.id)
                        }
                      />
                      {!info[index].title && (
                        <b style={{ color: "red" }}>
                          Введите название свойства
                        </b>
                      )}
                    </Col>

                    <Col md={4}>
                      <Form.Control
                        placeholder="Введите описание свойства"
                        value={i.description}
                        onChange={(e) =>
                          changeInfo("description", e.target.value, i.id)
                        }
                      />
                      {!info[index].description && (
                        <b style={{ color: "red" }}>
                          Введите описание свойства
                        </b>
                      )}
                    </Col>

                    <Col md={4}>
                      {/* <Button
                        variant={"outline-danger"}
                        onClick={() => {
                          removeInfo(i.id);
                        }}
                        // Запомни это. Без такой конфигурации этот onClick работать не будет
                      >
                        Удалить
                      </Button> */}
                    </Col>
                  </Row>
                ))}
              </Row>

              <Row className="mt-5">
                <Col xs={12}>
                  {isDisabledPutBtn ? (
                    <Button disabled>Обновить устройство</Button>
                  ) : (
                    <Button onClick={putDevice}>Обновить устройство</Button>
                  )}
                  <Button
                    className="ml-5"
                    variant="danger"
                    onClick={handleShow}
                  >
                    Удалить устройство
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>

          <Modal show={show} onHide={handleClose} size="lg" centered>
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Удалить это устройство {deviceCurr.id}?
              </Modal.Title>
            </Modal.Header>

            <Modal.Footer>
              <Button variant="outline-danger" onClick={handleClose}>
                Закрыть
              </Button>
              <Button variant="outline-success" onClick={deleteDevice}>
                Удалить
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </Container>
  );
});

export default DevicePageEdit;
