import 'antd/dist/antd.css';
import {Icon, Rate} from 'antd';

import React, {Component} from 'react';

class AuthorItem extends Component {
    constructor(props) {
        super(props);
        this.props.authorData.average = Number(this.props.authorData.average).toFixed(1);
        if (this.props.authorData.profile_image_url != null) {
            this.userImage =
                <div className="profileImage">
                    <img src={this.props.authorData.profile_image_url} alt=""/>
                </div>
        } else {
            this.userImage = <Icon className="userImage" type="user"/>
        }
    }

    render() {
        return (
            <div className="authorItem tableItem">
                <div className="authorInfo">
                    {this.userImage}
                    <div className="authorName">{this.props.authorData.name}</div>
                </div>
                <div className="articlesInfo">
                    <div className="articlesWritten">
                        Articles written: <span
                        className="numberOfArticlesWritten">{this.props.authorData.articles_count}</span>
                    </div>
                    <div className="mostRecentArticle">
                        Most Recent: <span className="mostRecentArticleTitle">{this.props.authorData.most_recent}</span>
                    </div>
                </div>
                <div className="authorActivities">
                    <div className="proceedingsJoined">
                        Proceedings joined: <span>{this.props.authorData.joined}</span>
                    </div>
                    <div className="averageScore">
                        Average:
                        <Rate className="rateStars" value={parseFloat(this.props.authorData.average)} allowHalf
                              defaultValue={0} disabled={true}/>
                        <div className="rateScore">
                            {this.props.authorData.average}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AuthorItem;