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
import EditSessionModal from './EditSessionModal';

let globSession;

class EditSessions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conference: {},
      sessions: [],
      targetSession: null,
      modalEditVisible: false,
      modalAddVisible: false,
      name: null,
      chairName: null,
      startDateTime: null,
      endDateTime: null,
      sessionID: null
    };
  }

  componentDidMount = () => {
    fetchConferenceSessions(this.props.match.params.id)
      .then(responseJson => {
        this.setState({ sessions: responseJson });
      })
      .catch(error => console.log(error));
    fetchSingleConference(this.props.match.params.id)
      .then(responseJson => {
        this.setState({ conference: responseJson });
      })
      .catch(error => console.log(error));
  };

  addSession = () => {
    this.setState({ modalAddVisible: false });
    const date = new Date(this.props.match.params.date);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    const session = {
      name: this.state.name,
      chairName: this.state.chairName,
      emergencyInfo: this.state.emergencyInfo,
      description: this.state.description,
      startDateTime: new Date(
        year,
        month,
        day,
        this.state.startDateTime.hours(),
        this.state.startDateTime.minutes()
      ),
      endDateTime: new Date(
        year,
        month,
        day,
        this.state.endDateTime.hours(),
        this.state.endDateTime.minutes()
      )
    };
    addConferenceSession(this.props.match.params.id, session)
      .then(() =>
        this.props.history.push(
          `/editSessions/${this.props.match.params.id}/${
            this.props.match.params.date
          }`
        )
      )
      .catch(error => {
        console.log(error);
        this.setState({ loadingSave: false });
      });
  };

  render() {
    if (this.state.sessions.length === 0) {
      return <div />;
    } else {
      const date = new Date(this.props.match.params.date);
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();
      const dataSource = this.state.sessions.filter(
        session =>
          new Date(session.startDateTime).getFullYear() === year &&
          new Date(session.startDateTime).getMonth() === month &&
          new Date(session.startDateTime).getDate() === day
      );
      const { Column, ColumnGroup } = Table;

      return (
        <div style={{ margin: '3%' }}>
          {/* Change hardcoded session name to data from backend */}
          <h1>
            {this.state.conference.conferenceName} - {day}/{month + 1}/{year}
          </h1>
          <Table pagination={false} dataSource={dataSource}>
            <ColumnGroup title="Sessions">
              <Column
                title="Start Time"
                width="10%"
                dataIndex="startDateTime"
                render={value =>
                  new Date(value).getHours() +
                  ':' +
                  new Date(value).getMinutes()
                }
                key="startDateTime"
              />
              <Column
                title="End time"
                width="10%"
                dataIndex="endDateTime"
                render={value =>
                  new Date(value).getHours() +
                  ':' +
                  new Date(value).getMinutes()
                }
                key="endDateTime"
              />
              <Column title="Name" dataIndex="name" key="name" />
              <Column title="Chair" dataIndex="chairName" key="chairName" />
              <Column
                title="Action"
                key="action"
                render={session => (
                  <span>
                    <EditSessionModal
                      session={session}
                      conferenceId={this.props.match.params.id}
                      conferenceDate={this.props.match.params.date}
                      onFinish={this.refresh}
                    />

                    <Divider type="vertical" />
                    <a
                      onClick={() =>
                        deleteConferenceSession(
                          this.props.match.params.id,
                          session.sessionID
                        )
                          .then(() =>
                            this.props.history.push(
                              `/editSessions/${this.props.match.params.id}/${
                                this.props.match.params.date
                              }`
                            )
                          )
                          .catch(error => {
                            console.log(error);
                            this.setState({ loadingSave: false });
                          })
                      }
                      href="javascript:;"
                    >
                      Delete
                    </a>
                  </span>
                )}
              />
            </ColumnGroup>
          </Table>
          <Button onClick={() => this.setState({ modalAddVisible: true })}>
            Add Session
          </Button>
          {/* 
            EDIT SESSION
          */}

          {/* 
            ADD SESSION
          */}
          <Modal
            title={`Add session`}
            visible={this.state.modalAddVisible}
            onOk={this.addSession}
            onCancel={() => this.setState({ modalAddVisible: false })}
            confirmLoading={this.state.saveReviewLoading}
          >
            <Form>
              <Form.Item>
                <Input
                  type="text"
                  placeholder="Session name"
                  onChange={e => this.setState({ name: e.target.value })}
                />
              </Form.Item>
              <Form.Item>
                <Input
                  type="text"
                  placeholder="Chair"
                  onChange={e => this.setState({ chairName: e.target.value })}
                />
              </Form.Item>
              <Form.Item style={{ marginBottom: 0 }}>
                <Form.Item
                  style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
                >
                  <TimePicker
                    format="HH:mm"
                    minuteStep={15}
                    disabledHours={() => [
                      0,
                      1,
                      2,
                      3,
                      4,
                      5,
                      6,
                      7,
                      8,
                      22,
                      23,
                      24
                    ]}
                    hideDisabledOptions={true}
                    onChange={time => this.setState({ startDateTime: time })}
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
                    disabledHours={() => [
                      0,
                      1,
                      2,
                      3,
                      4,
                      5,
                      6,
                      7,
                      8,
                      22,
                      23,
                      24
                    ]}
                    hideDisabledOptions={true}
                    defaultValue={moment('12:08:23', 'HH:mm:ss')}
                    onChange={time => this.setState({ endDateTime: time })}
                  />
                </Form.Item>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      );
    }
  }
}

export default withRouter(EditSessions);
