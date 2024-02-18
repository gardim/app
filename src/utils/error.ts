import { AxiosError } from 'axios';

export type ApiError = {
	error: string;
	status?: number;
	errors?: {
		code?: string;
		name?: string;
		field?: string;
		message?: string;
	}[];
};

export type RequestError = Error | AxiosError<ApiError>;

export const handleApiError = (receivedError: RequestError): ApiError => {
	if ('response' in receivedError) {
		if (receivedError.response === undefined) {
			const newData = receivedError.toJSON() as Error;
			if (newData.message === 'Network Error') {
				return {
					error: 'Verifique sua conexão com a internet.',
				};
			}
			console.error(
				'Error without a message. User will not have the correct feedback',
				receivedError
			);
			return {
				error: 'Ocorreu um erro ao enviar a requisição.',
			};
		}
		const { data } = receivedError.response;

		const userErrors = [400, 401, 402, 403];

		if (!data.status || userErrors.indexOf(data.status) < 0) {
			console.error(data.error, receivedError);
		} else {
			console.warn(
				'This is an user error, so will not being send to Rollbar, but check if the user received a friendly message',
				data
			);
		}

		return data;
	} else {
		if (receivedError.message) {
			console.error(receivedError);
		} else {
			console.error(
				'Error without a message. User will not have the correct feedback',
				receivedError
			);
		}
		return { error: receivedError.message || 'Erro de requisição' };
	}
};

export const getMessageFromStatusCode = (statusCode) => {
	let message = 'Aconteceu um problema'; // Default message

	if (statusCode === 404) {
		message = 'Não encontramos o que você está procurando';
	} else if (statusCode === 500) {
		message = 'Aconteceu um problema. \nPor favor, recarregue ou tente novamente mais tarde.';
	} else {
		console.log(`Status Code ${statusCode} is showing a generic message to the user`, {
			method: 'getMessageFromStatusCode',
		});
	}

	return message;
};
