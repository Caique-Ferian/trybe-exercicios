class Client {
    private _name: string;

    constructor(name: string) {
        this._name = name;
    }

    get name(): string { return this._name; }
}

class OrderItem {
    private _name: string;
    private _price: number;

    constructor(name: string, price: number) {
        this._name = name;
        this._price = price;
    }

    get name(): string { return this._name; }

    set name(product: string) { 
        if(product.length === 0 ) {
            throw new Error("Informe o nome do produto para cadastro");
        }
        this._name = product;
     }
    
    get price(): number { return this._price; }

    set price(price: number) { 
        if(price <= 0 ) {
            throw new Error("O preço deve ser maior que zero");
        }
        this._price = price;
    }
}

class Order {
    private _client: Client;
    private _listItens: OrderItem[];
    private _paymentMethod: string;
    private _discount: number;

    constructor(client: Client, listItens: OrderItem[], paymentMethod: string, discount: number) {
        this._client = client;
        this._listItens = listItens;
        this._paymentMethod = paymentMethod;
        this._discount = discount;
    }

    get client(): Client { return this._client; }

    get listItens(): OrderItem[] { return this._listItens; }

    set listItens(items: OrderItem[]) {
        if(items.length === 0) {
            throw new Error("Favor fornecer pelo menos 1 item para cadastro");
        }
        if(items.find(({name,price}) => name.length === 0 || price <= 0)) {
            throw new Error("Dados inválidos!");
        }
        this._listItens = items;
    }

    get paymentMethod(): string { return this._paymentMethod }

    set paymentMethod(method: string) {
        if(method.length === 0) {
            throw new Error("Favor fornecer um método de pagamento para cadastro");
        }
        this._paymentMethod = method;
    }

    get discount(): number { return this._discount }

    set discount(discount: number) {
        if(discount < 0) {
            throw new Error("Favor fornecer um desconto válido para cadastro");
        }
        this._discount = discount;
    }

    public calculateTotal(): number {
        return this._listItens.reduce((prevValue,item) => prevValue += item.price, 0);
    }

    public totalWithDiscount(): number {
        const calculateTotal = this.calculateTotal();
        return calculateTotal * (1 - this._discount);
    }
}

const client = new Client('João');

const sandwich = new OrderItem('Sanduíche Natural', 5.00);
const juice = new OrderItem('Suco de Abacaxi', 5.00);
const dessert = new OrderItem('Gelatina de Uva', 2.50);

const order = new Order(client, [sandwich, juice, dessert], 'dinheiro', 0.10);

console.log(order);
console.log('Valor normal: ', order.calculateTotal());
console.log('Valor com desconto: ', order.totalWithDiscount());