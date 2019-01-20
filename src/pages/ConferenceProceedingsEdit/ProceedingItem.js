import React, { Component } from 'react'
import { Form, Checkbox, Row, Col } from 'antd';

class ProceedingItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      accepted: false
    }
  }
  
  render() {
    return (
      <Form.Item>
        <Row type="flex" justify="center">
          <Col xs={{ span: 12 }} md={{ span: 9 }} lg={{ span: 6 }}>
            Article title
          </Col>
          <Col xs={{ span: 12 }} md={{ span: 9 }} lg={{ span: 6 }}>
            <Checkbox value={this.state.accepted} onChange={accepted => this.setState({accepted: accepted})} />
          </Col>
        </Row>
      </Form.Item>
    )
  }
}

export default ProceedingItem;