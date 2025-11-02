import styles from "./Catalog.module.css"
import EmpilhadeiraCard from "../../components/EmpilhadeiraCard/EmpilhadeiraCard";

function Catalog({setShowEmpilhadeiraModal, setSelectedEmpilhadeira}){
    return(
        <div className={styles.container}>
                <h1 className={styles.catalogTitle}>Catálogo</h1>
                <div className={styles.cardsWrapper}>
                    <EmpilhadeiraCard setShowEmpilhadeiraModal={setShowEmpilhadeiraModal} setSelectedEmpilhadeira={setSelectedEmpilhadeira}/>
                </div>
        </div>
    )
}

export default Catalog;