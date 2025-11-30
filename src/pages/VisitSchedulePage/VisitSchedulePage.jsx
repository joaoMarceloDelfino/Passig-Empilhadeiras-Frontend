import { useEffect, useRef, useState } from "react";
import PageBase from "../PageBase/PageBase";
import { FiPaperclip } from "react-icons/fi";
import Calendar from "../../components/Calendar/Calendar";
import styles from "./VisitSchedulePage.module.css";
import BaseApi from "../../api/BaseApi";
import { toast } from "react-toastify";
import { FaExternalLinkAlt, FaFile } from "react-icons/fa";
import { Link } from "react-router-dom";
import NotFound from "../../components/NotFound/NotFound";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const VisitSchedulePage = () => {
    const [visitReason, setVisitReason] = useState("");
    const fileRef = useRef();
    const [supportedFilesExtensions, setSupportedFilesExtensions] = useState(".jpg, .webp, .png, .jpeg");
    const [disponibleTimestamps, setDisponibleTimestamps] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
    const [initialDateTime, setInitialDatetime] = useState([]);
    const [finalDateTime, setFinalDateTime] = useState([]);
    const [description, setDescription] = useState();
    const [files, setFiles] = useState([]);
    const [errors, setErrors] = useState({
        description: null
    })
    const [forklifts, setForklifts] = useState([]);
    const [selectedForklift, setSelectedForklift] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    
    useEffect(() => {
        loadDisponibleScheduledTimestamps();
    }, [selectedDate])

    useEffect(() => {
        if(disponibleTimestamps.length > 0)
            onChangeSelectedTimestamp(0);

        if(forklifts.length > 0)
            onChangeSelectedForklift(0);
    }, [disponibleTimestamps, forklifts])

    useEffect(()  => {
        loadForklifts();
    }, []);

    const getTimestampLabel = (initialTime, finalTime) => {
        return `${initialTime.slice(0, 5)} - ${finalTime.slice(0, 5)}`;
    }

    const onChangeSelectedTimestamp = (index) => {
        const value = disponibleTimestamps[Number(index)];
        const initialZonedDateTime = `${selectedDate}T${value.initialTime}-03:00`;
        const finalZonedDateTime = `${selectedDate}T${value.finalTime}-03:00`;
        setInitialDatetime(initialZonedDateTime);
        setFinalDateTime(finalZonedDateTime);
    }

    const onChangeSelectedForklift = (index) => {
        const value = forklifts[index];
        console.log(value)
        setSelectedForklift(value);
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

    const onSubmitRentForm = (e) => {
        e.preventDefault();

        
        const body = {
            initialScheduledTime: initialDateTime,
            endScheduledTime: finalDateTime,
            forkiliftDtoV1: selectedForklift,
            description: description
        }

        BaseApi.saveForkliftRentVisit(body)
        .then(() => {
            toast("Agendamento Salvo Com Sucesso!");
            loadDisponibleScheduledTimestamps();
        });
    }

    const loadDisponibleScheduledTimestamps = () => {
        setIsLoading(true);
        BaseApi.findDisponibleScheduledTimestamps(selectedDate).then(res => {
            setDisponibleTimestamps(res.data);
            setIsLoading(false);
        });
    }

    const loadForklifts = () => {
        setIsLoading(true);
        BaseApi.findAllEmpilhadeiras().then(res => {
            setForklifts(res.data.filter(x => x.status === "FO"));
            setIsLoading(false);
        });
    }
    
    const onChangeFiles = (e) => {
        const validExtensions = [".jpg", ".jpeg", ".png", ".webp"];
        const files = Array.from(e.target.files).filter(file =>
            validExtensions.some(ext => file.name.toLowerCase().endsWith(ext))
        );

        console.log(files)
        setFiles(files);

    }

    const renderConditionalForm = () => {

        if(isLoading) return <LoadingSpinner/>

        if(disponibleTimestamps.length <= 0) {
                return <NotFound 
                    title="Horários disponíveis não encontrados"
                    text="Não há horários dísponiveis para o dia selecionado"
                />
        }

        if(visitReason === 'Manutencao') {
            
            return (
                <>
                    <div className={styles.formDiv}>
                        <p className={styles.formTitle}>Selecione o Horário da Reserva</p>
                        <select onChange={(e) => onChangeSelectedTimestamp(e.target.value)} className={styles.dropdown}>
                            {
                                disponibleTimestamps.map((item, index) => {
                                    return <option key={index} value={index}>{getTimestampLabel(item.initialTime, item.finalTime)}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className={styles.formDiv}>
                        <p className={styles.formTitle}>Escreva Uma Breve Descrição do Problema</p>
                        <textarea onChange={(e) => setDescription(e.target.value.trim())} className={styles.textArea}/>
                        {errors.description && <p className={styles.error}>{errors.description}</p>}
                    </div>
                    <div className={styles.formDiv}>
                        <p className={styles.formTitle}>Imagens/Vídeos</p>
                        <input 
                            type="file" 
                            multiple
                            ref={fileRef}
                            style={{display:"none"}}
                            accept=".jpg,.jpeg,.png,.webp"
                            onChange={onChangeFiles}
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
        } else if(visitReason == "Aluguel") {

            if(forklifts.length <= 0 ) {
                return <NotFound title={"Nenhum resultado encontrado!"} text={"Não foi encontrada nenhuma empilhadeira disponível no momento."}/>
            }

            return(
                    <>
                         <div className={styles.formDiv}>
                            <p className={styles.formTitle}>Selecione o Horário da Reserva</p>
                            <select onChange={(e) => onChangeSelectedTimestamp(e.target.value)} className={styles.dropdown}>
                                {
                                    disponibleTimestamps.map((item, index) => {
                                        return <option key={index} value={index}>{getTimestampLabel(item.initialTime, item.finalTime)}</option>
                                    })
                                }
                            </select>
                        </div>
                         <div className={styles.formDiv}>
                            <span className={styles.labelWrapper}>
                                <p className={styles.formTitle}>Selecione a Empilhadeira Desejada</p>
                                <Link to={"/catalogo"} className={styles.buttonWrapper} title="Consultar Empilhadeiras">
                                        <FaExternalLinkAlt className={styles.externalLinkIcon} size={20}/>
                                </Link>
                            </span>
                            <select className={styles.dropdown} onChange={(e) => onChangeSelectedForklift(e.target.value)}> 
                                {
                                    forklifts.map((item, index) => {
                                        return <option key={item.id} value={index} >
                                            {`${item.name} - ${item.manufacturer} ${item.model} - ${item.fabricationYear} `}
                                    </option>
                                    })
                                }
                            </select>
                        </div>
                        <div className={styles.formDiv}>
                            <p className={styles.formTitle}>Escreva Uma Breve Descrição (opcional)</p>
                            <textarea onChange={(e) => setDescription(e.target.value.trim())} className={styles.textArea}/>
                            {errors.description && <p className={styles.error}>{errors.description}</p>}
                        </div>
                        <div className={styles.formDiv}>
                            <button type="submit">Enviar</button>
                        </div>
                    </>
            )
        }
    }

    // if(isLoading) return <LoadingSpinner/>

    return (
        <PageBase title="Agendamento De Visita">
            <form className={styles.visitScheduleForm} onSubmit={visitReason == 'Manutencao' ? onSubmitMainentenceForm : onSubmitRentForm}>
                <div className={styles.formDiv}>
                    <p className={styles.formTitle}>Selecione a data do agendamento</p>
                    <Calendar
                        setSelectedDate={setSelectedDate}
                        selectedDate={selectedDate}
                    />
                </div>
                <div className={styles.formDiv}>
                    <p className={styles.formTitle}>Selecione o motivo da visita</p>
                    <select onChange={(e) => {setVisitReason(e.target.value) }} className={styles.dropdown}>
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