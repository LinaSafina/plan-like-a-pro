// import { useState } from 'react';
// import { useParams } from 'react-router-dom';
// //@ts-ignore
// import * as DateJS from 'datejs';

// import ToDoForm from '../to-do-form/to-do-form.component';

// import './new-to-do.styles.scss';
// import { sendTodo, TO_DO_STATUS } from '../../api/api';
// import { FilesType } from '../to-do-form/types';
// import { useAppDispatch } from '../../store/hooks';
// import { setTodos } from '../../store/todos/todos.action';

// const defaultFormFields = {
//   title: '',
//   description: '',
//   expiryDate: Date.today().toString('yyyy-MM-dd'),
//   files: [],
//   priority: 'низкий',

// };

const NewToDo = () => {
  // const [formFields, setFormFields] = useState(defaultFormFields);
  // const { title, description, expiryDate, files } = formFields;

  // const { projectId } = useParams();

  // const dispatch = useAppDispatch();

  // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value, type } = event.target;

  //   if (type === 'file') {
  //     //@ts-ignore
  //     let filesArr = [];
  //     const { files } = event.target;

  //     for (let key in files) {
  //       if (!isNaN(parseInt(key))) {
  //         filesArr.push({
  //           id: `${Math.floor(Math.random() * 10000)}`,
  //           //@ts-ignore
  //           name: files[key].name,
  //         });
  //       }
  //     }

  //     //@ts-ignore
  //     setFormFields((prev) => ({ ...prev, [name]: filesArr }));
  //   } else {
  //     setFormFields((prev) => ({ ...prev, [name]: value }));
  //   }
  // };

  // const handleFormSubmit = async (event: React.FormEvent) => {
  //   event.preventDefault();

  //   if (!title) {
  //     alert('Пожалуйста, введите название задачи');
  //     return;
  //   }

  //   const data = await sendTodo({
  //     title,
  //     description,
  //     expiryDate,
  //     status: TO_DO_STATUS.IN_PROGRESS,
  //     files,
  //     projectId,
  //   });

  //   dispatch(setTodos(data));

  //   setFormFields(defaultFormFields);
  // };

  return (
    <div className='to-do-card'>
      {/* <ToDoForm
        heading='Что нужно сделать?'
        formFields={formFields}
        handleInputChange={handleInputChange}
        handleFormSubmit={handleFormSubmit}
        formName='new'
        buttonText='Добавить'
        min={Date.today().toString('yyyy-M-d')}
      /> */}
    </div>
  );
};

export default NewToDo;
