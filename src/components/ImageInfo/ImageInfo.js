import { useState, useEffect } from 'react';
import ImageLoader from '../Loader/Loader';
import fetchImage from '../services/image-api';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import ImageErrorView from '../ImageErrorView/ImageErrorView';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';


const App = () => {
  const [images, setImages] = useState([]);
  const [imageName, setImageName] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ status: false, message: '' });
  const [showModal, setShowModal] = useState({
    status: false,
    targetImage: null,
  });
  const [activeButton, setActiveButton] = useState(false);

  useEffect(() => {
    setPage(1);
    searchImages(imageName, 1);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageName]);

  function searchImages(searchQuery, page) {
    if (searchQuery === '') {
      setImages([]);
      setActiveButton(false);
      setError({ status: true, message: 'Please input search request' });
      return;
    }

    setIsLoading(true);
    setError({ status: false, message: '' });

    fetchImage(searchQuery, page)
      .then(data => {
        if (page === 1) {
          setImages(data.hits);
        } else {
          setImages(prevState => [...prevState, ...data.hits]);
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        }

        checkButtonAndNotify(data.totalHits, images.length + data.hits.length);
        setPage(prevState => prevState + 1);
      })
      .catch(error =>
        setError({
          status: true,
          message: `Something wrong: ${error.message}`,
        }),
      )
      .finally(() => setIsLoading(false));
  }

  function checkButtonAndNotify(total, current) {
    setActiveButton(total > current ? true : false);

    setError(
      !total
        ? { status: true, message: 'Nothing was found. Try again.' }
        : { status: false, message: '' },
    );
  }

  const toggleModal = ({ status, src, alt }) => {
    setShowModal(
      status
        ? { status: true, targetImage: { src, alt } }
        : { status: false, targetImage: null },
    );
  };

  return (
    <div>
      <Searchbar onSubmit={setImageName} />
      {error.status && <ImageErrorView message={error.message} />}
      {isLoading && (
        <ImageLoader/>
      )}
      {images.length > 0 && (
        <ImageGallery images={images} toggleModal={toggleModal} />
      )}
      {showModal.status && (
        <Modal
          src={showModal.targetImage.src}
          alt={showModal.targetImage.alt}
          toggleModal={toggleModal}
        />
      )}
      {activeButton && <Button onClick={() => searchImages(imageName, page)} />}
    </div>
  );
};

export default App;