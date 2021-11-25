import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Assign from './Components/Assign';
import Home from './Components/Home';
import UserTask from './Components/UserTask';
import Navigation from './Navigation';
import ResolvedTasks from './Components/ResolvedTasks';
import ManageUsers from './Components/ManageUsers';

const MainRouter = () => {
  return (
    <div>
      <Navigation />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/assign' exact component={Assign} />
        <Route path='/yourtasks' exact component={UserTask} />
        <Route path='/resolvedtasks' exact component={ResolvedTasks} />
        <Route path='/users' exact component={ManageUsers} />
      </Switch>
    </div>
  );
};

export default MainRouter;
