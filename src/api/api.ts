import 'datejs';

export const apiUrl = 'https://uptrader-to-do-default-rtdb.firebaseio.com';

export enum TO_DO_STATUS {
  IN_PROGRESS = 'progress',
  COMPLETED = 'completed',
  QUEUE = 'queue',
}

export enum TO_DO_RELEVANCE {
  EXPIRED = 'expired',
  ACTIVE = 'active',
}

export enum METHODS {
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
  GET = 'GET',
  PATCH = 'PATCH',
}

export type Options = Partial<{
  method: `${METHODS}`;
  headers: { [key: string]: string };
  body: unknown;
}>;

export const sendHttpRequest = async (
  options: Options | null,
  url = `${apiUrl}/todos.json`
) => {
  const method = options?.method;
  const body = options?.body;

  const response = await fetch(
    url,
    options
      ? {
          method: method || 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(body || {}),
        }
      : {}
  );

  return await response.json();
};
