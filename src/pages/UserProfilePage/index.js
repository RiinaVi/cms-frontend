import React, {Component} from 'react';
import {Layout, Menu, Icon} from 'antd';
import {withRouter} from "react-router-dom";
import logo from './user.svg';
import './style.css';
import { fetchUserProfile } from '../../connect/connectService';

const { Content, Sider } = Layout;
const SubMenu = Menu.SubMenu;


class UserPage extends Component{
	constructor(props) {
		super(props);
		this.state = {
			userData: !this.props.match.params.userId ? this.props.userData : null
		}
	}

  componentDidMount = () => {
    this.props.match.params.userId && fetchUserProfile(this.props.match.params.userId).then(responseJson => {
			this.setState({userData: responseJson})
		}).catch(error => console.log(error));
	}
	
	render(){
		const userIdParam = this.props.match.params.userId;

		return(
			<div>
				<Layout className="layout">
					<Sider className="sider">
						<Menu
						  mode="inline"
						  defaultSelectedKeys={['1']}
						  defaultOpenKeys={['sub1']}
						  style={{ height: '100%', borderRight: 0 }}
						>
						  <SubMenu key="sub1" title={<span><Icon type="user" />Read Articles</span>}>
							<Menu.Item key="1">Article 1</Menu.Item>
							<Menu.Item key="2">Article 2</Menu.Item>
							<Menu.Item key="3">Article 3</Menu.Item>
							<Menu.Item key="4">Article 4</Menu.Item>
						  </SubMenu>
						  <SubMenu key="sub2" title={<span><Icon type="laptop" />Your Events</span>}>
							<Menu.Item key="5">Event 1</Menu.Item>
							<Menu.Item key="6">Event 2</Menu.Item>
							<Menu.Item key="7">Event 3</Menu.Item>
							<Menu.Item key="8">Event 4</Menu.Item>
						  </SubMenu>
						  <Menu.Item>
							<Icon type="unlock" />
							<span>Ask for permission</span>
						  </Menu.Item>
						  <Menu.Item onClick={() => this.props.history.push("/userEdit")}>
							<Icon type="edit" />
							<span>Edit Profile</span>
						  </Menu.Item>
						</Menu>
					</Sider>
					<Content className="content">
						<div className="user_profil_content">
							<div className="inform">
								
								<div className="text">
									Username: <h1>{this.state.userData!=null && this.state.userData.username}</h1>
									E-mail: <h1><a href={this.state.userData!=null &&`mailto: ${ this.state.userData.emailAddress}`}>{this.state.userData!=null&&this.state.userData.emailAddress}</a></h1>
									Phone number: <h1><a href={this.state.userData!=null &&`tel: ${ this.state.userData.contactNumber}`}>{this.state.userData!=null&&this.state.userData.contactNumber}</a></h1>
									Bio: <h1>{this.state.userData!=null && this.state.userData.bio}</h1>
								</div>

								<div className="user"><img src={logo} className="User-logo" alt="logo" /></div>
							</div>

							<div className="bio">
									<br></br>
									<hr></hr><br></br>
									<hr></hr><br></br>
									<hr></hr><br></br>
									<hr></hr><br></br>
									<br></br>

							</div>
						</div>
					</Content>
				</Layout>
			</div>
		);
	}
}

export default withRouter(UserPage);
