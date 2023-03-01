import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import './projects-page.styles.scss';
import { fetchProjectsStart } from '../../store/projects/projects.action';
import { selectProjectsMap } from '../../store/projects/projects.selector';

const ProjectsPage = () => {
  const dispatch = useDispatch();
  const projects = useSelector(selectProjectsMap);

  useEffect(() => {
    dispatch(fetchProjectsStart());
  }, []);

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
