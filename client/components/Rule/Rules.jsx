import React, { Component } from 'react';
import RuleDetails from './RuleDetails.jsx';
import { connect } from 'react-redux';
import { selectRules } from '../../actions/rules'
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import "./Rules.css"
import Overview from './overview'


class Rules extends Component {
	constructor(props){
		super(props)
	}
	
	render() {

		return (
			<div id="ruleContainer">
				<div className="rules">
					<div className="rulesCols">
						<div>
							<iframe id="video"  allowfullscreen="allowfullscreen" width="560" height="315" src="https://www.youtube.com/embed/fqxIrmdtLEk?autoplay=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
							<Overview />
						</div>
							<div>
								<RuleDetails />
							</div>
					</div>

					
						<input type="button" id="rulesBtn" className="btn btn-primary" value="Back to Home" onClick={()=> this.props.selectRules(null)} />

				</div>
			</div>
		)
	}
}
function mapStateToProps(state) {
	return {
			activeRules : state.rules,
	};
}

function matchDispatchToProps(dispatch){
	//when selected card is called, passed to all reducers
	return bindActionCreators( { selectRules: selectRules }, dispatch)
}

// conversion from "dumb" component to "container"

export default connect(mapStateToProps, matchDispatchToProps)(Rules);
