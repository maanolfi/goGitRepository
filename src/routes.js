import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Main from './pages/Main'
import Repository from './pages/Repository'

const Routes = () => {
  return (
    <BrowserRouter>
    <Switch>
      <Route path='/' exact component={Main} />
      <Route path='/repository/:repository' exact component={Repository} />
    </Switch>
  </BrowserRouter>
  )

}


export default Routes
