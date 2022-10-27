// сделать const click = async () =>
import { observer } from "mobx-react-lite";
import React, { FC, useContext, useState } from "react";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { Context } from "..";
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "../utils/consts";
import { Container, Card, Form, Row, Button } from "react-bootstrap";

const Auth: FC = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const history = useHistory();
  const isLogin: boolean = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // сравни типизацию changeEmail и changePassword
  const changeEmail: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value);
  };

  const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const click = () => {
    console.log(click);
  };

  // // так будет
  //   const click = async () => {
  //   try {
  //     let data;
  //     if (isLogin) {
  //       data = await login(email, password);
  //     } else {
  //       data = await registration(email, password);
  //       console.log(data);
  //     }
  //     user.setUser(user);
  //     user.setIsAuth(true);
  //     /* если регистрация и логин прошли успешно,
  //      то делаем редирект на стриничку магазина */
  //     history.push(SHOP_ROUTE);
  //   } catch (e) {
  //     alert(e.response.data.message);
  //   }
  // };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: 600 }} className={"p-5"}>
        <h2 className="m-auto">{isLogin ? "Авторизация" : "Регистрация"}</h2>
        <Form className="d-flex flex-column">
          <Form.Control
            value={email}
            onChange={changeEmail}
            className="mt-3"
            placeholder="Введите ваш email"
          />

          <Form.Control
            value={password}
            onChange={changePassword}
            className="mt-3"
            placeholder="Введите ваш пароль"
            type="password"
          />

          <Row className="d-flex justify-content-between align-items-center mt-3 pl-3 pr-3">
            {isLogin ? (
              <div>
                Нет аккаунта?
                <NavLink to={REGISTRATION_ROUTE} className={"ml-2"}>
                  Зарегистрируйся
                </NavLink>
              </div>
            ) : (
              <div>
                Есть аккаунт?
                <NavLink to={LOGIN_ROUTE} className={"ml-2"}>
                  Войдите
                </NavLink>
              </div>
            )}
            <Button
              onClick={click}
              variant="outline-success"
              className="mt-3 align-self-end"
            >
              {isLogin ? "Войти" : "Регистрация"}
            </Button>
          </Row>
        </Form>
      </Card>
    </Container>
    // http://localhost:3000/login
  );
});
export default Auth;
