import styles from "./Carroussel.module.css"
import UseBase64 from "../../hooks/useBase64";
import { useEffect, useState } from "react";

function Carrousel({imagesList}){
    
    const {getBase64ImageUrl} = UseBase64();
    const [list, setList] = useState([])  
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const list = imagesList.map((image, index) => {
            return {
                id: index,
                base64Image: getBase64ImageUrl(image.base64Url, image.extension),
            }
        });

        setList(list);
    }, [])

    const onClickNextImage = (value) => {
        const nextValue = currentIndex + value;

        if(nextValue > list.length - 1){
            setCurrentIndex(0);
        }
        else if(nextValue < 0){
            setCurrentIndex(list.length - 1)
        }
        else{
            setCurrentIndex(nextValue);
        }
    }

    return(
        <div className={styles.container}>
            {list.length > 1 && <button className={styles.button} onClick={() => onClickNextImage(-1)}>Voltar</button>}
            
            <img src={list[currentIndex]?.base64Image} className={styles.image} alt="Não foi possível carregar as imagens"/>
            {list.length > 1 && <button className={styles.button} onClick={() => onClickNextImage(1)}>Próximo</button>}
        </div>
    )
}

export default Carrousel;