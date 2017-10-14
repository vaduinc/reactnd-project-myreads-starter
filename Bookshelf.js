import React, { Component } from 'react'
import Books from './Books'

/**
 * A bookshelf for each reading status;
 * currentlyReading
 * wantToRead
 * read
 */
class Bookshelf extends Component {

    render(){
        const { books, shelfName , statusName, onChangeBook } = this.props

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelfName}</h2>
                <div className="bookshelf-books">
                    <Books 
                        books={books}
                        statusName={statusName}
                        onChangeBook={onChangeBook}
                    />    
                </div>
            </div>
        )
    }

}

export default Bookshelf