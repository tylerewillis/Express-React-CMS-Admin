import General from './General.json'

//================
//= Util for name formatting
//================

function nameToInputName(name) {
	const clean = name.replace(/[^a-zA-Z0-9 ]/g, '')
	var inputName = clean.replace(/ /gm, "_").toLowerCase()
	if (inputName.charAt(inputName.length) === '_') {
		inputName = inputName.slice(0, -1)
	}
	return inputName
}

//================
// Passing form data includes into data
//================

const data = [
	General
]

//================
// Setting initial variables
//================

var id = 0
var view = []
var state = []

//================
// Util for creating object
//================

const setObject = (node, id) => {
	var temp = {
		type: node.type,
		name: node.name,
		required: node.required ? node.required : false,
		inputName: id + '_' + nameToInputName(node.name)
	}
	if (node.options) temp.options = node.options
	if (node.description) temp.description = node.description
	if (node.display) temp.display = node.display
	if (node.margin) temp.margin = node.margin
	if (node.text) temp.text = node.text
	return temp
}

//================
// Looping through data and updating object
//================

data.forEach((section, i) => {
	let temp = []
	section.forEach((group, j) => {
		temp.push(setObject(data[i][j], id))
		state[id + '_' + nameToInputName(data[i][j].name)] = null
		id++
	})
	view.push(temp)
})

//================
// Setting returned object
//================

const Form = {
	FormInputs: view[0],
	FormState: state
}

export default Form