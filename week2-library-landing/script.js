let books = [
  ["1984", "George Orwell"],
  ["Le Petit Prince", "Antoine de Saint-Exupéry"],
  ["Harry Potter", "J.K. Rowling"]
];

let container = document.getElementById("book-list");
for (let i = 0; i < books.length; i++) {
  container.innerHTML += "<p><strong>" + books[i][0] + "</strong> - " + books[i][1] + "</p>";
}
