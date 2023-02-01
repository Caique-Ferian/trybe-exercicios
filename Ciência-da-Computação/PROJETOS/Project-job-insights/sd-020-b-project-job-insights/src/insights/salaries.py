from typing import Union, List, Dict

from src.insights.jobs import read


def get_max_salary(path: str) -> int:
    file_list = read(path)
    max_salary = 0
    for item in file_list:
        if item["max_salary"].isdigit():
            salary = int(item["max_salary"])
            if salary > max_salary:
                max_salary = salary
    return max_salary


def get_min_salary(path: str) -> int:
    file_list = read(path)
    min_salary = 10000000000
    for item in file_list:
        if item["min_salary"].isdigit():
            salary = int(item["min_salary"])
            if salary < min_salary:
                min_salary = salary
    return min_salary


def matches_salary_range(job: Dict, salary: Union[int, str]) -> bool:
    try:
        if (
            "max_salary" in job
            and "min_salary" in job
            and str(salary).lstrip("-").isdigit()
            and str(job["max_salary"]).lstrip("-").isdigit()
            and str(job["min_salary"]).lstrip("-").isdigit()
            and int(str(job["max_salary"])) > int(str(job["min_salary"]))
        ):
            if (
                int(str(job["min_salary"]))
                <= int(salary)
                <= int(str(job["max_salary"]))
            ):
                return True
            return False
        raise ValueError
    except ValueError:
        raise ValueError("Algum dos valores não é um número")


def filter_by_salary_range(
    jobs: List[dict], salary: Union[str, int]
) -> List[Dict]:
    job_list = []
    if str(salary).lstrip("-").isdigit():
        for job in jobs:
            if (
                str(job["max_salary"]).lstrip("-").isdigit()
                and str(job["min_salary"]).lstrip("-").isdigit()
                and int(str(job["max_salary"])) > int(str(job["min_salary"]))
                and matches_salary_range(job, salary) is True
            ):
                job_list.append(job)
    return job_list
