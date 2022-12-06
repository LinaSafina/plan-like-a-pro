import { Navigate, Route, Routes } from 'react-router-dom';

import ProjectsPage from './pages/projects/projects-page.component';
import TasksPage from './pages/tasks/tasks-page.component';

import './App.scss';

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
