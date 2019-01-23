import React, { Component } from 'react';
import './grid.css';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Session from './Session';
import { Button } from 'antd';
import { hasUserAnyRole, roles } from '../../utils/security';

class SessionGrid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timetable: []
    };
  }

  componentWillMount() {
    let newTimetable = [];
    for (let i = 0; i < 50; i++) {
      newTimetable[i] = 0;
    }
    const { sessions } = this.props;
    sessions.forEach(session => {
      for (
        let i = this.getSessionStartColumn(session) - 1;
        i <
        this.getSessionStartColumn(session) +
          this.getSessionColumnSpan(session);
        i++
      ) {
        newTimetable[i]++;
      }
    });
    this.setState({ timetable: newTimetable });
  }

  getSessionStartColumn = session => {
    const { startDateTime } = session;
    const startDate = new Date(startDateTime);

    let columnByHour = startDate.getHours() - 9;
    let columnByMinute = Math.trunc(startDate.getMinutes() / 15);
    return columnByMinute + columnByHour * 4 + 1;
  };

  getSessionColumnSpan = session => {
    const { startDateTime, endDateTime } = session;
    const startDate = new Date(startDateTime);
    const endDate = new Date(endDateTime);
    let diff = (endDate.getTime() - startDate.getTime()) / 1000;
    diff /= 60;
    diff = Math.abs(Math.round(diff));
    return Math.trunc(diff / 15);
  };

  render() {
    return (
      <React.Fragment>
        <div className="dateShow">
          Day {this.props.dayNum}: {this.props.date.getDate()}/
          {this.props.date.getMonth() + 1}/{this.props.date.getFullYear()}
          {hasUserAnyRole(this.props.userAttendance, roles.CONF_ORGANIZER, roles.EDITOR) && <Button
            size="small"
            onClick={() =>
              this.props.history.push(
                `/editSessions/${this.props.match.params.id}/${this.props.date}`
              )
            }
          >
            Edit
          </Button>}
        </div>
        <div className="grid">
          {console.log('estoy aqui')}
          {this.props.sessions.map(session => (
            <Session
              key={session.sessionID}
              session={session}
              presentations={this.props.presentations.filter(
                presentation =>
                  presentation.session.sessionID === session.sessionID
              )}
              timetable={this.state.timetable}
            />
          ))}
        </div>
      </React.Fragment>
    );
  }
}

SessionGrid.propTypes = {
  dayNum: PropTypes.number.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  sessions: PropTypes.array.isRequired,
  presentations: PropTypes.array.isRequired
};

export default withRouter(SessionGrid);
