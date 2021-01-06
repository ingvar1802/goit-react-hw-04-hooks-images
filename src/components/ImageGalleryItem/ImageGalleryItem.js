import React from 'react';
import PropTypes from 'prop-types';


const ImageGalleryItem = ({ image, toggleModal }) => {
  const onClick = () => {
    toggleModal({
      status: true,
      src: image.largeImageURL,
      alt: image.tags,
    });
  };

  return (
    <li className="ImageGalleryItem">
      <img
        className="ImageGalleryItemImage"
        src={image.webformatURL}
        alt={image.tags}
        onClick={onClick}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;