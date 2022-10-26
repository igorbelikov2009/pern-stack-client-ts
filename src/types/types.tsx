export interface IRoute {
  path: string;
  Component: React.FC<{}>;
}

// export interface IUser {
//   _isAuth: boolean;
//   _user: {};
// }

export interface IType {
  id: number;
  name: string;
}

export interface IBrand {
  id: number;
  name: string;
}

export interface IDevice {
  id: number;
  name: string;
  price: number;
  rating: number;
  img: string;
}

export interface IBasket {
  [x: string]: number;
  id: number;
  // count: number;
}
