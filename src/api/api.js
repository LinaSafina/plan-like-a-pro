//@ts-ignore
import * as DateJS from 'datejs';

export const apiUrl = 'https://uptrader-to-do-default-rtdb.firebaseio.com';

export const TO_DO_STATUS = {
  IN_PROGRESS: 'progress',
  COMPLETED: 'completed',
  EXPIRED: 'expired',
  QUEUE: 'queue',
};

export const sendHttpRequest = async (
  options,
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

export const sendItem = async (body) => {
  const data = await sendHttpRequest({ body });

  return await getTodos();
};

export const getTodos = async (url) => {
  const data = await sendHttpRequest(null, url);

  const loadedData = { queue: [], progress: [], completed: [] };

  for (let key in data) {
    let isExpired = false;

    if (data[key].status === TO_DO_STATUS.IN_PROGRESS) {
      isExpired = await taskStatusCheck(key, data[key].expiryDate);
    }

    let loadedFiles = [];

    for (let key2 in data[key].files) {
      loadedFiles.push({ id: key, name: data[key].files[key2] }.name);
    }

    console.log(data[key].status);

    loadedData[data[key].status].push({
      id: key,
      description: '',
      ...data[key],
      status: isExpired ? TO_DO_STATUS.EXPIRED : data[key].status,
      files: loadedFiles,
    });
  }

  return loadedData;
};

export const editItem = async (id, body) => {
  const data = await sendHttpRequest(
    { method: 'PATCH', body },
    `${apiUrl}/todos/${id}.json`
  );

  return await getTodos();
};

export const editStatus = async (id, status) => {
  const data = await sendHttpRequest(
    { method: 'PATCH', body: { status } },
    `${apiUrl}/todos/${id}.json`
  );
};

export const deleteItem = async (id) => {
  const data = await sendHttpRequest(
    { method: 'DELETE' },
    `${apiUrl}/todos/${id}.json`
  );

  return await getTodos();
};

export const taskStatusCheck = async (id, date) => {
  const isExpired = Date.today().compareTo(Date.parse(date)) > 0;

  if (isExpired) {
    await editStatus(id, TO_DO_STATUS.EXPIRED);
  }

  return isExpired;
};

export const getProjects = async () => {
  const data = await sendHttpRequest(null, `${apiUrl}/projects.json`);

  const loadedData = [];

  for (let key in data) {
    loadedData.push({
      id: key,
      ...data[key],
    });
  }

  return loadedData;
};

// export const getSubtasks = async (id) => {
//   const data = await sendHttpRequest(
//     null,
//     `${apiUrl}/todos.json?orderBy="parentTodo"&equalTo="${id}"`
//   );
// };
