import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css"
import BaseApi from "../../api/BaseApi";

function Navbar({setShowLoginModal, setShowRegisterModal, isUserLogged, setIsUserLogged}){

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
        BaseApi.logout().then(() => {setIsUserLogged(false); navigate("/");})
    }
    return(
        <navbar className={styles.navbar}>
           <div className={styles.nav_links}>
                <Link className={styles.nav_link} to={"/"}>Página Inicial</Link>
                <a className={styles.nav_link} onClick={goToScheduledVisitPage}>Agendar Horário</a>
            </div> 

            <div className={styles.buttons}>
                {
                !isUserLogged ?
                <>
                    <button className={styles.button} onClick={() => setShowRegisterModal(true)}>Registrar-se</button>
                    <button className={styles.button} onClick={() => setShowLoginModal(true)}>Entrar</button>
                </> :
                    <button className={styles.button} onClick={logout}>Sair</button>
                }
            </div>
        </navbar>
    )
}

export default Navbar;