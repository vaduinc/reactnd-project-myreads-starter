import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Bookshelf  from './Bookshelf'
import Search from './Search'
import Title from './Title'
import './App.css'

class BooksApp extends Component {

  shelves = ['currentlyReading','wantToRead','read']
  
  state = {
    books: []
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
  changeBook = (changedBooks) => {
    let oldBooks = this.state.books
    
    this.setState({
          books : this.shelves.map((shelf) => {
                    return changedBooks[shelf].map(function(id) { 
                      let bookFound = oldBooks.find((item) => id===item.id )
                      bookFound.shelf=shelf
                      return bookFound
                    })
                  }).reduce ( (newBooks = [], col) => newBooks.concat(col)  )
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


  render() {

    return (
      <div className="list-books">
        <Title title='My Reads'/>
        <div className="list-books-content">
          <Route exact path='/' render={() => (
            <div>
              <div>
              <Bookshelf
                books={this.state.books.filter( (book) => book.shelf===this.shelves[0]) }
                shelfName='Currently Reading'
                statusName={this.shelves[0]}
                onChangeBook={this.changeBook}
              />
              <Bookshelf
                books={this.state.books.filter( (book) => book.shelf===this.shelves[1]) }
                shelfName='Want to Read'
                statusName={this.shelves[1]}
                onChangeBook={this.changeBook}
              />
              <Bookshelf
                books={this.state.books.filter( (book) => book.shelf===this.shelves[2]) }
                shelfName='Read'
                statusName={this.shelves[2]}
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