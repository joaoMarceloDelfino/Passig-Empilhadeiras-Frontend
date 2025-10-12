import OAuthLoginItem from "../../components/OAuthLoginItem/OAuthLoginItem";
import styles from "./Login_Modal.module.css"
import FacebookLogo from "../../assets/Facebook_logo.png"
import GoogleLogo from "../../assets/Google_logo.png"

function LoginModal({showModal, onModalClose}){
    return(
        <>
            {
                showModal && 
                <div className={styles.bluredBackground} onClick={onModalClose}>
                    <main className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.image}>
                            <h1>Imagem</h1> {/*Adicionar imagem futuramente*/}
                        </div>
                        <div className={styles.modalContent}>
                            <div className={styles.oAuthItensWrapper}>
                                <OAuthLoginItem icon={FacebookLogo} text="Continue com Facebook"/>
                                <OAuthLoginItem icon={GoogleLogo} text="Continue com Google"/>
                            </div>
                            <span className={styles.linhaDivisoriaWrapper}>
                                <hr className={styles.linhaDivisoria}/>
                                <p className={styles.ouPlaceholder}>Ou</p>
                            </span>
                        </div>
                    </main>
                </div>
            }
        </>
    )
}

export default LoginModal;