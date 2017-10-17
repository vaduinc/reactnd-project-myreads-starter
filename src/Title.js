import React from 'react'

/**
 * Set title using the input props "title"
 */
const Title = props => {

    return (
        <div className="list-books-title">
            <h1>{ props.title }</h1>
        </div>
    )
}

export default Title