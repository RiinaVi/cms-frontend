import React, { Component } from 'react';
import './grid.css';
import PropTypes from 'prop-types';

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
    const { startDate } = session;

    let columnByHour = startDate.getHours() - 9;
    let columnByMinute = Math.trunc(startDate.getMinutes() / 15);
    return columnByMinute + columnByHour * 4 + 1;
  };

  getSessionColumnSpan = session => {
    const { startDate, endDate } = session;
    let diff = (endDate.getTime() - startDate.getTime()) / 1000;
    diff /= 60;
    diff = Math.abs(Math.round(diff));
    return Math.trunc(diff / 15);
  };

  sortSessions = session => {
    const { title, room, chair } = session;
    const { timetable } = this.state;
    const columnSpan = this.getSessionColumnSpan(session);
    const startColumn = this.getSessionStartColumn(session);
    let midHeight = false;
    for (let i = startColumn - 1; i < startColumn + columnSpan; i++) {
      if (timetable[i] === 2) midHeight = true;
    }
    const startRow = timetable[startColumn];
    const rowSpan = midHeight ? 1 : 2;
    return `
      <div class="sessionItem" style="grid-column: ${startColumn} / span ${columnSpan};grid-row: ${startRow} / span ${rowSpan}">
      <h6 class="seshTitle">${title}</h6>
      <h6 class="${midHeight ? 'hideSession' : ''}">${chair}</h6>
      <h6 class="${midHeight ? 'hideSession' : ''}">${room}</h6>
      </div>
      `;
  };

  render() {
    let htmlReturn = `
    <div class="dateShow">
    Day ${this.props.dayNum}: ${this.props.date.getDate()}/
    ${this.props.date.getMonth()+1}/${this.props.date.getFullYear()}
    </div>
    <div class="grid">
    `;
    const { sessions } = this.props;
    sessions.forEach(session => (htmlReturn += this.sortSessions(session)));
    htmlReturn += ' </div>';

    return <div dangerouslySetInnerHTML={{ __html: htmlReturn }} />;
  }
}

SessionGrid.propTypes = {
  dayNum: PropTypes.number.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  sessions: PropTypes.array.isRequired
};

export default SessionGrid;
