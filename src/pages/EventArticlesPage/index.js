import React, {Component} from 'react';
import ReactDOM from "react-dom";
import {withRouter, Link} from "react-router-dom";
import {List, Layout, Menu, Icon, Button} from 'antd';

import 'antd/dist/antd.css';
import './index.css';

import EventArticleItem from "./EventArticleItem";
import { fetchConferenceArticlesLastVer, fetchConferenceProceedingsLastVer } from '../../connect/connectService';
import ArticleItem from '../ArticlesPage/ArticleItem';

const { Content, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class EventArticlesPage extends Component {

	constructor(props) {
		super(props);
		this.state ={
			articles: []
		}
	}

	componentDidMount = () => {
		this.props.proceedings ? fetchConferenceArticlesLastVer(this.props.match.params.id).then(responseJson => {
			this.setState({articles: responseJson})
		}).catch(error => console.log(error)) : fetchConferenceProceedingsLastVer(this.props.match.params.id).then(responseJson => {
			this.setState({articles: responseJson})
		}).catch(error => console.log(error));
		
		let table = ReactDOM.findDOMNode(this).querySelector('.ant-spin-container');
		let table_height = table.getBoundingClientRect().height;
		table.style.minHeight = table_height + "px";
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
						<div className="EventArticlesPage">
							{this.props.userData &&
								<Link to='/UploadArticlePage'><Button className="upload_button">
									<Icon type="upload" />Upload New Article
								</Button></Link>
							}
							<List
								className="eventArticles_table tableBody"
								itemLayout="vertical"
								size="large"
								pagination={{
									onChange: (page) => {
										console.log(page);
									},
									pageSize: 3,
								}}
								dataSource={this.state.articles}
								renderItem={articleData => (
									<ArticleItem articleData={articleData} conferenceId={this.props.match.params.id}/>
								)}
							/>
						</div>
					</Content>
				</Layout>
			</div>
		);
	}
}

export default withRouter(EventArticlesPage);