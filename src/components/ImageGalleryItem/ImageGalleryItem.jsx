import PropTypes from 'prop-types';
import { GalleryItem, GalleryItemImg } from './ImageGalleryItem.styled';

const ImageGalletyItem = ({ webformatURL, largeImageURL, onClick }) => {
  return (
    <GalleryItem onClick={() => onClick(largeImageURL)}>
      <GalleryItemImg src={webformatURL} alt="img" />
    </GalleryItem>
  );
};
export default ImageGalletyItem;

ImageGalletyItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};