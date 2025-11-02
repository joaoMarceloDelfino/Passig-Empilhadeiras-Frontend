import styles from "./EmpilhadeiraCard.module.css";
import Empilhadeiras from "./../../assets/empilhadeiras.png"
import { GoLinkExternal } from "react-icons/go";


function EmpilhadeiraCard({dados, setShowEmpilhadeiraModal, setSelectedEmpilhadeira}){

const onShowEmpilhadeiraModal = () => {
    setShowEmpilhadeiraModal(true);
}

return(
    <div className={styles.container}>
        <div className={styles.imageDiv}>
            <img src={Empilhadeiras} alt="Empilhadeira" className={styles.image}/>
        </div>
        <div className={styles.descriptionDiv}>
            <span className={styles.titleRow}>
                <h2 className={styles.titleEmpilhadeira}>Empilhadeira Reacher</h2>
                <h2 className={styles.yearEmpilhadeira}>2006/2007</h2>
            </span>
            <span className={styles.readMoreRow}>
                <button className={styles.readMoreButton} onClick={onShowEmpilhadeiraModal}>
                    <GoLinkExternal size={25}/>
                    Ler mais
                </button>
            </span>
        </div>
    </div>
);

}

export default EmpilhadeiraCard;

