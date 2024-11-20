-- Reporte 1: Usar INNER JOIN para seleccionar los títulos de los libros junto con el nombre de su editorial.

SELECT book.title
FROM public.book;

SELECT * FROM publisher;

SELECT book.title AS Titulo, publisher.name AS Editorial
FROM book
INNER JOIN publisher on book.publisher_id = publisher.publisher_id;

-- Reporte 2: Usar LEFT JOIN para seleccionar todos los autores y los títulos de los libros que han escrito, incluyendo autores que no han escrito ningún libro.
SELECT 
    author.name AS Author_Name,
    book.title AS Book_Title
FROM 
    author
LEFT JOIN 
    Book_Author
ON 
    Author.Author_ID = Book_Author.Author_ID
LEFT JOIN 
    Book
ON 
    Book_Author.Book_ID = Book.Book_ID;

-- Reporte 3: Usar RIGHT JOIN para seleccionar todos los libros y los nombres de los autores que los han escrito, incluyendo libros que no tienen autores asociados.
SELECT 
    Book.Title AS Book_Title,
    Author.Name AS Author_Name
FROM 
    Book
LEFT JOIN 
    Book_Author
ON 
    Book.Book_ID = Book_Author.Book_ID
LEFT JOIN 
    Author
ON 
    Book_Author.Author_ID = Author.Author_ID;

-- Reporte 4: Usar una combinación de INNER JOIN y LEFT JOIN para seleccionar todos los libros, sus autores, y la editorial, incluyendo libros que no tienen autores y aquellos sin editorial.
SELECT 
    Book.Title AS Book_Title,
    Author.Name AS Author_Name,
    Publisher.Name AS Publisher_Name
FROM 
    Book
LEFT JOIN 
    Book_Author
ON 
    Book.Book_ID = Book_Author.Book_ID
LEFT JOIN 
    Author
ON 
    Book_Author.Author_ID = Author.Author_ID
LEFT JOIN 
    Publisher
ON 
    Book.Publisher_ID = Publisher.Publisher_ID;

-- Reporte 5: Usar INNER JOIN para seleccionar todos los libros que han sido escritos por más de un autor y mostrar el título del libro junto con los nombres de los autores.
SELECT 
    B.Title AS Book_Title,
    string_agg(A.Name, ', ') AS Author_Names
FROM 
    Book b
JOIN 
    Book_Author BA ON B.Book_ID = BA.Book_ID
JOIN 
    Author A ON BA.Author_ID = A.Author_ID
GROUP BY 
    B.Title
HAVING 
    COUNT(A.Author_ID) > 1;
-- Reporte 6 (Opcional): Usar INNER JOIN, LEFT JOIN, y GROUP BY para seleccionar la editorial que tiene más libros publicados, junto con el número total de libros y los títulos de esos libros.
SELECT 
    P.Name AS Publisher_Name,
    COUNT(B.Book_ID) AS Total_Books,
    string_agg(B.Title, ', ') AS Book_Titles
FROM 
    Publisher P
LEFT JOIN 
    Book B
ON 
    P.Publisher_ID = B.Publisher_ID
GROUP BY 
    P.Name
ORDER BY 
    Total_Books DESC
LIMIT 1;
