-- EXERCÍCIO 1 COM SUBQUERY
SELECT title FROM pixar.movies AS m
WHERE id IN ((SELECT movie_id FROM pixar.box_office WHERE international_sales > 500000000 ))
AND length_minutes > 110;
-- EXERCÍCIO 1 COM JOIN
SELECT m.title FROM pixar.movies AS m
INNER JOIN pixar.box_office AS bo
ON bo.movie_id = m.id
WHERE bo.international_sales > 500000000
AND m.length_minutes > 110;
-- EXERCÍCIO 2
USE BeeMovies;
DELIMITER $$
CREATE TRIGGER trigger_movie_insert
	BEFORE INSERT ON movies
    FOR EACH ROW
BEGIN
	SET NEW.release_year = YEAR(NOW());
END $$
CREATE TRIGGER trigger_movie_log_insert
	AFTER INSERT ON movies
    FOR EACH ROW
BEGIN
	INSERT INTO movies_logs(movie_id, executed_action, log_date)
    VALUES(NEW.movie_id, 'INSERT', NOW());
END $$
DELIMITER ;

INSERT INTO movies(movie_id,ticket_price,ticket_price_estimation)
VALUES(1,10,8);

SELECT * FROM movies;
SELECT * FROM movies_logs;
-- EXERCÍCIO 3
USE BeeMovies;
DELIMITER $$
CREATE TRIGGER trigger_movie_update
	BEFORE UPDATE ON movies
    FOR EACH ROW
BEGIN
	SET NEW.ticket_price_estimation = IF(NEW.ticket_price > OLD.ticket_price, 'Increasing','Decreasing');
	INSERT INTO movies_logs(movie_id, executed_action, log_date)
    VALUES(NEW.movie_id, 'UPDATE', NOW());
END $$
DELIMITER ;

UPDATE movies
SET ticket_price = 9
WHERE movie_id = 1;

SELECT * FROM movies;
SELECT * FROM movies_logs;
-- EXERCÍCIO 4
USE BeeMovies;
DELIMITER $$
CREATE TRIGGER trigger_movie_delete
	BEFORE DELETE ON movies
    FOR EACH ROW
BEGIN
	INSERT INTO movies_logs(movie_id, executed_action, log_date)
    VALUES(OLD.movie_id, 'DELETE', NOW());
END $$
DELIMITER ;

DELETE FROM movies WHERE movie_id = 1;

SELECT * FROM movies;
SELECT * FROM movies_logs;
-- EXERCÍCIO 5
USE pixar;
SELECT name, location FROM theater AS t
WHERE EXISTS (
	SELECT * FROM movies WHERE theater_id = t.id
);
-- EXERCÍCIO 6
USE pixar;
SELECT name, location FROM theater AS t
WHERE NOT EXISTS (
	SELECT * FROM movies WHERE theater_id = t.id
);