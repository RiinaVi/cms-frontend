import 'antd/dist/antd.css';
import {Icon, Rate} from 'antd';
import {withRouter} from "react-router-dom";

import React, {Component} from 'react';

class EventItem extends Component {
    render() {
        const organizer = this.props.eventData.organizer;
        return (
            <div onClick={() => this.props.history.push(`/conferences/${this.props.eventData.conferenceID}`)} className="eventItem tableItem">
                <div className="eventPage_download">
                    <Icon type="home" />
                </div>
                <div className="eventPage_chosenAuthor">
                    {!!organizer && `${organizer.firstName} ${organizer.lastName}`}
                </div>
                <div className="eventPage_articleTitle">
                    <span className="eventPage_articleTitle_text">{this.props.eventData.conferenceName}</span>
                </div>
                <div className="eventPage_date"><span className="eventPage_date_text">{this.props.eventData.startDate}</span></div>
                <div className="eventPage_date"><span className="eventPage_date_text">{this.props.eventData.finishDate}</span></div>
            </div>
        );
    }
}

export default withRouter(EventItem);