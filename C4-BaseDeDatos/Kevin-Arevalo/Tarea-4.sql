--PRIMERA TAREA

--PRIMER PUNTO
--Seleccionar todos los libros publicados por 'Penguin Books'.
SELECT * FROM Book 
WHERE Publisher_ID = (SELECT Publisher_ID FROM Publisher WHERE Name = 'Penguin Books');

--SEGUNDO PUNTO 
--Seleccionar todos los libros publicados después del año 1950.
SELECT * FROM Book
WHERE publication_year > 1950

--TERCER PUNTO 
--Seleccionar los nombres de los autores que han escrito libros de género 'Fantasy' utilizando una subconsulta.
SELECT DISTINCT a.Name FROM Author a
	WHERE a.Author_ID IN(
		SELECT ba.Author_ID FROM Book_Author ba
		JOIN Book b ON ba.Book_ID = b.Book_ID
		WHERE b.Genre = 'Fantasy'
);

--CUARTO PUNTO
--Seleccionar los títulos de los libros escritos por autores cuyo nombre contiene 'J.K.' utilizando una subconsulta.
SELECT b.Title FROM Book b
	JOIN Book_Author ba ON b.Book_ID = ba.Book_Id
	WHERE ba.Author_ID IN(
		SELECT a.Author_ID FROM Author a
		WHERE a.Name LIKE '%J.K%'
	);

--PUNTO OPCIONAL  Utilizando una subconsulta, seleccionar los títulos de los libros escritos por autores británicos.
SELECT b.title FROM Book b
	WHERE b.Book_ID IN(
		SELECT ba.Book_ID FROM Book_Author ba
		JOIN Author a ON ba.Author_ID =a.Author_ID
		WHERE a.Nationality = 'British'
	);
	
--SEGUNDA TAREA

--Actualizar el género del libro '1984' a 'Science Fiction'.
UPDATE Book
SET Genre = 'Science Fiction'
WHERE Title = '1984';

--Cambiar la nacionalidad de 'Mark Twain' a 'Canadian'.
UPDATE Author
SET Nationality = 'Canadian'
WHERE Name = 'Mark Twain'
 
--TERCERA TAREA 

--Eliminar el libro 'Pride and Prejudice' de la base de datos.
DELETE FROM Book_Author 
WHERE Book_ID = (
	Select Book_ID FROM Book
	Where Title = 'Pride and Prejudice'
);

DELETE FROM Book
WHERE Title = 'Pride and Prejudice';

--Eliminar los autores que no han escrito ningún libro.
DELETE FROM Author 
	WHERE Author_ID NOT IN (
	SELECT DISTINCT Author_ID FROM Book_Author
	);