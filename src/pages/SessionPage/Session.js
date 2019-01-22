import React, { Component } from 'react';
import './grid.css';
import { withRouter } from 'react-router-dom';

class Session extends Component {
  getSessionStartColumn = () => {
    const { startDateTime } = this.props.session;
    const startDate = new Date(startDateTime);

    let columnByHour = startDate.getHours() - 9;
    let columnByMinute = Math.trunc(startDate.getMinutes() / 15);
    return columnByMinute + columnByHour * 4 + 1;
  };

  getSessionColumnSpan = () => {
    const { startDateTime, endDateTime } = this.props.session;
    const startDate = new Date(startDateTime);
    const endDate = new Date(endDateTime);
    let diff = (endDate.getTime() - startDate.getTime()) / 1000;
    diff /= 60;
    diff = Math.abs(Math.round(diff));
    return Math.trunc(diff / 15);
  };

  getRooms = () => {
    let rooms = '';
    this.props.presentations.forEach(presentation => {
      rooms += presentation.room;
      rooms += ', ';
    });
    return rooms.substring(0, rooms.length - 2);
  };

  render() {
    const { name, chairName } = this.props.session;
    const { timetable } = this.props;
    const rooms = this.getRooms();
    const columnSpan = this.getSessionColumnSpan();
    const startColumn = this.getSessionStartColumn();
    let midHeight = false;
    for (let i = startColumn - 1; i < startColumn + columnSpan; i++) {
      if (timetable[i] === 2) midHeight = true;
    }
    const startRow = timetable[startColumn];
    const rowSpan = midHeight ? 1 : 2;
    return (
      <div
        onClick={() =>
          this.props.history.push(
            `/sessionPresentations/${this.props.match.params.id}`
          )
        }
        className="sessionItem"
        style={{
          gridColumn: `${startColumn} / span ${columnSpan}`,
          gridRow: `${startRow} / span ${rowSpan}`
        }}
      >
        <h6 className="seshTitle">{name}</h6>
        <h6 className={midHeight ? 'hideSession' : ''}>{chairName}</h6>
        <h6 className={midHeight ? 'hideSession' : ''}>Rooms: {rooms}</h6>
      </div>
    );
  }
}

export default withRouter(Session);
