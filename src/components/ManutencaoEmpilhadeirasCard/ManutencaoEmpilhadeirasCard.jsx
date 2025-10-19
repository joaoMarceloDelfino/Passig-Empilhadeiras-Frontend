
import styles from "./manutencaoEmpilhadeirasCard.module.css"

function ManutencaoEmpilhadeirasCard({title, description}){
    return(
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <h1>{title}</h1>
            </div>
            <div className={styles.descriptionContainer}>
                <p>
                    {description}
                </p>
            </div>
        </div>
    );
}

export default ManutencaoEmpilhadeirasCard;