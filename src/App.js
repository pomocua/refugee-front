import {Route, Routes} from 'react-router-dom'
import {routes} from './routing/routes'

function App() {
  return (
    <Routes>
      {routes.map(route => {
        return (
          <Route path={route.path} element={route.element} key={route.path}/>
        )
      })}
    </Routes>
  )
}

export default App
