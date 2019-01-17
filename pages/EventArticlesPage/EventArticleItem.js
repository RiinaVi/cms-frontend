import 'antd/dist/antd.css';
import {Icon, Rate} from 'antd';

import React, {Component} from 'react';

class EventItem extends Component {
    render() {
        return (
            <div className="eventItem tableItem">
                <div className="eventPage_chosenAuthor">
                    {this.props.eventData.name}
                </div>
                <div className="eventPage_articleTitle">
                    <span className="eventPage_articleTitle_text">{this.props.eventData.title}</span>
                </div>
                <div className="eventPage_date"><span className="eventPage_date_text">{this.props.eventData.date}</span></div>
                <div className="eventPage_rating">
                    <Rate className="eventPage_rating_stars" value={parseFloat(this.props.eventData.rating)} allowHalf
                          defaultValue={0} disabled={true}/>
                    <div className="eventPage_rating_score">{this.props.eventData.rating}</div>
                </div>
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