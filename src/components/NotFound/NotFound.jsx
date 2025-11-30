import { FaSearch } from "react-icons/fa";
import styles from "./NotFOund.module.css";

const NotFound = ({title, text}) => {

    return(
        <div className={styles.notFoundWrapper}>
            <FaSearch size={50}/>
            <div className={styles.descriptionWrapper}>
                <h2 className={styles.notFoundTitle}>{title}</h2>
                <p className={styles.notFoundSubtitle}>{text}</p>
            </div>
        </div>
    )
}

export default NotFound;