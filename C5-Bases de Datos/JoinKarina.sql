--Usar `INNER JOIN` para seleccionar los títulos de los libros junto con el 
--nombre de su editorial
SELECT title, name
FROM book
INNER JOIN publisher 
ON publisher.publisher_id = book.publisher_id
--Usar `LEFT JOIN` para seleccionar todos los autores y los títulos de los libros que han escrito,
--incluyendo autores que no han escrito ningún libro.

SELECT  name, title
FROM author As a
LEFT JOIN book_author As b
ON a.author_id = b.author_id
LEFT JOIN book
ON b.book_id = book.book_id

--Usar `RIGHT JOIN` para seleccionar todos los libros y los nombres de los autores que los han escrito, 
--incluyendo libros que no tienen autores asociados.

SELECT title, name
FROM book As b
RIGHT JOIN book_author AS a
ON b.book_id = a.book_id
RIGHT JOIN author AS au
ON a.author_id = au.author_id
-- Usar una combinación de `INNER JOIN` y `LEFT JOIN` para seleccionar 
--todos los libros, sus autores, y la editorial, incluyendo libros que no tienen 
--autores y aquellos sin editorial.

SELECT title, namea, namep
FROM book AS b
INNER JOIN book_author AS ba
ON b.book_id = ba.book_id
INNER JOIN author AS au
ON au.author_id = ba.author_id
LEFT JOIN publisher
ON  b.publisher_id = publisher.publisher_id

-- `INNER JOIN` para seleccionar todos los libros que han sido escritos por más de un autor y mostrar el título del 
--libro junto con los nombres de los autores.



SELECT  title, name
FROM book 
INNER JOIN book_author AS ba
ON book.book_id = ba.book_id
INNER JOIN author
ON ba.author_id = author.author_id

GROUP BY book.title, author.name
HAVING COUNT (book.title)>1






--having count(*)>1