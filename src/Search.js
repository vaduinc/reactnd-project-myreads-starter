import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import Books from './Books'

/**
 * Search page to get results based on the criteria typed on the input field.
 * It only execute/fetch AJAX call when there are at least 3 characters.
 */
class Search extends Component{

    changedBooks = []
    changed = false

    state = {
        query: '',
        searchBooks: []
    }

    /**
     * Event function that triggers AJAX API call when user types in the
     * input 
     */
    updateQuery = (query) =>{

        // something was typed on the input field
        if (query){
            BooksAPI.search(query).then((resultBooks) => {
                // if there are no results with the typed input
                if (resultBooks.error){
                    resultBooks = []
                }
                this.setState ({ 
                        query : query,
                        searchBooks : resultBooks
                    })
            }) 
        }else{
            // The input field is blank
            this.clearQuery();
        }
    }

    /**
     * Event function passed to books component.
     * It flags if there were changes on any book status.
     */
    changeBook = (books) => {
        this.changedBooks = books
        this.changed = true
    }

    /**
     * if the input field is clean then clear query
     * and array state vbles.
     */
    clearQuery = () =>{
        this.setState({
                query:'',
                searchBooks :[]
         })
    }

    render(){

        const { query, searchBooks } = this.state
        const { currentBooks, needUpdate } = this.props

        let showingBooks
        if (searchBooks){
            showingBooks = searchBooks.map(function (book) {
                let found = currentBooks.find((item) => item.id===book.id);
                return found?found:book;
            })   
        }else{
            showingBooks = []
        }

        let defaultShelf = 'none'

        return (
            <div className="search-books">
            <div className="search-books-bar">
            <a className="close-search" onClick={() => needUpdate(this.changed) }>Close</a>
            <div className="search-books-input-wrapper">
                <input type="text" 
                    placeholder="Search by title or author"
                    value={query}
                    onChange={(event) => this.updateQuery(event.target.value) }
                    />
            </div>
            </div>
            <div className="search-books-results">
                <Books 
                    books={showingBooks}
                    statusName={defaultShelf}
                    onChangeBook={this.changeBook}
                />  
            </div>
        </div>
        )
    }

}

export default Search;