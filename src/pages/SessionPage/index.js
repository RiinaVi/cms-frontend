import React, { Component } from 'react'
import SessionGrid from './SessionGrid';
import { sessions } from './data';
import { DatePicker } from 'antd';
import * as moment from 'moment';

export default class SessionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: moment()
    }
  }

  render() {
    return (
      <div>
        <DatePicker format="YYYY-MM-DD" value={this.state.selectedDate} onChange={(date, dateString) => this.setState({selectedDate: date})} />
        <SessionGrid 
          dayNum={1}
          date={this.state.selectedDate.toDate()}
          sessions={sessions}></SessionGrid>
      </div>
    )
  }
}
