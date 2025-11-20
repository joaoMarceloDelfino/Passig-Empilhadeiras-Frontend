import styles from "./Carroussel.module.css";
import UseBase64 from "../../hooks/UseBase64";
import { useEffect, useState } from "react";

function Carrousel({ imagesList }) {
  const { getBase64ImageUrl } = UseBase64();
  const [list, setList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (!imagesList || imagesList.length === 0) {
      setList([]);
      setCurrentIndex(0);
      return;
    }

    const mapped = imagesList.map((image, index) => ({
      id: index,
      base64Image: getBase64ImageUrl(image.base64Url, image.extension),
    }));

    setList(mapped);
    setCurrentIndex(0);
  }, [imagesList]);

  useEffect(() => {
    if (list.length > 1) {
      const interval = setInterval(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1 >= list.length ? 0 : prev + 1));
      }, 3560);
      return () => clearInterval(interval);
    }
  }, [list]);

  const onClickNextImage = (value) => {
    if (list.length === 0) return;
    setDirection(value >= 0 ? 1 : -1);

    const nextValue = currentIndex + value;
    if (nextValue > list.length - 1) setCurrentIndex(0);
    else if (nextValue < 0) setCurrentIndex(list.length - 1);
    else setCurrentIndex(nextValue);
  };

  const slideClass = direction === 1 ? styles.slideLeft : styles.slideRight;

  return (
    <div className={styles.container}>
      {list.length > 1 && (
        <button
          className={`${styles.button} ${styles.buttonPrev}`}
          onClick={() => onClickNextImage(-1)}
          aria-label="Imagem anterior"
        >
          ←
        </button>
      )}

      <img
        key={`${currentIndex}-${direction}`}
        src={list[currentIndex]?.base64Image}
        className={`${styles.image} ${slideClass}`}
        alt="Não foi possível carregar as imagens"
      />

      {list.length > 1 && (
        <button
          className={`${styles.button} ${styles.buttonNext}`}
          onClick={() => onClickNextImage(1)}
          aria-label="Próxima imagem"
        >
          →
        </button>
      )}
    </div>
  );
}

export default Carrousel;
