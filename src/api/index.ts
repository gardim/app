import { setData, setError } from '../redux/reducers';

const mockPlants = [];

for (let i = 1; i <= 20; i++) {
	mockPlants.push({
		id: `${i}`,
		name: `Plant ${i}`,
		code: `CODE00${i}`,
		common_name: `Common Name ${i}`,
		scientific_name: `Scientific Name ${i}`,
		edible_parts: [`Edible Part ${i}`],
		ph_maximum: 7,
		ph_minimum: 5,
		light_minimum: 5000,
		light_maximum: 10000,
		atmospheric_humidity_minimum: 40,
		atmospheric_humidity_maximum: 70,
		temperature_minimum: 18,
		temperature_maximum: 25,
		soil_humidity_minimum: 30,
		soil_humidity_maximum: 60,
	});
}

export const fetchData = () => async (dispatch) => {
	try {
		dispatch(setData(mockPlants));
	} catch (error) {
		console.error('Error fetching data: ', error);
		dispatch(setError('Error fetching data'));
	}
};
