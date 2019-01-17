import 'antd/dist/antd.css';
import {Icon, Rate} from 'antd';

import React, {Component} from 'react';

class ArticleReviewItem extends Component {
    constructor(props) {
        super(props);
        this.props.articleReviewData.average = Number(this.props.articleReviewData.average).toFixed(1);
        if (this.props.articleReviewData.profile_image_url != null) {
            this.userImage =
                <div className="profileImage">
                    <img src={this.props.articleReviewData.profile_image_url} alt=""/>
                </div>
        } else {
            this.userImage = <Icon className="userImage" type="user"/>
        }
    }

    render() {
        return (
            <div className="ArticleReviewItem">
                <div className="articleReviewInfo">
                    {this.userImage}
                    <div className="articleReviewerName">{this.props.articleReviewData.name}</div>
                </div>
                <div className="averageScore">
                        <Rate className="rateStars" value={parseFloat(this.props.articleReviewData.average)} allowHalf
                              defaultValue={0} disabled={true}/>
                        <div className="rateScore">
                            {this.props.articleReviewData.average}
                        </div>
                    </div>
				<div className="articleReviewDate">
                    <span className="articleReviewDate">{this.props.articleReviewData.publication_date}</span>
                </div>
            </div>
        );
    }
}

export default ArticleReviewItem;