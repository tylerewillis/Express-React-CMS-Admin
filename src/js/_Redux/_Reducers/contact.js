import * as ContactActionTypes from '../_Actiontypes/contact'
import Data from '../../_Components/_FormData/Render-General.js'

const initialState = Data.FormState

export default function Contact(state = initialState, action) {
	switch(action.type) {
		case ContactActionTypes.UPDATE_VALUE:
			if (action.inputType === 'checkbox') {
				if (state[action.name] === null || state[action.name] === false) state[action.name] = true
				else state[action.name] = false
			} else state[action.name] = action.value
			return Object.assign({}, state)
		default:
			return state
	}
}