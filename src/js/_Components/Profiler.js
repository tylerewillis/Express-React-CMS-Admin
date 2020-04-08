class Profiler extends React.Component {

	constructor(props) {
		super(props)
		this.handleProfile = this.handleProfile.bind(this)
	}

	handleProfile = (id, phase, actualDuration, baseDuration, startTime, commitTime, interactions) => {
		const profile = {
			id, phase, actualDuration, baseDuration, startTime, commitTime, interactions
		}

		console.log(profile)
	}

	render() {
		return (
			<React.Profiler id={this.props.location.pathname} onRender={this.handleProfile}>
				{this.props.children}
			</React.Profiler>
		)
	}
}

export default Profiler