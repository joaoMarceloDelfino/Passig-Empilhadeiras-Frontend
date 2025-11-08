import styles from "./EmpilhadeiraCard.module.css";
import { GoLinkExternal } from "react-icons/go";
import Carrousel from "../Carroussel/Carroussel";


function EmpilhadeiraCard({openModalHandler, dados}){

return(
    <div className={styles.container}>
        <div className={styles.imageDiv}>
            <Carrousel imagesList={dados.base64Images}/>
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

