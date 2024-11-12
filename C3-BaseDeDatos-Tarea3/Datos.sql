SELECT * FROM author;

INSERT INTO author (name,nationality)
values ('George Orwell', 'British'),
    	('Jane Austen', 'British'),
    	('Mark Twain', 'American');


SELECT * FROM publisher;
INSERT INTO publisher(name,country)
values ('Penguin Books', 'United Kingdom'),
    	('Oxford University Press', 'United Kingdom');
    	

SELECT * FROM book;
INSERT INTO book (title,gender,publication_year,publisher_id)
values ('1984', 'Dystopian','1949','1'),
    	('Pride and Prejudice','Romance','1813','2'),
    	('Adventures of Huckleberry Finn','Adventure','1884','1');

SELECT * FROM book_author;
INSERT INTO Book_Author (Book_ID, Author_ID) VALUES (1, 1); 
VALUES (2, 2);
VALUES (3, 3);

INSERT INTO Book_Author (Book_ID, Author_ID) 
SELECT 2, 2 
WHERE EXISTS (SELECT 1 FROM Book WHERE Book_ID = 2)
  AND EXISTS (SELECT 1 FROM Author WHERE Author_ID = 2);

INSERT INTO Book_Author (Book_ID, Author_ID) 
SELECT 3, 3 
WHERE EXISTS (SELECT 1 FROM Book WHERE Book_ID = 3)
  AND EXISTS (SELECT 1 FROM Author WHERE Author_ID = 3);
