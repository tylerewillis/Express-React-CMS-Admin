import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { CookiesProvider } from 'react-cookie'
import Routes from './_Components/Routes'

function App() {
  return (
    <CookiesProvider>
      <Router>
        <Switch>
          {Routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
        </Switch>
      </Router>
    </CookiesProvider>
  )
}

function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={props => (
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}

export default App