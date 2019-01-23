import React, { Component } from 'react';
import { Menu, Icon, Layout } from 'antd';
import 'antd/dist/antd.css';

import { Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import history from './history';
import logo from './logo.svg';
import logouser from './pages/UserProfilePage/user.svg';
import './App.css';
import {
  fetchGreeting,
  fetchUserLoggedIn,
  logout,
  fetchUserConferenceAttendance
} from './connect/connectService';

import EventsPage from './pages/EventsPage/index';
import EventArticlesPage from './pages/EventArticlesPage/index';
import ArticlesPage from './pages/ArticlesPage/index';
import AuthPage from './pages/AuthPage/index';
import AuthorsPage from './pages/AuthorsPage/index';
import ReviewersPage from './pages/ReviewersPage/index';
import UserPage from './pages/UserProfilePage/index';
import UserEditPage from './pages/UserEditPage/index';
import Conference from './pages/ConferencePage/Conference';
import EditConference from './pages/ConferencePage/EditConference';
import ArticlesReviewsPage from './pages/ArticlesReviewsPage/index';
import ReviewersReviewsPage from './pages/ReviewersReviewsPage/index';
import AuthorsArticlesPage from './pages/AuthorsArticlesPage/index';
import UploadArticlePage from './pages/UploadArticlePage/index';
import { saveUser } from './connect/requestTools';
import SessionPage from './pages/SessionPage';
import ConferenceRolesPage from './pages/ConferenceRolesPage';
import ConferenceProceedingsEdit from './pages/ConferenceProceedingsEdit';
import PresentationsPage from './pages/PresentationsPage';
import { roles } from './utils/security';
import EditSessions from './pages/SessionPage/EditSessions';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const { Header, Content, Sider } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: history.location.pathname,
      userData: null,
      conferenceAttendance: {
        conferenceId: null,
        roles: null
      }
    };
  }

  componentDidMount() {
    fetchGreeting()
      .then(responseJson => console.log(responseJson))
      .catch(error => console.log(error));
    this.checkUserData();
  }

  checkUserData = () => {
    this.setState({
      conferenceAttendance: { conferenceId: null, roles: null }
    });
    fetchUserLoggedIn()
      .then(responseJson => {
        this.setState({ userData: !responseJson ? null : responseJson });
      })
      .catch(error => console.log(error));
  };

  checkConferenceAttendance = (requireConfId, forceCheck = false) => {
    const currConfID = this.state.conferenceAttendance.conferenceId;
    if (currConfID === null || currConfID !== requireConfId || forceCheck) {
      fetchUserConferenceAttendance(requireConfId)
        .then(responseJson => {
          this.setState({
            conferenceAttendance: {
              conferenceId: requireConfId,
              roles: responseJson
            }
          });
        })
        .catch(error => console.log(error));
    }
  };

  onLogoutClick = () => {
    logout()
      .then(responseJson => {
        this.setState(prevState => ({
          userData: null,
          conferenceAttendance: {
            ...prevState.conferenceAttendance,
            roles: null
          }
        }));
      })
      .catch(error => console.log(error));
  };

  handleClick = e => {
    this.setState({
      current: e.key
    });
  };

  render() {
    const userAttendanceProps = {
      userAttendance: this.state.conferenceAttendance.roles,
      onCheckAttendance: this.checkConferenceAttendance
    };

    return (
      <Router history={history}>
        <div className="page">
          <Menu
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            mode="horizontal"
            className="appMenu"
          >
            <Menu.Item key="/" className="menuItem">
              <Link to="/">
                <Icon type="calendar" />
                Events
              </Link>
            </Menu.Item>

            {!this.state.userData && (
              <Menu.Item key="/login" className="menuItem">
                <Link to="/login">
                  <Icon type="login" />
                  Login
                </Link>
              </Menu.Item>
            )}
            {!!this.state.userData && (
              <Menu.Item
                key="/logout"
                className="menuItem"
                onClick={this.onLogoutClick}
              >
                <Link to="/login">
                  <Icon type="logout" />
                  Logout
                </Link>
              </Menu.Item>
            )}
            {!!this.state.userData && (
              <Menu.Item key="/user" className="menuItem">
                <Link to="/user">
                  <Icon type="user" />
                  {this.state.userData.username}
                  <img src={logouser} className="user-logo" alt="logo" />
                </Link>
              </Menu.Item>
            )}
          </Menu>
          <Route exact path="/" component={EventsPage} />
          <Route
            path="/login"
            component={() => <AuthPage onLoggedIn={this.checkUserData} />}
          />
          <Route
            path="/user"
            component={() => <UserPage userData={this.state.userData} />}
          />
          <Route
            path="/conferenceProfile/:id/:userId"
            component={() => <UserPage />}
          />
          <Route
            path="/userEdit"
            component={() => (
              <UserEditPage
                userData={this.state.userData}
                onSaveUserData={this.checkUserData}
              />
            )}
          />
          <Route path="/register" component={() => <AuthPage register />} />
          <Route
            path="/conferences/:id"
            component={() => (
              <Conference
                userData={this.state.userData}
                {...userAttendanceProps}
              />
            )}
          />
          <Route
            path="/conferencesEdit/:id"
            component={() => (
              <EditConference
                userData={this.state.userData}
                {...userAttendanceProps}
              />
            )}
          />
          <Route
            path="/conferencesArticles/:id"
            component={() => (
              <EventArticlesPage
                userData={this.state.userData}
                {...userAttendanceProps}
              />
            )}
          />
          <Route
            path="/conferencesProceedings/:id"
            component={() => (
              <EventArticlesPage
                proceedings
                userData={this.state.userData}
                {...userAttendanceProps}
              />
            )}
          />
          <Route
            path="/conferencesAuthors/:id"
            component={() => (
              <AuthorsPage
                userData={this.state.userData}
                {...userAttendanceProps}
              />
            )}
          />
          <Route
            path="/conferencesReviewers/:id"
            component={() => (
              <ReviewersPage
                userData={this.state.userData}
                {...userAttendanceProps}
              />
            )}
          />
          <Route
            path="/conferencesSessions/:id"
            component={() => (
              <SessionPage
                userData={this.state.userData}
                {...userAttendanceProps}
              />
            )}
          />
          <Route
            path="/conferencesSessionsPresentations/:id/:sessionId"
            component={() => (
              <PresentationsPage
                userData={this.state.userData}
                {...userAttendanceProps}
              />
            )}
          />
          <Route
            path="/conferencesRoles/:id"
            component={() => (
              <ConferenceRolesPage
                userData={this.state.userData}
                {...userAttendanceProps}
              />
            )}
          />
          <Route
            path="/editSessions/:id/:date"
            component={() => (
              <EditSessions
                userData={this.state.userData}
                {...userAttendanceProps}
              />
            )}
          />
          <Route path="/ArticleReviews" component={() => <ArticlesReviewsPage {...userAttendanceProps}/>} />
          <Route path="/ReviewerReviewsPage" component={() => <ReviewersReviewsPage {...userAttendanceProps}/>} />
          <Route path="/AuthorArticlesPage" component={() => <AuthorsArticlesPage {...userAttendanceProps}/>} />
          <Route path="/UploadArticlePage" component={() => <UploadArticlePage {...userAttendanceProps}/>} />
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
