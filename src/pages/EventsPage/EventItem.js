import 'antd/dist/antd.css';
import {Icon, Rate} from 'antd';

import React, {Component} from 'react';

class EventItem extends Component {
    render() {
        return (
            <div className="eventItem tableItem">
                <div className="eventPage_chosenAuthor">
                    {this.props.eventData.organizerID}
                </div>
                <div className="eventPage_articleTitle">
                    <span className="eventPage_articleTitle_text">{this.props.eventData.conferenceName}</span>
                </div>
                <div className="eventPage_date"><span className="eventPage_date_text">{this.props.eventData.startDate}</span></div>
                <div className="eventPage_date"><span className="eventPage_date_text">{this.props.eventData.finishDate}</span></div>
                <div className="eventPage_download">
                    <a href="#">
                        <Icon type="download" />
                    </a>
                </div>
            </div>
        );
    }
}

export default EventItem;