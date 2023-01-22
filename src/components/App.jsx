import React, { Component } from 'react';
import { Container } from './App.styled';
import { ToastContainer } from 'react-toastify';
import fetchImages from 'services-api/fetchImages';
import SearchBar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import LoadMoreBtn from './LoadMoreBtn/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import {notifications, onEmptyNotification} from './Notifications/notifications';
import { injectStyle } from 'react-toastify/dist/inject-style';// CALL IT ONCE IN YOUR APP
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
    const { page } = this.state;
    const perPage = 12;

    if (prevQuery !== currentQuery || prevState.page !== this.state.page) {
      this.setState({ isLoading: true });

      setTimeout(() => {
        fetchImages(currentQuery, page)
          .then(({ hits, totalHits }) => {
            const totalPages = Math.round(totalHits / perPage);
            const imagesData = hits.map(
              ({ id, webformatURL, largeImageURL }) => {
                return { id, webformatURL, largeImageURL };
              }
            );

            this.setState({
              images: [...this.state.images, ...imagesData],
              totalPages: totalPages,
            });
            notifications(hits, page, totalHits);
          })
          .catch(error => this.setState({ error }))
          .finally(() => this.setState({ isLoading: false }));
      }, 1000);
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
    onEmptyNotification(query)
    this.setState({ query: query });
    if (query !== this.state.query) {
      this.setState({
        images: [],
        page: 1,
      });
    }
  };

  render() {
    const imagesLimit = this.state.page < this.state.totalPages;

    return (
      <Container>
        <SearchBar onSubmit={this.handleSubmit} />
        {this.state.isLoading && <Loader />}
        {this.state.images.length > 0 && (
          <ImageGallery onClick={this.openModal} images={this.state.images} />
        )}
        {this.state.images.length > 0 && imagesLimit && (
          <LoadMoreBtn loadMore={this.loadMoreImages} />
        )}
        {this.state.largeImageURL && (
          <Modal
            onCloseModal={this.closeModal}
            picture={this.state.largeImageURL}
          />
        )}
        <ToastContainer autoClose={3000} />
      </Container>
    );
  }
}
export default App;

// setTimeout(() => {
// fetch(
//   `https://pixabay.com/api/?q=${currentQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
// )
//   .then(res => res.json())
//   .then(({ hits, totalHits }) => {
//     if (totalHits) {
//       return toast.success(`We have found ${totalHits} images!`) //----------------
//     }
//     if (!totalHits) {
//       return toast.error(
//         `We do not have such pictures, try to enter in a different way.`
//       );
//     }
//     const totalPages = Math.round(totalHits / perPage);
//     const imagesData = hits.map(
//       ({ id, webformatURL, largeImageURL }) => {
//         return { id, webformatURL, largeImageURL };
//       }
//     );
