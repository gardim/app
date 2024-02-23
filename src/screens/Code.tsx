import { useState } from 'react';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { CodeField, Cursor, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { Text, FAB, Button } from 'react-native-paper';

export function Code() {
	const [value, setValue] = useState('');
	const [visible, setVisible] = React.useState<boolean>(false);
	const [props, getCellOnLayoutHandler] = useClearByFocusCell({
		value,
		setValue,
	});

	return (
		<View style={styles.container}>
			<View style={styles.row}>
				<Text variant="titleMedium" style={{ textAlign: 'center' }}>
					{' '}
					Digite o código do componente
				</Text>
				<CodeField
					{...props}
					value={value}
					onChangeText={setValue}
					rootStyle={styles.codeFieldRoot}
					keyboardType="numeric"
					textContentType="oneTimeCode"
					testID="code-field"
					renderCell={({ index, symbol, isFocused }) => (
						<Text key={index} onLayout={getCellOnLayoutHandler(index)}>
							{symbol || (isFocused ? <Cursor /> : null)}
						</Text>
					)}
				/>
				<Text style={{ textAlign: 'center' }}>
					Não tem o dispositivo ainda? Clique
					<Button mode="text" style={{ margin: 0 }}>
						aqui
					</Button>
					para continuar sem adicionar.
				</Text>
			</View>
			{value.length >= 6 && (
				<FAB
					icon="arrow-right"
					label={visible ? 'Continuar' : ''}
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
