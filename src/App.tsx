// Осталась загрузка корзины useEffect(() => {.....}
import React, { FC, useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { observer } from "mobx-react-lite";

import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { Spinner } from "react-bootstrap";
import { Context } from ".";
import { check } from "./http/userApi";

const App: FC = observer(() => {
  // Поскольку нам здесь нужно следить за изменениями состояний { user, basket },
  // оборачиваем App в функцию observer()
  // Получаем UserStore и BasketStore
  const { user, basket } = useContext(Context);
  const [loading, setLoading] = useState<boolean>(true);

  // check(). Проверяем авторизацию один раз при первом открытии приложения.
  // Если массив зависимостей пустой, то функция отработает лишь единожды,
  // при первом запуске приложения.
  useEffect(() => {
    // Если check() выполнилась успешно, то....
    check()
      .then((data) => {
        // значит пользователь залогинился
        user.setUser(true);
        user.setIsAuth(true);
        // не важно, произошла ошибка или нет(finally), делаем setLoading(false)
      })
      .finally(() => {
        setLoading(false);
        // console.log("loading = false");
      });
  }, [user]);

  if (loading) {
    return <Spinner animation="grow" />;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
