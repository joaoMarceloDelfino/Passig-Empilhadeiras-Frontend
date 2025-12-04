import Carousel from "react-multi-carousel";
import BaseModal from "../BaseModal/BaseModal";
import styles from "./CarrousselImagesModal.module.css";
import UseBase64 from "../../hooks/UseBase64";
import "react-multi-carousel/lib/styles.css";
import Carrousel from "../Carroussel/Carroussel";

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
    
    return(
        <BaseModal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
        >
        
          <Carrousel imagesList={ImagesList} heigth={40}/>

        </BaseModal>
    )
}

export default CarrousselImagesModal;