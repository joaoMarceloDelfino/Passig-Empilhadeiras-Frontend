import styles from "./Login_Modal.module.css"
import BaseApi from "../../api/BaseApi";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useState } from "react";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const schema = z.object({
    email: z.string().trim().min(1, "Email é obrigatório").email("Campo deve ser um email"),
    password: z.string().trim().min(1, "Senha é obrigatória"),
});
function LoginModal({showModal, onModalCloseHandler, setShowRegisterModal, setIsUserLogged}){

    const {register, 
            handleSubmit, 
            resetField, 
            formState: {errors},
            setError,
            reset} = useForm({resolver: zodResolver(schema)});

    const[isLoading, setIsLoading] = useState(false);

    function onOpenRegisterModal(){
        onModalClose();
        setShowRegisterModal(true);
    }

    function onSubmit(data){
        
        const sucessFunction = () => {
            onModalClose();
            setIsUserLogged(true);
            toast("Usuario logado com sucesso!");
            reset({}, {keepValues: false});
        }

        const errorFunction = () => {
            setError("email", {message: "Email ou senha incorretos"});
        }

        setIsLoading(true);

        BaseApi.login(data)
        .then(() => {
            sucessFunction();
        })
        .catch(() => {
            errorFunction();
        })
        .finally(() => setIsLoading(false));

    }

    function onModalClose(){
        reset({}, {keepValues: false});
        onModalCloseHandler()
    }

    return(
        <>
            {
                showModal && 
                <div className={styles.bluredBackground} onClick={onModalClose}>
                    <main className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.image}>
                        </div>
                        <div className={styles.modalContent}>

                            <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)} noValidate>
                                <div className={styles.inputWrapper}>
                                    <label className={styles.emailLabel}>
                                        Email
                                    </label>
                                    <input {...register("email")} type="email" className={`${styles.input} ${errors.email && styles.errorDiv}`}/>
                                    {errors.email && <p className={styles.errorMessage}>{errors.email.message}</p> }
                                </div>
                                <div className={styles.inputWrapper}>
                                    <span className={styles.senhaRow}>
                                        <label className={styles.senhaLabel}>
                                            Senha
                                        </label>
                                    </span>
                                    <input {...register("password")} type="password" className={`${styles.input} ${errors.password && styles.errorDiv}`}/>
                                    {errors.password && <p className={styles.errorMessage}>{errors.password.message}</p>}
                                </div>
                                <button className={styles.button} type="submit">
                                    {
                                        !isLoading ? 
                                            "Logar"
                                        : <LoadingSpinner size={36}/>
                                    }
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