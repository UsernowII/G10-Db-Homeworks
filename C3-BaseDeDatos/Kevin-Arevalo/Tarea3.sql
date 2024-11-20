CREATE TABLE IF NOT EXISTS Author(
	Author_id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	Name VARCHAR(100)NOT NULL,
	Nationality VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS Publisher(
	Publisher_id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	Name VARCHAR(100) NOT NULL,
	Country VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS Books(
	Books_id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	Title VARCHAR(100) NOT NULL,
	Genre VARCHAR (50)NOT NULL,
	Publication_year integer NOT NULL,
	Published integer NOT NULL,

	FOREIGN KEY (Published) REFERENCES Publisher(Publisher_id)
);

CREATE TABLE IF NOT EXISTS Book_Author (
	Author_id integer  REFERENCES Author(Author_id),
	books_id integer REFERENCES books(Books_id)
);

SELECT * FROM Author;

INSERT INTO Author (name, Nationality)
VALUES ('George Orwell', 'British'),
      ('Jane Austen', 'Bristish'),
	  (' Mark Twain', 'British');

SELECT * FROM Books;	  

	INSERT INTO Books (Title, Genre, Publication_year,published)
	VALUES ('Gillermina y candelario', 'Dystopian', 1949, 1),
       	   ('Pride and Prejudice', 'Romance', 1813, 2),
	       ('Adventures of Huckleberry Finn', 'Adventure', 1884, 1);

SELECT *FROM Publisher;	 


INSERT INTO Publisher (name, Country)
VALUES ('Penguin Books', 'United Kingdom'),
      ('Oxford University Press', 'United Kingdom');


SELECT * FROM Book_Author;	
INSERT INTO Book_Author(books_id, author_id)
VALUES (7 ,7 ),
       (8, 8),
	   (9, 9 );