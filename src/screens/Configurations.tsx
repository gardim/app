import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Dialog, Portal, Text, Button, TextInput } from 'react-native-paper';

export function Configurations() {
	const [editVisible, setEditVisible] = React.useState(false);
	const [deleteVisible, setDeleteVisible] = React.useState(false);
	const [text, setText] = React.useState('');

	const showEditDialog = () => setEditVisible(true);
	const hideEditDialog = () => setEditVisible(false);

	const showDeleteDialog = () => setDeleteVisible(true);
	const hideDeleteDialog = () => setDeleteVisible(false);

	const handleOnEdit = async () => {
		hideEditDialog();
	};
	const handleOnDelete = () => {};

	return (
		<View style={{ flex: 1 }}>
			<Portal>
				<Dialog visible={editVisible} onDismiss={hideEditDialog}>
					<Dialog.Title style={styles.title}>Editar</Dialog.Title>
					<Dialog.Content>
						<Text variant="titleMedium" style={{ textAlign: 'center', margin: 20 }}>
							Dê um nome à sua planta!
						</Text>
						<TextInput
							mode="flat"
							value={text}
							onChangeText={(text) => setText(text)}
							testID="input-nome"
						/>
					</Dialog.Content>
					<Dialog.Actions>
						<Button onPress={handleOnEdit}>Done</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>
			<Portal>
				<Dialog visible={deleteVisible} onDismiss={hideDeleteDialog}>
					<Dialog.Icon icon="alert" />
					<Dialog.Title style={styles.title}>Cuidado</Dialog.Title>
					<Dialog.Content>
						<Text style={{ textAlign: 'center' }} variant="bodyMedium">
							Você está prestes a deletar todos os dados relacionados à essa planta. Você tem
							certeza?
						</Text>
					</Dialog.Content>
					<Dialog.Actions>
						<Button onPress={hideDeleteDialog}>Cancelar</Button>
						<Button onPress={handleOnDelete}>Prosseguir</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>
			<List.Item
				title="Editar nome"
				description="Aqui você pode alterar o nome da sua plantinha"
				titleStyle={{ fontSize: 18, fontWeight: 'bold' }}
				left={(props) => <List.Icon {...props} icon="pencil-outline" />}
				onPress={showEditDialog}
			/>
			<List.Item
				title="Apagar"
				description="Todos os dados relacionados a essa planta serão removidos"
				titleStyle={{ fontSize: 18, fontWeight: 'bold' }}
				left={(props) => <List.Icon {...props} icon="trash-can" />}
				onPress={showDeleteDialog}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	title: {
		textAlign: 'center',
	},
});
