import styles from "./RegisterModal.module.css"
import { Controller, useForm } from "react-hook-form";
import BaseApi from "../../api/BaseApi";
import { toast } from 'react-toastify';
import {z} from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PatternFormat } from "react-number-format";
import { useState } from "react";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const schema = z.object({
  email: z.string().trim().min(1, "Email é obrigatório").email("Campo deve ser um email"),
  username: z.string().trim().min(1, "Nome de usuário é obrigatório"),
  cellphoneNumber: z.string().trim().min(1, "Número de telefone é obrigatório"),
  password: z.string().trim().min(1, "Senha é obrigatória"),
  passwordConfirmation: z.string().trim().min(1, "A confirmação da senha é obrigatória"),
}).refine((data) => data.password === data.passwordConfirmation, {
  message: "As senhas não coincidem",
  path: ["passwordConfirmation"], 
});


function RegisterModal({showModal, onModalCloseHandler, setShowLoginModal}){
    const [isLoading, setIsLoading] = useState(false);
    
    const {register, 
        handleSubmit, 
        formState: {errors},
        reset, 
        setError, 
        control, 
        } = useForm({resolver: zodResolver(schema), defaultValues:{cellphoneNumber: ""}});

    function onOpenLoginModal(){
        onModalClose();
        setShowLoginModal(true);
    }

    function onModalClose(){
        reset({}, {keepValues: false});
        onModalCloseHandler()
    }

    async function onSubmit(data){    
        const sucessFunction = () => {
            onModalClose();
            toast("Usuario registrado com sucesso!");
            reset({}, {keepValues: false});
        }

        try {
            setIsLoading(true)
            const res = await BaseApi.existsByEmail(data.email);

        if (res.data === true) {
            setError("email", { message: "Email já está em uso" });
            return;
        }
            await BaseApi.register(data);
            sucessFunction();
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }


    }

    return (
           <>
            {
                showModal && 
                <div className={styles.bluredBackground} onClick={onModalClose}>
                    <main className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.image}>
                        </div>
                        <div className={styles.modalContent}>
                            <form  noValidate className={styles.registerForm} onSubmit={handleSubmit(onSubmit)}>
                                <div className={styles.inputWrapper}>
                                    <label className={styles.label}>
                                        Email
                                        {errors.email && <p className={styles.errorMessage}>{errors.email.message}</p> }

                                    </label>
                                    <input maxLength={255} {...register("email")} type="email" className={`${styles.input} ${errors.email && styles.errorDiv}`}/>
                                </div>
                                <div className={styles.inputWrapper}>
                                    <label className={styles.label}>
                                        Nome Completo
                                        {errors.username && <p className={styles.errorMessage}>{errors.username.message}</p> }
                                        </label>
                                    <input maxLength={100} {...register("username")} type="text" className={`${styles.input} ${errors.username && styles.errorDiv}`}/>
                                </div>
                                <div className={styles.inputWrapper}>
                                    <label className={styles.label}>
                                        Telefone
                                        {errors.cellphoneNumber && <p className={styles.errorMessage}>{errors.cellphoneNumber.message}</p> }
                                        </label>
                                    <Controller
                                        name="cellphoneNumber"
                                        control={control}
                                        rules={{ required: "Número de telefone é obrigatório" }}
                                        render={({ field }) => (
                                            <PatternFormat
                                            format="(##) #####-####"
                                            allowEmptyFormatting
                                            mask="_"
                                            value={field.value} 
                                            onValueChange={(values) => {
                                                field.onChange(values.value);
                                            }}
                                            className={`${styles.input} ${errors.cellphoneNumber && styles.errorDiv}`}
                                            />
                                        )}
                                        />

                                </div>
                                <div className={styles.inputWrapper}>
                                    <label className={styles.label}>
                                        Senha
                                        {errors.password && <p className={styles.errorMessage}>{errors.password.message}</p> }
                                    </label>
                                    <input maxLength={100} {...register("password")} type="password" className={`${styles.input} ${errors.password && styles.errorDiv}`}/>
                                </div>
                                <div className={styles.inputWrapper}>
                                    <label className={styles.label}>
                                        Confirme a senha
                                        {errors.passwordConfirmation && <p className={styles.errorMessage}>{errors.passwordConfirmation.message}</p> }
                                    </label>
                                    <input maxLength={100} {...register("passwordConfirmation")}type="password" className={`${styles.input} ${errors.passwordConfirmation && styles.errorDiv}`}/>
                                </div>
                                <button className={styles.button}  type="submit">
                                    {
                                        !isLoading ? 
                                            "Registrar"
                                        : <LoadingSpinner size={36}/>
                                    }
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