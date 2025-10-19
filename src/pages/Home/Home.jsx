import Navbar from "../../components/Navbar/Navbar"
import styles from "./Home.module.css"
import Empilhadeiras from "../../assets/empilhadeiras.png"

function Home({setShowLoginModal, setShowRegisterModal}){

    return(
        <div className={styles.container}>
            <Navbar setShowLoginModal={setShowLoginModal} setShowRegisterModal={setShowRegisterModal}/>
            <div className={styles.topContent}>
                <div className={styles.titleContainer}>
                    <h1 className={styles.title}>Serviços mecânicos e aluguel de empilhadeiras</h1>
                    <h2 className="subtitle">Conserto de automóveis e aluguel de empilhadeiras</h2>
                </div>
                <div className={styles.imageContainer}>
                    
                </div>
            </div>
        </div>
    );
}

export default Home;