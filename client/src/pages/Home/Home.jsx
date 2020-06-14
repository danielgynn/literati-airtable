import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Box, Header, Button, Flexbox, GridBox, TextLink } from 'archetype-ui';

import { setDarkMode } from '../../actions/preferences';
import { getData } from '../../utils/api';
import { API } from '../../config/api';
import { formatBook } from '../../utils/books';
import Book from '../../components/Book/Book';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            books: [],
            totalBooks: 0,
            loading: true
        };
    }

    componentDidMount() {
        this.getBooks();
    }

    async getBooks() {
        try {
            const books = await getData(API.books.getAll, {
                sortField: 'Title',
                sortDirection: 'asc'
            });

            const lists = await getData(API.lists.getAll);

            console.log(lists);

            this.setState({
                lists: lists.data,
                books: books.data,
                totalBooks: books.count,
                loading: false
            });
        } catch(err) {
            this.setState({
                loading: false
            });
        }
    }

    render() {
        const { books, loading, lists } = this.state;
        const { setDarkMode,  darkMode, history } = this.props;

        return (
            <Box padding={1} className="App">
                <Flexbox ai='center' jc='space-between'>
                    <Header color='text' mb={1} level={2} padding={1}>My Library</Header>
                    <Button color='primary' onClick={() => setDarkMode(!darkMode)} text='Dark Mode'/>
                </Flexbox>
                {!loading && (
                    <Box>
                        {lists.map((list, listIndex) => (
                            <TextLink
                                key={listIndex}
                                text={list.fields.Name}
                                onClick={() => console.log(list)}
                            />
                        ))}
                        <GridBox colWidth={[19,32,100]} rowGap={0} colGap={0}>
                            {!!(books.length) && books.map((book, bookIndex) => (
                                <Book
                                    key={bookIndex}
                                    showLabels={false}
                                    paletteType={!darkMode ? 'lightVibrant' : book.paletteType}
                                    {...formatBook(book)}
                                />
                            ))}
                        </GridBox>
                    </Box>
                )}
                    
            </Box>
        );
    }
}

const mapStateToProps = (state) => {
	return {
        darkMode: state.preferences.darkMode
	};
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setDarkMode
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);