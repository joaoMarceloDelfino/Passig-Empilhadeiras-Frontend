import Navbar from "../../components/Navbar/Navbar"
import styles from "./Home.module.css"
import Empilhadeiras from "../../assets/empilhadeiras.png"
import ManutencaoEmpilhadeirasCard from "../../components/ManutencaoEmpilhadeirasCard/ManutencaoEmpilhadeirasCard";
import { FaCog } from "react-icons/fa";
import Footer from "../../components/Footer/Footer";

function Home({setShowLoginModal, setShowRegisterModal}){

    return(
        <div className={styles.container}>
            <Navbar setShowLoginModal={setShowLoginModal} setShowRegisterModal={setShowRegisterModal}/>
            <div className={styles.topContent}>
                <div className={styles.titleContainer}>
                    <h1 className={styles.title}>Serviços mecânicos e aluguel de empilhadeiras</h1>
                    <h2 className="subtitle">Conserto e aluguel de empilhadeiras</h2>
                </div>
                <div className={styles.imageContainer}>

                </div>
            </div>
            <div className={styles.middleContent}>
                <h1 className={styles.servicesTitle}>Manutenção de empilhadeiras</h1>
                <div className={styles.serviceCards}>
                    <ManutencaoEmpilhadeirasCard title="Peças para reposição" description="Várias peças"/>
                    <ManutencaoEmpilhadeirasCard title="Peças para reposição" description="Várias peças"/>
                    <ManutencaoEmpilhadeirasCard title="Peças para reposição" description="Várias peças"/>
                </div>
            </div>
            <div className={styles.bottomContent}>
                <div className={styles.leftDiv}>
                    <h1 className={styles.servicesTitle}>Aluguel de empilhadeiras</h1>
                    <div className={styles.empilhadeiraImage}>
                        
                    </div>
                </div>
                <div className={styles.rigthDiv}>
                    <h1 className={styles.servicesTitle}>Motivos para alugar nossas empilhadeiras</h1>
                    <div className={styles.motivosAlugarContainer}>
                        <span className={styles.motivosAlugar}>
                            <FaCog size={30} color="#F77F00"/>
                            <p>Motivo 1</p>
                        </span>
                        <span className={styles.motivosAlugar}>
                            <FaCog size={30} color="#F77F00"/>
                            <p>Motivo 2</p>
                        </span>
                        <span className={styles.motivosAlugar}>
                            <FaCog size={30} color="#F77F00"/>
                            <p>Motivo 3</p>
                        </span>
                        <span className={styles.motivosAlugar}>
                            <FaCog size={30} color="#F77F00"/>
                            <p>Motivo 4</p>
                        </span>
                    </div>
                    <span className={styles.buttonSpan}>
                        <button className={styles.button}>Consultar disponibilidade</button>
                    </span>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Home;