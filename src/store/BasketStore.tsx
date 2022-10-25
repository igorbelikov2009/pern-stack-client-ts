import { makeAutoObservable } from "mobx";
import { IBasket, IDevice } from "../types/types";
// import { deleteDeviceFromBasket } from "../http/deviceApi";

export default class BasketStore {
  // предварительно указываем типы для _totalPrice, _basket
  _totalPrice: number;
  _basket: IBasket[];
  device: IDevice | undefined;

  constructor() {
    this._totalPrice = 0;
    this._basket = [];
  }

  // Удалить элемент из корзины
  // async setDeleteItemBasket(device, isAuth = false) {
  //     if (isAuth) {
  //       // Поучаем из запроса (device.id), затем удаляем этот элемент
  //       // из корзины методом фильтрации массива по id. То есть создаём новый массив из старого,
  //       // и оставляем в нём те элементы, у которых item.id !== device.id, записываем в store
  //       await deleteDeviceFromBasket(device.id).then(() => {
  //         this._basket = this._basket.filter((item) => item.id !== device.id);
  //         // из итоговой цены отнимаем сумму стоимости удалённых девайсов, записываем в store
  //         this._totalPrice -= device.price * device.count;
  //       });
  //     } else {
  //       this._basket = this._basket.filter((item) => item.id !== device.id);
  //       this._totalPrice -= device.price * device.count;

  //       // Записываем в локальное хранилище браузера по ключу
  //       // "basket" значение этой корзины из store
  //       localStorage.setItem("basket", JSON.stringify(this._basket));
  //     }
  //   }

  // записать item в корзину
  setBasket(item: { id: number }, isAuth: boolean = false) {
    // проверяем нахождение устройства в корзине
    const checkDeviceInBasket = this._basket.findIndex(
      (device) => device.id === item.id

      // Метод findIndex вызывает переданную функцию callback один раз для каждого элемента,
      // присутствующего в массиве, до тех пор, пока она не вернёт true.
      // Если такой элемент найден, метод findIndex немедленно вернёт индекс этого элемента.
      // В противном случае, метод findIndex вернёт -1.
    );
    // Если элемента item нет в корзине, то есть checkDeviceBasket === -1
    if (checkDeviceInBasket < 0) {
      // то разворачиваем эту корзину и добавляем туда объект с count: 1 с развёрнутым эементом
      this._basket = [...this._basket, { count: 1, ...item }];
      // Пусть итогТип "[{ id: number; count: number; }]" не может быть назначен для типа "[]".

      let totalPrice = 0;
      // Пробегаемся по каждому товару в корзине, умножаем его цену на его количество
      // и складируем итоговую сумму товаров в корзине
      this._basket.forEach(
        // добавляем сигнатуру индекса [x: string]: number;
        // для свойства .price в Types.tsx  interface IBasket
        // обрати внимание на тип у (parameter) device: IBasket
        (device) => (totalPrice += Number(device.price * device.count))
      );
      // Записываем в store в состояние _totalPrice итоговую сумму, раную полученной totalPrice
      this._totalPrice = totalPrice;
    }

    // если isAuth = true, то записываем в локальное хранилище браузера по ключу
    // "basket" значение этой корзины
    if (!isAuth) {
      localStorage.setItem("basket", JSON.stringify(this._basket));
    }
  }
}
