import styles from "./EmpilhadeiraModal.module.css";
import DateHelper from "../../helpers/DateHelper";

function EmpilhadeiraModal({showModal, onModalClose, dados}) {
    return (
          <>
            {
                showModal && 
                <div className={styles.bluredBackground} onClick={onModalClose}>
                    <main className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.titleWrapper}>
                            <h2 className={styles.modalTitle}>{dados.name}</h2>
                        </div>
                        <div className={styles.informationList}>
                            <span className={styles.informationWrapper}>
                                <p className={styles.informationLabel}>Ano: </p>
                                <p className={styles.informationText}>{dados.fabricationYear}</p>
                            </span>
                            <span className={styles.informationWrapper}>
                                <p className={styles.informationLabel}>Fabricante: </p>
                                <p className={styles.informationText}>{dados.manufacturer}</p>
                            </span>
                            <span className={styles.informationWrapper}>
                                <p className={styles.informationLabel}>Modelo: </p>
                                <p className={styles.informationText}>{dados.model}</p>
                            </span>
                            <span className={styles.informationWrapper}>
                                <p className={styles.informationLabel}>Capacidade (quilos): </p>
                                <p className={styles.informationText}>{`${dados.weigthCapacityKg} kg`}</p>
                            </span>
                            <span className={styles.informationWrapper}>
                                <p className={styles.informationLabel}>Data de aquisição: </p>
                                <p className={styles.informationText}>{DateHelper.dateToBrFormat(dados.aquisitionDate)}</p>
                            </span>
                        </div>
                    </main>
                </div>
            }
        </>
    )
}

export default EmpilhadeiraModal;