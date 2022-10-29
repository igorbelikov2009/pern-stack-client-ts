// страница готовая
import { observer } from "mobx-react-lite";
import React, { FC, useContext } from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { NavLink, useHistory } from "react-router-dom";
import { Context } from "..";
import {
  ADMIN_ROUTE,
  LOGIN_ROUTE,
  ORDERS_ROUTE,
  SHOP_ROUTE,
} from "../utils/consts";
import BasketNavBar from "./BasketNavBar";

const NavBar: FC = observer(() => {
  // Без observer() не будет отслеживания за изменениями в store.
  // onClick={() => user.setIsAuth(true)} работать не будет

  // здесь получаем UserStore() и BasketStore() из контекста
  const { user, basket } = useContext(Context);

  const history = useHistory();
  /* 
   useHistory поменялсь на useNavigate в react-router-dom v6
Из за этого всё надо менять так:
import { useNavigate } from "react-router-dom";
const navigate = useNavigate();
onClick={() => navigate(DEVICE_ROUTE + "/" + device.id)}
В новой версий не надо вызывать push a можнo сразу передать ссылку
  */

  // выход из авторизации
  const logOut: () => void = () => {
    user.setUser({});
    user.setIsAuth(false);
    localStorage.removeItem("token");
    basket.resetBasket(); // смотри BasketStory.js
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <NavLink style={{ color: "white" }} to={SHOP_ROUTE}>
          Магазин "Купи девайс"
        </NavLink>

        {user.isAuth ? (
          <Nav className="ml-auto" style={{ color: "white" }}>
            <BasketNavBar />

            {user.isAuth && user.role === "ADMIN" && (
              <Button
                className={"mr-3"}
                variant={"outline-light"}
                onClick={() => {
                  history.push(ORDERS_ROUTE);
                }}
              >
                Заказы
              </Button>
            )}
            {user.isAuth && (
              <Button
                className={"mr-3"}
                variant={"outline-light"}
                onClick={() => {
                  history.push(ORDERS_ROUTE);
                }}
              >
                Заказы
              </Button>
            )}

            <Button
              variant={"outline-light"}
              onClick={() => history.push(ADMIN_ROUTE)}
            >
              Админ панель
            </Button>

            <Button
              variant={"outline-light"}
              onClick={() => logOut()}
              className={"ml-2"}
            >
              Выйти
            </Button>
          </Nav>
        ) : (
          <Nav className="ml-auto" style={{ color: "white" }}>
            <BasketNavBar />

            <Button
              variant={"outline-light"}
              onClick={() => history.push(LOGIN_ROUTE)}
            >
              Авторизация
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
});

export default NavBar;
