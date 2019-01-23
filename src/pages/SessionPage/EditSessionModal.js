import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  fetchConferenceSessions,
  fetchSingleConference,
  deleteConferenceSession,
  addConferenceSession,
  updateConferenceSession
} from '../../connect/connectService';
import { Table, Divider, Modal, Input, Button, Form, TimePicker } from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css';

class EditSessionModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      session: this.props.session,
      modalEditVisible: false,
      name: this.props.session.name,
      chairName: this.props.session.chairName,
      startDateTime: this.props.session.startDateTime,
      endDateTime: this.props.session.endDateTime,
      sessionID: this.props.session.sessionID
    };
  }

  showEditModal = () => {
    this.setState({ modalEditVisible: true });
  };
  handleEditCancel = () => {
    this.setState({ modalEditVisible: false });
  };

  updateSession = () => {
    this.setState({ modalEditVisible: false });

    const session = {
      ...this.state.session,
      name: this.state.name,
      chairName: this.state.chairName,
      startDateTime: this.state.startDateTime,
      endDateTime: this.state.endDateTime
    };
    updateConferenceSession(
      this.props.conferenceId,
      session,
      this.state.sessionID
    ).catch(error => {
      console.log(error);
      this.setState({ loadingSave: false });
    });
  };

  render() {
    return (
      <React.Fragment>
        <a onClick={this.showEditModal} href="javascript:;">
          Edit
        </a>
        <Modal
          title={`Edit session`}
          visible={this.state.modalEditVisible}
          onOk={this.updateSession}
          onCancel={() => this.setState({ modalEditVisible: false })}
          confirmLoading={this.state.saveReviewLoading}
        >
          <Form onSubmit={this.onSaveConference}>
            <Form.Item>
              <Input
                type="text"
                placeholder="Session name"
                onChange={e => this.setState({ name: e.target.value })}
                defaultValue={this.state.name}
              />
            </Form.Item>
            <Form.Item>
              <Input
                type="text"
                placeholder="Chair"
                onChange={e => this.setState({ chairName: e.target.value })}
                defaultValue={this.state.chairName}
              />
            </Form.Item>
            <Form.Item style={{ marginBottom: 0 }}>
              <Form.Item
                style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
              >
                <TimePicker
                  format="HH:mm"
                  minuteStep={15}
                  disabledHours={() => [0, 1, 2, 3, 4, 5, 6, 7, 8, 22, 23, 24]}
                  hideDisabledOptions={true}
                  onChange={time => {
                    const date = new Date(this.props.conferenceDate);
                    const year = date.getFullYear();
                    const month = date.getMonth();
                    const day = date.getDate();
                    const startDate = new Date(
                      year,
                      month,
                      day,
                      time.hours(),
                      time.minutes()
                    );
                    this.setState({ startDateTime: startDate });
                  }}
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
                  format="HH:mm"
                  minuteStep={15}
                  disabledHours={() => [0, 1, 2, 3, 4, 5, 6, 7, 8, 22, 23, 24]}
                  hideDisabledOptions={true}
                  onChange={time => {
                    const date = new Date(this.props.conferenceDate);
                    const year = date.getFullYear();
                    const month = date.getMonth();
                    const day = date.getDate();
                    const endDate = new Date(
                      year,
                      month,
                      day,
                      time.hours(),
                      time.minutes()
                    );
                    this.setState({ endDateTime: endDate });
                  }}
                />
              </Form.Item>
            </Form.Item>
          </Form>
        </Modal>
      </React.Fragment>
    );
  }
}

export default EditSessionModal;
