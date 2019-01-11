import React, { Component } from 'react';
import './Conference.css';
import { fetchSingleConference } from '../../connect/connectService';

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

        <a href="#">See the list of all Articles</a>
        <br />
        <a href="#">See the session plan</a>

        <button>Add to my Events</button>
      </div>
    );
  }
}

export default Conference;
