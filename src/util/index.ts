import { ActionType } from '../store/types';

export const createAction = (type: string, payload: unknown) => {
  return { type, payload };
};
