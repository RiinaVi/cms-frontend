import React, {Component} from 'react';
import ReactDOM from "react-dom";
import {withRouter} from "react-router-dom";
import {List, Layout, Menu, Icon} from 'antd';

import ArticleItem from "./ArticleItem";
import 'antd/dist/antd.css';
import './index.css';
import { fetchArticles } from '../../connect/connectService';

const { Content, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class ArticlesPage extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			data: []
		}
	}

	componentDidMount = () => {
		fetchArticles().then(responseJson => {
			this.setState({data: responseJson})
		}).catch(error => console.log(error));

		let table = ReactDOM.findDOMNode(this).childNodes[0].childNodes[0];
		let table_height = table.getBoundingClientRect().height;
		table.style.height = table_height + "px";
	};

	render() {
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
							<SubMenu key="sub4" title={<span><Icon type="star" />Ungraded Articles</span>}>
							<Menu.Item key="13">Ungraded Articles 1</Menu.Item>
							<Menu.Item key="14">Ungraded Articles 2</Menu.Item>
							<Menu.Item key="15">Ungraded Articles 3</Menu.Item>
							<Menu.Item key="16">Ungraded Articles 4</Menu.Item>
							</SubMenu>
							<SubMenu key="sub5" title={<span><Icon type="profile" />Browse your grades</span>}>
							<Menu.Item key="17">Option 1</Menu.Item>
							<Menu.Item key="18">Option 2</Menu.Item>
							<Menu.Item key="19">Option 3</Menu.Item>
							<Menu.Item key="20">Option 4</Menu.Item>
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
						<div className="ArticlesPage">
							<List
								className="articles_table tableBody"
								itemLayout="vertical"
								size="large"
								pagination={{
									onChange: (page) => {
										console.log(page);
									},
									pageSize: 5,
								}}
								dataSource={this.state.data}
								renderItem={article_data => (
									<ArticleItem articleData={article_data}/>
								)}
							/>
						</div>
					</Content>
				</Layout>
			</div>
		);
	}
}

export default withRouter(ArticlesPage);