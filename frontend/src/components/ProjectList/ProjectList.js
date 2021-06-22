import React from 'react';
import './ProjectList.css';
import ProjectContainer from '../ProjectContainer/ProjectContainer';

export const ProjectList = (props) => (
    <div className='center'>
        <div className='project-list'>
            {props.jobs.map(job => (
                <ProjectContainer job={job}></ProjectContainer>
                // <div key={job.id}>{job.name}</div>
            ))}
        </div>
    </div>

); 