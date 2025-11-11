import './App.css'
import Header from './components/Header/Header'
 
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Home from './pages/Home/Home'
import LoginModal from './pages/LoginModal/LoginModal'
import RegisterModal from './pages/RegisterModal/RegisterModal'
import Catalog from './pages/Catalog/Catalog'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'
import EmpilhadeiraModal from './pages/EmpilhadeiraModal/EmpilhadeiraModal'

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showEmpilhadeiraModal, setShowEmpilhadeiraModal] = useState(false);
  const [selectedEmpilhadeira, setSelectedEmpilhadeira] = useState({});

  return (
    <>
    <div className='app-container'>
      <BrowserRouter>
        <Header/>
        <Navbar setShowLoginModal={setShowLoginModal} setShowRegisterModal={setShowRegisterModal}/>
        <div className="content">
          <Routes>
            <Route path="/" element={<Home setShowLoginModal={setShowLoginModal} setShowRegisterModal={setShowRegisterModal}/>}/>
            <Route path="/catalogo" element={<Catalog setShowEmpilhadeiraModal={setShowEmpilhadeiraModal} setSelectedEmpilhadeira={setSelectedEmpilhadeira}/>}/>
          </Routes>
        </div>
        <Footer/>
      </BrowserRouter>
    </div>

    <LoginModal showModal={showLoginModal} onModalClose={() => setShowLoginModal(false)} setShowRegisterModal={setShowRegisterModal}/>
    <RegisterModal showModal={showRegisterModal} onModalCloseHandler={() => setShowRegisterModal(false)} setShowLoginModal={setShowLoginModal}/>
    <EmpilhadeiraModal showModal={showEmpilhadeiraModal} onModalClose={() => setShowEmpilhadeiraModal(false)} dados={selectedEmpilhadeira}/>
    </>  
  )
}

export default App
