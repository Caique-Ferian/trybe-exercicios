from functools import lru_cache
from typing import List, Dict
import csv


@lru_cache
def read(path: str) -> List[Dict]:
    with open(path) as file:
        file_dict = csv.DictReader(file)
        # file_list = [item for item in file_dict]
        # return file_list
        return list(file_dict)


def get_unique_job_types(path: str) -> List[str]:
    file_list = read(path)
    jobs_list = []
    for item in file_list:
        if item["job_type"] not in jobs_list:
            jobs_list.append(item["job_type"])
    return jobs_list


def filter_by_job_type(jobs: List[Dict], job_type: str) -> List[Dict]:
    return [items for items in jobs if items["job_type"] == job_type]
