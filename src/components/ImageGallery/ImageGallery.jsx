import { Gallery } from "./ImageGallery.styled";
import ImageGalletyItem from "components/ImageGalleryItem/ImageGalleryItem";

const ImageGallery = ({images, onClick}) => {
    return (
      <Gallery>
        {images.map(({ id, webformatURL, largeImageURL }) => (
          <ImageGalletyItem
            key={id}
            id={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            onClick={onClick}
          />
        ))}
      </Gallery>
    );
}
export default ImageGallery