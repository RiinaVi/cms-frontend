import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { withRouter } from 'react-router-dom';
import { TimePicker, Modal, Form, Input, Button } from 'antd';
import moment from 'moment';

const FormInModal = Form.create({ name: 'form_in_modal' })(
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        presentation: this.props.presentation,
        presentationName: this.props.presentation.presentationName,
        presenterName: this.props.presentation.presenterName,
        room: this.props.presentation.room,
        startTime: this.props.presentation.startTime,
        endTime: this.props.presentation.endTime,
        description: this.props.presentation.description,
        session: this.props.presentation.session
      };
    }

    onSubmitPresentation = e => {
      e.preventDefault();
      /* This onCancel is only to not show the modal anymore */
      this.props.onCancel();

      if (this.props.editPresentation) {
        /* Update presentation */
      } else {
        /* Create a new presentation */
      }
    };

    disableHours = () => {
      const disabledHours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 22, 23, 24];
      for (
        let i = this.state.session.startDateTime.getHours() + 1;
        i >= 9;
        i--
      ) {
        disabledHours.push(i);
      }
      for (let i = this.state.session.endDateTime.getHours(); i < 22; i++) {
        disabledHours.push(i);
      }
      return disabledHours;
    };
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      const {
        presentationName,
        presenterName,
        room,
        endTime,
        startTime,
        description
      } = this.state;
      return (
        <Modal
          visible={visible}
          title="Create a new collection"
          onCancel={onCancel}
          footer={false}
        >
          <Form onSubmit={this.onSubmitPresentation} layout="vertical">
            <Form.Item label="Presentation Name">
              {getFieldDecorator('presentationName', {
                initialValue: this.props.editPresentation
                  ? presentationName
                  : '',
                rules: [
                  {
                    required: true,
                    message: 'Please input the presentation name'
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Presenter">
              {getFieldDecorator('presenterName', {
                initialValue: this.props.editPresentation ? presenterName : '',
                rules: [
                  {
                    required: true,
                    message: 'Please input the name of the presenter'
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Room">
              {getFieldDecorator('room', {
                initialValue: this.props.editPresentation ? room : '',
                rules: [
                  {
                    required: true,
                    message: 'Please input the room'
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Description">
              {getFieldDecorator('description', {
                initialValue: this.props.editPresentation ? description : ''
              })(<Input type="textarea" />)}
            </Form.Item>

            <Form.Item label="inline" style={{ marginBottom: 0 }}>
              <Form.Item
                style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
              >
                <TimePicker
                  defaultValue={
                    this.props.editPresentation ? moment(endTime, 'HH:mm') : ''
                  }
                  format="HH:mm"
                  minuteStep={15}
                  disabledHours={this.disableHours}
                  hideDisabledOptions={true}
                />
              </Form.Item>
              <span
                style={{
                  display: 'inline-block',
                  width: '24px',
                  textAlign: 'center'
                }}
              >
                -
              </span>
              <Form.Item
                style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
              >
                <TimePicker
                  defaultValue={
                    this.props.editPresentation ? moment(endTime, 'HH:mm') : ''
                  }
                  format="HH:mm"
                  minuteStep={15}
                  disabledHours={this.disableHours}
                  hideDisabledOptions={true}
                />
              </Form.Item>
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form>
        </Modal>
      );
    }
  }
);

export default withRouter(FormInModal);
