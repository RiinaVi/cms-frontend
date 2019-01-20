import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { withRouter } from 'react-router-dom';
import { Button, Modal, Form, Input, Radio } from 'antd';
import FormInModal from './FormInModal';

class AddOrEditPresentation extends React.Component {
  state = {
    visible: false
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    const form = this.formRef.props.form;
    console.log(form.getFieldsValue());
    /* form.validateFields(values => {
      form.getFieldsValue();

      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ visible: false });
    }); */
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    return (
      <div>
        {this.props.linkText === 'Edit' ? (
          <a onClick={this.showModal} href="javascript:;">
            {this.props.linkText}
          </a>
        ) : (
          <Button
            onClick={this.showModal}
            style={{ float: 'right' }}
            type="primary"
          >
            {' '}
            {this.props.linkText}
          </Button>
        )}
        <FormInModal
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
          presentation={this.props.presentation}
          editPresentation={this.props.linkText === 'Edit' ? true : false}
        />
      </div>
    );
  }
}

export default withRouter(AddOrEditPresentation);
