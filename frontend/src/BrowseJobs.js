import React from 'react';
import './BrowseJobs.css';
import Menus from './Menus';
import Feed from './Feed'
import { useStateValue } from './StateProvider';

function BrowseJobs() {
  const [{ user_name }, dispatch] = useStateValue();
  return (
    <div className="browse-job">
      <h1>{user_name}</h1>
      <Menus />
      <Feed />
    </div>
  )
}
 
export default BrowseJobs