import { useRef, useState } from "react";
import PageBase from "../PageBase/PageBase";
import { FiPaperclip } from "react-icons/fi";
import Calendar from "../../components/Calendar/Calendar";
import styles from "./VisitSchedulePage.module.css";

const VisitSchedulePage = () => {
    const [visitReason, setVisitReason] = useState("");
    const fileRef = useRef();
    const [supportedFilesExtensions, setSupportedFilesExtensions] = useState(".jpg, .webp, .png, .jpeg, .png");
    
    


    const renderConditionalForm = () => {
        if(visitReason === 'Manutencao') {
            return (
                <>
                    <div className={styles.formDiv}>
                        <p className={styles.formTitle}>Selecione o Horário da Reserva</p>
                        <select onChange={(e) => setReasonVisit(e.target.value)}>
                            <option value="10:00">Segunda feira, 10 da manha</option>
                        </select>
                    </div>
                    <div className={styles.formDiv}>
                        <p className={styles.formTitle}>Escreva Uma Breve Descrição do Problema</p>
                        <textarea/>
                    </div>
                    <div className={styles.formDiv}>
                        <p className={styles.formTitle}>Imagens/Vídeos</p>
                        <input 
                            type="file" 
                            multiple
                            ref={fileRef}
                            style={{display:"none"}}
                            accept={supportedFilesExtensions}
                        />
                        <div className={styles.fileChooserWrapper} onClick={() => fileRef.current.click()}>
                            <span className={styles.fileChooserRow}>
                                <h2>Selecionar arquivos</h2>
                                <FiPaperclip size={30}/>
                            </span>
                            <span className={styles.fileChooserRow}>
                                <p>{`Arquivos Suportados: ${supportedFilesExtensions}`}</p>
                            </span>
                        </div>
                    </div>

                </>
            )
        }
    }
    return (
        <PageBase title="Agendamento De Visita">
            <form className={styles.visitScheduleForm}>
                <div className={styles.formDiv}>
                    <p className={styles.formTitle}>Selecione a data do agendamento</p>
                    <Calendar/>
                </div>
                <div className={styles.formDiv}>
                    <p className={styles.formTitle}>Selecione o motivo da visita</p>
                    <select onChange={(e) => {console.log(e);setVisitReason(e.target.value) }}>
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