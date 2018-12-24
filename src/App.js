import React, { Component } from 'react';
import { Menu, Icon } from 'antd';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import logo from './logo.svg';
import logouser from'./UserProfile/user.svg'
import './App.css';
import { fetchGreeting } from './connect/connectService';


import LoginPage from './Login/index';
import UserPage from './UserProfile/index';
import Conference from './ConferencePage/Conference';


const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class App extends Component {
	componentDidMount() {
		fetchGreeting().then(responseJson =>
			console.log(responseJson)
		);
	}
	
	state = { 
		current: 'mail',
	}
	
	handleClick = (e) => {
		console.log('click ', e);
		this.setState({
		  current: e.key,
		});
	}

	render() {
		return (
		<Router>
			<Menu
				onClick={this.handleClick}
				selectedKeys={[this.state.current]}
				mode="horizontal"
				style={styles.menu}
			>
			<Menu.Item key="events" style={styles.menuItem1}>
			  <Link to="/"><Icon type="mail" />Events</Link>
			</Menu.Item>
			<Menu.Item key="authors" style={styles.menuItem}>
			  <Link to="/authors"><Icon type="appstore" />Authors</Link>
			</Menu.Item>
			<Menu.Item key="articles" style={styles.menuItem}>
			  <Link to="/articles"><Icon type="appstore" />Articles</Link>
			</Menu.Item>
			<Menu.Item key="reviewers" style={styles.menuItem}>
			  <Link to="/reviewers"><Icon type="appstore" />Reviewers</Link>
			</Menu.Item>
			<Menu.Item key="login" style={styles.menuItem}>
			  <Link to="/login"><Icon type="appstore" />Login</Link>
			</Menu.Item>
			<Menu.Item key="user" style={styles.menuItem}>
			  <Link to="/user"><Icon type="appstore" />Username<img src={logouser} className="user-logo" alt="logo" /></Link>
			</Menu.Item>
			<Route exact path="/" component={Events} />
			<Route path="/articles" component={Articles} />
			<Route path="/authors" component={Authors} />
			<Route path="/reviewers" component={Reviewers} />
			<Route path="/login" component={LoginPage} />
			<Route path="/user" component={UserPage} />
			<Route path="/register" component={Register} />
			<Route path="/conference" component={Conference} />
		  </Menu>
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

function Authors() {
  return (
    <div>
      <h2>Authors</h2>
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

function Register() {
	return (
		<div>
			<div style={styles.register}>
				<h3>Register</h3>
				
				<form>
					<p>Email</p>
					<input type="mail" placeholder="Email address" value="" name="email" style={styles.registerInput} />
					
					<p>Password</p>
					<input type="password" placeholder="********" value="" name="password" style={styles.registerInput} />
					
					<p>Confirm Password</p>
					<input type="password" placeholder="********" value="" name="confirm_password" style={styles.registerInput} />
					
					<p>Birthdate</p>
					<input type="date" value="" name="birthdate" />
					
					<p><input type="checkbox" value="" name="terms_box" />I've read and accept <a href="#">The Terms of Service</a></p>
					
					<input type="submit" value="Confirm" style={styles.registerSubmit} />
				</form>
			</div>
		</div>
	);
}

const styles = {};

styles.menu = {

}

styles.menuItem1 = {
	marginLeft: "260px",
	paddingLeft: "70px",
	paddingRight: "70px"
}

styles.menuItem = {
	paddingLeft: "70px",
	paddingRight: "70px"
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
