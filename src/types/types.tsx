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
  rating?: number;
  // img?: string;
  img?: any;
  info?: IInfo;
}

export interface IBasket {
  [x: string]: number;
  id: number;
  // count: number;
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
