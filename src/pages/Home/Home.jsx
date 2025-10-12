import Navbar from "../../components/Navbar/Navbar";
import styles from "./Home.module.css"

function Home({setShowLoginModal}){

    return(
        <div className={styles.container}>
            <Navbar setShowLoginModal={setShowLoginModal}/>
            
        </div>
    );
}

export default Home;