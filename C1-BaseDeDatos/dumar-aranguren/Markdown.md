## Punto 1: Modelo ER Básico - Pet Store (sin relaciones)
Crear el diagrama ER sin relaciones es simple:

**Pet:** ``Pet_ID, Name, Species, Breed, Age``

## Punto 2: Modelo ER Básico - Library
Aquí agregamos relaciones:

**Book:** ``Book_ID, Title, Genre, Publication_Date``

**Author:** ``Author_ID, Name, Nationality``

**Relación:** Un autor puede escribir uno o más libros, y cada libro tiene un único autor.

## Punto 3: Modelo ER Complejo - Hotel Reservation System
Este es más complejo:

**Customer:** ``Customer_ID, Name, Email, Phone``

**Room:** ``Room_ID, Number, Type, Price``

**Reservation:** ``Reservation_ID, Start_Date, End_Date, Customer_ID, Room_ID``

**Relaciones:**

Un cliente puede tener una o más reservas, pero una reserva pertenece a un único cliente.

Una habitación puede ser reservada múltiples veces, pero cada reserva está asociada a una única habitación.