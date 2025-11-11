import styles from "./footer.module.css"
import { FaInstagram, FaFacebook } from "react-icons/fa"

function Footer(){
    return(
        <div className={styles.container}>
            <span className={styles.topRow}>
                <h1>FELIP PASSIG MECÂNICA E EMPILHADEIRAS LOGO</h1> {/*Colocar a logo futuramente*/}
                <span className={styles.socialMediaIcons}>
                    <FaInstagram size={30} className={`${styles.socialMediaIcon} ${styles.instagramIcon}`}/>
                    <FaFacebook size={30} className={`${styles.socialMediaIcon} ${styles.facebookIcon}`}/>
                </span>
            </span>
            <span className={styles.bottomRow}>
                <h3>Copyright @2025 FelipPassig.com</h3>
                <span className={styles.links}>
                    <a href="" className={styles.link}>Contato</a>
                    <a href="" className={styles.link}>Política de privacidade</a>
                    <a href="" className={styles.link}>Termos e condições</a>
                </span>
            </span>
        </div>
    )
}

export default Footer;