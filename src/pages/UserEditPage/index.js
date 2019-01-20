import React, {Component} from 'react';
import {Layout, Menu, Icon, Form, Input, Row, Col, Button} from 'antd';
import logo from './user.svg';
import './style.css';
import {withRouter} from "react-router-dom";
import {Link} from "react-router-dom";
import { updateProfile } from '../../connect/connectService';

const { Content, Sider } = Layout;
const SubMenu = Menu.SubMenu;


class UserPage extends Component{
	constructor(props) {
		super(props);
		this.state = {
      username: this.props.userData && this.props.userData.username,
      firstName: this.props.userData && this.props.userData.firstName,
      lastName: this.props.userData && this.props.userData.lastName,
      contactNumber: this.props.userData && this.props.userData.contactNumber,
			bio: this.props.userData && this.props.userData.bio,
			loadingSave: false
		}
	}

	onSaveProfile = e => {
    e.preventDefault();
    this.setState({loadingSave: true});
    const params = {
      ...this.props.userData,
      username: this.state.username,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      contactNumber: this.state.contactNumber,
      bio: this.state.bio
    }
    updateProfile(params).then(responseJson => {
			this.setState({loadingSave: false});
			this.props.onSaveUserData();
      this.props.history.push('/user');
		}).catch(error => {
      console.log(error)
      this.setState({loadingSave: false});
    });

	}

	render(){
		return(
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
						<Menu.Item>
						<Link to="/userEdit">
						<Icon type="edit" />
						<span>Edit Profile</span>
						</Link>
						</Menu.Item>
					</Menu>
				</Sider>
				<Content className="content">
					<Form onSubmit={this.onSaveProfile}>
						<Form.Item 
							label="Username:"
							labelCol={{ span: 6 }}
							wrapperCol={{ span: 14 }}>
							<Input type="tel" name="username" placeholder='Username' value={this.state.username} onChange={e => this.setState({username: e.target.value})} />
						</Form.Item>
						<Form.Item 
							label="First name:"
							labelCol={{ span: 6 }}
							wrapperCol={{ span: 14 }}>
							<Input type="tel" name="firstname" placeholder='First name' value={this.state.firstName} onChange={e => this.setState({firstName: e.target.value})} />
						</Form.Item>
						<Form.Item 
							label="Last name:"
							labelCol={{ span: 6 }}
							wrapperCol={{ span: 14 }}>
							<Input type="tel" name="lastname" placeholder='Last name' value={this.state.lastName} onChange={e => this.setState({lastName: e.target.value})} />
						</Form.Item>
						<Form.Item 
							label="Avatar:"
							labelCol={{ span: 6 }}
							wrapperCol={{ span: 14 }}>
							<img src={logo} className="User-logo" alt="logo" />
						</Form.Item>
						<Form.Item 
							label="Phone number:"
							labelCol={{ span: 6 }}
							wrapperCol={{ span: 14 }}>
							<Input type="tel" name="phone" placeholder='Phone number' value={this.state.contactNumber} onChange={e => this.setState({contactNumber: e.target.value})} />
						</Form.Item>
						<Form.Item 
							label="Bio:"
							labelCol={{ span: 6 }}
							wrapperCol={{ span: 14 }}>
							<Input.TextArea
								cols="60"
								rows="18"
								value={this.state.bio} 
								onChange={e => this.setState({bio: e.target.value})}
							/>
						</Form.Item>
						<Row>
							<Col span={20} style={{ textAlign: 'right', marginBottom: '80px' }}>
								<Button size='large' onClick={() => this.props.history.push('/user')}>Cancel</Button>
								<Button type='primary' size='large' htmlType='submit' loading={this.state.loadingSave}>Save</Button>
							</Col>
						</Row>
					</Form>
				</Content>
			</Layout>
		);
	}
}

export default withRouter(UserPage);
