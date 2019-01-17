import React, {Component} from 'react';
import {Layout, Menu, Icon, Upload, message, Button } from 'antd';
import {withRouter} from "react-router-dom";
import logo from './user.svg';
import {config} from '../../config';
import './style.css';
import { uploadArticle } from '../../connect/connectService';


const { Content, Sider } = Layout;
const SubMenu = Menu.SubMenu;

const props = {
  name: 'file',
  action: `${config.apiUrl}/uploadFile`,
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

class UploadArticlePage extends Component{
	constructor(props) {
		super(props);
		this.state = {
			articleName: ''
		}
	}

	customRequest = ({ onSuccess, onError, file }) => {
		uploadArticle(file, this.state.articleName).then(responseJson => {
			onSuccess(null, file);
		}).catch(error => onError());
  };

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
						  {!!this.props.userData && <Menu.Item onClick={() => this.props.history.push("/userEdit")}>
							<Icon type="edit" />
							<span>Edit Profile</span>
						  </Menu.Item>}
						</Menu>
					</Sider>
					<Content className="content">
						<div className="upload_article_content">
							<div className="inform">
								<div className="text">
									<form>
										<ul>
											<li className="article_name">Article Name: <input type="text" value={this.state.articleName} onChange={e => this.setState({articleName: e.target.value})} /></li>
											<li className="choose_file"><Upload {...props} customRequest={this.customRequest}>
												<Button>
													<Icon type="upload" /> Choose your article
												</Button>
											</Upload></li>
										</ul>
										
										<input type="submit" value="Upload" className="upload" />
									</form>
								</div>
							</div>
						</div>
					</Content>
				</Layout>
			</div>
		);
	}
}

export default withRouter(UploadArticlePage);
