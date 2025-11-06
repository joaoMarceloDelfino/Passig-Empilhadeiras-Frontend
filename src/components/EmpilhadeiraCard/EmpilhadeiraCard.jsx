import styles from "./EmpilhadeiraCard.module.css";
import Empilhadeiras from "./../../assets/empilhadeiras.png"
import { GoLinkExternal } from "react-icons/go";


function EmpilhadeiraCard({openModalHandler, dados}){

return(
    <div className={styles.container}>
        <div className={styles.imageDiv}>
            <img src={Empilhadeiras} alt="Empilhadeira" className={styles.image}/>
        </div>
        <div className={styles.descriptionDiv}>
            <span className={styles.titleRow}>
                <h2 className={styles.titleEmpilhadeira}>{dados.name}</h2>
                <h2 className={styles.yearEmpilhadeira}>{dados.fabricationYear}</h2>
            </span>
            <span className={styles.readMoreRow}>
                <button className={styles.readMoreButton} onClick={openModalHandler}>
                    <GoLinkExternal size={25}/>
                    Ler mais
                </button>
            </span>
        </div>
    </div>
);

}

export default EmpilhadeiraCard;

