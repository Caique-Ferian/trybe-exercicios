USE hr;
-- EXERCÍCIO 1
SELECT MAX(salary) FROM employees; 
-- EXERCÍCIO 2
SELECT MAX(salary) - MIN(salary) FROM employees; 
-- EXERCÍCIO 3
SELECT job_id, AVG(salary) AS avg_sal FROM employees
GROUP BY job_id
ORDER BY avg_sal DESC;
-- EXERCÍCIO 4
SELECT SUM(salary) FROM employees; 
-- EXERCÍCIO 5
SELECT FORMAT(MAX(salary),2),
FORMAT(MIN(salary),2),
FORMAT(SUM(salary),2),
FORMAT(AVG(salary),2) FROM employees; 
-- EXERCÍCIO 6
SELECT job_id, COUNT(*) FROM employees
GROUP BY job_id
HAVING job_id = 'IT_PROG';
-- EXERCÍCIO 7
SELECT job_id, SUM(salary) FROM employees
GROUP BY job_id;
-- EXERCÍCIO 8
SELECT job_id, SUM(salary) FROM employees
GROUP BY job_id
HAVING job_id = 'IT_PROG';
-- EXERCÍCIO 9
SELECT job_id, AVG(salary) AS avg_sal FROM employees
GROUP BY job_id
HAVING job_id <> 'IT_PROG'
ORDER BY avg_sal DESC;
-- EXERCÍCIO 10
SELECT * FROM employees;
SELECT department_id,
COUNT(*) AS employees_numb,
AVG(salary) FROM employees
GROUP BY department_id
HAVING employees_numb > 10;
-- EXERCÍCIO 11
SET SQL_SAFE_UPDATES = 0;
UPDATE employees
SET phone_number = REPLACE(phone_number,'515','777')
WHERE phone_number LIKE '515%';
SET SQL_SAFE_UPDATES = 1;
SELECT * FROM employees;
-- EXERCÍCIO 12
SELECT * FROM employees
WHERE CHAR_LENGTH(first_name) >= 8;
-- EXERCÍCIO 13
SELECT employee_id, first_name, YEAR(hire_date) AS hire_year FROM employees;
-- EXERCÍCIO 14
SELECT employee_id, first_name, DAY(hire_date) AS hire_day FROM employees;
-- EXERCÍCIO 15
SELECT employee_id, first_name, MONTH(hire_date) AS hire_month FROM employees;
-- EXERCÍCIO 16
SELECT UCASE(CONCAT(first_name, ' ', last_name)) FROM employees;
-- EXERCÍCIO 17
SELECT last_name, hire_date FROM employees
WHERE hire_date LIKE '1987-07%';
-- EXERCÍCIO 18
SELECT first_name, last_name, DATEDIFF(CURRENT_DATE(),hire_date) AS days_worked FROM employees;