import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Catalog from './pages/Catalog/Catalog';
import VisitSchedulePage from './pages/VisitSchedulePage/VisitSchedulePage';
import MyScheduledVisits from './pages/MyScheduledVisits/MyScheduledVisits';
import ForkliftsAdminPage from './pages/ForkliftsAdminPage/ForkliftsAdminPAge';
import ProtectedRoute from './pages/ProtectedRoute/ProtectedRoute';
import ProtectedAdminRoute from './pages/ProtectedAdminRoute/ProtectedAdminRoute';
import LoginModal from './pages/LoginModal/LoginModal';
import RegisterModal from './pages/RegisterModal/RegisterModal';
import EmpilhadeiraModal from './pages/EmpilhadeiraModal/EmpilhadeiraModal';
import { ToastContainer } from 'react-toastify';
import './App.css';
import VisitsAdminPage from './pages/VisitsAdminPage/VisitsAdminPage';
import UsersAdminPage from './pages/UsersAdminPage/UsersAdminPage';

function App() {
  return (
    <BrowserRouter>
      <MainApp />
    </BrowserRouter>
  );
}

function MainApp() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showEmpilhadeiraModal, setShowEmpilhadeiraModal] = useState(false);
  const [selectedEmpilhadeira, setSelectedEmpilhadeira] = useState({});
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [loggedUser, setLoggedUser] = useState(false);

  const location = useLocation();

  const isAdminRoute = location.pathname.includes('/admin');

  return (
    <>
      <div className="app-container" style={{width: "100%", height: "100%"}}>
        {!isAdminRoute && (
          <>
            <Header />
            <Navbar
              setShowLoginModal={setShowLoginModal}
              setShowRegisterModal={setShowRegisterModal}
              isUserLogged={isUserLogged}
              setIsUserLogged={setIsUserLogged}
              loggedUser={loggedUser}
            />
          </>
        )}

        <div className="content">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  setShowLoginModal={setShowLoginModal}
                  setShowRegisterModal={setShowRegisterModal}
                  setIsUserLoggedHandler={setIsUserLogged}
                  setLoggedUserHandler={setLoggedUser}
                />
              }
            />
            <Route
              path="/catalogo"
              element={
                <Catalog
                  setShowEmpilhadeiraModal={setShowEmpilhadeiraModal}
                  setSelectedEmpilhadeira={setSelectedEmpilhadeira}
                />
              }
            />
            <Route
              path="/agendamento/visita"
              element={
                <ProtectedRoute
                  isLoggedUser={isUserLogged}
                  setIsLoggedUserHandler={setIsUserLogged}
                  setLoggedUserHandler={setLoggedUser}
                >
                  <VisitSchedulePage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route
              path="my/agendamentos"
              element={
                <ProtectedRoute
                  isLoggedUser={isUserLogged}
                  setIsLoggedUserHandler={setIsUserLogged}
                  setLoggedUserHandler={setLoggedUser}
                >
                  <MyScheduledVisits />
                </ProtectedRoute>
              }
            />
            <Route element={<ProtectedAdminRoute />}>
              <Route path="admin/empilhadeiras" element={<ForkliftsAdminPage />} />
              <Route path="admin/visitas" element={<VisitsAdminPage/>} />
              <Route path="admin/users" element={<UsersAdminPage/>}/>
            </Route>
          </Routes>
        </div>

        {!isAdminRoute && <Footer />}
      </div>

      <LoginModal
        showModal={showLoginModal}
        onModalCloseHandler={() => setShowLoginModal(false)}
        setShowRegisterModal={setShowRegisterModal}
        setIsUserLogged={setIsUserLogged}
        setLoggedUser={setLoggedUser}
      />
      <RegisterModal
        showModal={showRegisterModal}
        onModalCloseHandler={() => setShowRegisterModal(false)}
        setShowLoginModal={setShowLoginModal}
      />
      <EmpilhadeiraModal
        showModal={showEmpilhadeiraModal}
        onModalClose={() => setShowEmpilhadeiraModal(false)}
        dados={selectedEmpilhadeira}
      />
      <ToastContainer position="bottom-right" />
    </>
  );
}

export default App;