-- libros publicados por 'Penguin Books'.

select * from book
where publisher_id =(
	select publisher_id from publisher
	where name = 'Penguin Books'
)

select publisher_id from publisher
where name = 'Penguin Books';


-- Reporte 2: Seleccionar todos los libros publicados después del año 1950.

select title, genre, publication_year  from book
where publication_year > 1950;

-- Reporte 3: Seleccionar los nombres de los autores que han escrito libros de género 'Fantasy' utilizando una subconsulta.

select *  from author
where author_id IN (
	select author_id from book_author
	where book_id IN (
		select book_id from book
		where genre = 'Fantasy'	
	)
	
)

-- Reporte 4 : Seleccione los títulos de los libros escritos por autores cuyo nombre contenga 'JK' utilizando una subconsulta.


	
select title  from book
where book_id IN(
	select book_id from book_author
	where author_id IN (
		select  author_id from author
		where name LIKE '%J.K.%'
	)
)

-- (Opcional) Reporte 5: Utilizando una subconsulta, seleccionar los títulos de los libros escritos por autores británicos.


select title from book
where book_id in (
	select book_id from book_author
	where author_id in (
		select author_id  from author
		where nationality = 'British'
	)
)



