import React, { Component } from 'react'

/**
 * Set title using the input props "title"
 */
class Title extends Component {

    render(){
        return (
            <div className="list-books-title">
                <h1>{ this.props.title }</h1>
            </div>
        )
    }

}

export default Title