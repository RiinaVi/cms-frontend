import React, { Component } from 'react'
import { Form, Checkbox, Row, Col } from 'antd';

const plainOptions = ['Editor', 'Author', 'Reviewer'];
const defaultCheckedRoles = [];

class RoleItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checkedRoles: defaultCheckedRoles
    }
  }
  
  render() {
    return (
      <Form.Item>
        <Row type="flex" justify="center">
          <Col xs={{ span: 12 }} md={{ span: 9 }} lg={{ span: 6 }}>
            username
          </Col>
          <Col xs={{ span: 12 }} md={{ span: 9 }} lg={{ span: 6 }}>
            <Checkbox.Group options={plainOptions} value={this.state.checkedRoles} onChange={checkedRoles => this.setState({checkedRoles: checkedRoles})} />
          </Col>
        </Row>
      </Form.Item>
    )
  }
}

export default RoleItem;