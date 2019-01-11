import React, { Component } from 'react';
import './Conference.css';

class Conference extends Component {
  state = {
    conference: {
      title: 'Conference Title',
      place: 'Conference place',
      startDate: 'Conference start',
      endDate: 'Conference end',
      organizer: 'Conference organizer'
    }
  };

  render() {
    const {
      title,
      place,
      startDate,
      endDate,
      organizer
    } = this.state.conference;
    return (
      <div className="container">
        <div className="grid-container">
          <img
            className="item1"
            src="https://source.unsplash.com/bzdhc5b3Bxs/250x150"
            alt=""
          />
          <h1 className="item2">{title}</h1>
          <h3 className="item3">By: {organizer}</h3>
          <h3 className="item4">Place: {place}</h3>
          <h3 className="item5">From: {startDate}</h3>
          <h3 className="item6">To: {endDate}</h3>
        </div>

        <h2>Info:</h2>
        <div className="descriptionBox" />

        <a href="#">See the list of all Articles</a>
        <br />
        <a href="#">See the session plan</a>

        <button>Add to my Events</button>
      </div>
    );
  }
}

export default Conference;
