import styles from "./EmpilhadeiraModal.module.css";

function EmpilhadeiraModal({showModal, onModalClose, selectedEmpilhadeira}) {
    return (
          <>
            {
                showModal && 
                <div className={styles.bluredBackground} onClick={onModalClose}>
                    <main className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.titleWrapper}>
                            <h2 className={styles.modalTitle}>Empilhadeira Reacher</h2>
                        </div>
                        <div className={styles.informationList}>
                            <span className={styles.informationWrapper}>
                                <p className={styles.informationLabel}>Ano: </p>
                                <p className={styles.informationText}>2025</p>
                            </span>
                            <span className={styles.informationWrapper}>
                                <p className={styles.informationLabel}>Fabricante: </p>
                                <p className={styles.informationText}>Ford</p>
                            </span>
                            <span className={styles.informationWrapper}>
                                <p className={styles.informationLabel}>Modelo: </p>
                                <p className={styles.informationText}>Modelo bom</p>
                            </span>
                            <span className={styles.informationWrapper}>
                                <p className={styles.informationLabel}>Capacidade (quilos): </p>
                                <p className={styles.informationText}>1000kg</p>
                            </span>
                            <span className={styles.informationWrapper}>
                                <p className={styles.informationLabel}>Data de aquisição: </p>
                                <p className={styles.informationText}>01/10/2025</p>
                            </span>
                        </div>
                    </main>
                </div>
            }
        </>
    )
}

export default EmpilhadeiraModal;