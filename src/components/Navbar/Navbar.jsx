import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css"

function Navbar({setShowLoginModal, setShowRegisterModal, isUserLogged}){

    const navigate = useNavigate();
    const location = useLocation();

    const goToScheduledVisitPage = () => {
        console.log(isUserLogged)
        if(isUserLogged){
            if(location.pathname != '/agendamento/visita'){
                navigate("/agendamento/visita");
            }
        } else {    
            setShowLoginModal(true);
        }
    }
    return(
        <navbar className={styles.navbar}>
           <div className={styles.nav_links}>
                <Link className={styles.nav_link} to={"/"}>Home</Link>
                <Link className={styles.nav_link}>Serviços</Link>
                <a className={styles.nav_link} onClick={goToScheduledVisitPage}>Agendamentos</a>
            </div> 

            <div className={styles.buttons}>
                {
                !isUserLogged ?
                <>
                    <button className={styles.button} onClick={() => setShowRegisterModal(true)}>Registrar-se</button>
                    <button className={styles.button} onClick={() => setShowLoginModal(true)}>Entrar</button>
                </> :
                    <button className={styles.button}>Sair</button>
                }
            </div>
        </navbar>
    )
}

export default Navbar;