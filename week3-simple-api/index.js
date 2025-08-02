
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connecté à MongoDB avec succès !');
  app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
    console.log(`API disponible à : http://localhost:${PORT}/api/books`);
  });
})
.catch(err => {
  console.error('Erreur de connexion à MongoDB :', err);
  process.exit(1); 
});

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
});
const Book = mongoose.model('Book', bookSchema);

app.get('/', (req, res) => {
    res.send('Bienvenue sur l\'API de gestion de livres !');
});

app.get('/api/books', async (req, res) => {
  try {
    const books = await Book.find(); 
    res.json(books);
  } catch (err) {
    res.status(500).send('Erreur lors de la récupération des livres.');
  }
});

app.get('/api/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id); // Cherche un livre par son ID
    if (!book) {
      return res.status(404).send('Livre non trouvé.');
    }
    res.json(book);
  } catch (err) {
    res.status(500).send('Erreur lors de la récupération du livre.');
  }
});


app.post('/api/books', async (req, res) => {
  try {
    const { title, author } = req.body;
    const newBook = new Book({ title, author }); 
    await newBook.save(); 
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).send('Le titre et l\'auteur sont requis.');
  }
});

app.put('/api/books/:id', async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedBook) {
      return res.status(404).send('Livre non trouvé.');
    }
    res.json(updatedBook);
  } catch (err) {
    res.status(400).send('Erreur lors de la mise à jour du livre.');
  }
});

app.delete('/api/books/:id', async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id); 
    if (!deletedBook) {
      return res.status(404).send('Livre non trouvé.');
    }
    res.status(204).send(); 
  } catch (err) {
    res.status(500).send('Erreur lors de la suppression du livre.');
  }
});