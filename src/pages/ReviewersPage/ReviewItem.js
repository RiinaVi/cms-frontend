import 'antd/dist/antd.css';
import { Icon, Rate } from 'antd';

import React, {Component} from 'react';

class ReviewItem extends Component {
    constructor(props) {
        super(props);
        this.props.authorData.average = Number(this.props.authorData.average).toFixed(1);
        //this.authorData = this.props.authorData;
        if(this.props.authorData.profile_image_url!=null){
            this.userImage =
                <div className="profileImage">
                    <img src={this.props.authorData.profile_image_url} alt=""/>
                </div>
        }else{
            this.userImage = <Icon className = "userImage" type="user" />
        }
    }

    render() {
        return (
            <div className="reviewerItem">
                <div className="reviewerInfo">
                    {this.userImage}
                    <div className="reviewerName">{this.props.authorData.name}</div>
                </div>
                <div className="articlesInfo">
                    <div className="articlesWritten">
                        Recently reviewed: <a href={this.props.authorData.link} className="mostRecentArticleTitle">{this.props.authorData.most_recent}</a>
                    </div>
                    <div className="mostRecentArticle">
                        Reviews written: <span className="numberOfArticlesWritten">{this.props.authorData.reviews_count}</span>
                    </div>
                </div>
                <div className="reviewerActivities">
                    <div className="articlesRead">
                        Articles read: <span>{this.props.authorData.articles_read}</span>
                    </div>
                    <div className="proceedingsJoined">
                        Proceedings joined: <span>{this.props.authorData.joined}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default ReviewItem;