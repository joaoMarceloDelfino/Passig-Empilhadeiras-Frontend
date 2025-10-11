import InfoCard from "../InfoCard/InfoCard";
import styles from "./Header.module.css"
import { FaLocationDot } from "react-icons/fa6";
import { BsTelephone } from "react-icons/bs";



function Header(){
    return(
        <header className={styles.header}>
            <div className={styles.main_header}>
                <h1 style={{color: "#000"}}>Passig Empilhadeiras</h1> {/*Alterar para uma logo de verdade futuramente*/}
            </div>

            <div className={styles.info_header}>
                <InfoCard icon = {<FaLocationDot size={40}/>}
                title="Localização"
                text = {["Rua Prefeito Manoel Evaldo Muller,", "Volta Grande, 3466", "Navegantes, SC"]} 
                />

                <InfoCard icon = {<BsTelephone size={40}/>}
                title="Telefone"
                text = "(47) 9999-9999"
                />

            </div> 
        </header>
    )
}

export default Header;