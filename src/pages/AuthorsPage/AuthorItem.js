import 'antd/dist/antd.css';
import {Icon, Rate} from 'antd';
import {Link} from "react-router-dom";

import React, {Component} from 'react';

class AuthorItem extends Component {
    // constructor(props) {
    //     super(props);
    //     this.props.authorData.average = Number(this.props.authorData.average).toFixed(1);
    //     if (this.props.authorData.profile_image_url != null) {
    //         this.userImage =
    //             <div className="profileImage">
    //                 <img src={this.props.authorData.profile_image_url} alt=""/>
    //             </div>
    //     } else {
    //         this.userImage = <Icon className="userImage" type="user"/>
    //     }
    // }

    render() {
        const userData = this.props.authorData[0].userAuthor;

        return (
            <div className="authorItem tableItem">
                <div className="authorInfo">
                    <Icon className="userImage" type="user"/>
                    <Link to={`/conferenceProfile/0/${this.props.authorData}`}> <div className="authorName">{`${userData.firstName} ${userData.lastName}`}</div></Link>
                </div>
                <div className="articlesInfo">
                    <div className="articlesWritten">
                        Articles written: <span
                        className="numberOfArticlesWritten">{this.props.authorData.length}</span>
                    </div>
                    <div className="mostRecentArticle">
                        Most Recent: <span className="mostRecentArticleTitle">{this.props.authorData.sort(data => new Date(data.publishDate) - new Date(data.publishDate))[0].name}</span>
                    </div>
                </div>
                <div className="authorActivities">
                    <div className="proceedingsJoined">
                        Proceedings joined: <span>{this.props.authorData.filter(data => data.accepted).length}</span>
                    </div>
                    <div className="averageScore">
                        Average:
                        <Rate className="rateStars" value={parseFloat(3)} allowHalf
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