import React, { FC, useEffect, useState } from "react";
import { Button, Dropdown, Modal } from "react-bootstrap";
import {
  deleteBrand,
  deleteType,
  fetchBrands,
  fetchTypes,
} from "../../http/deviceApi";
import { DeleteBrandOrTypeProps, IBrand, IType } from "../../types/types";

const DeleteBrandOrType: FC<DeleteBrandOrTypeProps> = ({
  show,
  onHide,
  showSuccessMsgFunc,
}) => {
  const [brandOrType, setBrandOrType] = useState<string>("Брэнд");
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [types, setTypes] = useState<IType[]>([]);

  const [selectBrand, setSelectBrand] = useState<any>({
    name: "Бренд не выбран",
  });
  const [selectType, setSelectType] = useState<any>({ name: "Тип не выбран" });
  const [showMsgErr, setShowMsgErr] = useState<boolean>(false);
  const [msgErr, setMsgErr] = useState<string>("");

  useEffect(() => {
    fetchTypes().then((data: IType[]) => setTypes(data));
    fetchBrands().then((data: IBrand[]) => setBrands(data));
  }, []);

  const Delete = async () => {
    if (brandOrType === "Брэнд") {
      if (selectBrand.name !== "Бренд не выбран") {
        await deleteBrand(selectBrand.id).then((data) => {
          showSuccessMsgFunc(data);
          onHide();
          setSelectBrand({ name: "Бренд не выбран" });
        });
      } else {
        setMsgErr("Пожалуйста, выберите бренд");
        setShowMsgErr(true);
      }
    } else {
      if (selectType.name !== "Тип не выбран") {
        await deleteType(selectType.id).then((data) => {
          showSuccessMsgFunc(data);
          onHide();
          setSelectType({ name: "Тип не выбран" });
        });
      } else {
        setMsgErr("Пожалуйста, выберите Тип");
        setShowMsgErr(true);
      }
    }
  };

  useEffect(() => setShowMsgErr(false), [selectType, selectBrand, brandOrType]);

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Удалить тип или брэнд</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {showMsgErr && (
          <>
            <p style={{ color: "red", textAlign: "center" }}>{msgErr}</p>
          </>
        )}
        Выберите категорию:
        <Dropdown className="mb-3" style={{ margin: "0 auto" }}>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {brandOrType}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {brandOrType === "Брэнд" ? (
              <Dropdown.Item disabled>Бренд</Dropdown.Item>
            ) : (
              <Dropdown.Item onClick={() => setBrandOrType("Брэнд")}>
                Бренд
              </Dropdown.Item>
            )}
            {brandOrType === "Тип" ? (
              <Dropdown.Item disabled>Тип</Dropdown.Item>
            ) : (
              <Dropdown.Item onClick={() => setBrandOrType("Тип")}>
                Тип
              </Dropdown.Item>
            )}
          </Dropdown.Menu>
        </Dropdown>
        Выберите пункт из {brandOrType === "Брэнд" ? "Брэнд" : "Тип"}
        <Dropdown className="mb-3" style={{ margin: "0 auto" }}>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {brandOrType === "Брэнд" ? selectBrand.name : selectType.name}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {brandOrType === "Брэнд"
              ? brands.map(({ id, name }) =>
                  selectBrand.name === name ? (
                    <Dropdown.Item disabled key={id}>
                      {name}
                    </Dropdown.Item>
                  ) : (
                    <Dropdown.Item
                      key={id}
                      onClick={() => setSelectBrand({ id, name })}
                    >
                      {name}
                    </Dropdown.Item>
                  )
                )
              : types.map(({ id, name }) =>
                  selectType.name === name ? (
                    <Dropdown.Item disabled key={id}>
                      {name}
                    </Dropdown.Item>
                  ) : (
                    <Dropdown.Item
                      key={id}
                      onClick={() => setSelectType({ id, name })}
                    >
                      {name}
                    </Dropdown.Item>
                  )
                )}
          </Dropdown.Menu>
        </Dropdown>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Закрыть
        </Button>
        <Button variant="outline-success" onClick={Delete}>
          Удалить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteBrandOrType;
