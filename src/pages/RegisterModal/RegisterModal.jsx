import styles from "./RegisterModal.module.css"

function RegisterModal({showModal, onModalClose, setShowLoginModal}){

    function onOpenLoginModal(){
        onModalClose();
        setShowLoginModal(true);
    }

    return (
           <>
            {
                showModal && 
                <div className={styles.bluredBackground} onClick={onModalClose}>
                    <main className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.image}>
                            <h1>Imagem</h1> {/*Adicionar imagem futuramente*/}
                        </div>

                        <div className={styles.modalContent}>
                            <form className={styles.registerForm}>
                                <div className={styles.inputWrapper}>
                                    <label className={styles.label}>Email</label>
                                    <input type="email" className={styles.input}/>
                                </div>
                                <div className={styles.inputWrapper}>
                                    <label className={styles.label}>Nome de usuário</label>
                                    <input type="text" className={styles.input}/>
                                </div>
                                <div className={styles.inputWrapper}>
                                    <label className={styles.label}>Telefone</label>
                                    <input type="text" className={styles.input}/>
                                </div>
                                <div className={styles.inputWrapper}>
                                    <label className={styles.label}>Senha</label>
                                    <input type="password" className={styles.input}/>
                                </div>
                                <div className={styles.inputWrapper}>
                                    <label className={styles.label}>Confirme a senha</label>
                                    <input type="password" className={styles.input}/>
                                </div>
                                <button className={styles.button} onClick={(e) => {e.preventDefault()}}>
                                    Logar
                                </button>
                                <div className={styles.registerWrapper}>
                                    <p>Já possui uma conta?</p>
                                    <a onClick={onOpenLoginModal}>Logar-se</a>
                                </div>
                            </form>
                        </div>

                    </main>
                </div>
            }
        </>
    )
}

export default RegisterModal;