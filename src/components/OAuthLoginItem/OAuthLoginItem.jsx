import styles from "./OAuthLoginItem.module.css"

function OAuthLoginItem({icon, text}){
    return(
        <div className={styles.container}>
          <img src={icon} className={styles.img}/>
          <h1>{text}</h1>  
        </div>
    );
}

export default OAuthLoginItem;