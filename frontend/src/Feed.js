import React from 'react';
import './Feed.css';
import { ProjectList } from './components/ProjectList/ProjectList';
import { Search } from './components/search/search'

class Feed extends React.Component {
  constructor() {
    super();
    this.state = {
      jobs: [],
      search: ''
    }
  }

  componentDidMount() {
    fetch('https://tokenlancer.uc.r.appspot.com/api/jobservice/', {
      method: 'GET',
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
    }).then(response => response.json())
      .then(user => this.setState({ jobs: user }))
  }

  render() {
    const { jobs, search } = this.state;
    const filterdJobs = jobs.filter(job => (job.title.toLowerCase().includes(search.toLowerCase())));
    return (
      <div className='Feed'>
        <Search placeholder='search jobs' onchange={(e) => (this.setState({ search: e.target.value }))}></Search>
        <ProjectList jobs={filterdJobs}></ProjectList>
      </div>
    );
  }
}
 
export default Feed;

