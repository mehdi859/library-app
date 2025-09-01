function BookForm() {
    return (
        <form>
            <h2>Ajouter un Nouveau livre</h2>
            <div>
                <label>
                    Titre:
                    <input type="text" name="title" />
                </label>
                <label>
                    Auteur:
                    <input type="text" name="author" />
                </label>
                <button type="submit">Ajouter</button>
            </div>
        </form>
    );
}

export default BookForm;