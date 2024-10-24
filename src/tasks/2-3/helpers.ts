import { ParseError, ParseMeta } from "papaparse";

const shuffle = <T>(data: T[]): T[] => {
  let counter = data.length;
  let temp: T;
  let index = 0;
  const target: T[] = [];

  for (let i = 0; i < counter; i++) {
    target[i] = data[i];
  }

  while (counter > 0) {
    index = (Math.random() * counter) | 0;
    counter--;
    // data:
    temp = data[counter];
    data[counter] = data[index];
    data[index] = temp;
    // target:
    temp = target[counter];
    target[counter] = target[index];
    target[index] = temp;
  }
  return target;
};

export const stringValToFloat = <T extends BostonHousingData[]>(
  array: T[],
): HousingDataRow[] => {
  const dataRow = array.map((row) => {
    const convertedRow = {} as HousingDataRow;

    for (const key in row) {
      const val = row[key];
      convertedRow[key as keyof HousingDataRow] = parseFloat(val);
    }
    return convertedRow;
  });
  return dataRow;
};

export type HousingDataRow = {
  CRIM: number; // Уровень преступности на душу населения
  ZN: number; // Пропорция жилой земли, отведенной под участки более 25,000 кв. футов
  INDUS: number; // Пропорция не-торговых бизнес-акров на город
  CHAS: number; // Переменная Чарльз-Ривер (1 если участок граничит с рекой; 0 в противном случае)
  NOX: number; // Концентрация оксидов азота (части на 10 миллионов)
  RM: number; // Среднее количество комнат в доме
  AGE: number; // Пропорция занятых домов, построенных до 1940 года
  DIS: number; // Взвешенные расстояния до пяти центров занятости в Бостоне
  RAD: number; // Индекс доступности радиальных шоссе
  TAX: number; // Полная ставка налога на имущество на $10,000
  PTRATIO: number; // Соотношение учеников и учителей по городу
  B: number; // 1000(Bk - 0.63)^2, где Bk - пропорция чернокожих по городу
  LSTAT: number; // Процент населения с низким статусом
  MEDV: number; // Средняя стоимость домов для владельцев (в $1000)
};
// Определяем тип для ответа от сервера
export type BostonHousingData = {
  data: HousingDataRow[]; // Массив данных о домах
  errors: ParseError[]; // Массив ошибок, если есть
  meta: ParseMeta;
};

export const dataLoader = async (urls: string[]): Promise<string> => {
  const url = urls[0];
  const config = {
    headers: {
      "content-type": "text/csv;charset=UTF-8",
    },
  };

  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const csvData = await response.text();
    return csvData;
  } catch (error) {
    console.error("Error loading data:", error);
    throw error; // Перебрасываем ошибку, чтобы вызывающий код мог ее обработать
  }
};
