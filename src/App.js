import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Bookshelf  from './Bookshelf'
import Search from './Search'
import './App.css'

class BooksApp extends Component {

  changedBooks = []
  
  state = {
    books: [],
    shelfChange : false 
  }

  /**
   * Load my books after rendering
   */
  componentDidMount() {
    this.loadMyBooks()  
  }

  /**
   * reusable AJAX call to load my books when getting to page the 
   * first time or when returning from the search page, so shelves are 
   * updated.
   */
  loadMyBooks(){
    BooksAPI.getAll().then((books) => {
      this.setState({ 
        books ,
        shelfChange : false  
      })
    })
  }

  /**
   * Event funciton passed to Bookshelf component, so this component can be 
   * notified when shelves change
   */
  changeBook = (books) => {
    this.changedBooks = books
    this.setState(
        {
            shelfChange : true
        })
  }

  /**
   * Event function passed to /search component, that notifies whether there were
   * changes on the search page. If so, fetch for my books to the server
   * @param {*} didChange 
   */
  updateAfterSearch(didChange) {
    if (didChange){
      this.loadMyBooks()
    }
  }

  /**
   * Utility function that returns an array for each shelf.
   * If a shelf change (state vble), then the filter includes a find
   * to match the new or removed books.
   */
  selectShelfBooks = (shelf) => {
    if (this.state.shelfChange){
      return this.state.books.filter( (book) => this.changedBooks[shelf].find((item) => item=== book.id))
    }else{
      return this.state.books.filter( (book) => book.shelf===shelf) 
    }  
  }

  render() {

    let shelfCurrentlyReading =  this.selectShelfBooks('currentlyReading')
    let shelfBooksWantToRead =  this.selectShelfBooks('wantToRead') 
    let shelfBooksRead =  this.selectShelfBooks('read')
     
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <Route exact path='/' render={() => (
            <div>
              <div>
              <Bookshelf
                books={shelfCurrentlyReading}
                shelfName='Currently Reading'
                statusName='currentlyReading'
                onChangeBook={this.changeBook}
              />
              <Bookshelf
                books={shelfBooksWantToRead}
                shelfName='Want to Read'
                statusName='wantToRead'
                onChangeBook={this.changeBook}
              />
              <Bookshelf
                books={shelfBooksRead}
                shelfName='Read'
                statusName='read'
                onChangeBook={this.changeBook}
              />
              </div>
              <div className="open-search">
                <Link to="/search" >Search</Link>
              </div>
            </div>
          )}/>
          <Route path='/search' render={({ history }) => (
            <Search 
              currentBooks={this.state.books}
              needUpdate={ (didChange) => {
                this.updateAfterSearch(didChange)
                history.push('/')
              } }
            />
          )}/>
        </div>
      </div>
    )
  }
}

export default BooksApp;