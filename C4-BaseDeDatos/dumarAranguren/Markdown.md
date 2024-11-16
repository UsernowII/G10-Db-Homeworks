## Reporte 1: Seleccionar todos los libros publicados por 'Penguin Books' ##
SELECT * FROM Book
WHERE publisher_id = (
   SELECT publisher_id FROM publisher
   WHERE name = 'Penguin Books'
);

``Propósito:`` Seleccionar todos los libros publicados por la editorial 'Penguin Books'.

## Descripción:

``La subconsulta``

 SELECT publisher_id FROM publisher WHERE name = 'Penguin Books' obtiene el publisher_id de la editorial 'Penguin Books'.

``La consulta principal`` SELECT * FROM Book WHERE publisher_id = (...) selecciona todos los libros que tienen el publisher_id obtenido en la subconsulta.

## Reporte 2: Seleccionar todos los libros publicados después del año 1950

sql

SELECT Title, Publication_Year
FROM Book
WHERE Publication_Year > 1950;

``Propósito:`` Seleccionar los títulos y los años de publicación de los libros publicados después de 1950.

``Descripción:`` La consulta
 SELECT Title, Publication_Year FROM Book WHERE Publication_Year > 1950 selecciona los campos Title y Publication_Year de la tabla Book donde el año de publicación es mayor a 1950.

## Reporte 3: Seleccionar los nombres de los autores que han escrito libros de género 'Fantasy'

sql

SELECT name FROM Author
WHERE Author_ID IN (
    SELECT Author_ID FROM Book_Author
    WHERE Book_ID IN (
        SELECT Book_ID FROM Book
        WHERE Genre = 'Fantasy'
    )
);

``Propósito``: Obtener los nombres de los autores que han escrito libros del género 'Fantasy'.

## Descripción:

La subconsulta más interna SELECT Book_ID FROM Book WHERE Genre = 'Fantasy' obtiene los Book_ID de los libros del género 'Fantasy'.

La siguiente subconsulta SELECT Author_ID FROM Book_Author WHERE Book_ID IN (...) obtiene los Author_ID de los autores que han escrito esos libros.

La consulta principal SELECT name FROM Author WHERE Author_ID IN (...) obtiene los nombres de los autores usando los Author_ID obtenidos en la subconsulta anterior.

## Reporte 4: Seleccionar los títulos de los libros escritos por autores cuyo nombre contiene 'J.K.'

sql

SELECT Title FROM book
WHERE book_id IN (
    SELECT book_id FROM book_author
    WHERE author_id IN (
        SELECT author_id FROM author
        WHERE name LIKE '%J.K.%'
    )
);

``Propósito:`` Obtener los títulos de los libros escritos por autores cuyo nombre contiene 'J.K.'.

## Descripción:

La subconsulta más interna SELECT author_id FROM author WHERE name LIKE '%J.K.%' obtiene los Author_ID de los autores cuyos nombres contienen 'J.K.'.

La siguiente subconsulta SELECT book_id FROM book_author WHERE author_id IN (...) obtiene los Book_ID de los libros escritos por esos autores.

La consulta principal SELECT Title FROM book WHERE book_id IN (...) obtiene los títulos de los libros usando los Book_ID obtenidos en la subconsulta anterior.

## Reporte 5: Seleccionar los títulos de los libros escritos por autores británicos

sql

SELECT Title FROM book
WHERE book_id IN (
    SELECT book_id FROM book_author
    WHERE author_id IN (
        SELECT author_id FROM author
        WHERE Nationality = 'British'
    )
);
``Propósito:``Obtener los títulos de los libros escritos por autores británicos.

## Descripción:

La subconsulta más interna SELECT author_id FROM author WHERE Nationality = 'British' obtiene los Author_ID de los autores de nacionalidad británica.

La siguiente subconsulta SELECT book_id FROM book_author WHERE author_id IN (...) obtiene los Book_ID de los libros escritos por esos autores.

La consulta principal SELECT Title FROM book WHERE book_id IN (...) obtiene los títulos de los libros usando los Book_ID obtenidos en la subconsulta anterior.

## Actualizar Información con UPDATE
``Actualizar el género del libro '1984' a 'Science Fiction':``

sql

UPDATE book
SET Genre = 'Science Fiction'
WHERE Title = '1984';

``Propósito:`` Actualizar el género del libro '1984'.

## Descripción:

 La consulta 
 UPDATE book SET Genre = 'Science Fiction' WHERE Title = '1984' cambia el género del libro '1984' a 'Science Fiction'.

``Cambiar la nacionalidad de 'Mark Twain' a 'Canadian':``

sql

UPDATE author
SET Nationality = 'Canadian'
WHERE Name = 'Mark Twain';

``Propósito:`` Cambiar la nacionalidad de 'Mark Twain'.

## Descripción:

La consulta UPDATE author SET Nationality = 'Canadian' WHERE Name = 'Mark Twain' actualiza la nacionalidad del autor 'Mark Twain' a 'Canadian'.

## Eliminar Información con DELETE
``Eliminar el libro 'Pride and Prejudice' de la base de datos:``

sql

DELETE FROM book
WHERE Title = 'Pride and Prejudice';
``Propósito:`` Eliminar el libro 'Pride and Prejudice'.

## Descripción: 

La consulta
 DELETE FROM book WHERE Title = 'Pride and Prejudice' elimina el libro 'Pride and Prejudice' de la tabla Book.

``Eliminar los autores que no han escrito ningún libro:``

sql
DELETE FROM Author
WHERE Author_ID NOT IN (
    SELECT DISTINCT Author_ID
    FROM Book_Author
);
``Propósito:`` Eliminar los autores que no han escrito ningún libro.

## Descripción:

 La consulta DELETE FROM Author WHERE Author_ID NOT IN (SELECT DISTINCT Author_ID FROM Book_Author) elimina los autores cuyos Author_ID no están presentes en la tabla Book_Author, es decir, autores que no han escrito ningún libro.