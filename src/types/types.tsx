export interface IRoute {
  path: string;
  Component: React.FC<{}>;
}

export interface IType {
  id?: number;
  name: string;
}

export interface IBrand {
  id?: number;
  name: string;
}

export interface IDevice {
  id?: number;
  name?: string;
  price?: number;
  count?: number;
  rating?: number;
  // img?: string;
  img?: any;
  info?: IInfo[];
}

export interface IBasket {
  [x: string]: number;
  id: number;
}

export interface ICreateModalProps {
  show: boolean;
  onHide: () => void;
}

export interface IInfo {
  id?: number;
  title: string;
  description: string;
  number?: number | undefined;
}

export interface IRegistrationUser {
  email: string;
  password: string;
  role?: string;
}

export type DeleteBrandOrTypeProps = {
  show: boolean;
  onHide: () => void;
  showSuccessMsgFunc: (msg: any) => void;
};

export interface sendOrderProps {
  auth: boolean;
  // mobile: string | number | undefined | null;
  mobile: string | number | string[] | undefined;
  basket: any;
}

export interface fetchOrdersProps {
  limit: string | number;
  page?: any;
  complete?: string | boolean;
  count?: any;
}

export interface fetchChangeStatusOrderProps {
  complete: boolean;
  id: number;
}

export interface IRatingStarsProps {
  ratingChanged: any;
  ratingVal: any;
  isAuth: boolean;
  isAccessRating: boolean;
}

export interface IOrder {
  // key={id}
  id: string | number;
  complete?: string | boolean;
  mobile: string | number | undefined;
  createdAt: string | number;
  updatedAt: string | number;
  userId: string | number;
  // reRender={reRender}
}
