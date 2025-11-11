import styles from "./RegisterModal.module.css"
import { useForm } from "react-hook-form";
import BaseApi from "../../api/BaseApi";
import { toast } from 'react-toastify';
import {z} from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
    email: z.email("Campo deve ser um email").trim().min(1, "Email é obrigatorio"),
    username: z.string().trim().min(1, "Nome de usuario é obrigatorio"),
    cellphoneNumber: z.string().trim().min(1, "Número de telefone é obrigatorio"),
    password: z.string().trim().min(1, "Senha é obrigatória"),
    passwordConfirmation: z.string().trim().min(1, "Confirme a obrigatória")    
})
function RegisterModal({showModal, onModalCloseHandler, setShowLoginModal}){

    const {register, 
        handleSubmit, 
        resetField, 
        formState: {errors},
        reset} = useForm({resolver: zodResolver(schema)});

    function onOpenLoginModal(){
        onModalClose();
        setShowLoginModal(true);
    }

    function onModalClose(){
        reset({}, {keepValues: false});
        onModalCloseHandler()
    }

    function onSubmit(data){

        const sucessFunction = () => {
            onModalClose();
            toast("Usuario registrado com sucesso!");
            reset({}, {keepValues: false});
        }

        BaseApi.register(data)
        .then(() => {
            sucessFunction();
        })

        
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
                            <form  noValidate className={styles.registerForm} onSubmit={handleSubmit(onSubmit)}>
                                <div className={styles.inputWrapper}>
                                    <label className={styles.label}>
                                        Email
                                        {errors.email && <p className={styles.errorMessage}>{errors.email.message}</p> }

                                    </label>
                                    <input {...register("email")} type="email" className={styles.input}/>
                                </div>
                                <div className={styles.inputWrapper}>
                                    <label className={styles.label}>
                                        Nome de usuário
                                        {errors.username && <p className={styles.errorMessage}>{errors.username.message}</p> }
                                        </label>
                                    <input {...register("username")} type="text" className={styles.input}/>
                                </div>
                                <div className={styles.inputWrapper}>
                                    <label className={styles.label}>
                                        Telefone
                                        {errors.cellphoneNumber && <p className={styles.errorMessage}>{errors.cellphoneNumber.message}</p> }
                                        </label>
                                    <input {...register("cellphoneNumber")} type="text" className={styles.input}/>
                                </div>
                                <div className={styles.inputWrapper}>
                                    <label className={styles.label}>
                                        Senha
                                        {errors.password && <p className={styles.errorMessage}>{errors.password.message}</p> }
                                    </label>
                                    <input {...register("password")} type="password" className={styles.input}/>
                                </div>
                                <div className={styles.inputWrapper}>
                                    <label className={styles.label}>
                                        Confirme a senha
                                        {errors.passwordConfirmation && <p className={styles.errorMessage}>{errors.passwordConfirmation.message}</p> }
                                    </label>
                                    <input {...register("passwordConfirmation")}type="password" className={styles.input}/>
                                </div>
                                <button className={styles.button}  type="submit">
                                    Registrar
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