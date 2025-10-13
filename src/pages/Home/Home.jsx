import Navbar from "../../components/Navbar/Navbar";
import styles from "./Home.module.css"

function Home({setShowLoginModal, setShowRegisterModal}){

    return(
        <div className={styles.container}>
            <Navbar setShowLoginModal={setShowLoginModal} setShowRegisterModal={setShowRegisterModal}/>
            
        </div>
    );
}

export default Home;