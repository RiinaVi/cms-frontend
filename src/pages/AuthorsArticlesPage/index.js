import React, {Component} from 'react';
import ReactDOM from "react-dom";
import {withRouter} from "react-router-dom";
import {List, Layout, Menu, Icon} from 'antd';

import AuthorsArticlesItem from "./AuthorsArticlesItem";
import 'antd/dist/antd.css';
import './index.css';

const { Content, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class ArticlesReviewsPage extends Component {
	
	constructor(props) {
		super(props);
		this.data = [
			{
				"profile_image_url": "https://placehold.it/50x50",
				"name": "Author 1",
				"article_name": "Article 1",
				"average": 3.5,
				"publication_date": "10/04/2018"
			},
			{
				"profile_image_url": null,
				"name": "Author 1",
				"article_name": "Article 2",
				"average": 3.5,
				"publication_date": "21/05/2018"
			},
			{
				"profile_image_url": null,
				"name": "Author 1",
				"article_name": "Article 3",
				"average": 3.5,
				"publication_date": "01/02/2018"
			},
			{
				"profile_image_url": "https://placehold.it/50x50",
				"name": "Author 1",
				"article_name": "Article 4",
				"average": 3.5,
				"publication_date": "15/11/2018"
			},
			{
				"profile_image_url": null,
				"name": "Author 1",
				"article_name": "Article 5",
				"average": 3.5,
				"publication_date": "01/06/2019"
			},
			{
				"profile_image_url": null,
				"name": "Author 1",
				"article_name": "Article 6",
				"average": 3.5,
				"publication_date": "28/08/2018"
			},
			{
				"profile_image_url": null,
				"name": "Author 1",
				"article_name": "Article 7",
				"average": 3.5,
				"publication_date": "17/03/2018"
			},
			{
				"profile_image_url": null,
				"name": "Author 1",
				"article_name": "Article 8",
				"average": 3.5,
				"publication_date": "01/02/2019"
			}
		];
    }

    componentDidMount = () => {
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
						<div className="AuthorsArticlesPage">
							<List
								className="articles_table"
								itemLayout="vertical"
								size="large"
								pagination={{
									onChange: (page) => {
										console.log(page);
									},
									pageSize: 5,
								}}
								dataSource={this.data}
								renderItem={article_data => (
									<AuthorsArticlesItem articleReviewData={article_data}/>
								)}
							/>
						</div>
					</Content>
				</Layout>
			</div>
        );
    }
}

export default withRouter(ArticlesReviewsPage);