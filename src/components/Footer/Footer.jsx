import styles from "./footer.module.css"
import { FaInstagram, FaFacebook } from "react-icons/fa"

function Footer(){
    return(
        <div className={styles.container}>
            <span className={styles.topRow}>
                <h3>Copyright @2025 FelipPassig.com</h3>
                <span className={styles.socialMediaIcons}>
                    <FaInstagram size={30} className={`${styles.socialMediaIcon} ${styles.instagramIcon}`}/>
                    <FaFacebook size={30} className={`${styles.socialMediaIcon} ${styles.facebookIcon}`}/>
                </span>
            </span>
        </div>
    )
}

export default Footer;