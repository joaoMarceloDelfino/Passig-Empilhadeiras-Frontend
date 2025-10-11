import styles from "./Info_Card.module.css"

function InfoCard({ icon, title, text }){

    function getTextFormatted(){
        if(Array.isArray(text)){
            return text.map((item, i) => {
                return <p key={i}>{item}</p>   
            });
        }

        return (
            <p>{text}</p>
        )
    }

    return(
        <div className={styles.container}>
            <div className={styles.icon_wrapper}>
                {icon}
            </div>
            <div className={styles.info_wrapper}>
                <h1>{title}</h1>
                {getTextFormatted()}
            </div>
        </div>
    )
}

export default InfoCard;