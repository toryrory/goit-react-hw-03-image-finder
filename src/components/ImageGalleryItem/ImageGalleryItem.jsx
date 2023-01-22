import { GalleryItem, GalleryItemImg } from "./ImageGalleryItem.styled";

const ImageGalletyItem = ({ id, webformatURL, largeImageURL, onClick }) => {
    return (
      <GalleryItem onClick={() => onClick(largeImageURL)}>
        <GalleryItemImg src={webformatURL} alt="img" />
      </GalleryItem>
    );
}
export default ImageGalletyItem