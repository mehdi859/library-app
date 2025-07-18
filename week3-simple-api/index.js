const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let books = [
  { id: '1', title: 'Livre1', author: 'Auteur1' },
  { id: '2', title: 'Livre2', author: 'Auteur2' },
  { id: '3', title: 'Livre3', author: 'Auteur3' }
];


app.get('/api/books', (req, res) => {
  res.json(books); 
});


app.get('/api/books/:id', (req, res) => {
  const bookId = req.params.id; 
  const book = books.find(b => b.id === bookId); 
  if (book) {
    res.json(book); 
  } else {
    res.status(404).send('Livre non trouvé.'); 
  }
});


app.post('/api/books', (req, res) => {
  const newBook = req.body;
  if (!newBook.title || !newBook.author) {
    return res.status(400).send('Le titre et l\'auteur sont requis.'); 
  }
  
  newBook.id = (books.length > 0 ? Math.max(...books.map(b => parseInt(b.id))) + 1 : 1).toString();
  books.push(newBook); 
  res.status(201).json(newBook); 
});


app.put('/api/books/:id', (req, res) => {
  const bookId = req.params.id;
  const updatedBookData = req.body; 
  const bookIndex = books.findIndex(b => b.id === bookId); 

  if (bookIndex !== -1) {
    books[bookIndex] = { ...books[bookIndex], ...updatedBookData, id: bookId };
    res.json(books[bookIndex]); 
  } else {
    res.status(404).send('Livre non trouvé.');
  }
});

app.delete('/api/books/:id', (req, res) => {
  const bookId = req.params.id;
  const initialLength = books.length;
  books = books.filter(b => b.id !== bookId);

  if (books.length < initialLength) {
    res.status(204).send(); 
  } else {
    res.status(404).send('Livre non trouvé.');
  }
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
  console.log(`API disponible à : http://localhost:${PORT}/api/books`);
});