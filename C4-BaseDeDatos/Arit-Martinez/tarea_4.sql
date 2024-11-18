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
(4, 'Harry Potter and the Philosopher\'s Stone', 'Fantasy', 1997, 1),
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

-- SOLUCION DE LA TAREA
-- PUNTO 1.1
SELECT b.Title, b.Genre, b.Publication_Year
FROM Book b
JOIN Publisher p ON b.Publisher_ID = p.Publisher_ID
WHERE p.Name = 'Penguin Books';

-- PUNTO 1.2
SELECT Title, Genre, Publication_Year
FROM Book
WHERE Publication_Year > 1950;

-- PUNTO 1.3
SELECT Name
FROM Author
WHERE Author_ID IN (
    SELECT Author_ID
    FROM Book_Author ba
    JOIN Book b ON ba.Book_ID = b.Book_ID
    WHERE b.Genre = 'Fantasy'
);

-- PUNTO 1.4
SELECT Title
FROM Book
WHERE Book_ID IN (
    SELECT ba.Book_ID
    FROM Book_Author ba
    JOIN Author a ON ba.Author_ID = a.Author_ID
    WHERE a.Name LIKE '%J.K.%'
);

-- PUNTO 1.5
SELECT Title
FROM Book
WHERE Book_ID IN (
    SELECT ba.Book_ID
    FROM Book_Author ba
    JOIN Author a ON ba.Author_ID = a.Author_ID
    WHERE a.Nationality = 'British'
);

-- PUNTO 2.1
UPDATE Book
SET Genre = 'Science Fiction'
WHERE Title = '1984';

SELECT * FROM Book WHERE Title = '1984';

-- PUNTO 2.2
UPDATE Author
SET Nationality = 'Canadian'
WHERE Name = 'Mark Twain';

SELECT * FROM Author WHERE Name = 'Mark Twain';

-- PUNTO 3.1
DELETE FROM Book_Author WHERE Book_ID = 2;
DELETE FROM Book WHERE Title = 'Pride and Prejudice';

-- PUNTO 3.2
DELETE FROM Author
WHERE Author_ID NOT IN (
    SELECT Author_ID
    FROM Book_Author
);