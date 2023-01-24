import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import {
  notifications,
  onEmptyNotification,
} from './Notifications/notifications';
import { injectStyle } from 'react-toastify/dist/inject-style'; // CALL IT ONCE IN YOUR APP
import { Container } from './App.styled';
import fetchImages from 'services-api/fetchImages';
import SearchBar from './Searchbar';
import ImageGallery from './ImageGallery';
import LoadMoreBtn from './LoadMoreBtn';
import Loader from './Loader/';
import Modal from './Modal';
injectStyle();

class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    isLoading: false,
    error: null,
    largeImageURL: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.query;
    const currentQuery = this.state.query;
    const { page, images } = this.state;
    const perPage = 12;

    if (prevQuery !== currentQuery || prevState.page !== page) {
      this.setState({ isLoading: true });

        fetchImages(currentQuery, page)
          .then(({ hits, totalHits }) => {
            const totalPages = Math.ceil(totalHits / perPage);
            const imagesData = hits.map(
              ({ id, webformatURL, largeImageURL }) => {
                return { id, webformatURL, largeImageURL };
              }
            );
            this.setState({
              images: [...images, ...imagesData],
              hasMoreImages: page < totalPages,
            });
            notifications(hits, page, totalHits);
          })
          .catch(error => this.setState({ error }))
          .finally(() => this.setState({ isLoading: false }));
     
    }
  }
  loadMoreImages = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };
  openModal = picture => {
    this.setState({ largeImageURL: picture });
    console.log(picture);
  };
  closeModal = () => {
    this.setState({ largeImageURL: null });
  };

  handleSubmit = query => {
    onEmptyNotification(query);
    this.setState({ query: query });
    if (query !== this.state.query) {
      this.setState({
        images: [],
        page: 1,
      });
    }
  };

  render() {
    const { isLoading, images, largeImageURL, hasMoreImages } = this.state;

    return (
      <Container>
        <SearchBar onSubmit={this.handleSubmit} />
        {isLoading && <Loader />}
        {images.length > 0 && (
          <ImageGallery onClick={this.openModal} images={images} />
        )}
        {images.length > 0 && hasMoreImages && (
          <LoadMoreBtn loadMore={this.loadMoreImages} />
        )}
        {largeImageURL && (
          <Modal onCloseModal={this.closeModal} picture={largeImageURL} />
        )}
        <ToastContainer autoClose={3000} />
      </Container>
    );
  }
}
export default App;
