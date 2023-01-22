import React, { Component } from 'react';
import { Container } from './App.styled';
// import { fetchImages } from 'services-api/fetchImages';
import SearchBar from './Searchbar/Searchbar';
import { Grid } from 'react-loader-spinner';
import ImageGallery from './ImageGallery/ImageGallery';
import LoadMoreBtn from './LoadMoreBtn/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
// import axios from 'axios';



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
    const { page, query } = this.state;
    const perPage = 12;
    const API_KEY = '31526649-6c5c857b45ffe65514d171168';

    if (prevQuery !== currentQuery || prevState.page !== this.state.page) {
      this.setState({ isLoading: true });

      setTimeout(() => {
        fetch(
          `https://pixabay.com/api/?q=${currentQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
        )
          .then(res => res.json())
          .then(({ hits, totalHits }) => {
            const totalPages = Math.round(totalHits / perPage);
            const imagesData = hits.map(
              ({ id, webformatURL, largeImageURL }) => {
                return { id, webformatURL, largeImageURL };
              }
            );
            console.log(imagesData);
            this.setState(({ images }) => ({
              images: [...this.state.images, ...imagesData],
              totalPages: totalPages,
            }));
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
    this.setState({largeImageURL: picture})
    console.log(picture);
  };

  handleSubmit = query => {
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
          <Modal picture={this.state.largeImageURL} />
        )}
      </Container>
    );
  }
}
export default App;
