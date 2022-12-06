//@ts-ignore
import * as DateJs from 'datejs';

export const createAction = (type: string, payload: unknown) => {
  return { type, payload };
};

export const formatDate = (date: string, format = 'dd.MM.yyyy HH:mm') => {
  return Date.parse(date).toString(format);
};

export const getDateDifference = (date1: string, date2: string) => {
  date1 = formatDate(date1);
  date2 = formatDate(date2);

  return `${+formatDate(date2, 'HH') - +formatDate(date1, 'HH')} ч ${
    +formatDate(date2, 'MM') - +formatDate(date1, 'MM')
  } дн ${+formatDate(date2, 'dd') - +formatDate(date1, 'dd')} мес ${
    +formatDate(date2, 'yyyy') - +formatDate(date1, 'yyyy')
  } г`;
};
