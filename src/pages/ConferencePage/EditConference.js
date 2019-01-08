import React, { Component } from 'react';
import './Conference.css';

class EditConference extends Component {
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
          <label htmlFor="by" className="item3">
            By:
            <input type="text" name="by" placeholder={organizer} />
          </label>
          <label htmlFor="place" className="item4">
            Place:
            <input type="text" name="date" placeholder={place} />
          </label>
          <label htmlFor="from" className="item5">
            From:
            <input type="text" name="from" placeholder={startDate} />
          </label>
          <label htmlFor="to" className="item6">
            To:
            <input type="text" name="to" placeholder={endDate} />
          </label>
        </div>
        <h2>Info:</h2>
        {/* <input type="textarea" className="descriptionBox" /> */}
        <textarea
          maxLength="750"
          className="descriptionBox"
          cols="30"
          rows="5"
        />
        <button id="b1">Edit the plan</button>
        <button id="b2">Save</button>
      </div>
    );
  }
}

export default EditConference;
