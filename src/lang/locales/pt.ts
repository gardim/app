export default {
	Notifications: 'Notificações',
	Plans: 'Planos',
	'Add your first plant': 'Adicione sua primeira planta',
	'Add your first device': 'Adicione seu primeiro dispositivo',
	Add: 'Adicionar',
	'My Plants': 'Minhas Plantas',
	'Login with Google': 'Login com Google',
	'nothing to show': 'Parece que não temos nada para mostrar aqui...',
	Continue: 'Continuar',
	or: 'ou',
	Search: 'Search',

	components: {
		return: {
			confirmation: 'Tem certeza que quer sair? Todos os dados serão perdidos.',
		},
	},

	routes: {
		notifications: 'Notificações',
		myPlants: 'Minhas Plantas',
		myDevices: 'Meus Dispositivos',
		home: 'Início',
		login: 'Login',
		configurations: 'Configurações',
	},

	identificationMethod: {
		title: 'Adicione uma planta',
		subtitle: 'Método de identificação',
		explanation: 'Selecione o método que deseja seguir para identificar sua planta',
		image: 'Identificar por imagem',
		text: 'Identificar por texto',
	},

	textMethod: {
		title: 'Adicione uma planta',
		subtitle: 'Identificação por texto',
		explanation: 'Digite algumas palavras que irão nos ajudar a encontrar sua planta',
		tip: 'Pressione enter ou espaço para dividir as palavras',
	},

	imageMethod: {
		title: 'Adicione uma planta',
		subtitle: 'Identificação por imagem',
		explanation: 'Adicione algumas imagens para podermos identificar sua planta.',
		camera: 'Tire uma foto',
		gallery: 'Adicione da galeria',
	},

	reset: {
		title: 'Adicione um dispositivo',
		subtitle: 'Iniciar pareamento',
		explanation:
			'Ligue o dispositivo e segure o botão de ligar. Confirme que a luz está piscando.',
		checkbox: 'A luz está piscando',
	},

	configurations: {
		General: 'Geral',
		Account: 'Conta',
		theme: {
			true: 'escuro',
			false: 'claro',
			title: 'Tema',
		},
		notifications: {
			title: 'Notificações',
			true: 'ligado',
			false: 'desligado',
		},
		pro: {
			title: 'Gardim Pro',
			description: 'Os melhores benefícios para o cuidado com sua planta',
		},
		terms: {
			title: 'Termos de Uso',
			description: 'Entenda para que usamos os seus dados',
		},
		logout: {
			title: 'Sair',
			description: 'Entre com outra conta',
		},
	},
};
