import React, { Component } from 'react';
import './grid.css';
import PropTypes from 'prop-types';

class SessionGrid extends Component {
  sortSessions = session => {
    const { title, startDate, endDate, room, chair } = session;
    let diff = (endDate.getTime() - startDate.getTime()) / 1000;
    diff /= 60;
    diff = Math.abs(Math.round(diff));
    let numberOfCols = Math.trunc(diff / 15);

    let columnByHour = startDate.getHours() - 9;
    let columnByMinute = Math.trunc(startDate.getMinutes() / 15);

    let startColumn = columnByMinute + columnByHour * 4 + 1;

    return `
      <div class="sessionItem" style="grid-column: ${startColumn} / span ${numberOfCols}">
      <h6 class="seshTitle">${title}</h6>
      <h6>${chair}</h6>
        <h6>${room}</h6>
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
