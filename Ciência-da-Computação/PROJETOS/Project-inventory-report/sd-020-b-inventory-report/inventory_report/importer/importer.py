from abc import abstractmethod, ABC


class Importer(ABC):
    @staticmethod
    @abstractmethod
    def import_data(path):
        raise NotImplementedError
