USE pixar;
-- EXERCICIO 1
SELECT m.title,
bo.domestic_sales,
bo.international_sales FROM movies AS m
INNER JOIN box_office AS bo
ON m.id = bo.movie_id;
-- EXERCICIO 2
SELECT m.title,
bo.domestic_sales,
bo.international_sales FROM movies AS m
INNER JOIN box_office AS bo
ON m.id = bo.movie_id
WHERE bo.domestic_sales < bo.international_sales;
-- EXERCICIO 3
SELECT m.title,
bo.rating FROM movies AS m
INNER JOIN box_office AS bo
ON m.id = bo.movie_id
ORDER BY bo.rating DESC;
-- EXERCICIO 4
SELECT * FROM theater AS t
LEFT JOIN movies AS m
ON t.id = m.theater_id
ORDER BY t.name;
-- EXERCICIO 5
SELECT * FROM theater AS t
RIGHT JOIN movies AS m
ON t.id = m.theater_id
ORDER BY t.name;
-- EXERCICIO 6
SELECT m.id, m.title, m.director, m.year, m.length_minutes, m.theater_id FROM movies AS m
INNER JOIN box_office AS bo
ON m.id = bo.movie_id
WHERE m.theater_id IS NOT NULL
AND bo.rating > 8;