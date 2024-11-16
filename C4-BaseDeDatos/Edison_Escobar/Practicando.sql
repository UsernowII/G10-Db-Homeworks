-- Crear tabla Author
CREATE TABLE Author (
    Author_ID INTEGER PRIMARY KEY,
    Name VARCHAR(100),
    Nationality VARCHAR(50)
);

-- Insertar datos en Author
INSERT INTO Author (Author_ID, Name, Nationality) VALUES
(1, 'George Orwell', 'British'),
(2, 'Jane Austen', 'British'),
(3, 'Mark Twain', 'American'),
(4, 'J.K. Rowling', 'British'),
(5, 'J.R.R. Tolkien', 'British');

-- Crear tabla Publisher
CREATE TABLE Publisher (
    Publisher_ID INTEGER PRIMARY KEY,
    Name VARCHAR(100),
    Country VARCHAR(50)
);

-- Insertar datos en Publisher
INSERT INTO Publisher (Publisher_ID, Name, Country) VALUES
(1, 'Penguin Books', 'United Kingdom'),
(2, 'Oxford University Press', 'United Kingdom'),
(3, 'HarperCollins', 'United States');

-- Crear tabla Book
CREATE TABLE Book (
    Book_ID INTEGER PRIMARY KEY,
    Title VARCHAR(100),
    Genre VARCHAR(50),
    Publication_Year INTEGER,
    Publisher_ID INTEGER,
    FOREIGN KEY (Publisher_ID) REFERENCES Publisher(Publisher_ID)
);

-- Insertar datos en Book
INSERT INTO Book (Book_ID, Title, Genre, Publication_Year, Publisher_ID) VALUES
(1, '1984', 'Dystopian', 1949, 1),
(2, 'Pride and Prejudice', 'Romance', 1813, 2),
(3, 'Adventures of Huckleberry Finn', 'Adventure', 1884, 3),
(4, 'Harry Potter and the Philosopher\´s Stone', 'Fantasy', 1997, 1),
(5, 'The Hobbit', 'Fantasy', 1937, 1);

-- Crear tabla Book_Author (relación muchos a muchos entre Book y Author)

CREATE TABLE Book_Author (
    Book_ID INTEGER,
    Author_ID INTEGER,
    FOREIGN KEY (Book_ID) REFERENCES Book(Book_ID),
    FOREIGN KEY (Author_ID) REFERENCES Author(Author_ID),
    PRIMARY KEY (Book_ID, Author_ID)
);

-- Insertar datos en Book_Author
INSERT INTO Book_Author (Book_ID, Author_ID) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(4, 1), -- George Orwell también es coautor de "Harry Potter and the Philosopher's Stone"
(5, 2); -- Jane Austen también es coautora de "The Hobbit"}

-- Punto 1: Generar Reportes con SELECT

-- Reporte 1: Seleccionar todos los libros publicados por 'Penguin Books'.
SELECT book_id, Title FROM book
WHERE publisher_id IN (
	SELECT publisher_id FROM publisher
		WHERE name IN ('Penguin Books')
);

-- Reporte 2: Seleccionar todos los libros publicados después del año 1950.
SELECT Title, Genre, Publication_Year
FROM Book
WHERE Publication_Year > 1950;

-- Reporte 3: Seleccionar los nombres de los autores que han escrito libros de género 'Fantasy' utilizando una subconsulta.
SELECT DISTINCT a.Name
FROM Author a
WHERE a.Author_ID IN (
    SELECT ba.Author_ID
    FROM Book_Author ba
    JOIN Book b ON ba.Book_ID = b.Book_ID
    WHERE b.Genre = 'Fantasy'
);

-- Reporte 4: Seleccionar los títulos de los libros escritos por autores cuyo nombre contiene 'J.K.' utilizando una subconsulta.
SELECT b.Title
FROM Book b
WHERE b.Book_ID IN (
    SELECT ba.Book_ID
    FROM Book_Author ba
    JOIN Author a ON ba.Author_ID = a.Author_ID
    WHERE a.Name LIKE '%J.K.%'
);

-- (Opcional) Reporte 5: Utilizando una subconsulta, seleccionar los títulos de los libros escritos por autores británicos.
SELECT b.Title
FROM Book b
WHERE b.Book_ID IN (
    SELECT ba.Book_ID
    FROM Book_Author ba
    JOIN Author a ON ba.Author_ID = a.Author_ID
    WHERE a.Nationality = 'British'
);

-- Punto 2: Modificar Información con UPDATE

-- Actualizar el género del libro '1984' a 'Science Fiction'.
UPDATE Book
SET Genre = 'Science Fiction'
WHERE Title = '1984';

-- Cambiar la nacionalidad de 'Mark Twain' a 'Canadian'.
UPDATE Author
SET Nationality = 'Canadian'
WHERE Name = 'Mark Twain';

-- Punto 3: Eliminar Información con DELETE

-- Eliminar el libro 'Pride and Prejudice' de la base de datos.
DELETE FROM Book
WHERE Title = 'Pride and Prejudice';

-- Eliminar los autores que no han escrito ningún libro.
DELETE FROM Author
WHERE Author_ID NOT IN (
    SELECT DISTINCT Author_ID
    FROM Book_Author
);