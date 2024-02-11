import React, { useContext, useState, useEffect } from 'react';
import { ImageType } from '../types';
import { LocationContext } from '../api/location';
import { useTheme } from 'react-native-paper';
import { convertHealthAssessmentToPortugueseBrasilian, convertDate } from '../utils';
import { plantHealth } from '../api/plant_id';
import { CameraOrGallery } from '../components/CameraOrGallery';
import { HealthAssessment } from '../api/plant_id/types';
import { ActivityIndicator, Card, Chip, HelperText, List, Text, Avatar } from 'react-native-paper';
import { ScrollView, View, StyleSheet, Dimensions, Image } from 'react-native';
import { Treatment } from '../api/plant_id/types';
import { AntDesign } from '@expo/vector-icons';
import { updateDiseaseCurrentMetricsFromAnalysis } from '../utils/currentMetrics';
import { PlantContext } from '../context';
import { getImages, getOne, storeImage } from '../storage';
import Carousel from 'react-native-reanimated-carousel';

export function Analysis() {
	const [images, setImages] = useState<ImageType[]>([]);
	const [buttonOnHold, setButtonOnHold] = useState<boolean>(false);
	const [visibleAlert, setVisibleAlert] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const plantContext = useContext(PlantContext);
	const [result, setResult] = React.useState<HealthAssessment>(null);
	const [loading, setLoading] = useState(false);
	const locationContext = useContext(LocationContext);
	const theme = useTheme();

	useEffect(() => {
		const loadResult = async () => {
			setLoading(true);
			const id = `@${plantContext.plant.id}`;
			const plant = await getOne(id);
			const today = convertDate(new Date());
			const images: ImageType[] =
				(await getImages(plantContext.plant.id)).map((i) => ({ base64: i })) || [];

			console.log(`Loaded images: ${images.length}`);

			if (plant?.current?.health_assessment_date) {
				if (today == convertDate(plant?.current?.health_assessment_date)) {
					setResult(plant?.current?.health_assessment);
					setImages(images);
				}
			}
			setLoading(false);
		};
		loadResult();
	}, []);

	const width = Dimensions.get('window').width;

	const searchPlants = async () => {
		if (!buttonOnHold) {
			setButtonOnHold(true);
			try {
				const base64Images = images.map((i) => i.base64);
				await Promise.all(
					base64Images.map(async (b64) => await storeImage(plantContext.plant.id, b64))
				);

				console.log(`urls ${JSON.stringify(images.map((i) => i.uri))}`);

				const result = await plantHealth(
					base64Images,
					locationContext.latitude,
					locationContext.longitude
				);

				if (result.is_plant) {
					const translated_response = await convertHealthAssessmentToPortugueseBrasilian(
						result.health_assessment
					);
					setResult(translated_response);
					updateDiseaseCurrentMetricsFromAnalysis(plantContext.plant.id, translated_response);
				} else {
					throw new Error('Nenhuma planta foi encontrada');
				}
			} catch (error) {
				setErrorMessage(error.message);
				setVisibleAlert(true);
				setImages([]);
			} finally {
				setButtonOnHold(false);
			}
		}
	};

	return (
		<>
			{loading ? (
				<ActivityIndicator animating={true} />
			) : !result ? (
				<CameraOrGallery
					description="Adicione algumas fotos para podermos analisar a sua plantinha!"
					searchPlants={searchPlants}
					images={images}
					setImages={setImages}
					loading={buttonOnHold}
					errorMessage={errorMessage}
					setErrorMessage={setErrorMessage}
					visibleAlert={visibleAlert}
					setVisibleAlert={setVisibleAlert}
				/>
			) : !result.is_healthy ? (
				<ScrollView>
					<Carousel
						pagingEnabled={true}
						snapEnabled={true}
						mode={'horizontal-stack'}
						modeConfig={{
							snapDirection: 'left',
						}}
						loop={true}
						width={width}
						height={120}
						data={images}
						renderItem={({ item }) => {
							const uri = `data:image/jpg;base64,${item.base64}`;
							return <Image source={{ uri: uri }} style={styles.image} />;
						}}
					/>
					<AntDesign
						name="frowno"
						size={24}
						color={theme.colors.onBackground}
						style={{ alignSelf: 'center' }}
					/>
					<Text
						variant="titleMedium"
						style={{ alignSelf: 'center', textAlign: 'center', margin: 10 }}>
						Oops! Sua plantinha não parece muito bem. Confira abaixo as possíveis causas!
					</Text>
					<View>
						<List.AccordionGroup>
							{result.diseases.map((disease) => (
								<List.Accordion
									key={disease.entity_id}
									title={disease.name}
									id={disease.entity_id}
									left={() => <Avatar.Text label={disease.name[0]} size={40} />}
									description={`Probabilidade de acerto: ${disease.probability.toFixed(
										2
									)}`}>
									<DescriptionSection description={disease.disease_details.description} />
									<TreatmentSection treatment={disease.disease_details.treatment} />
									<ClassificationSection
										classification={disease.disease_details.classification}
									/>
									<CommonNamesSection commonNames={disease.disease_details.common_names} />
								</List.Accordion>
							))}
						</List.AccordionGroup>
					</View>
				</ScrollView>
			) : (
				<Text> Parabens sua planta ta bem</Text>
			)}
		</>
	);
}

const DescriptionSection = ({ description }: { description: string }) => {
	return (
		<>
			<Text variant={'titleMedium'} style={{ marginHorizontal: 20 }}>
				Descrição
			</Text>
			<HelperText style={{ marginHorizontal: 30 }} type={'info'}>
				{description}
			</HelperText>
		</>
	);
};

const ListPossibilities = ({ name, possibilities }: { name: string; possibilities: string[] }) => {
	if (!possibilities || possibilities.length === 0 || !Array.isArray(possibilities)) {
		return null;
	}

	return (
		<List.AccordionGroup>
			<List.Accordion id={name} title={name} style={{ marginHorizontal: 20 }}>
				<PossibilityCards possibilities={possibilities} />
			</List.Accordion>
		</List.AccordionGroup>
	);
};

const PossibilityCards = ({ possibilities }: { possibilities: string[] }) => {
	return (
		<>
			{possibilities &&
				possibilities.map((possibilities) => (
					<Card key={possibilities} style={{ marginVertical: 5, marginHorizontal: 20 }}>
						<Card.Title
							title=""
							subtitleNumberOfLines={20}
							subtitle={possibilities}
							subtitleVariant="labelSmall"
							rightStyle={{ margin: 0, padding: 0, paddingBottom: 25, marginRight: 10 }}
						/>
					</Card>
				))}
		</>
	);
};

const TreatmentSection = ({ treatment }: { treatment: Treatment }) =>
	(treatment?.biological || treatment?.chemical) && (
		<>
			<Text variant={'titleMedium'} style={{ marginHorizontal: 20 }}>
				Tratamento
			</Text>
			<ListPossibilities name="Biológico" possibilities={treatment.biological} />
			<ListPossibilities name="Químico" possibilities={treatment.chemical} />
			<ListPossibilities name="Prevenção" possibilities={treatment.prevention} />
		</>
	);

const ClassificationSection = ({ classification }: { classification: string[] }) => {
	if (!classification || classification.length === 0 || !Array.isArray(classification)) {
		return null;
	}

	return (
		<>
			<Text variant={'titleMedium'} style={{ marginHorizontal: 20 }}>
				Classificação
			</Text>
			<View style={styles.chipsContainer}>
				{classification?.map((cls) => (
					<Chip key={cls} style={styles.chip}>
						{cls}
					</Chip>
				))}
			</View>
		</>
	);
};

const CommonNamesSection = ({ commonNames }: { commonNames: string[] }) => {
	if (!commonNames || commonNames.length === 0 || !Array.isArray(commonNames)) {
		return null;
	}

	return (
		<>
			<Text variant={'titleMedium'} style={{ marginHorizontal: 20 }}>
				Nomes Comuns
			</Text>
			<View style={styles.chipsContainer}>
				{commonNames.map((name) => (
					<Chip key={name} style={styles.chip}>
						{name}
					</Chip>
				))}
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	chipsContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginTop: 8,
		justifyContent: 'flex-start',
		marginHorizontal: 20,
	},
	chip: {
		margin: 4,
	},
	image: {
		width: '40%',
		height: 100,
		borderRadius: 10,
		alignSelf: 'center',
	},
});
