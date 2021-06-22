import React from 'react';
import './App.css';
import Header from './Header';
import VideoBanner from './VideoBanner';
import Features from './Features';
import Projects from './Projects';
import Footer from './Footer';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BrowseJobs from './BrowseJobs';
import MyJob from './MyJob';
import Login from './Login';
import Signup from './Signup';
import PostJob from './PostJob';
import Recruitment from './Recruitment';
import Proposals from './Freelancer/Proposals';
import Contract from './Freelancer/Contract';
import HiProposals from './Hirer/HiProposals';
import HiContract from './Hirer/HiContract';

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/browse-job">
            <BrowseJobs />
          </Route>
          <Route path="/contract">
            <Contract />
          </Route>
          <Route path="/Hicontract">
            <HiContract />
          </Route>
          <Route path="/proposals">
            <Proposals/>
          </Route>
          <Route path="/Hiproposals">
            <HiProposals/>
          </Route>
          <Route path="/my-job">
            <MyJob />
          </Route>
          <Route path="/post-Job">
            <PostJob />
          </Route>
          <Route path="/recruitment">
            <Recruitment/>
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/">
            <Header />
            <VideoBanner />
            <Features />
            <Projects />
            <Footer />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
