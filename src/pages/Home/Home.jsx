import styles from "./Home.module.css"
import ManutencaoEmpilhadeirasCard from "../../components/ManutencaoEmpilhadeirasCard/ManutencaoEmpilhadeirasCard";
import { FaCog } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import BaseApi from "../../api/BaseApi";
import EmpilhaManu from "../../assets/empilhadeira_ManuArea.png";

import MotivoAlugar from "../../components/MotivoAlugar/MotivoAlugar";
import ManutencaoHome from "../../components/ManutencaoHome/ManutencaoHome";



function Home({ setIsUserLoggedHandler }) {

    useEffect(() => {
        BaseApi.isUserLogged().then((res) => { setIsUserLoggedHandler(res.data) }).catch(() => setIsUserLoggedHandler(false))
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.topContent}>
                <div className={styles.titleContainer}>
                    <h1 className={styles.title}>Serviços mecânicos e aluguel de empilhadeiras</h1>
                    <h2 className="subtitle">Conserto e aluguel de empilhadeiras</h2>
                </div>
                <div className={styles.imageContainer}>

                </div>
            </div>
            <div className={styles.middleContent}>
                <h1 className={styles.servicesTitle}>Manutenção de empilhadeiras</h1>
                <div className={styles.serviceCards}>
                    <ManutencaoHome titulo="Manutencao preventiva" 
                    texto="Evita falhas antes que aconteçam, garantindo que sua empilhadeira opere sempre no máximo desempenho e com segurança." />
                    <ManutencaoHome titulo="Manutencao corretiva"
                     texto="Atuamos rapidamente para solucionar problemas e reparar danos, reduzindo o tempo de máquina parada e evitando prejuízos." />
                    <ManutencaoHome titulo="Reforma completa"
                     texto="Restauração total da máquina, incluindo revisão estrutural, elétrica e mecânica, deixando a empilhadeira como nova." />
                </div>
            </div>
            <div className={styles.bottomContent}>
                <div className={styles.leftDiv}>
                    <h1 className={styles.servicesTitle}>Aluguel de empilhadeiras</h1>
                    <div className={styles.empilhadeiraImage}>
                        <img src={EmpilhaManu} alt="Empilhadeira" />
                    </div>
                </div>
                <div className={styles.rigthDiv}>
                    <h1 className={styles.servicesTitle}>Motivos para alugar nossas empilhadeiras</h1>

                    <div className={styles.motivosAlugarContainer}>
                        <MotivoAlugar
                            titulo="Redução de Custos"
                            texto="O aluguel evita investimento alto na compra e permite ajustar a frota conforme a demanda."
                        />

                        <MotivoAlugar
                            titulo="Equipamentos Confiáveis"
                            texto="Empilhadeiras modernas, revisadas e prontas para operar, garantindo segurança e produtividade."
                        />

                        <MotivoAlugar
                            titulo="Manutenção Inclusa"
                            texto="Incluímos manutenção preventiva e corretiva, reduzindo paradas e custos adicionais."
                        />

                        <MotivoAlugar
                            titulo="Suporte Técnico Rápido"
                            texto="Equipe especializada para atendimento imediato e solução de problemas."
                        />
                    </div>

                    <span className={styles.buttonSpan}>
                        <Link to={"/catalogo"}><button className={styles.button}>Consultar Catálogo</button></Link>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Home;