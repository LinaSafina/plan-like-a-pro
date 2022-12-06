import { Navigate, Route, Routes } from 'react-router-dom';
import ProjectsPage from './pages/projects/projects-page';
import TasksPage from './pages/tasks/tasks-page';

import './App.scss';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/projects' replace={true} />} />
      <Route path='/projects' element={<ProjectsPage />} />
      <Route path='/:projectId/tasks' element={<TasksPage />} />
    </Routes>
  );
}

export default App;
