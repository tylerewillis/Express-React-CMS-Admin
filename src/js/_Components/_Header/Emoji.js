const emojis = [
	'🙂',
	'😃',
	'😁',
	'👋',
	'👍',
	'⭐️',
	'🏆',
	'🚀',
	'💻',
	'💡',
	'🕯',
	'💈',
	'📈'
]

const getEmoji = () => {
	const rand = Math.floor(Math.random() * emojis.length)
	return emojis[rand]
}

export default getEmoji()