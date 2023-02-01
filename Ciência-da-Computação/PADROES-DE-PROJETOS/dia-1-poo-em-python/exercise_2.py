class Estatistica:
    @classmethod
    def media(cls, numbers):
        return sum(numbers) / len(numbers)

    @classmethod
    def mediana(cls, numbers):
        numbers.sort()
        index = len(numbers) // 2
        if len(numbers) % 2 == 0:
            return (numbers[index - 1] + numbers[index]) / 2
        return numbers[index]

    @classmethod
    def moda(cls, numbers):
        frequencies = {}
        moda = 0
        frequent = 0

        for number in numbers:
            if number not in frequencies:
                frequencies[number] = 0
            frequencies[number] += 1
        for number, frequency in frequencies.items():
            if frequency > frequent:
                frequent = frequency
                moda = number
        return moda
