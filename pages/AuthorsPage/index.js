import React, {Component} from 'react';
import ReactDOM from "react-dom";
import {withRouter} from "react-router-dom";
import {List, Layout, Menu, Icon} from 'antd';

import { fetchUserProfile } from '../../connect/connectService';
import AuthorItem from "./AuthorItem";

import 'antd/dist/antd.css';
import './index.css';

const { Content, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class AuthorsPage extends Component {

    constructor(props) {
        super(props);
		this.userData = [];
        this.data = [
            {
                "profile_image_url": "https://placehold.it/50x50",
                "name": "John Doe",
                "articles_count": 500,
                "most_recent": "Article Title",
                "joined": 20,
                "average": 3.0
            },
            {
                "profile_image_url": null,
                "name": "Lorem Ipsum",
                "articles_count": 140,
                "most_recent": "Lorem ipsum dolor.",
                "joined": 10,
                "average": 3.0
            },
            {
                "profile_image_url": null,
                "name": "Lorem Ipsum2",
                "articles_count": 140,
                "most_recent": "Lorem ipsum dolor.",
                "joined": 10,
                "average": 1.5
            },
            {
                "profile_image_url": "https://placehold.it/50x50",
                "name": "Lorem Ipsum3",
                "articles_count": 140,
                "most_recent": "Lorem ipsum dolor.",
                "joined": 10,
                "average": .5
            },
            {
                "profile_image_url": null,
                "name": "Lorem Ipsum4",
                "articles_count": 140,
                "most_recent": "Lorem ipsum dolor.",
                "joined": 10,
                "average": 3.5
            },
            {
                "profile_image_url": null,
                "name": "Lorem Ipsum5",
                "articles_count": 140,
                "most_recent": "Lorem ipsum dolor.",
                "joined": 10,
                "average": 1.5
            },
            {
                "profile_image_url": null,
                "name": "Lorem Ipsum6",
                "articles_count": 140,
                "most_recent": "Lorem ipsum dolor.",
                "joined": 10,
                "average": 1.5
            },
            {
                "profile_image_url": null,
                "name": "Lorem Ipsum7",
                "articles_count": 140,
                "most_recent": "Lorem ipsum dolor.",
                "joined": 10,
                "average": 1.5
            }
        ];
    }

    componentDidMount = () => {
		fetchUserProfile("0").then(responseJson => {
			this.setState({userData: responseJson})
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
						  {!!this.props.userData && <Menu.Item onClick={() => this.props.history.push("/userEdit")}>
							<Icon type="edit" />
							<span>Edit Profile</span>
						  </Menu.Item>}
						</Menu>
					</Sider>
					<Content className="content">
						<div className="AuthorsPage">
							<List
								className="authors_table tableBody"
								itemLayout="vertical"
								size="large"
								pagination={{
									onChange: (page) => {
										console.log(page);
									},
									pageSize: 5,
								}}
								dataSource={this.userData, this.data}
								renderItem={author_data => (
									<AuthorItem authorData={author_data}/>
								)}
							/>
						</div>
					</Content>
				</Layout>
			</div>
        );
    }
}

export default withRouter(AuthorsPage);