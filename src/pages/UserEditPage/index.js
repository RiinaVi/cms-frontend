import React, {Component} from 'react';
import {Form, Icon, Input, Button, Avatar, Layout, Menu} from 'antd';
import 'antd/dist/antd.css';
import { withRouter } from "react-router-dom";
import './index.css';

const { Content, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class TestPage extends Component{

  render() {
    const { TextArea } = Input;
    return (
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
							<Icon type="edit" />
							<span>Edit Profile</span>
						  </Menu.Item>
					</Menu>
				</Sider>
				<Content className="content">
					<div className="example-conteiner">
						<label>
						  <div className="example-text">Username :</div>
						  <div className="example-input">
							<Input size="large" placeholder="Anonymous" />
							</div>
						  </label>
						  <br /><br />
						  <label>
						  <div className="example-text">Avatar :</div>
						  <div className="example-Avatar">
							<Avatar size="small" icon="user" className="Avatar" />
							<Avatar size={64} icon="user" className="Avatar"/>
							</div>
						  </label>
						  <br />
						  <label>
						  <div className="example-text">Phone number :</div>
						  <div className="example-input">
							<Input size="large" placeholder="+##-###-###" />
							</div>
						  </label>
						  <label>
						  <div className="example-text">Bio :</div><br /><br />
						  <div className="example-textarea">
							<TextArea placeholder="Autobiograpia Users" className="TextArea"/>
							</div>
						  </label>
						  <Button type="primary" className="Button">Save</Button>
					</div>
				</Content>
			</Layout>
		</div>


      // <form>
      //   <label>
      //     Username:
      //     <input type="text" placeholder="Anonymous"/>
      //   </label>
      //   <br />
      //   <label>
      //     Avatar:
      //     <img src={Avatar} alt="logoavatar" />
      //   </label>
      //   <br />
      //   <label>
      //     Phone number:
      //      <input type="tel" name="tel" pattern="+[0-9]{2}-[0-9]{3}-[0-9]{3}-[0-9]{3}" placeholder="+(##)-###-###-###"/>
      //   </label>
      //   <br />
      //   <label>
      //     BIO:<br />
      //     <textarea name="text_comment" cols="80" rows="10"></textarea>
      //   </label>
      //   <br />
      //   <input type="submit" value="Save" />
      // </form>
    );
	}
}

export default withRouter(TestPage);
