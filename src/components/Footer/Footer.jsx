import styles from "./footer.module.css"
import { FaInstagram } from "react-icons/fa"

function Footer(){
    return(
        <div className={styles.container}>
            <span className={styles.topRow}>
                <h3>Copyright @2025 FelipPassig.com</h3>
                <span className={styles.socialMediaIcons}>

                     <a 
                        href="https://www.instagram.com/pssempilhadeiras/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                    <FaInstagram size={30} className={`${styles.socialMediaIcon} ${styles.instagramIcon}`}/>
                    </a>
                </span>
            </span>
        </div>
    )
}

export default Footer;