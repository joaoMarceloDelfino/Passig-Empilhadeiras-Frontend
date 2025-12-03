import styles from "./PageBase.module.css"

const PageBase = ({children, title, button}) => {
    return (
        <div className={styles.container}>
            <span className={styles.titleRow}>
                <h1 className={styles.catalogTitle}>{title}</h1>
                {button}
            </span>
            {children}
        </div>
    );
}

export default PageBase;