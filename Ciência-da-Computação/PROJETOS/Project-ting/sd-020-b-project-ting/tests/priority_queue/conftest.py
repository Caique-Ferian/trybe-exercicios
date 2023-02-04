from unittest.mock import patch
import pytest
from _pytest.outcomes import Failed
from tests.priority_queue import mocks
from tests.priority_queue.test_priority_queue import (
    test_basic_priority_queueing,
)
from ting_file_management.priority_queue import PriorityQueue
from pytest_dependency import build_mocked_assets


mocked_assets = build_mocked_assets(
    mocks_module=mocks,
    asset_to_mock=PriorityQueue,
    test_function=test_basic_priority_queueing,
    custom_exceptions={mocks._TestSearchShouldRaiseIndexError: Failed},
)


@pytest.fixture(params=mocked_assets, autouse=True)
def mock_it(request):
    with patch(
        "tests.priority_queue.test_priority_queue.PriorityQueue", request.param
    ):
        yield
