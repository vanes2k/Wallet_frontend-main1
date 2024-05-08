export const EMAIL =/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/ 
export const PASSWORD =/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,20})/

export const URL = 'http://127.0.0.1:8000/api';

export const phoneErrorMessage = 'Введите номер телефона';
export const emailErrorMessage = 'Некорректный формат E-mail';
export const passwordErrorMessage = 'Пароль не может быть короче 8-ми символов';
export const passwordCheckErrorMessage = 'Пароли не совпадают';
export const oldPasswordCheck = 'Введите действующий пароль';
export const newPassword = 'Новый пароль должен отличаться от старого';

export const calendarErrorMessage = 'Введите, пожалуйста, дату';

export const emptyFieldErrorMessage = 'Укажите, пожалуйста, необходимые данные';
export const negativeErrorMessage = 'Нельзя использовать отрицательные или нулевые значения';
export const choiceErrorMessage = 'Выберите из списка';
export const communicationsErrorMessage = 'Выберите имеющиеся коммуникации из списка';
export const greatValue = 'Слишком большое значение';
export const retroTransport = 'Нельзя зарегистрировать транспорт, произведенный до 1890г.'

export const motorTypeOptions = [
  {value: 'GASOLINE', name: 'Бензиновый'},
  {value: 'DIESEL', name: 'Дизельный'},
  {value:'HYBRID', name: 'Гибрид'},
  {value:'ELECTRO', name: 'Электродвигатель'},
  {value: "None", name: 'Любой'},
]

export const transmissionTypeOptions = [
  {value: 'AUTOMATIC', name: 'Автомат'},
  {value: 'ROROT', name: 'Робот'},
  {value: 'VARIATOR', name: 'Вариатор'},
  {value: 'MECHANICAL', name: 'Механика'},
  {value: "None", name: 'Любая'},
]

export const motorSizeOptions = []
  function makeMotorSizeOptions() {
    for (let i=0.6; i<=10.0; i= i + 0.1) {
      motorSizeOptions.push(Number(i).toFixed(1))
    }
  }
  makeMotorSizeOptions()

// тестовое содержание дропдаунов
export const optionsList = [
  { value: "1", label: "Ch1" },
  { value: "2", label: "Ch2" },
  { value: "3", label: "Ch3" },
  { value: "4", label: "Ch4" },
  { value: "5", label: "Ch5" }
];

export const dropOptions = [
  { name: 'Option Mosc' },
  { name: 'Opti' },
  { name: 'Nana' },
  { name: 'Na' },
  { name: '5' },
];

export const dropOptionsBank = [
  {name: 'Сбербанк'},
  {name: 'ВТБ' },
  {name: 'Альфа'},
];

export const dropOptionsСurrency = [
  {name: `RUB`},  //( ${String.fromCodePoint(8381)} )
  {name: `US`},  //( ${String.fromCodePoint(36)} )
  {name: `EURO`},  //( ${String.fromCodePoint(8364)} )
];

export const dropOptionsMark = [
  {name: 'Audi'},
  {name: 'BMW'},
  {name: 'Ford'},
  {name: 'Honda'},
];

export const dropOptionsModel = [
  {name: 'A1'},
  {name: 'RS3'},
  {name: 'iX M60'},
  {name: 'I4 m50'},
  {name: 'EcoSport'},
  {name: 'Contour'},
];

export const dropOptionsMotor = [
  {name: '1mz fe'},
  {name: 'Dieselmax JCB 4.4 4.8 3CX'},
  {name: '4Rmazg'},
  {name: 'YN38GBZ'},
  {name: 'Zhazg1'},
];

export const dropOptionsClassRoom = [
  {name: 'S'},
  {name: 'A'},
  {name: 'B'},
  {name: 'C'},
  {name: 'D'},
]

export const dropOptionsTarget = [
  {name: 'Офис'},
  {name: 'Жилое'},
  {name: 'Склад'},
]


export const dropOptionsTransmission = [
  {name: 'Механическая'},
  {name: 'Автоматическая'},
  {name: 'Бесступенчатая'},
  {name: 'Роботизированная'}
]


export const dropOptionsMetal = [
  {name: 'Золото', type: 'AUR'},
  {name: 'Платина', type: 'PLT'},
  {name: 'Серебро', type: 'ARG'},
  {name: 'Палладий', type: 'PAL'},
];

export const dropOptionsWallet = [
  {name: 'Холодный'},
  {name: 'Горячий'},
];

export const dropOptionsMarkYear = [
  {name: '2000'},
  {name: '2001'},
  {name: '2003'},
];

export const dropYearOptions =[
  1995,
  1999,
  2000,
  2010,
  2017,
]
