import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import {
	CodeField,
	Cursor,
	useBlurOnFulfill,
	useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { Text, useTheme, FAB } from 'react-native-paper';
import { CELL_COUNT } from '../utils/defaults';
import { CodeProps } from '../types/index';
import { PlantContext } from '../context';
import { storeData } from '../storage/index';

export function Code({ navigation }: CodeProps) {
	const [value, setValue] = useState('');
	const [visible, setVisible] = React.useState<boolean>(false);
	const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
	const [props, getCellOnLayoutHandler] = useClearByFocusCell({
		value,
		setValue,
	});

	const theme = useTheme();
	const plantContext = useContext(PlantContext);

	useEffect(() => {
		if (plantContext.plant && plantContext.plant.code) {
			storeData(plantContext.plant);
		}
	}, [plantContext.plant]);

	const onPress = () => {
		plantContext.updatePlantCode(value);
		navigation.navigate('Home');
	};

	return (
		<View style={styles.container}>
			<View style={styles.row}>
				<Text variant="titleMedium" style={{ textAlign: 'center' }}>
					{' '}
					Digite o código do componente
				</Text>
				<CodeField
					ref={ref}
					{...props}
					value={value}
					onChangeText={setValue}
					cellCount={CELL_COUNT}
					rootStyle={styles.codeFieldRoot}
					keyboardType="numeric"
					textContentType="oneTimeCode"
					onEndEditing={onPress}
					testID="code-field"
					renderCell={({ index, symbol, isFocused }) => (
						<Text
							key={index}
							style={[themedStyles(theme).cell, isFocused && themedStyles(theme).focusCell]}
							onLayout={getCellOnLayoutHandler(index)}>
							{symbol || (isFocused ? <Cursor /> : null)}
						</Text>
					)}
				/>
			</View>
			{value.length >= 6 && (
				<FAB
					icon="arrow-right"
					label={visible ? 'Continuar' : ''}
					onPress={onPress}
					style={[styles.compressedFabStyle]}
					variant="primary"
					onLongPress={() => setVisible(!visible)}
					testID="Code Continue"
				/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	row: {
		flex: 0.5,
		flexDirection: 'column',
		justifyContent: 'center',
		padding: 40,
	},
	fabVariant: {
		marginVertical: 20,
	},
	compressedFabStyle: {
		position: 'absolute',
		margin: 40,
		right: 0,
		bottom: 0,
	},
	codeFieldRoot: { margin: 20, display: 'flex', minWidth: '50%', alignSelf: 'center' },
});

const themedStyles = (theme) =>
	StyleSheet.create({
		focusCell: {
			borderColor: theme.colors.secondaryContainer,
		},
		cell: {
			maxWidth: 40,
			width: '15%',
			height: 50,
			lineHeight: 38,
			fontSize: 24,
			borderWidth: 2,
			borderColor: theme.colors.outline,
			borderRadius: 10,
			textAlign: 'center',
		},
	});
