// готовая страница
import { makeAutoObservable } from "mobx";
import jwt_decode from "jwt-decode";

export default class UserStore {
  // предварительно указываем типы для _isAuth и _user
  _isAuth: boolean;
  _user: {};

  // Конструктор будет вызываться при создании объекта данного класса.
  // Например, в index.js, в Context.Provider, в  его props-value
  // мы создаём объект user: new UserStore().
  constructor() {
    this._isAuth = true; // поменять на false
    this._user = {};
    makeAutoObservable(this); // теперь mobx будет следить за изменениями этих переменных в конструкторе.
    //  При изменении этих переменных, компоненты будут перерендерываться
  }

  // Проверка срока действия токена
  checkValidToken() {
    // Пусть токен с истекшим сроком действия = false;
    let isExpiredToken: boolean = false;
    // достаём токен из локального хранилища по ключу ('token')
    let token: string | null = localStorage.getItem("token");
    // Для jwt_decode(token) токен не может быть null, только string
    // поэтому делаем проверку и в случае token === null, присваиваем ему пустую строку
    token = token === null ? "" : token;
    // Декодируем полученный токен. Поскольку Typescript не может вывести правильный тип
    // и .exp не известен, самый простой выход — преобразовать результат в any.
    const decodedToken: any = jwt_decode(token);
    // создаём переменную со значением текущего времени (тип: Date)
    const dateNow: Date = new Date();

    // сравниваем предельный установленный срок действия токена с текущим
    if (decodedToken.exp < dateNow.getTime()) {
      isExpiredToken = true;
    }

    // возвращаем значение isExpiredToken
    return isExpiredToken;
  }

  // Создаём экшены. Это функции, которые изменяют каким-то образом состояние.
  // Данная функция принимает булевое значение и присваивает его переменной _isAuth
  setIsAuth(bool: boolean) {
    this._isAuth = bool;
  }

  // Данная функция для изменения пользователя, принимает параметром пользователя,
  // и и присваивает его переменной _user
  setUser(user: {}) {
    this._user = user;
  }

  // Создаём геттеры. Они нужны нам для получения переменных из нашего состояния.
  // К ним будем обращаться, как к объектам
  get isAuth() {
    return this._isAuth;
  }
  get user() {
    return this._user;
  }
  // Это компьютед-функции, они вызываются только в том случае,
  // если переменная, которая используется внутри, была измененна
}
