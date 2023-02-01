from unittest.mock import patch
import pytest
from _pytest.outcomes import Failed
from tests.encrypt import mocks
from challenges.challenge_encrypt_message import encrypt_message
from tests.marker import mark_dependency, mark_xfail

mocked_tests = [
    "test_encrypt_message[encrypt_reversed_mod]",
    "test_encrypt_message[encrypt_any_range_for_key]",
    "test_encrypt_message[encrypt_sorted_cresc_not_reversed]",
    "test_encrypt_message[encrypt_sorted_decresc_not_reversed]",
    "test_encrypt_message[encrypt_no_type_validation]",
]


mocking = [
    mark_xfail(mocks.encrypt_reversed_mod),
    mark_xfail(mocks.encrypt_any_range_for_key),
    mark_xfail(mocks.encrypt_sorted_cresc_not_reversed),
    mark_xfail(mocks.encrypt_sorted_decresc_not_reversed),
    mark_xfail(mocks.encrypt_no_type_validation, expected=Failed),
    mark_dependency(encrypt_message, mocked_tests),
]


@pytest.fixture(autouse=True, params=mocking)
def mock_it(request):
    with patch("tests.encrypt.test_encrypt.encrypt_message", request.param):
        yield
