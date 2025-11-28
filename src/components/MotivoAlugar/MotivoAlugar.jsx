import { useState } from "react";
import { FaCog } from "react-icons/fa";
import styles from "./MotivoAlugar.module.css";

export default function MotivoAlugar({ titulo, texto }) {
  const [aberto, setAberto] = useState(false);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header} onClick={() => setAberto(!aberto)}>
        <FaCog size={30} color="#F77F00" className={styles.icon} />
        <p>{titulo}</p>
      </div>

      <div className={`${styles.content} ${aberto ? styles.aberto : ""}`}>
        <p>{texto}</p>
      </div>
    </div>
  );
}
