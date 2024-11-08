-- Database: database_dump

-- DROP DATABASE IF EXISTS database_dump;

CREATE DATABASE database_dump
    WITH
    OWNER = jluna
    ENCODING = 'UTF8'
    LC_COLLATE = 'Spanish_Colombia.1252'
    LC_CTYPE = 'Spanish_Colombia.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;
	
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
(4, 'Harry Potter and the Philosophers Stone', 'Fantasy', 1997, 1),
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
(5, 2); -- Jane Austen también es coautora de "The Hobbit"

-- Punto 1: Generar Reportes con SELECT
-- Reporte 1: Seleccionar todos los libros publicados por 'Penguin Books'.
SELECT * 
FROM book
WHERE publisher_id = (
	SELECT publisher_id 
	FROM publisher
	WHERE Name = 'Penguin Books'
);

-- Reporte 2: Seleccionar todos los libros publicados después del año 1950.
SELECT *
FROM book
WHERE publication_year > 1950;

-- Reporte 3: Seleccionar los nombres de los autores que han escrito 
-- libros de género 'Fantasy' utilizando una subconsulta.

SELECT name
FROM author
WHERE author_id IN (
	SELECT author_id
	FROM book_author
	WHERE book_id IN (
		SELECT book_id
		FROM book
		WHERE genre ='Fantasy'
	)
);

-- Reporte 4: Seleccionar los títulos de los libros escritos por autores
--cuyo nombre contiene 'J.K.' utilizando una subconsulta.

SELECT title
FROM book
WHERE book_id IN (
	SELECT author_id
	FROM book_author
	WHERE author_id IN (
		SELECT author_id
		FROM author
		WHERE name LIKE '%J.K.%'
	)
);

-- (Opcional) Reporte 5: Utilizando una subconsulta, seleccionar los títulos
--de los libros escritos por autores británicos.

SELECT title
FROM book
WHERE book_id IN (
	SELECT author_id
	FROM book_author
	WHERE author_id IN (
		SELECT author_id
		FROM author
		WHERE nationality = 'British'
	)
);

-- Punto 2: Modificar Información con UPDATE

-- Actualizar el género del libro '1984' a 'Science Fiction'.

UPDATE book 
SET genre = 'Science Fiction'
WHERE title ='1984';

-- Cambiar la nacionalidad de 'Mark Twain' a 'Canadian'.
UPDATE author
SET nationality = 'Canadian'
WHERE name = 'Mark Twain';

-- Punto 3: Eliminar Información con DELETE
-- Eliminar el libro 'Pride and Prejudice' de la base de datos.

ALTER TABLE book_author
DROP CONSTRAINT book_author_book_id_fkey;

ALTER TABLE book_author
ADD CONSTRAINT book_author_book_id_fkey
FOREIGN KEY (book_id) REFERENCES book (book_id) ON DELETE CASCADE;

DELETE FROM book
WHERE title = 'Pride and Prejudice';

-- Eliminar los autores que no han escrito ningún libro.
DELETE FROM author
WHERE author_id NOT IN (
	SELECT DISTINCT author_id
	FROM book_author
);














