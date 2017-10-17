import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import { Debounce } from 'react-throttle';
import Books from './Books'
import Title from './Title'
import {updateCurrentShelves} from './Utils'

/**
 * Search page to get results based on the criteria typed on the input field.
  */
class Search extends Component{

    changed = false

    state = {
        query: '',
        searchBooks: [],
        currentShelves: []
    }

    /**
    * Set my current shelves and their book to the state.
    * The component will update if the shelves change
    */
    componentDidMount() {
        this.setState ({ 
            currentShelves: this.props.currentBooks
        })
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
     * It flags if there were changes on any shelf
     */
    changeBook = (changedBooks) => {       
        this.changed = true
        this.setState({
            currentShelves : updateCurrentShelves(changedBooks,this.state.currentShelves,this.state.searchBooks)
        })
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

        const { searchBooks,currentShelves } = this.state
        const { needUpdate } = this.props

        let showingBooks
        if (searchBooks){
            showingBooks = searchBooks.map(function (book) {
                let found = currentShelves.find((item) => item.id===book.id);
                return found?found:book;
            })   
        }else{
            showingBooks = []
        }

        let defaultShelf = 'none'

        return (
            <div className="search-books">
                <Title title='... search results'/>
                <div className="search-books-bar">
                <a className="close-search" onClick={() => needUpdate(this.changed) }>Close</a>
                <div className="search-books-input-wrapper">
                    <Debounce time="700" handler="onChange">
                        <input type="text" 
                            placeholder="Search by title or author"
                            onChange={(event) => this.updateQuery(event.target.value) }
                            />
                    </Debounce>
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