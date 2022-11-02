// страница готовая
import { makeAutoObservable } from "mobx";
import { IBasket, IDevice } from "../types/types";
import { deleteDeviceFromBasket } from "../http/deviceApi";

export default class BasketStore {
  // предварительно указываем типы для _totalPrice, _basket
  _totalPrice: number;
  _basket: IBasket[];
  device: IDevice | undefined;

  constructor() {
    this._totalPrice = 0;
    this._basket = [];
    makeAutoObservable(this);
  }

  // Удалить элемент из корзины
  async setDeleteItemBasket(
    device: any,
    isAuth: boolean = false
  ): Promise<void> {
    if (isAuth) {
      // Поучаем из запроса (device.id), затем удаляем этот элемент
      // из корзины методом фильтрации массива по id. То есть создаём новый массив из старого,
      // и оставляем в нём те элементы, у которых item.id !== device.id, записываем в store
      await deleteDeviceFromBasket(device.id).then(() => {
        this._basket = this._basket.filter((item) => item.id !== device.id);
        // из итоговой цены отнимаем сумму стоимости удалённых девайсов, записываем в store
        this._totalPrice -= device.price * device.count;
      });
    } else {
      this._basket = this._basket.filter((item) => item.id !== device.id);
      this._totalPrice -= device.price * device.count;

      // Записываем в локальное хранилище браузера по ключу
      // "basket" значение этой корзины из store
      localStorage.setItem("basket", JSON.stringify(this._basket));
    }
  }

  // записать item в корзину
  // setBasket(item: { id: number }, isAuth: boolean = false) {
  setBasket(item: any, isAuth: boolean = false) {
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

  // очистить корзину и итоговую стоимость
  setDeleteAllDeviceFromBasket() {
    this._totalPrice = 0;
    return (this._basket = []);
  }

  // Установить количество устройств в корзине
  setCountDevice(deviceId: any, action: string, isAuth: boolean = false) {
    // Находим значение findIndex (-1,.....)
    const itemInd: number = this._basket.findIndex(
      (item) => item.id === deviceId
    );
    // Метод findIndex вызывает переданную функцию callback один раз для каждого элемента,
    // присутствующего в массиве, до тех пор, пока она не вернёт true.
    // Если такой элемент найден, метод findIndex немедленно вернёт индекс этого элемента.
    // В противном случае, метод findIndex вернёт -1.

    // Находим в корзине девайс по id === deviceId
    const itemInState: IBasket | undefined = this._basket.find(
      (device) => device.id === deviceId
    );
    // Метод find() возвращает значение первого найденного в массиве элемента,
    // которое удовлетворяет условию переданному в callback функции.
    // В противном случае возвращается undefined.

    // У нас тип itemInState: IBasket | undefined . Если itemInState === undefined,
    // то операции ++itemInState.count или --itemInState.count невозможны, typescript не допускает
    // Поэтому, делаем предварительную проверку: if (itemInState) {
    //      .... проверяем, что itemInState есть, а не undefined
    // }

    if (itemInState) {
      if (action === "+") {
        // создаём новый девайс
        const newItem = {
          // в нём разворачиваем найденный девайс и увеличивем его исходное количество
          ...itemInState,
          count: ++itemInState.count,
        };

        // вырезаем из массива корзины элемент с идексом itemInd, вместо него вставляем новый элемент.
        // (тот же девайс, но уже с другим количеством)
        this._basket = [
          ...this._basket.slice(0, itemInd),
          newItem,
          ...this._basket.slice(itemInd + 1),
        ];
      } else {
        // создаём новый девайс
        const newItem = {
          // в нём разворачиваем найденный девайс и уменьшаем его исходное количество
          ...itemInState,
          count: itemInState.count === 1 ? 1 : --itemInState.count,
        };
        // вырезаем из массива корзины элемент с идексом itemInd, вместо него вставляем новый элемент.
        // (тот же девайс, но уже с другим количеством)
        this._basket = [
          ...this._basket.slice(0, itemInd),
          newItem,
          ...this._basket.slice(itemInd + 1),
        ];
      }
    }

    // если isAuth = true, то записываем в локальное хранилище браузера по ключу
    // "basket" значение этой корзины
    if (!isAuth) {
      localStorage.setItem("basket", JSON.stringify(this._basket));
    }

    let totalPrice = 0;
    this._basket.forEach(
      (device) => (totalPrice += Number(device.price * device.count))
    );
    this._totalPrice = totalPrice;
  }

  // Сбросить корзину
  resetBasket() {
    // Удаляём всё из корзины, делаем её пустой
    this._basket = [];
    // Обнуляем итоговую сумму
    this._totalPrice = 0;

    // Из локального хранилища браузера удаляем элемент с ключом ("basket")
    localStorage.removeItem("basket");
  }

  // Получить корзину
  get Basket() {
    return this._basket;
  }

  // Получить итоговую сумму
  get Price() {
    return this._totalPrice;
  }
}
