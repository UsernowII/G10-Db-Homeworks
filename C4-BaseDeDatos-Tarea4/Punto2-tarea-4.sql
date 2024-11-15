-- Punto 2: Modificar Información con UPDATE

-- Actualizar el género del libro '1984' a 'Science Fiction'.

UPDATE book
SET genre = 'Science Fiction'
WHERE title = '1984';

select * from book


-- Cambiar la nacionalidad de 'Mark Twain' a 'Canadian'.

UPDATE Author
SET Nationality = 'Canadian'
WHERE Name = 'Mark Twain';

select * from author