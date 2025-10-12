import './App.css'
import Header from './components/Header/Header'
 
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import LoginModal from './pages/LoginModal/LoginModal'
import { useState } from 'react'

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <>
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home setShowLoginModal={setShowLoginModal}/>}/>
      </Routes>
    </BrowserRouter>

    <LoginModal showModal={showLoginModal} onModalClose={() => setShowLoginModal(false)}/>
    </>  
  )
}

export default App
