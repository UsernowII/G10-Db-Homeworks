     
**Documentación de  diagramas**

**Course:** Representa los cursos ofrecidos. Atributos: Course_ID (clave primaria), Title, Description.

**Student:** Representa los estudiantes inscritos. Atributos: Student_ID (clave primaria), Name, Email.

**Course_Student:** Entidad de relación que asocia estudiantes con cursos. Atributos: Course_ID, Student_ID (ambos juntos forman la clave primaria).

**Relaciones**
Un estudiante puede estar inscrito en uno o más cursos: Esto se refleja en la tabla Course_Student donde Student_ID puede aparecer múltiples veces, cada vez asociado a un Course_ID diferente.

Un curso puede tener uno o más estudiantes: Esto se refleja en la tabla Course_Student donde Course_ID puede aparecer múltiples veces, cada vez asociado a un Student_ID diferente.

**Modelo ER Complejo: Projects and Employees**

``Diagrama ER``

**Descripción** 

**Project:** Representa los proyectos en la empresa. Atributos: Project_ID (clave primaria), Name, Start_Date, End_Date.

**Employee:** Representa los empleados de la empresa. Atributos: Employee_ID (clave primaria), Name, Position, Department.

**Project_Employee:** Entidad de relación que asocia empleados con proyectos. Atributos: Project_ID, Employee_ID (ambos juntos forman la clave primaria).

**Relaciones**
Un empleado puede trabajar en uno o más proyectos: Esto se refleja en la tabla Project_Employee donde Employee_ID puede aparecer múltiples veces, cada vez asociado a un Project_ID diferente.

Un proyecto puede tener uno o más empleados: Esto se refleja en la tabla Project_Employee donde Project_ID puede aparecer múltiples veces, cada vez asociado a un Employee_ID diferente.