import { ActionType } from '../store/types';

export const createAction = (type: string, payload: unknown) => {
  return { type, payload };
};

export const formatDate = (date: string) => {
  return `${date.slice(-2)}.${date.slice(-5, -3)}.${date.slice(0, 4)}`;
};
