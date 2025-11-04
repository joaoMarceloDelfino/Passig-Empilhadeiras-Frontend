import styles from "./Catalog.module.css"
import { useState, useEffect } from "react";
import EmpilhadeiraCard from "../../components/EmpilhadeiraCard/EmpilhadeiraCard";
import BaseApi from "../../api/BaseApi";

function Catalog({setShowEmpilhadeiraModal, setSelectedEmpilhadeira}){
    
    const [empilhadeiras, setEmpilhadeiras] = useState([]);

    useEffect(() => {
        BaseApi.
        findAllEmpilhadeiras().
        then((res) => console.log(res))
    }, [])
    return(
        <div className={styles.container}>
                <h1 className={styles.catalogTitle}>Catálogo</h1>
                <div className={styles.cardsWrapper}>
                    {/* <EmpilhadeiraCard setShowEmpilhadeiraModal={setShowEmpilhadeiraModal} setSelectedEmpilhadeira={setSelectedEmpilhadeira}/> */}
                    
                </div>
        </div>
    )
}

export default Catalog;