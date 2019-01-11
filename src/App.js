import React, { Component } from 'react';
import { Menu, Icon, Layout } from 'antd';
import 'antd/dist/antd.css';

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

import ArticlesPage from './pages/ArticlesPage/index';
import AuthPage from './pages/AuthPage/index';
import AuthorsPage from './pages/AuthorsPage/index';
import ReviewersPage from './pages/ReviewersPage/index';
import EventsPage from './pages/EventsPage/index';
import UserPage from './pages/UserProfilePage/index';
import UserEditPage from './pages/UserEditPage/index';
import Conference from './pages/ConferencePage/Conference';
import EditConference from './pages/ConferencePage/EditConference';
import ArticlesReviewsPage from './pages/ArticlesReviewsPage/index';
import ReviewersReviewsPage from './pages/ReviewersReviewsPage/index';
import AuthorsArticlesPage from './pages/AuthorsArticlesPage/index';


const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const { Header, Content, Sider } = Layout;

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
		).catch(error => console.log(error));
	}
	
	handleClick = (e) => {
		this.setState({
		  current: e.key,
		});
	}

	render() {
		return (
		<Router history={history}>
			<div className="page">
				<Menu
					onClick={this.handleClick}
					selectedKeys={[this.state.current]}
					mode="horizontal"
					className='appMenu'
				>
					<Menu.Item key="/" className="menuItem">
						<Link to="/"><Icon type="calendar" />Events</Link>
					</Menu.Item>
					<Menu.Item key="/authors" className="menuItem">
						<Link to="/authors"><Icon type="team" />Authors</Link>
					</Menu.Item>
					<Menu.Item key="/articles" className="menuItem">
						<Link to="/articles"><Icon type="snippets" />Articles</Link>
					</Menu.Item>
					<Menu.Item key="/reviewers" className="menuItem">
						<Link to="/reviewers"><Icon type="solution" />Reviewers</Link>
					</Menu.Item>
					<Menu.Item key="/login" className="menuItem">
						<Link to="/login"><Icon type="login" />Login</Link>
					</Menu.Item>
					<Menu.Item key="/user" className="menuItem">
						<Link to="/user"><Icon type="user" />Username<img src={logouser} className="user-logo" alt="logo" /></Link>
					</Menu.Item>
				</Menu>
				<Route exact path="/" component={EventsPage} />
				<Route path="/articles" component={ArticlesPage} />
				<Route path="/authors" component={AuthorsPage} />
				<Route path="/reviewers" component={ReviewersPage} />
				<Route path="/login" component={AuthPage} />
				<Route path="/user" component={UserPage} />
				<Route path="/userEdit" component={UserEditPage} />
				<Route path="/register" component={() => <AuthPage register/>} />
				<Route path="/conference" component={Conference} />
				<Route path="/conferenceEdit" component={EditConference} />
				<Route path="/ArticleReviews" component={ArticlesReviewsPage} />
				<Route path="/ReviewerReviewsPage" component={ReviewersReviewsPage} />
				<Route path="/AuthorArticlesPage" component={AuthorsArticlesPage} />

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

export default App;
