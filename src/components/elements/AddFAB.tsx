import * as React from 'react';

import { FAB } from 'react-native-paper';
import { i18n } from '../../translations';

type AddFABProps = {
	absolute?: boolean;
	callback: () => void;
};

const AddFAB = ({ absolute, callback }: AddFABProps) => {
	const [visible, setVisible] = React.useState<boolean>(false);
	return (
		<FAB
			icon="plus"
			label={visible ? i18n.t('Add') : ''}
			onPress={callback}
			variant="primary"
			style={
				absolute && {
					position: 'absolute',
					margin: 16,
					right: 0,
					bottom: 0,
				}
			}
			onLongPress={() => setVisible(!visible)}
		/>
	);
};

export default AddFAB;
