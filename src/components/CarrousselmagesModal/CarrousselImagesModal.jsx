import Carousel from "react-multi-carousel";
import BaseModal from "../BaseModal/BaseModal";
import styles from "./CarrousselImagesModal.module.css";
import UseBase64 from "../../hooks/UseBase64";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

const CarrousselImagesModal = ({isOpen, onRequestClose, ImagesList}) => {
    const { getBase64ImageUrl } = UseBase64();

    return(
        <BaseModal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
        >
        
            <Carousel responsive={responsive} className={styles.carousel}>
                 {
                    ImagesList.map((item) => (
                        <div className={styles.imagensWrapper}>
                            <img src={getBase64ImageUrl(item.base64Url, item.extension)} alt="Não foi possível carregar a imagem" />
                        </div>
                    ))
                }
            </Carousel>
        </BaseModal>
    )
}

export default CarrousselImagesModal;