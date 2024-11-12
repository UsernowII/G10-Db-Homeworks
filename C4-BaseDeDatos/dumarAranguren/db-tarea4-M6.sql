--Reporte 1**: Seleccionar todos los libros publicados por 'Penguin Books'. 

SELECT * FROM Book
WHERE publisher_id = (
   SELECT publisher_id FROM publisher
   WHERE name = 'Penguin Books'
);

SELECT publisher_id FROM publisher
WHERE name = 'Penguin Books'

/* Reporte 2: Seleccionar todos los libros publicados
  después del año 1950.*/

SELECT Title, Publication_Year
FROM Book
WHERE Publication_Year > 1950;


/* Reporte 3: Seleccionar los nombres de los autores que han escrito 
libros de género 'Fantasy' utilizando una subconsulta.*/


SELECT * FROM book;

SELECT name FROM Author
WHERE Author_ID IN (
    SELECT Author_ID FROM Book_Author
    WHERE Book_ID IN (
        SELECT Book_ID FROM Book
        WHERE Genre = 'Fantasy'
    )
);

-- 4, 5, 1, 2
SELECT author_id FROM book_author
WHERE book_id IN (4,5);


-- 4, 5
SELECT book_id FROM book
WHERE genre = 'Fantasy';


/*Reporte 4: Seleccionar los títulos de los libros escritos
por autores cuyo nombre contiene 'J.K.' utilizando una subconsulta.*/

SELECT * FROM author;

SELECT Title FROM book
WHERE book_id IN (
	SELECT book_id FROM book_author
	WHERE author_id IN (
		SELECT author_id FROM author
        WHERE name LIKE '%J.K.%'
    )
);

SELECT Author_ID FROM Author
WHERE Name LIKE '%J.K.%';
  

SELECT Book_ID
FROM Book_Author
WHERE Author_ID IN (
    SELECT Author_ID
    FROM Author
    WHERE Name LIKE '%J.K.%'
);

/* Reporte 5: Utilizando una subconsulta, seleccionar 
los títulos de los libros escritos por autores británicos. */

SELECT * FROM author;

SELECT Title FROM book
WHERE book_id IN (
	SELECT book_id FROM book_author
	WHERE author_id IN (
		SELECT author_id FROM author
        WHERE Nationality = 'British'
    )
);

SELECT Author_ID FROM Author
WHERE Nationality = 'British';

SELECT Book_ID
FROM Book_Author
WHERE Author_ID IN (
    SELECT Author_ID
    FROM Author
    WHERE Nationality = 'British'
);

/* Punto 2: Modificar Información con UPDATE
    - Actualizar el género del libro '1984' a 'Science Fiction'.
    - Cambiar la nacionalidad de 'Mark Twain' a 'Canadian'.*/

SELECT * FROM book;

UPDATE book
SET Title = 'Science Fiction'
WHERE book_id = 1


SELECT * FROM author;

UPDATE author
SET nationality = 'Canadian'
WHERE author_id = 3;


/* Punto 3: Eliminar Información con DELETE
  Eliminar el libro 'Pride and Prejudice' de la base de datos.*/

SELECT * FROM book;

DELETE FROM book
WHERE title =  'Pride and Prejudice';

DELETE FROM Book_Author
WHERE Book_id = (
SELECT Book_id FROM Book
WHERE Title = 'Pride and Prejudice'
);


--Eliminar los autores que no han escrito ningún libro.

SELECT * FROM Book_Author;

SELECT DISTINCT Author_id
FROM Book_Author;

DELETE FROM Author
WHERE Author_id NOT IN (
SELECT DISTINCT Author_id
FROM Book_Author
);

	