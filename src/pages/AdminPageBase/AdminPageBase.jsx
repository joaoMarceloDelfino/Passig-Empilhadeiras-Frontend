import { Sidebar } from "react-pro-sidebar";
import styles from "./AdminPageBase.module.css"
import { Link, Outlet } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { MdForklift, MdSchedule } from "react-icons/md";
import { BiUser } from "react-icons/bi";

const AdminPageBase = () => {

    return (
        <div className={styles.container}>
         <Sidebar
            backgroundColor="white"
            style={{
            height: "100%",
                minWidth: "30rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                padding: "2rem 1rem",
                backgroundColor: "white",
                boxShadow: "2px 0 8px rgba(0,0,0,0.2)",
                borderRadius: "0 0.5rem 0.5rem 0"
            }}
        >
            <h1 className={styles.title}>
                Painel de Administrador
            </h1>
        
            
            <div className={styles.itemsWrapper}>
                <Link className={styles.sidebarItem} to={"/"}>
                    <FaHome size={50}/>
                    <p>Página Inicial</p>
                </Link>
                <Link className={styles.sidebarItem} to={"admin/empilhadeiras"}>
                    <MdForklift size={50}/>
                    <p>Empilhadeiras</p>
                </Link>
                <Link className={styles.sidebarItem} to={"admin/visitas"}>
                    <MdSchedule size={40}/>
                    <p>Agendamentos</p>
                </Link>
                <Link className={styles.sidebarItem} to={"admin/users"}>
                    <BiUser size={40}/>
                    <p>Usuários Cadastrados</p>
                </Link>
            </div>
        </Sidebar>
            <Outlet/>
        </div>
    )

}

export default AdminPageBase;