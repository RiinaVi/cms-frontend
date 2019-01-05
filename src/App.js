import React, { Component } from 'react';
import { Menu, Icon } from 'antd';

import {
  Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import history from './history';
import logo from './logo.svg';
import logouser from'./pages/UserProfilePage/user.svg'
import './App.css';
import { fetchGreeting } from './connect/connectService';


import AuthPage from './pages/AuthPage/index';
import AuthorsPage from './pages/AuthorsPage/index';
import ReviewersPage from './pages/ReviewersPage/index';
import UserPage from './pages/UserProfilePage/index';
//import UserPageEdit from './pages/UserProfilePage/UserPageEdit';
import Conference from './pages/ConferencePage/Conference';


const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class App extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			current: history.location.pathname,
		};
	}

	componentDidMount() {
		fetchGreeting().then(responseJson =>
			console.log(responseJson)
		);
	}
	
	handleClick = (e) => {
		this.setState({
		  current: e.key,
		});
	}

	render() {
		return (
		<Router history={history}>
			<div>
				<Menu
					onClick={this.handleClick}
					selectedKeys={[this.state.current]}
					mode="horizontal"
					style={styles.menu}
				>
					<Menu.Item key="/" style={styles.menuItem}>
						<Link to="/"><Icon type="mail" />Events</Link>
					</Menu.Item>
					<Menu.Item key="/authors" style={styles.menuItem}>
						<Link to="/authors"><Icon type="appstore" />Authors</Link>
					</Menu.Item>
					<Menu.Item key="/articles" style={styles.menuItem}>
						<Link to="/articles"><Icon type="appstore" />Articles</Link>
					</Menu.Item>
					<Menu.Item key="/reviewers" style={styles.menuItem}>
						<Link to="/reviewers"><Icon type="appstore" />Reviewers</Link>
					</Menu.Item>
					<Menu.Item key="/login" style={styles.menuItem}>
						<Link to="/login"><Icon type="appstore" />Login</Link>
					</Menu.Item>
					<Menu.Item key="/user" style={styles.menuItem}>
						<Link to="/user"><Icon type="appstore" />Username<img src={logouser} className="user-logo" alt="logo" /></Link>
					</Menu.Item>
				</Menu>
				<Route exact path="/" component={Events} />
				<Route path="/articles" component={Articles} />
				<Route path="/authors" component={AuthorsPage} />
				<Route path="/reviewers" component={ReviewersPage} />
				<Route path="/login" component={AuthPage} />
				<Route path="/user" component={UserPage} />
				{/* <Route path="/userEdit" component={UserPageEdit} /> */}
				<Route path="/register" component={() => <AuthPage register/>} />
				<Route path="/conference" component={Conference} />
			</div>
	  </Router>
		);
	}
}

function Events() {
  return (
    <div>
      <h2>Event</h2>
    </div>
  );
}

function Articles() {
  return (
    <div>
      <h2>Articles</h2>
    </div>
  );
}

function Reviewers() {
  return (
    <div>
      <h2>Reviewers</h2>
    </div>
  );
}

const styles = {};

styles.menu = {

}

styles.menuItem1 = {
	//marginLeft: "260px",
	paddingLeft: "70px",
	paddingRight: "70px"
}

styles.menuItem = {
	paddingLeft: "65px",
	paddingRight: "65px"
}

styles.nav = {
  padding: 0,
  margin: 0,
  marginLeft: "350px",
  marginTop: "20px",
  height: "50px",
  width: "100px",
  display: "flex"
};

styles.li = {
  marginRight: "150px",
  listStyleType: "none"
};

styles.login = {
	width: "400px",
	height: "500px",
	marginLeft: "550px",
	marginBottom: "100px",
	backgroundColor: "#D0D0D0",
	border: "1px solid black"
};

styles.loginInput = {
	width: "300px",
	height: "30px",
	marginTop: "20px"
};

styles.loginSubmit = {
	marginTop: "20px",
	width: "250px",
	height: "30px",
	backgroundColor: "#bae7ff"
};

styles.register = {
	width: "400px",
	height: "500px",
	marginLeft: "550px",
	marginBottom: "100px",
	backgroundColor: "#D0D0D0",
	border: "1px solid black"
};

styles.registerInput = {
	width: "250px",
	height: "30px"
};

styles.registerSubmit = {
	marginTop: "20px",
	width: "250px",
	height: "30px",
	backgroundColor: "#bae7ff"
};

export default App;
