export function formatBook(book) {
    return {
        title: book.fields.Title,
        author: book.fields.Author[0].name,
        cover: book.fields.Cover,
        labels: book.fields.Genres
    };
}