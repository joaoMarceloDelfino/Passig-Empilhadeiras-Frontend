import './App.css'
import Header from './components/Header/Header'
 
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Home from './pages/Home/Home'
import LoginModal from './pages/LoginModal/LoginModal'
import RegisterModal from './pages/RegisterModal/RegisterModal'

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  return (
    <>
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home setShowLoginModal={setShowLoginModal} setShowRegisterModal={setShowRegisterModal}/>}/>
      </Routes>
    </BrowserRouter>

    <LoginModal showModal={showLoginModal} onModalClose={() => setShowLoginModal(false)} setShowRegisterModal={setShowRegisterModal}/>
    <RegisterModal showModal={showRegisterModal} onModalClose={() => setShowRegisterModal(false)} setShowLoginModal={setShowLoginModal}/>
    </>  
  )
}

export default App
