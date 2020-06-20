import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import { listSections } from './constants';

import { faTable } from '@fortawesome/free-solid-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';

import FullSection from './components/FullSection/FullSection';
import Panel from './components/Panel/Panel';
import Header from './components/Header/Header';
import Datatable from './containers/DataTable';
import Homepage from './containers/Homepage';

import * as actions from './store/actions';
import { updateAppState } from './store/actions';

//import styles
import './App.scss';

class App extends React.Component {
	componentDidMount = () => {
		this.props.getData();
	};

	changeSection = (newSection) => {
		const { history, changePage } = this.props;
		changePage(newSection);
		history.push(newSection);
	};

	render() {
		const { page } = this.props;
		return (
			<div className="App">
				<Header />
				<div className="applicationBody">
					<Panel list={listSections} changeSection={this.changeSection} page={page} />
					<div className="applicationSection">
						<Switch>
							<Route
								exact
								path="/bootstrapTable"
								component={() => (
									<FullSection
										iconTitle={faTable}
										title="Bootstrap Table"
										sectionComponent={<Datatable />}
									/>
								)}
							/>
							<Route
								exact
								path="/home"
								component={() => (
									<FullSection iconTitle={faHome} title="Homepage" sectionComponent={<Homepage />} />
								)}
							/>
							<Redirect to="/home" />
						</Switch>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	page: state.app.page
});

const mapDispatchToProps = (dispatch) => {
	return {
		getData: () => {
			dispatch(actions.getDataInit());
		},
		changePage: (newPage) => {
			dispatch(updateAppState(newPage));
		}
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
