import { Link } from "react-router-dom";
import styles from "./Navbar.module.css"

function Navbar({setShowLoginModal, setShowRegisterModal}){

    return(
        <navbar className={styles.navbar}>
           <div className={styles.nav_links}>
                <Link className={styles.nav_link} to={"/"}>Home</Link>
                <Link className={styles.nav_link}>Serviços</Link>
                <Link className={styles.nav_link}>Agendamentos</Link>
            </div> 

            <div className={styles.buttons}>
                <button className={styles.button} onClick={() => setShowRegisterModal(true)}>Registrar-se</button>
                <button className={styles.button} onClick={() => setShowLoginModal(true)}>Entrar</button>
            </div>
        </navbar>
    )
}

export default Navbar;