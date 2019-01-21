import React, { Component } from 'react';
import './style.css';
import './grid.css';
import SessionGrid from './SessionGrid';
import { sessions } from './data';
import { withRouter } from 'react-router-dom';
import {
  fetchConferenceSessions,
  fetchConferencePresentations
} from '../../connect/connectService';

class SessionPlan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessions: [],
      presentations: []
    };
  }

  componentDidMount = () => {
    fetchConferenceSessions(this.props.match.params.id)
      .then(responseJson => {
        this.setState({ sessions: responseJson });
      })
      .catch(error => console.log(error));
    fetchConferencePresentations(this.props.match.params.id)
      .then(responseJson => {
        this.setState({ presentations: responseJson });
      })
      .catch(error => console.log(error));
  };

  render() {
    if (this.state.sessions.length === 0) {
      return <div />;
    } else {
      const {
        startDate,
        finishDate,
        conferenceName
      } = this.state.sessions[0].conference;
      console.log(this.state.sessions);
      const confDates = [];
      let confDuration = 0;
      const confStart = new Date(startDate);
      const confEnd = new Date(finishDate);
      for (let i = confStart; i <= confEnd; i.setDate(i.getDate() + 1)) {
        confDuration++;
        let dateObj = {
          id: confDuration,
          date: new Date(i.getTime())
        };
        confDates.push(dateObj);
      }

      /*       const seshTrial = this.state.sessions.filter(
        session =>
          new Date(session.startDateTime).getFullYear() ===
            new Date(2019, 1, 17).getFullYear() &&
          new Date(session.startDateTime).getMonth() ===
            new Date(2019, 1, 17).date.getMonth() &&
          new Date(session.startDateTime).getDate() ===
            new Date(2019, 1, 17).date.getDate()
      );
      console.log('seshTrial');
      console.log(seshTrial); */

      return (
        <div style={{ margin: '3%' }}>
          <h1 className="confTitle">{conferenceName}</h1>
          <table className="headerTable">
            <tbody>
              <tr className="seshTr">
                <th className="seshTh firstTH" />
                <th className="seshTh">
                  <span className="vertical">9:00</span>
                </th>
                <th className="seshTh">
                  <span className="vertical">10:00</span>
                </th>
                <th className="seshTh">
                  <span className="vertical">11:00</span>
                </th>
                <th className="seshTh">
                  <span className="vertical">12:00</span>
                </th>
                <th className="seshTh">
                  <span className="vertical">13:00</span>
                </th>
                <th className="seshTh">
                  <span className="vertical">14:00</span>
                </th>
                <th className="seshTh">
                  <span className="vertical">15:00</span>
                </th>
                <th className="seshTh">
                  <span className="vertical">16:00</span>
                </th>
                <th className="seshTh">
                  <span className="vertical">17:00</span>
                </th>
                <th className="seshTh">
                  <span className="vertical">18:00</span>
                </th>
                <th className="seshTh">
                  <span className="vertical">19:00</span>
                </th>
                <th className="seshTh">
                  <span className="vertical">20:00</span>
                </th>
                <th className="seshTh">
                  <span className="vertical">21:00</span>
                </th>

                <th className="lastTH" />
              </tr>
            </tbody>
          </table>
          {confDates.map(date => (
            <SessionGrid
              key={date.id}
              dayNum={date.id}
              date={date.date}
              sessions={this.state.sessions.filter(
                session =>
                  new Date(session.startDateTime).getFullYear() ===
                    date.date.getFullYear() &&
                  new Date(session.startDateTime).getMonth() ===
                    date.date.getMonth() &&
                  new Date(session.startDateTime).getDate() ===
                    date.date.getDate()
              )}
              presentations={this.state.presentations}
            />
          ))}
        </div>
      );
    }
  }
}

export default withRouter(SessionPlan);
