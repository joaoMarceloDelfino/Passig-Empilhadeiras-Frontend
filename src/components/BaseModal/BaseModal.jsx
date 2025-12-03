import ReactModal from "react-modal"
import styles from "./BaseModal.module.css";

const BaseModal = ({children, onRequestClose, isOpen, contentLabel}) => {

    return(
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel={contentLabel}
            className={styles.modal}
            overlayClassName={styles.overlay}
        >
            <div className={styles.content}>
                {children}
            </div>
        </ReactModal>
    )
    
}

export default BaseModal;