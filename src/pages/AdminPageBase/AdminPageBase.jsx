import { Sidebar } from "react-pro-sidebar";
import styles from "./AdminPageBase.module.css"
import { Link, Outlet } from "react-router-dom";
import { FaHome, FaMoon, FaSun } from "react-icons/fa";
import { MdForklift, MdSchedule } from "react-icons/md";
import { BiUser } from "react-icons/bi";
import { useEffect, useState } from "react";

const AdminPageBase = () => {

    
    
    const [theme, setTheme] = useState(() => {
        const saved = localStorage.getItem("theme");
        return saved ? saved : "light";
    });
    
    useEffect(() => {
            document.documentElement.setAttribute("data-theme", theme);
            localStorage.setItem("theme", theme);
    }, [theme]);

        const toggleTheme = () => {
            setTheme((prev) => (prev === "light" ? "dark" : "light"));
        };

    return (
        <div className={styles.container}>
         <Sidebar
            backgroundColor="white"
            style={{
            height: "100%",
                minWidth: "25rem",
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
            <span className={styles.titleSpan}>
                <h1 className={styles.title}>
                    Painel de Administrador
                </h1>

                <button
                    className={styles.themeToggle}
                    type="button"
                    onClick={toggleTheme}
                    aria-label={theme === "light" ? "Ativar modo escuro" : "Ativar modo claro"}
                >
                    {theme === "light" ? <FaMoon size={22}/> : <FaSun size={22}/>}
                </button>
            </span>
        
            
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