import React from 'react';
import { handleResponse } from '../../helpers';
import { API_URL } from '../../config';
import Loading from '../common/Loading';
import './Table.css';
import Table from './Table';
import Pagination from './Pagination';

//component's type -  class - if we need state or lifecycle component
class List extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      currencies: [],
      error: null,
      totalPages: 0,
      page: 1,
    };

    //to get 'this' value
    this.handlePaginationClick = this.handlePaginationClick.bind(this);
  }

  componentDidMount() {
    this.fetchCurrencies();
  }

  //one of the way to get not underfined value of 'this'
  //handlePaginationClick = (direction) => {

  handlePaginationClick(direction) {
    let nextPage = this.state.page;

    // Increment nextPage if direction variable is next, otherwise decrement
    nextPage = direction === 'next' ? nextPage + 1 : nextPage - 1;

    this.setState({ page: nextPage }, () => {
      // call fetchCurrencies function inside setState's callback
      // because we have to make sure first page state is updated
      this.fetchCurrencies();
    });
  }



  fetchCurrencies() {
    this.setState({ loading: true });

    const { page } = this.state; 
    
    fetch(`${API_URL}/cryptocurrencies?page=${page}&perPage=20`)
      .then(handleResponse)
      .then((data) => {
        const { currencies, totalPages } = data;

        this.setState({
          currencies: currencies,
          //its the same
          //currencies,
          totalPages: totalPages,
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({
          error: error.errorMessage,
          loading: false,
        });
      });
  }

  render() {
    const { loading, error, currencies, totalPages, page } = this.state;

    // render only loading component, if loading state is set to true
    if (loading) {
      return <div className="loading-container"><Loading /></div>
    }

    // render only error message, if error occurred while fetching data
    if (error) {
      return <div className="error">{error}</div>
    }

    return (
      <div>
        <Table 
        currencies={currencies}
        />

        <Pagination 
        page = {page}
        totalPages = {totalPages}
        handlePaginationClick = {this.handlePaginationClick}
        />
      </div>
    );
  }
}

export default List;