export interface ICondominio {
	Nome: string;
	RazaoSocial: string;
	CEP: string;
	Endereco: string;
	Bairro: string;
	Cidade: string;
	Estado: string;
	Pais: string;
}

export interface IBlocos {
	Nome: string;
}
export interface IApto {
	Condominio: string;
	Bloco: string;
	NroApto: string;
}

export interface IMoradores {
	Usuario: string;
	Senha: string;
	Nome: string;
	Sobrenome: string;
	Rg: string;
	Cpf: string;
	Email: string;
	DataNascimento: string;
	Telefone: string;
}

export interface IVotacao {
	Nome: string;
	Descricao: string;
	TipoVotacao: string;
	Opcoes: string[];
	DataInicial: string;
	DataFinal: string;
}

export interface IVeiculo {
	IdApto: string;
	Tipo: string;
	Marca: string;
	Modelo: string;
	Cor: string;
	Observacao: string;
}

export interface IArea {
	Nome: string;
	Descricao: string;
	Funcionalidade: string;
	Localizacao: string;
	Reservavel;
}
export interface INotificacao {
	Titulo: string;
	Descricao: string;
}

export interface IInadimplente {
	Bloco?: string;
	Apto?: string;
	Morador?: string;
	Nome?: string;
	Sobrenome?: string;
	Rg?: string;
	Cpf?: string;
	Dividas: any;
	Status: string;
	Tipo: string;
	Total: number;
}

export interface IManutencao {
	Assunto: string;
	Local: string;
	Descricao: string;
	Categoria: string;
	Imagem: string;
	DiaChamado: string;
	HoraChamado: string;
}

export interface IVisitantes {
	NomeCompleto: string;
	Telefone: string;
	DataNascimento: string;
	Cpf: string;
	Bloco: string;
	Apto: string;
	Morador: string;
	Observacao?: string;
	DataHoraChegada: string;
	DataHoraSaida?: string;
}

export interface IGastoGanho {
	Data: string;
	Descricao: string;
	Valor: string;
}
