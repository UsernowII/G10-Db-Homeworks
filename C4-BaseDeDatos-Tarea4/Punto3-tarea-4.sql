-- Punto 3: Eliminar Información con DELETE

-- Eliminar el libro 'Pride and Prejudice' de la base de datos.


DELETE FROM book_author
WHERE book_ID = (
    SELECT book_ID FROM book 
	WHERE title = 'Pride and Prejudice'
);

select * from book_author


DELETE FROM book
WHERE title = 'Pride and Prejudice';

select * from book 


-- Eliminar los autores que no han escrito ningún libro.

DELETE FROM author
WHERE author_id NOT IN (
    SELECT DISTINCT author_id FROM book_author
);

-- Respuesta de la consola

-- DELETE 0

-- Query returned successfully in 80 msec.	

