import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css"
import BaseApi from "../../api/BaseApi";
import { FaUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";

function Navbar({setShowLoginModal, setShowRegisterModal, isUserLogged, setIsUserLogged, loggedUser}){

    const navigate = useNavigate();
    const location = useLocation();

    const goToScheduledVisitPage = () => {
        if(isUserLogged){
            if(location.pathname != '/agendamento/visita'){
                navigate("/agendamento/visita");
            }
        } else {    
            setShowLoginModal(true);
        }
    }

    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setIsUserLogged(false); 
        navigate("/");
        toast.success("Usuário Deslogado com Sucesso!", {
            position: "bottom-right",
            autoClose: 3000,        
            hideProgressBar: false,
            closeOnClick: true, 
            pauseOnHover: true,
            draggable: true,
            theme: "colored"  
        });
    }
    return(
        <navbar className={styles.navbar}>
           <div className={styles.nav_links}>
                <Link className={styles.nav_link} to={"/"}>Página Inicial</Link>
                <a className={styles.nav_link} onClick={goToScheduledVisitPage}>Agendar Horário</a>
                {
                    isUserLogged ?
                    <Link className={styles.nav_link} to={"/my/agendamentos"}>Meus Agendamentos</Link>
                    :
                    null
                }
                {
                    loggedUser?.role?.name === "Admin" && isUserLogged ?
                    <Link className={styles.nav_link} to={"/admin/empilhadeiras"}>Acessar Painel de Administrador</Link>
                    : null
                }
            </div> 

            <div className={styles.buttons}>
                {
                !isUserLogged ?
                <>
                    <button className={styles.button} onClick={() => setShowRegisterModal(true)}>Registrar-se</button>
                    <button className={styles.button} onClick={() => setShowLoginModal(true)}>Entrar</button>
                </> :
                <>
                    <div className={styles.userDiv}>
                        <FaUserCircle size={40}/>
                        <div className={styles.userInformationWrapper}>
                            <p>Email: {loggedUser.email}</p>
                            <p>Nome: {loggedUser.username}</p>
                        </div>
                    </div>
                    <button className={styles.button} onClick={logout}>Sair</button>
                </>
                }
            </div>
        </navbar>
    )
}

export default Navbar;