-- Database: JonnyLuna_Tarea5

-- DROP DATABASE IF EXISTS "JonnyLuna_Tarea5";

CREATE DATABASE "JonnyLuna_Tarea5"
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
(4, 'Harry Potter and the Philosopher´s Stone', 'Fantasy', 1997, 1),
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

-- Reporte 1: Usar INNER JOIN para seleccionar los títulos de los libros junto con el nombre de su editorial.

SELECT 
	b.title "Título del libro", 
	p.name  "Editorial"  
FROM 
	Book  b
INNER JOIN 
	Publisher p ON b.publisher_id = p.publisher_id;

-- Reporte 2: Usar LEFT JOIN para seleccionar todos los autores y los títulos de los libros
-- que han escrito, incluyendo autores que no han escrito ningún libro.

SELECT 
	a.name "Nombre del Autor",
	b.title "Título del libro"
FROM 
	Author a
LEFT JOIN
	Book_Author ba ON a.author_id = ba.author_id
LEFT JOIN
	Book b ON ba.book_id = b.book_id;

-- Reporte 3: Usar RIGHT JOIN para seleccionar todos los libros y los nombres de los
-- autores que los han escrito, incluyendo libros que no tienen autores asociados.

SELECT
	b.title "Título del libro",
	a.name "Nombre del autor"
FROM
	book b
RIGHT JOIN
	book_author ba ON b.book_id = ba.book_id
RIGHT JOIN 
	author a ON ba.author_id = a.author_id;

-- Reporte 4: Usar una combinación de INNER JOIN y LEFT JOIN para seleccionar 
-- todos los libros, sus autores, y la editorial, incluyendo libros que 
--no tienen autores y aquellos sin editorial.

SELECT 
	b.title "Título del libro",
	a.name "Autor",
	p.name "Editorial"
FROM
	book b
LEFT JOIN
	book_author ba ON b.book_id = ba.book_id 
INNER JOIN
	author a ON ba.author_id = a.author_id
LEFT JOIN
	publisher p ON b.publisher_id = p.publisher_id;

-- Reporte 5: Usar INNER JOIN para seleccionar todos los libros que han sido
-- escritos por más de un autor y mostrar el título del libro junto con 
-- los nombres de los autores.

SELECT 
    b.title "Título del Libro",
    a.name "Autor"
FROM 
    book b
INNER JOIN 
    book_author ba ON b.book_id = ba.book_id
INNER JOIN 
    author a ON ba.author_id = a.author_id
WHERE 
    b.book_id IN (
        SELECT book_id
        FROM book_author
        GROUP BY book_id
        HAVING COUNT(author_id) > 1
    )
ORDER BY 
    b.title;
	


-- Reporte 6 (Opcional): Usar INNER JOIN, LEFT JOIN, y GROUP BY para seleccionar
-- la editorial que tiene más libros publicados junto con el número total
-- de libros y los títulos de esos libros.

SELECT 
    p.name "Editorial",
    COUNT(b.book_id) "Total de Libros Publicados",
    STRING_AGG(b.title, ', ') "Títulos de los Libros"
FROM 
    publisher p
LEFT JOIN 
    book b ON p.publisher_id = b.publisher_id
GROUP BY 
    p.name
ORDER BY 
    "Total de Libros Publicados" DESC;




	




