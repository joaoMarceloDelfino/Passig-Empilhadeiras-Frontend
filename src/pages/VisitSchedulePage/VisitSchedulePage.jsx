import { useEffect, useRef, useState } from "react";
import PageBase from "../PageBase/PageBase";
import { FiPaperclip } from "react-icons/fi";
import Calendar from "../../components/Calendar/Calendar";
import styles from "./VisitSchedulePage.module.css";
import BaseApi from "../../api/BaseApi";
import { toast } from "react-toastify";
import { FaFile } from "react-icons/fa";

const VisitSchedulePage = () => {
    const [visitReason, setVisitReason] = useState("");
    const fileRef = useRef();
    const [supportedFilesExtensions, setSupportedFilesExtensions] = useState(".jpg, .webp, .png, .jpeg, .png");
    const [disponibleTimestamps, setDisponibleTimestamps] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
    const [initialDateTime, setInitialDatetime] = useState([]);
    const [finalDateTime, setFinalDateTime] = useState([]);
    const [description, setDescription] = useState();
    const [files, setFiles] = useState([]);
    const [errors, setErrors] = useState({
        description: null
    })

    
    useEffect(() => {
        loadDisponibleScheduledTimestamps();
    }, [selectedDate])

    useEffect(() => {
        if(disponibleTimestamps.length > 0)
            onChangeSelectedTimestamp(0);
    }, [disponibleTimestamps])

    const getTimestampLabel = (initialTime, finalTime) => {
        return `${initialTime.slice(0, 5)} - ${finalTime.slice(0, 5)}`;
    }

    const onChangeSelectedTimestamp = (index) => {
        const value = disponibleTimestamps[index];
        const initialZonedDateTime = `${selectedDate}T${value.initialTime}-03:00`;
        const finalZonedDateTime = `${selectedDate}T${value.finalTime}-03:00`;
        setInitialDatetime(initialZonedDateTime);
        setFinalDateTime(finalZonedDateTime);
    }

    const validateMainentenceForm = () => {
        let qtdErros = 0;

        if(description == null || description.length == 0){
            setErrors({
                ...errors,
                description: "Campo descrição é obrigatório"
            })

            qtdErros++;
        }
        else{
            setErrors({
                ...errors,
                description: null
            })
        }
        return qtdErros > 0 ? false : true; 
    }

    const onSubmitMainentenceForm = (e) => {
        e.preventDefault();

        if(!validateMainentenceForm()) return;
        
        const formData = new FormData();
        formData.append("initialScheduledTime", initialDateTime) 
        formData.append("endScheduledTime", finalDateTime) 
        formData.append("description", description) 
        for (let i = 0; i < files.length; i++) {
            formData.append("file", files[i]);  
        }

        BaseApi.saveScheduledVisit(formData)
        .then(() => {
                toast("Agendamento Salvo Com Sucesso!");
                loadDisponibleScheduledTimestamps();
            });
    }

    const loadDisponibleScheduledTimestamps = () => {
        BaseApi.findDisponibleScheduledTimestamps(selectedDate).then(res => setDisponibleTimestamps(res.data));
    }
    

    const renderConditionalForm = () => {
        if(visitReason === 'Manutencao') {
            return (
                <>
                    <div className={styles.formDiv}>
                        <p className={styles.formTitle}>Selecione o Horário da Reserva</p>
                        <select onChange={(e) => onChangeSelectedTimestamp(e)}>
                            {
                                disponibleTimestamps.map((item, index) => {
                                    return <option key={index} value={index}>{getTimestampLabel(item.initialTime, item.finalTime)}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className={styles.formDiv}>
                        <p className={styles.formTitle}>Escreva Uma Breve Descrição do Problema</p>
                        <textarea onChange={(e) => setDescription(e.target.value.trim())}/>
                        {errors.description && <p className={styles.error}>{errors.description}</p>}
                    </div>
                    <div className={styles.formDiv}>
                        <p className={styles.formTitle}>Imagens/Vídeos</p>
                        <input 
                            type="file" 
                            multiple
                            ref={fileRef}
                            style={{display:"none"}}
                            accept={supportedFilesExtensions}
                            onChange={(e) => {setFiles(e.target.files)}}
                        />
                        <div className={styles.fileChooserWrapper} onClick={() => fileRef.current.click()}>
                            <span className={styles.fileChooserRow}>
                                <h2>Selecionar arquivos</h2>
                                <FiPaperclip size={30}/>
                            </span>
                            <span className={styles.fileChooserRow}>
                                <p>{`Extensões Suportadas: ${supportedFilesExtensions}`}</p>
                            </span>
                        </div>
                        <span className={styles.fileDiv}>
                            {
                                [...files].map((file) => (
                                    <div className={styles.fileContainer}>
                                        <FaFile size={25}/>
                                        {file.name}
                                    </div>
                                ))
                            }
                        </span>
                    </div>
                    <div className={styles.formDiv}>
                        <button type="submit">Enviar</button>
                    </div>

                </>
            )
        }
    }
    return (
        <PageBase title="Agendamento De Visita">
            <form className={styles.visitScheduleForm} onSubmit={visitReason == 'Manutencao' ? onSubmitMainentenceForm : null}>
                <div className={styles.formDiv}>
                    <p className={styles.formTitle}>Selecione a data do agendamento</p>
                    <Calendar
                        setSelectedDate={setSelectedDate}
                        selectedDate={selectedDate}
                    />
                </div>
                <div className={styles.formDiv}>
                    <p className={styles.formTitle}>Selecione o motivo da visita</p>
                    <select onChange={(e) => {setVisitReason(e.target.value) }}>
                        <option value="Selecione">Selecionar</option>
                        <option value="Manutencao">Manutencao</option>
                        <option value="Aluguel">Aluguel</option>
                    </select>
                </div>
                {renderConditionalForm()}
            </form>
        </PageBase>
    )
}

export default VisitSchedulePage;