import React from 'react';
import { QueryClientProvider } from 'react-query'
import queryClient from './utils/queryClient'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import './App.css';

import Loading from './pages/Loading'
import Home from './pages/Home'


function App() {
  return (
    <Router>
    <QueryClientProvider client={queryClient}>
        <Switch>
          <Route path="/:id" component={Loading} />
          <Route path="/" exact component={Home} />
          </Switch>
    </QueryClientProvider>
    </Router>
  );
}

export default App;
