-- Crear la tabla de publishers
CREATE TABLE publishers (
    publisher_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    country VARCHAR(50)
);

-- Crear la tabla de authors
CREATE TABLE authors (
    author_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    nationality VARCHAR(50)
);

-- Crear la tabla de books
CREATE TABLE books (
    book_id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    genre VARCHAR(50),
    publication_year INT,
    publisher_id INT REFERENCES publishers(publisher_id)
);

-- Crear la tabla de book_author
CREATE TABLE book_author (
    book_id INTEGER REFERENCES books(book_id),
    author_id INTEGER REFERENCES authors(author_id)
);

-- Insertar datos en la tabla authors
INSERT INTO authors (name, nationality) 
VALUES
    ('George Orwell', 'British'),
    ('Jane Austen', 'British'),
    ('Mark Twain', 'American');

-- Insertar datos en la tabla publishers
INSERT INTO publishers (name, country)
VALUES
    ('Penguin Books', 'United Kingdom'),
    ('Oxford University Press', 'United Kingdom');

-- Insertar datos en la tabla books
INSERT INTO books (title, genre, publication_year, publisher_id)
VALUES
    ('1984', 'Dystopian', 1949, 1),
    ('Pride and Prejudice', 'Romance', 1813, 2),
    ('Adventures of Huckleberry Finn', 'Adventure', 1884, 1);

-- Insertar datos en la tabla book_author
INSERT INTO book_author (book_id, author_id)
VALUES
    (1, 1),
    (2, 2),
    (3, 3);