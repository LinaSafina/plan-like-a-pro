import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { getProjects } from '../../api/api';
import './projects-page.styles.scss';
import { setProjects } from '../../store/projects/projects.action';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectAllProjects } from '../../store/projects/projects.selector';

const ProjectsPage = () => {
  const dispatch = useAppDispatch();
  const projects = useAppSelector(selectAllProjects);

  useEffect(() => {
    getProjects().then((data) => {
      dispatch(setProjects(data));
    });
  }, []);

  //@ts-ignore
  const projectList = projects.map(({ name, id }) => (
    <li key={id} className='projects__list-item list-item'>
      <Link className='projects__link' to={`/${id}/tasks`}>
        {name}
      </Link>
    </li>
  ));

  return (
    <div className='container'>
      <section className='projects'>
        <h1 className='projects__title title'>Выбери проект</h1>
        <ul className='projects__list'>{projectList}</ul>
      </section>
    </div>
  );
};

export default ProjectsPage;
