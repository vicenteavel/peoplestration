import React from 'react';
import {Switch, Route} from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

import Login from '../pages/Login';
import Home from '../pages/Home';
import Create from '../pages/Create';
import Edit from '../pages/Edit';

export default function Routes() {
   return (
      <Switch>
         <Route path="/" component={Login} exact />
         <PrivateRoute path="/people" exact component={Home}/>
			<PrivateRoute path="/people/create" component={Create}/>
			<PrivateRoute path="/people/edit/:id" component={Edit} />
      </Switch>
   );

}