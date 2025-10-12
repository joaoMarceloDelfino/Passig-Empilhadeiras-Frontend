import styles from "./Info_Card.module.css"

function InfoCard({ icon, title, text }){

    function getTextFormatted(){
        if(Array.isArray(text)){
            return text.map((item, i) => {
                return <p key={i} className={styles.text}>{item}</p>   
            });
        }

        return (
            <p className={styles.text}>{text}</p>
        )
    }

    return(
        <div className={styles.container}>
            <div className={styles.icon_wrapper}>
                {icon}
            </div>
            <div className={styles.info_wrapper}>
                <h1 className={styles.title}>{title}</h1>
                {getTextFormatted()}
            </div>
        </div>
    )
}

export default InfoCard;