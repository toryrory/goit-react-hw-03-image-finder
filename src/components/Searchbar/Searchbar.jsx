import React, { Component } from 'react';
import {BsSearch} from 'react-icons/bs'
import { Header, SearchForm, SearchFormButton, SearchFormInput } from './Searchbar.styled';

class SearchBar extends Component {
  state = {
    query: '',
  }
  handleChange = e =>{
    this.setState({query: e.currentTarget.value})
  }
  handleFormSubmit = e =>{
    e.preventDefault()

  this.props.onSubmit(this.state.query)
  this.setState({query: ''})
  }

    render() {
        return (
          <Header>
            <SearchForm onSubmit={this.handleFormSubmit}>
              <SearchFormButton type="submit">
                <BsSearch style={{ width: 25, height: 25 }} />
              </SearchFormButton>

              <SearchFormInput
                type="text"
                autocomplete="off"
                autoFocus
                placeholder="Search images and photos"
                value={this.state.query}
                onChange={this.handleChange}
              />
            </SearchForm>
          </Header>
        );
    }
}
export default SearchBar