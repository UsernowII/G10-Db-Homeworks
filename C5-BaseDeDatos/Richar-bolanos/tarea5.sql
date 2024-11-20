-- Punto 1: Generar Reportes con JOINs

-- Reporte 1: Usar INNER JOIN para seleccionar los títulos de los libros junto con el nombre de su editorial.
SELECT b.Title, p.Name AS Publisher_Name
FROM Book b
INNER JOIN Publisher p ON b.Publisher_ID = p.Publisher_ID;

-- Reporte 2: Usar LEFT JOIN para seleccionar todos los autores y los títulos de los libros que han escrito, incluyendo autores que no han escrito ningún libro.
SELECT a.Name AS Author_Name, b.Title
FROM Author a
LEFT JOIN Book_Author ba ON a.Author_ID = ba.Author_ID
LEFT JOIN Book b ON ba.Book_ID = b.Book_ID;

-- Reporte 3: Usar RIGHT JOIN para seleccionar todos los libros y los nombres de los autores que los han escrito, incluyendo libros que no tienen autores asociados.
SELECT b.Title, a.Name AS Author_Name
FROM Book b
RIGHT JOIN Book_Author ba ON b.Book_ID = ba.Book_ID
RIGHT JOIN Author a ON ba.Author_ID = a.Author_ID;

-- Reporte 4: Usar una combinación de INNER JOIN y LEFT JOIN para seleccionar todos los libros, sus autores, y la editorial, incluyendo libros que no tienen autores y aquellos sin editorial.
SELECT b.Title, a.Name AS Author_Name, p.Name AS Publisher_Name
FROM Book b
LEFT JOIN Book_Author ba ON b.Book_ID = ba.Book_ID
LEFT JOIN Author a ON ba.Author_ID = a.Author_ID
LEFT JOIN Publisher p ON b.Publisher_ID = p.Publisher_ID;

-- Reporte 5: Usar INNER JOIN para seleccionar todos los libros que han sido escritos por más de un autor y mostrar el título del libro junto con los nombres de los autores.
SELECT b.Title, STRING_AGG(a.Name, ', ') AS Authors
FROM Book b
INNER JOIN Book_Author ba ON b.Book_ID = ba.Book_ID
INNER JOIN Author a ON ba.Author_ID = a.Author_ID
GROUP BY b.Book_ID
HAVING COUNT(a.Author_ID) > 1;

-- Reporte 6 (Opcional): Usar INNER JOIN, LEFT JOIN, y GROUP BY para seleccionar la editorial que tiene más libros publicados, junto con el número total de libros y los títulos de esos libros.
SELECT p.Name AS Publisher_Name, COUNT(b.Book_ID) AS Total_Books, STRING_AGG(b.Title, ', ') AS Book_Titles
FROM Publisher p
LEFT JOIN Book b ON p.Publisher_ID = b.Publisher_ID
GROUP BY p.Publisher_ID
ORDER BY Total_Books DESC
LIMIT 1;