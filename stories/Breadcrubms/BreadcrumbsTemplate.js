import React, {PropTypes, Component} from 'react';
import reactElementToJSXString from 'react-element-to-jsx-string';

import Breadcrumbs from '../../src/Breadcrumbs/Breadcrumbs';

export default class Form extends Component {
	
	static propTypes = {
		onChange: PropTypes.func.isRequired,
		size: React.PropTypes.oneOf(['medium', 'large']),
		theme: React.PropTypes.oneOf(['onWhiteBackground', 'onGrayBackground', 'onDarkBackground'])
	};
	
	componentDidUpdate(props) {
		props.onChange(reactElementToJSXString(this.getComponent()));
	}
	
	componentDidMount() {
		this.props.onChange(reactElementToJSXString(this.getComponent()));
	}
	
	getComponent() {
		return (
				<Breadcrumbs items={[{id: '1', value: 'First item'}, {id: '2', value: 'Second item'}, {id: '3', value: 'Third item'}]} activeId={'3'}  size={this.props.size} theme={this.props.theme}>
				</Breadcrumbs>
		);
	}
	
	render() {
		return this.getComponent();
	}
}