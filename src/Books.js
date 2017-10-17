import React from 'react'
import {SHELVES} from './Utils'
import * as BooksAPI from './BooksAPI'

/**
 * Common functionality to manage books collections (main page or search results)
 */
const Books = props => {

    /**
     * Event function to execute update AJAX API call, when the status/state
     * of any book is updated.
     */
    const changeBookStatus = (id, selectedValue) => {
        BooksAPI.update({id: id},selectedValue.target.value).then((response) => 
        {
            if (props.onChangeBook){
                props.onChangeBook(response)
            }
        })
      }


    const { books, statusName } = props

    return (
        <ol className="books-grid">
            {
                books.map( (book) => (
                    <li key={book.id} >
                        <div className="book">
                            <div className="book-top">
                                <div className="book-cover" style={{ backgroundImage: `url(${book.imageLinks?book.imageLinks.thumbnail:''})` }}></div>
                                <div className="book-shelf-changer">
                                    <select onChange={(e) => changeBookStatus(book.id, e)} value={ book.shelf?book.shelf:statusName }>
                                        <option value="moveto" disabled>Move to...</option>
                                        <option value={SHELVES[0]}>Currently Reading</option>
                                        <option value={SHELVES[1]}>Want to Read</option>
                                        <option value={SHELVES[2]}>Read</option>
                                        <option value="none">None</option>
                                    </select>
                                </div>
                            </div>
                            <div className="book-title">{book.title}</div>
                            <div className="book-authors">{ book.authors ? book.authors.join(', '): '' }</div>
                        </div>
                    </li>    
                ))
            }
        </ol>
    )
    
}

export default Books