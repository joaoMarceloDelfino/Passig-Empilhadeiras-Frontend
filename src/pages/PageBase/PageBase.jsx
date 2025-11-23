import styles from "./PageBase.module.css"

const PageBase = ({children, title}) => {
    return (
        <div className={styles.container}>
            <h1 className={styles.catalogTitle}>{title}</h1>
            {children}
        </div>
    );
}

export default PageBase;