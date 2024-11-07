CREATE TABLE Author(
ID integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
Name VARCHAR(100) NOT NULL,
Nationality VARCHAR(50) NOT NULL,
Publisher_ID integer ,
FOREIGN KEY(Publisher_ID) 
REFERENCES Publisher(Publisher_ID)
);

CREATE TABLE Book(
ID integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
Title VARCHAR(100) NOT NULL,
Genre VARCHAR(50) NOT NULL,
Publication_Year integer  NOT NULL,
Publisher_ID integer,
FOREIGN KEY(Publisher_ID) 
REFERENCES Publisher(Publisher_ID)
);

CREATE TABLE Publisher(
Publisher_ID integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
Name VARCHAR(100) NOT NULL,
Country VARCHAR(50)NOT NULL
);

CREATE TABLE Book_Author (
    ID integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    Book_ID integer ,
    Author_ID integer ,
    FOREIGN KEY(Author_ID) 
    REFERENCES Book(ID),
    FOREIGN KEY(book_ID)
    REFERENCES Author(ID)
);

SELECT * FROM Author;

INSERT INTO Author (name, nationality)
VALUES ('George Orwell', 'British'),
      ('Jane Austen', 'Bristish'),
	  (' Mark Twain', 'British');

SELECT * FROM Book;	  

INSERT INTO Book (title, genre, publication_year)
VALUES (1984, 'Dystopian', 1949),
       ('Pride and Prejudice', 'Romance', 1813),
	   ('Adventures of Huckleberry Finn', 'Adventure', 1884);

SELECT *FROM Publisher;	 


INSERT INTO Publisher (name, country)
VALUES ('Penguin Books', 'United Kingdom'),
      ('Oxford University Press', 'United Kingdom');


SELECT *FROM Book_Author;	

INSERT INTO Book_Author(Book_ID, Author_id)
VALUES (1 ,1 ),
       (2, 2 ),
	   (3, 3 );