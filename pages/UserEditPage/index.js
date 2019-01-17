import React, {Component} from 'react';
import {Layout, Menu, Icon} from 'antd';
import logo from './user.svg';
import './style.css';
import {Link} from "react-router-dom";

const { Content, Sider } = Layout;
const SubMenu = Menu.SubMenu;


class UserPage extends Component{
	render(){
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
						  <SubMenu key="sub3" title={<span><Icon type="notification" />Information</span>}>
							<Menu.Item key="9">Information 1</Menu.Item>
							<Menu.Item key="10">Information 2</Menu.Item>
							<Menu.Item key="11">Information 3</Menu.Item>
							<Menu.Item key="12">Information 4</Menu.Item>
						  </SubMenu>
						  <Menu.Item>
							<Icon type="unlock" />
							<span>Ask for permission</span>
						  </Menu.Item>
						  <Menu.Item>
							<Link to="/userEdit">
							<Icon type="edit" />
							<span>Edit Profile</span>
							</Link>
						  </Menu.Item>
						</Menu>
					</Sider>
					<Content className="content">
						<div className="user_profil_content">
							<div className="edit">
								<form>
									<ul>
										<li>Username : <input type="text" value={!!this.props.userData && this.props.userData.username} /></li>
										<li>Avatar : <img src={logo} className="User-logo" alt="logo" /></li>
										<li>Phone number : <input type="tel" value={!!this.props.userData && this.props.userData.contactNumber} /></li>
										<li>Bio : <textarea row="18" cols="60" value={!!this.props.userData && this.props.userData.bio}></textarea></li>
									</ul>
									<input type="submit" value="Save" className="save" />
								</form>
							</div>
						</div>
					</Content>
				</Layout>
			</div>
		);
	}
}

export default UserPage;
