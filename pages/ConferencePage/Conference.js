import React, { Component } from 'react';
import './Conference.css';
import { fetchSingleConference } from '../../connect/connectService';
import { Button } from 'antd';
import {withRouter, Link} from "react-router-dom";

class Conference extends Component {
	constructor(props) {
		super(props);
		this.state = {
			conference: {}
		}
	}

  componentDidMount = () => {
		fetchSingleConference(this.props.match.params.id).then(responseJson => {
			this.setState({conference: responseJson})
		}).catch(error => console.log(error));
  }

  render() {
    const {
      conferenceName,
      description,
      accomodationInfo,
      emergencyInfo,
      startDate,
      finishDate,
      organizer
    } = this.state.conference;
    const organizerFirstName = !!this.state.conference && !!this.state.conference.organizer && organizer.firstName;
    const organizerLastName = !!this.state.conference && !!this.state.conference.organizer && organizer.lastName;
    return (
      <div className="container">
        <div className="grid-container">
          <img
            className="item1"
            src="https://source.unsplash.com/bzdhc5b3Bxs/250x150"
            alt=""
          />
          <h1 className="item2">{conferenceName}</h1>
          <h3 className="item3">By: {`${organizerFirstName} ${organizerLastName}`}</h3>
          <h3 className="item4">Place: {accomodationInfo}</h3>
          <h3 className="item5">From: {startDate}</h3>
          <h3 className="item6">To: {finishDate}</h3>
        </div>

        <h2>Info:</h2>
        <div className="descriptionBox" >
          {description}
        </div>

        <Link to={`/conferencesArticles/${this.props.match.params.id}`}>See the list of all Articles</Link>
        <br />
        <Link to={`/conferencesSessions/${this.props.match.params.id}`}>See the session plan</Link>

        {!!this.props.userData && this.props.userData.role === 'admin' && <Button size='large' onClick={() => this.props.history.push(`/conferencesEdit/${this.props.match.params.id}`)}>Edit Event</Button>}
        <Button type='primary' size='large'>Add to my Events</Button>
      </div>
    );
  }
}

export default withRouter(Conference);
