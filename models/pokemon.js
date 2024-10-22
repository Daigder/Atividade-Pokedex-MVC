class Pokemon {
    constructor(nome, tipo, altura, peso, nivelDePoder, imagem) {
        this.nome = nome;
        this.tipo = tipo;
        this.altura = altura;
        this.peso = peso;
        this.nivelDePoder = nivelDePoder;
        this.imagem = imagem;
    }

    descrever() {
        return `${this.nome} é um Pokémon do tipo ${this.tipo}, com altura de ${this.altura}m, peso de ${this.peso}kg, nível de poder: ${this.nivelDePoder}. Imagem: ${this.imagem}`;
    }
}

module.exports = Pokemon;

