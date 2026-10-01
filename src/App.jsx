import './App.css'

//components
import NavBar from './Components/NavBar'

//react-router
import { Outlet } from 'react-router-dom'

//Contex
import { useContext } from 'react';
import { ThemeContext } from './Context/ThemeContext';
function App() {
  const { tema, setTema } = useContext(ThemeContext);
  return (
    <>
      <div className="container">

        <div className="navbar">
          <NavBar />
        </div>

        <div className={`header ${tema}`}>
          <Outlet />
        </div>

      </div>
    </>
  )
}

export default App
