En el punto uno se crea una entidad sin relacion que tiene 
1 id
2 name
3 species
4 breed
5 age

En el punto dos creamos dos entidades que se relacionan entre si por medio de sus id, con llaves PK Y FK
Book: Book_ID, Title, Genre, Publication_Date
Author: Author_ID, Name, Nationality

En el tercer punto creamos  entidades que se relacionan entre si:
Customer: Customer_ID, Name, Email, Phone
Room: Room_ID, Number, Type, Price
Reservation: Reservation_ID, Start_Date, End_Date, Customer_ID, Room_ID

