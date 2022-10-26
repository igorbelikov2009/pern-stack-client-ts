// страница готовая
import React, { FC, useContext } from "react";
import { Image } from "react-bootstrap";
import shop_cart from "../assets/shopping-basket.png";
import { NavLink } from "react-router-dom";
import { Context } from "..";
import { observer } from "mobx-react-lite";
import { BASKET_ROUTE } from "../utils/consts";

const BasketNavBar: FC = observer(() => {
  const { basket } = useContext(Context);

  return (
    <div className="d-flex align-items-center mr-3">
      <NavLink to={BASKET_ROUTE} className="d-flex align-items-center">
        <Image
          src={shop_cart}
          style={{ width: "100%", maxWidth: 30 }}
          alt="basket"
        />
        <div
          className="ml-2"
          style={{ textDecoration: "none", color: "white" }}
        >
          {basket.Price} руб.
        </div>
      </NavLink>
    </div>
  );
});

export default BasketNavBar;
