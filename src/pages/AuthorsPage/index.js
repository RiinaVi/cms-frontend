import React, {Component} from 'react';
import ReactDOM from "react-dom";
import {withRouter} from "react-router-dom";
import {List, Layout, Menu, Icon} from 'antd';

import AuthorItem from "./AuthorItem";

import 'antd/dist/antd.css';
import './index.css';
import {fetchAuthors} from '../../connect/connectService';

const {Content, Sider} = Layout;
const SubMenu = Menu.SubMenu;

class AuthorsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authorsData: []
        }
    }

    componentDidMount = () => {
        let table = ReactDOM.findDOMNode(this).querySelector('.ant-spin-container');
        let table_height = table.getBoundingClientRect().height;
        table.style.minHeight = table_height + "px";

        fetchAuthors().then(responseJson => {
            this.setState({authorsData: responseJson ? responseJson : []})
        }).catch(error => console.log(error));
    };

    render() {
        return (

            <Layout className="layout">
                <Sider className="sider">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{height: '100%', borderRight: 0}}
                    >
                        <SubMenu key="sub1" title={<span><Icon type="user"/>Read Articles</span>}>
                            <Menu.Item key="1">Article 1</Menu.Item>
                            <Menu.Item key="2">Article 2</Menu.Item>
                            <Menu.Item key="3">Article 3</Menu.Item>
                            <Menu.Item key="4">Article 4</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" title={<span><Icon type="laptop"/>Your Events</span>}>
                            <Menu.Item key="5">Event 1</Menu.Item>
                            <Menu.Item key="6">Event 2</Menu.Item>
                            <Menu.Item key="7">Event 3</Menu.Item>
                            <Menu.Item key="8">Event 4</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub3" title={<span><Icon type="notification"/>Information</span>}>
                            <Menu.Item key="9">Information 1</Menu.Item>
                            <Menu.Item key="10">Information 2</Menu.Item>
                            <Menu.Item key="11">Information 3</Menu.Item>
                            <Menu.Item key="12">Information 4</Menu.Item>
                        </SubMenu>
                        <Menu.Item>
                            <Icon type="unlock"/>
                            <span>Ask for permission</span>
                        </Menu.Item>
                        <Menu.Item>
                            <Icon type="edit"/>
                            <span>Edit Profile</span>
                        </Menu.Item>
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
                            dataSource={this.state.authorsData}
                            renderItem={authorData => (
                                <AuthorItem authorData={authorData} conferenceId={this.props.match.params.id}/>
                            )}
                        />
                    </div>
                </Content>
            </Layout>
        );
    }
}

export default withRouter(AuthorsPage);