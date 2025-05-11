import { BrowserRouter as Router, Routes, Route } from 'react-router'
import { Navbar } from './components/Navbar'
import './index.css'
import { Home } from './pages/Home'
import { FightPage } from './pages/FightPage'

function App() {
 
  
  return (
    <>
  
    <Router>
        <Navbar />
      <Routes>
        <Route path="/" element={<Home />}/> 
        <Route path="/fight/:fightId" element={<FightPage />}/> 
      </Routes>
    </Router>
    </>
  )
}

export default App
