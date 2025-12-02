import { useEffect, useState } from "react";
import InfoCard from "../InfoCard/InfoCard";
import styles from "./Header.module.css";
import { FaLocationDot } from "react-icons/fa6";
import { BsTelephone } from "react-icons/bs";
import { FaMoon, FaSun } from "react-icons/fa";

function Header(){
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

    return(
        <header className={styles.header}>
            <div className={styles.main_header}>
                <h1 className={styles.logoTitle}>Passig Empilhadeiras</h1>
            </div>

            <div className={styles.info_header}>
                <InfoCard 
                    icon={<FaLocationDot size={40} color="#000"/>}
                    title="Localização"
                    text={[
                        "Rua Prefeito Manoel Evaldo Muller,",
                        "Volta Grande, 3466",
                        "Navegantes, SC"
                    ]} 
                />

                <InfoCard 
                    icon={<BsTelephone size={40} color="#000"/>}
                    title="Telefone"
                    text="(47) 99626-6413"
                />

                <button
                    className={styles.themeToggle}
                    type="button"
                    onClick={toggleTheme}
                    aria-label={theme === "light" ? "Ativar modo escuro" : "Ativar modo claro"}
                >
                    {theme === "light" ? <FaMoon size={22}/> : <FaSun size={22}/>}
                </button>
            </div> 
        </header>
    );
}

export default Header;
