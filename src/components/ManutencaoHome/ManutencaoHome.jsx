import { useState } from "react";
import styles from "./ManutencaoHome.module.css";

export default function ManutencaoText({ titulo, texto }) {
    const [aberto, setAberto] = useState(false);

    return (
        <div className={styles.container}>
            <div className={styles.titleContainer} onClick={() => setAberto(!aberto)}>
                <h1>{titulo}</h1>
            </div>

            <div className={`${styles.content} ${aberto ? styles.aberto : ""}`}>
                <p>{texto}</p>
            </div>
        </div>
    );
}
