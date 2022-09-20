import React, { Component } from 'react';
import './books.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

class Books extends Component {
    render() {
        return (
            <div className='book-container'>
                {this.props.libraryBooks.map((book, index) => {
                    return <Card style={{ width: '18rem' }} className="card" key={index}>
                        <Card.Body>
                            <Card.Title className="title">{book.title}</Card.Title>
                            <Card.Subtitle className="author">Author: {book.author}</Card.Subtitle>
                            <Card.Text className="description">
                                {book.description}
                            </Card.Text>
                            <Button id="button" variant="primary" onClick={() => this.props.handleEditBookModal(book.title)} >Edit Book</Button>
                            <Button variant="primary" onClick={() => this.props.removeBook(book.title)} >Delete Book</Button>
                        </Card.Body>
                    </Card>
                })}
            </div>
        )
    }
}

export default Books;