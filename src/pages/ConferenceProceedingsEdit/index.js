import React, { Component } from 'react'
import { Form, List, Row, Col, Button } from 'antd';
import ProceedingItem from './ProceedingItem';
import {withRouter} from "react-router-dom";

class ConferenceProceedingsEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      proceedingsArticles: [{},{},{},{},{},{},{},{}],
      loadingSave: false
    }
  }
  
  onSaveProceedings = e => {
    e.preventDefault();
    this.setState({loadingSave: true});
    const params = {
      proceedingsArticles: this.state.proceedingsArticles
    }
    //TODO
  }
  
  render() {
    return (
      <Form onSubmit={this.onSaveProceedings}>
        <List
          itemLayout="vertical"
          size="large"
          dataSource={this.state.proceedingsArticles}
          renderItem={user => (
            <ProceedingItem proceeding={user}/>
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

export default withRouter(ConferenceProceedingsEdit);