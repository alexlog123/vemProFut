export class Usuario{
    id: string;
    nome : string;
    dataNascimento : string;
    sexo : string;
    telefone : string;
    email: string;

    constructor(){}

    setDados(obj : any){
        this.nome = obj.nome;
        this.dataNascimento = obj.dataNascimento;
        this.sexo = obj.sexo;
        this.telefone = obj.telefone;
        this.email = obj.email;
    }
}