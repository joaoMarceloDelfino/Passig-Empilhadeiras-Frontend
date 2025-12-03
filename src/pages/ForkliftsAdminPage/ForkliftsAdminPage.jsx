import { FaPlus } from "react-icons/fa6";
import PageBase from "../PageBase/PageBase";
import styles from "./ForkliftsAdminPage.module.css"
import { useEffect, useRef, useState } from "react";
import BaseApi from "../../api/BaseApi";
import NotFound from "../../components/NotFound/NotFound";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import BaseModal from "../../components/BaseModal/BaseModal";
import { useForm } from "react-hook-form";
import z from "zod";
import { FiPaperclip } from "react-icons/fi";
import { zodResolver } from "@hookform/resolvers/zod";
import { findStatusByCode, status } from "../../enums/ForkliftStatusEnum";
import { toast } from "react-toastify";
import Table from "../../components/Table/Table";
import DateHelper from "../../helpers/DateHelper";
import CarrousselImagesModal from "../../components/CarrousselmagesModal/CarrousselImagesModal";

const schema = z.object({
  name: z.string().trim().min(1, "Nome da Empilhadeira é obrigatório"),
  model: z.string().trim().min(1, "Modelo é obrigatório"),
  manufacturer: z.string().trim().min(1, "Nome do fabricante é obrigatório"),
  weigthCapacityKg: z.coerce.number().min(1, "Capacidade em quilos é obrigatória"),
  fabricationYear: z.coerce.number().min(1900, "Ano de fabricação é obrigatório").max(new Date().getFullYear(), "Ano de Fabricação não pode ser futura"),
  aquisitionDate: z.string().trim().min(1, "Data de aquisição é obrigatória"),
  status: z.string().trim().min(1, "Status é obrigatório"),
  file: z
  .any()
  .refine((files) => files && files.length > 0, {
    message: "Selecione ao menos uma foto",
  })
});

const ForkliftsAdminPage = () => {

    
    const {register, 
            handleSubmit, 
            resetField, 
            formState: {errors},
            setError,
            reset} = useForm({resolver: zodResolver(schema)});
    const fileRef = useRef();
    const[empilhadeirasList, setEmpilhadeirasList] = useState([]);
    const[isLoading, setIsLoading] = useState(false);
    const[showNewForkliftModal, setShowNewForkliftModal] = useState(false);
    const[showAttachmentsModal, setShowAttachmentsModal] = useState(false);
    const[imagesList, setImagesList] = useState([]);
    const [supportedFilesExtensions, setSupportedFilesExtensions] = useState(".jpg, .webp, .png, .jpeg");

 
    useEffect(() => {
        loadEmpilhadeiras();
    }, []);
    const loadEmpilhadeiras = () => {

    setIsLoading(true);

    BaseApi.findAllEmpilhadeiras()
        .then((res) => {
        const listaFormatada = res.data.map((item) => ({
            ...item,
            status: findStatusByCode(item.status).description,
            aquisitionDate: DateHelper.dateToBrFormat(item.aquisitionDate),
        }));

        setEmpilhadeirasList(listaFormatada);
        })
        .finally(() => setIsLoading(false));
    };

    const onSubmit = (data) => {
        
        let formData = new FormData();
        formData.append("name", data.name);
        formData.append("model", data.model);
        formData.append("manufacturer", data.manufacturer);
        formData.append("weigthCapacityKg", data.weigthCapacityKg);
        formData.append("fabricationYear", data.fabricationYear);
        formData.append("status", data.status);
        formData.append("aquisitionDate", data.aquisitionDate);
        for (let i = 0; i < data.file.length; i++) {
            formData.append("file", data.file[i]);  
        }

        BaseApi.saveForklift(formData).then(() => {
            toast.success("Empilhadeira Salva Com Sucesso!", {
                position: "bottom-right",
                autoClose: 3000,     
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored"      
            })
        })

    }

    const viewHandler = (index) => {
        setImagesList(empilhadeirasList[index]?.base64Images);
        setShowAttachmentsModal(true);
    }
    
    if(isLoading) return <LoadingSpinner/>

    return (
        <PageBase 
            title="Empilhadeiras"
            button={
            <button 
                className={styles.novaEmpilhadeiraBotao} 
                onClick={() => setShowNewForkliftModal(true)}
            >
                    <FaPlus/>
                    <p>Adicionar nova empilhadeira</p>
            </button>}
        >
            {
                empilhadeirasList.length === 0 ?
                    <NotFound 
                        title="Nenhum resultado encontrado!" 
                        text="Não foi encontrada nenhuma empilhadeira cadastrada no momento."
                    /> 
                    : (
                        <div className={styles.tableWrapper}>
                            <Table 
                                data={empilhadeirasList}
                                columns={["name", "model", "manufacturer", "weigthCapacityKg", "fabricationYear", "status", "aquisitionDate"]} 
                                headers={["Nome", "Modelo", "Fabricante", "Capacidade Em Quilos", "Ano De Fabricação", "Status", "Data De Aquisição"]}
                                viewHandler={viewHandler}
                            />
                        </div>
                    )
            }

            <CarrousselImagesModal
                ImagesList={imagesList}
                onRequestClose={() => setShowAttachmentsModal(false)}
                isOpen={showAttachmentsModal}
            />

            <BaseModal
                isOpen={showNewForkliftModal}
                onRequestClose={() => setShowNewForkliftModal(false)}
                contentLabel="Adicionar Nova Empilhadeira"
            >
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.inputWrapper}>
                        <label className={styles.label}>
                            Nome
                            {errors.name && <p className={styles.errorMessage}>{errors.name.message}</p> }
                        </label>
                        <input {...register("name")} className={styles.input}/>
                    </div>
                    <div className={styles.inputWrapper}>
                        <label className={styles.label}>
                            Modelo
                            {errors.model && <p className={styles.errorMessage}>{errors.model.message}</p> }
                        </label>
                        <input {...register("model")} className={styles.input}/>
                    </div>
                    <div className={styles.inputWrapper}>
                        <label className={styles.label}>
                            Fabricante
                            {errors.manufacturer && <p className={styles.errorMessage}>{errors.manufacturer.message}</p> }
                        </label>
                        <input {...register("manufacturer")} className={styles.input}/>
                    </div>
                    <div className={styles.inputWrapper}>
                        <label className={styles.label}>
                            Capacidade em quilos
                            {errors.weigthCapacityKg && <p className={styles.errorMessage}>{errors.weigthCapacityKg.message}</p> }
                        </label>
                        <input type = "number" {...register("weigthCapacityKg")} className={styles.input}/>
                    </div>
                    <div className={styles.inputWrapper}>
                        <label className={styles.label}>
                            Ano de Fabricação
                            {errors.fabricationYear && <p className={styles.errorMessage}>{errors.fabricationYear.message}</p> }
                        </label>
                        <input type="number" {...register("fabricationYear")} className={styles.input}/>
                    </div>
                    <div className={styles.inputWrapper}>
                        <label className={styles.label}>Status</label>
                        <select {...register("status")} className={styles.input}>
                            {
                                status.map((item) => {
                                    return <option value={item.code}>{item.description}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className={styles.inputWrapper}>
                        <label className={styles.label}>
                            Data de aquisição
                            {errors.aquisitionDate && <p className={styles.errorMessage}>{errors.aquisitionDate.message}</p> }
                        </label>
                        <input {...register("aquisitionDate")}  className={styles.input}/>
                    </div>
                    <input 
                        type="file" 
                        multiple
                        {...register("file")}
                        ref={(e) => {
                        register("file").ref(e);
                        fileRef.current = e;
                        }}
                        style={{display:"none"}}
                        accept=".jpg,.jpeg,.png,.webp"
                    />

                    <div className={styles.inputWrapper}>
                        <label className={styles.label}>
                            Selecione as fotos da empilhadeira
                            {errors.file && <p className={styles.errorMessage}>{errors.file.message}</p> }
                        </label>
                        <div className={styles.fileChooserWrapper} onClick={() => fileRef.current.click()}>
                            <span className={styles.fileChooserRow}>
                                <h2>Selecionar arquivos</h2>
                                <FiPaperclip size={30}/>
                            </span>
                            <span className={styles.fileChooserRow}>
                                <p>{`Extensões Suportadas: ${supportedFilesExtensions}`}</p>
                            </span>
                        </div>
                    </div>
                    <button type="submit">Adicionar Empilhadeira </button>
                </form>
            </BaseModal>
        </PageBase>
    )
}

export default ForkliftsAdminPage;