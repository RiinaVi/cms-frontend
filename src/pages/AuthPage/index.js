import {Tabs} from 'antd';
import 'antd/dist/antd.css';

import React, {Component} from 'react';
import { withRouter } from "react-router-dom";
import './index.css';

import './LoginFrom';
import NormalLoginForm from "./LoginFrom";
import NormalRegisterForm from "./RegisterForm"

const TabPane = Tabs.TabPane;

class AuthPage extends Component{
	render(){
		return(
			<div className="login_form">
				<h1 className="login_form_title">Login</h1>
				<Tabs defaultActiveKey={!this.props.register ? '1' : '2'} onChange={(activeKey) => this.props.history.push(activeKey === '1' ? '/login' : '/register')}>
					<TabPane tab="Sign in" key="1"><NormalLoginForm/></TabPane>
					<TabPane tab="Register" key="2"><NormalRegisterForm/></TabPane>
				</Tabs>
			</div>
		);
	}
}

export default withRouter(AuthPage);