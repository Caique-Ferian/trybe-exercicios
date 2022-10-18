import { ICepAPI } from "./FooCepAPI";

export default class MockCepApi implements ICepAPI {
    async getAddressByCEP(cep: string = '13976-613', number: number = 50): Promise<string> {
        return `O endereço para o "CEP:${cep}, n°:${number}" é "endereço foo"`;
      }
    
      async getCepByAddress(address: string = '13976-613', number: number = 50): Promise<string> {
        return `O CEP para: "${address}, n°: ${number}" é "CEP baz"`;
      }
}