const services = require('./services');
describe("Testando funções do services", () => {
    it("Verifica se a função randomNumbers retorna algum valor", () => {
        services.randomNumbers = jest.fn().mockReturnValue(10);
        expect(services.randomNumbers()).toBe(10);
        expect(services.randomNumbers).toHaveBeenCalled();
        expect(services.randomNumbers).toHaveBeenCalledTimes(1);

    });
    it("Mocka a função randomNumbers transformando ela em uma função de divisão", () => {
        services.randomNumbers = jest.fn().mockImplementation((a, b) => a / b);
        expect(services.randomNumbers(8,2)).toBe(4);
        expect(services.randomNumbers).toHaveBeenCalledTimes(1);
        expect(services.randomNumbers).toHaveBeenCalledWith(8,2)

    });
    it("Mocka a função randomNumbers transformando ela em uma função de multiplicação", () => {
        services.randomNumbers.mockReset();
        services.randomNumbers = jest.fn().mockImplementation((a, b, c) => a * b * c);
        expect(services.randomNumbers(2,3, 4)).toBe(24);
        expect(services.randomNumbers).toHaveBeenCalledTimes(1);
        expect(services.randomNumbers).toHaveBeenCalledWith(2,3, 4)

    });

    it("Mocka a função randomNumbers transformando ela em uma função que dobra um número", () => {
        services.randomNumbers.mockReset();
        services.randomNumbers = jest.fn().mockImplementation((a) => a * 2);
        expect(services.randomNumbers(2)).toBe(4);
        expect(services.randomNumbers).toHaveBeenCalledTimes(1);
        expect(services.randomNumbers).toHaveBeenCalledWith(2)

    });

    it("Mocka a função upperCase para converter string para lower case", () => {
        const lowerCase = jest.spyOn(services, 'upperCase').mockImplementation((str) => str.toLowerCase());
        expect(lowerCase('TESTE')).toBe('teste');
        expect(lowerCase).toHaveBeenCalledTimes(1);
        expect(lowerCase).toHaveBeenCalledWith('TESTE');

    });
    it("Mocka a função firstLetter para retornar a última letra da string", () => {
        const lastLetter = jest.spyOn(services, 'firstLetter').mockImplementation((str) => str.split('')[str.length - 1]);
        expect(lastLetter('letra')).toBe('a');
        expect(lastLetter).toHaveBeenCalledTimes(1);
        expect(lastLetter).toHaveBeenCalledWith('letra')

    });
    it("Mocka a função stringConcat para retornar a concatenação de 3 strings", () => {
        services.stringConcat = jest.fn().mockImplementation((str1,str2,str3) => str1.concat(str2,str3));
        expect(services.stringConcat('tr','y','be')).toBe('trybe');
        expect(services.stringConcat).toHaveBeenCalledTimes(1);
        expect(services.stringConcat).toHaveBeenCalledWith('tr','y','be')

    });
    it("Restaurando a função upperCase", () => {
        services.upperCase.mockRestore();
        expect(services.upperCase('uppercase')).toBe('UPPERCASE');
    });
});
describe("Testando requisição", () => {
    it("Mocka a requisição com valor Sucess",async () => {
    services.fetchDog = jest.fn().mockResolvedValue("request sucess")
    await expect(services.fetchDog()).resolves.toBe("request sucess")
    expect(services.fetchDog).toHaveBeenCalledTimes(1);
    });
    it("Mocka a requisição com valor Fail",async () => {
        services.fetchDog = jest.fn().mockRejectedValue("request failed")
        await expect(services.fetchDog()).rejects.toBe("request failed")
        expect(services.fetchDog).toHaveBeenCalledTimes(1);
        });
});