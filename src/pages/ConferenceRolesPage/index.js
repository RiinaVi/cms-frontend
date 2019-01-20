import React, { Component } from 'react'
import { Form, List, Row, Col, Button } from 'antd';
import RoleItem from './RoleItem';
import {withRouter} from "react-router-dom";

class ConferenceRolesPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userData: [{},{},{},{},{},{},{},{}],
      loadingSave: false
    }
  }
  
  onSaveRoles = e => {
    e.preventDefault();
    this.setState({loadingSave: true});
    const params = {
      userData: this.state.userData
    }
    //TODO
  }
  
  render() {
    return (
      <Form onSubmit={this.onSaveRoles}>
        <List
          itemLayout="vertical"
          size="large"
          dataSource={this.state.userData}
          renderItem={user => (
            <RoleItem userData={user}/>
          )}
        />
        <Row>
          <Col span={20} style={{ textAlign: 'right', marginBottom: '80px' }}>
            <Button size='large' onClick={() => this.props.history.push(`/conferences/${this.props.match.params.id}`)}>Cancel</Button>
            <Button type='primary' size='large' htmlType='submit' loading={this.state.loadingSave}>Save</Button>
          </Col>
        </Row>
      </Form>
    )
  }
}

export default withRouter(ConferenceRolesPage);