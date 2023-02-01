from typing import List, Dict
from src.insights.jobs import read


def get_unique_industries(path: str) -> List[str]:
    file_list = read(path)
    industries_list = []
    for item in file_list:
        if item["industry"] not in industries_list:
            if len(item["industry"]) > 0:
                industries_list.append(item["industry"])
    return industries_list


def filter_by_industry(jobs: List[Dict], industry: str) -> List[Dict]:
    return [items for items in jobs if items["industry"] == industry]
