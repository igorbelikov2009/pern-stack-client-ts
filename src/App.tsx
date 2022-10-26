import React, { FC } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import { observer } from "mobx-react-lite";
import NavBar from "./components/NavBar";

const App: FC = observer(() => {
  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
