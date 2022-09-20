import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import './operations.css';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Book from '../book';

class Operations extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showAddModal: false,
            libraryBooks: [],
            newBook: {},
            titleErrorBar: true,
            searchTitleError: true,
            errorMsg: '',
            searchBookModal: false,
            showEditBookModal: false,
            searchByTitle: '',
            searchByAuthor: '',
            searchedBooks: [],
            editBook: {},
            tempBook: {}
        }
    }

    handleClose = () => {
        this.setState({ showAddModal: false, newBook: {}, searchBookModal: false, showEditBookModal: false });
    }

    //  ----------------------------  Add Book Operations ----------------------------------------------

    handleAddlibraryBookshow = () => {
        this.setState({ showAddModal: true });
    }

    handleAddTitle = (event) => {
        if (this.state.titleErrorBar === false) {
            this.setState({ titleErrorBar: true });
        }
        let { value } = event.target;
        let newBook = this.state.newBook && this.state.newBook.title ? this.state.newBook : {};

        newBook.title = value;
        this.setState({ newBook: newBook });
    }

    handleAddAuthor = (event) => {
        let { value } = event.target;
        let newBook = this.state.newBook;
        newBook.author = value;
        this.setState({ newBook: newBook })
    }

    handleAddDescritption = (event) => {
        let { value } = event.target;
        let newBook = this.state.newBook;
        newBook.description = value;
        this.setState({ newBook: newBook })
    }

    handleAddnewBook = () => {
        let { libraryBooks, newBook } = this.state;
        if (libraryBooks.length > 0) {
            let titlePresent = libraryBooks.find((ele) => {
                return ele.title.toLowerCase() === newBook.title.toLowerCase();
            })
            if (titlePresent) {
                this.setState({ titleErrorBar: false })
            } else {
                let books = libraryBooks;
                books.push(this.state.newBook);
                this.setState({ libraryBooks: books, newBook: {}, showAddModal: false });
            }
        } else {
            let books = [];
            books.push(this.state.newBook);
            this.setState({ libraryBooks: books, newBook: {}, showAddModal: false });
        }
    }
    //  ----------------------------  Add Book Operations ----------------------------------------------




    //  ----------------------------  Delete Book Operations ---------------------------------------------
    removeBook = (title) => {
        let books = this.state.libraryBooks;
        let findBook = books.find((book) => book.title.toLowerCase() === title.toLowerCase());
        findBook !== -1 && books.splice(findBook, 1)
        this.setState({ libraryBooks: books });
    }
    //  ----------------------------  Search Book Operations ---------------------------------------------



    //  ----------------------------  Delete Book Operations ---------------------------------------------
    handleEditBookModal = (title) => {
        this.setState({ showEditBookModal: true });
        let books = this.state.libraryBooks;
        let findBook = books.find((book) => book.title.toLowerCase() === title.toLowerCase());
        this.setState({ editBook: findBook });
    }
    //  ----------------------------  Delete Book Operations ---------------------------------------------



    //  ----------------------------  Search Book Operations ---------------------------------------------
    handleSearchBook = () => {
        if (this.state.searchedBooks.length === 0) {
            this.setState({ searchTitleError: false })
        }
    }

    handleSearchTitle = (event) => {
        if (this.state.searchTitleError === false) {
            this.setState({ searchTitleError: true });
        }
        let { value } = event.target;
        let searchedBooks = this.state.libraryBooks.filter((book) => {
            if (book.title.toLowerCase() === value.toLowerCase()) {
                return book;
            }
        });
        this.setState({ searchedBooks: searchedBooks });
    }

    handleSearch = () => {
        this.setState({ searchBookModal: true });
    }
    //  ----------------------------  Search Book Operations ---------------------------------------------


    showAllBooks = () => {
        this.setState({ searchedBooks: [] })
    }


    //  ----------------------------  Update Book Operations ---------------------------------------------
    updateTitleHandler = (event) => {
        // write update code here
    }


    render() {
        return (
            <div className='container'>
                <h2>Welcome to My Library</h2>
                <div className='operation-container'>
                    <Button variant="primary" onClick={this.handleAddlibraryBookshow}>Add Book</Button>
                    <Button variant="primary" onClick={this.handleSearch}>Search Book</Button>
                    <Button variant="primary" onClick={this.showAllBooks}>Show All Books</Button>
                </div>




                {/* ------------------ Add newBook Modal -------------------- */}
                <Modal show={this.state.showAddModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Enter New newBook Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FloatingLabel controlId="floatingInput" label="Name of Book" className="mb-3">
                            <Form.Control type="text" placeholder="Name of Book" onChange={(e) => this.handleAddTitle(e)} />
                            <p className='book-title' hidden={this.state.titleErrorBar}>*Title Already Exist</p>
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="Author of Book" className="mb-3">
                            <Form.Control type="text" placeholder="Author of Book" onChange={(e) => this.handleAddAuthor(e)} />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="Description" className="mb-3">
                            <Form.Control
                                as="textarea"
                                placeholder="Leave a comment here"
                                style={{ height: '100px' }}
                                onChange={(e) => this.handleAddDescritption(e)}
                            />
                        </FloatingLabel>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleAddnewBook}>
                            Save Book
                        </Button>
                    </Modal.Footer>
                </Modal>




                {/* ------------------ Search Book Modal -------------------- */}
                <Modal show={this.state.searchBookModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Enter Book Details to Search</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FloatingLabel controlId="floatingInput" label="Name of Book" className="mb-3">
                            <Form.Control type="text" placeholder="Name of Book" onChange={(e) => this.handleSearchTitle(e)} />
                            <p className='book-title' hidden={this.state.searchTitleError}>*No Book Present with this Title</p>
                        </FloatingLabel>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleSearchBook}>
                            Search Book
                        </Button>
                    </Modal.Footer>
                </Modal>





                {/* ---------------------------------- Edit Book Modal ------------------------------ */}
                <Modal show={this.state.showEditBookModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FloatingLabel controlId="floatingInput" label="Name of Book" className="mb-3">
                            <Form.Control type="text" placeholder="Name of Book" value={this.state.editBook.title} onChange={(e) => this.updateTitleHandler(e)} />
                            <p className='book-title' hidden={this.state.titleErrorBar}>*Title Already Exist</p>
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="Author of Book" className="mb-3">
                            <Form.Control type="text" placeholder="Author of Book" value={this.state.editBook.author} />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="Description" className="mb-3">
                            <Form.Control
                                as="textarea"
                                placeholder="Leave a comment here"
                                style={{ height: '100px' }}
                                value={this.state.editBook.description}
                            />
                        </FloatingLabel>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleSaveEditedBook}>
                            Save Book
                        </Button>
                    </Modal.Footer>
                </Modal>




                {/* ----------------- Book Component ------------------------ */}
                <Book libraryBooks={this.state.searchedBooks.length > 0 ? this.state.searchedBooks : this.state.libraryBooks} removeBook={this.removeBook} handleEditBookModal={this.handleEditBookModal} />



                {/* ---------------------- No Books Error  ------------------------ */}
                {this.state.libraryBooks.length === 0 ? <p className='book-title'>*No Book Present in Library</p> : ''}

            </div>
        )
    }
}

export default Operations;