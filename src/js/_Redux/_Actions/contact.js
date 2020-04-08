import * as ContactActionTypes from '../_Actiontypes/contact'

export const updateValue = (name, inputType, value) => {
	return {
		type: ContactActionTypes.UPDATE_VALUE,
		name,
		inputType,
		value
	}
}