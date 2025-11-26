import OAuthLoginItem from "../../components/OAuthLoginItem/OAuthLoginItem";
import styles from "./Login_Modal.module.css"
import FacebookLogo from "../../assets/Facebook_logo.png"
import GoogleLogo from "../../assets/Google_logo.png"
import BaseApi from "../../api/BaseApi";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";


function LoginModal({showModal, onModalClose, setShowRegisterModal}){

    const {register, 
            handleSubmit, 
            resetField, 
            formState: {errors},
            reset} = useForm();

    function onOpenRegisterModal(){
        onModalClose();
        setShowRegisterModal(true);
    }

    function onSubmit(data){
        
        const sucessFunction = () => {
            onModalClose();
            toast("Usuario logado com sucesso!");
            reset({}, {keepValues: false});
        }

        BaseApi.login(data)
        .then(() => {
            sucessFunction();
        })

        
    }

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
                            <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
                                <div className={styles.inputWrapper}>
                                    <label className={styles.emailLabel}>Email</label>
                                    <input {...register("email")} type="email" className={styles.input}/>
                                </div>
                                <div className={styles.inputWrapper}>
                                    <span className={styles.senhaRow}>
                                        <label>Senha</label>
                                        <a>Esqueci minha senha</a>
                                    </span>
                                    <input {...register("password")} type="password" className={styles.input}/>
                                </div>
                                <button className={styles.button} type="submit">
                                    Logar
                                </button>
                                <div className={styles.registrarWrapper}>
                                    <p>Ainda não possui uma conta?</p>
                                    <a onClick={onOpenRegisterModal}>Registre-se</a>
                                </div>
                            </form>
                        </div>
                    </main>
                </div>
            }
        </>
    )
}

export default LoginModal;