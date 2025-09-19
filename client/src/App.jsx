import { Route, Routes } from 'react-router-dom'
import './App.css'
import './index.css'
import Layout from './components/shared/Layout'
import Expense from './components/shared/Expense/Expense'
import Home from './Home'
import Dashboard from './components/shared/Analytics/Dashboard'


// RUN FRONTEND = npm run dev
// RUN BACKEND = npm start


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={ <Layout /> } >
          <Route index element={ <Home /> } />
          <Route path='/home' element={ <Home/> } />
          <Route path='/expense' element={ <Expense /> } />
          <Route path='/dashboard' element={ <Dashboard /> } />
        </Route>
      </Routes>
    </>
  )
}

export default App