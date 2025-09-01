const books  = [
    {id : 1, title: "livre 1 ", author: "auteur 1"},
    {id : 2, title: "livre 2 ", author: "auteur 2"},
    {id : 3, title: "livre 3 ", author: "auteur 3"},
    
];

function Booklist() {
    return (
        <div>
            <h2>Liste de livres</h2>
            <ul>
                {books.map((book) => (
                    <li key={book.id}>
                        <strong>{book.title} </strong> par {book.author}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Booklist;