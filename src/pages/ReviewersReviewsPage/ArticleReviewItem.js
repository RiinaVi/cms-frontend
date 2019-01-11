import 'antd/dist/antd.css';
import {Icon, Rate} from 'antd';

import React, {Component} from 'react';

class ArticleReviewItem extends Component {
    render() {
        return (
            <div className="ArticleReviewItem">
                <div className="articleReviewInfo">
                    {this.userImage}
                    <div className="articleReviewerName">{this.props.articleReviewData.name}</div>
                </div>
                <div className="averageScore">
                        <Rate className="rateStars" value={parseFloat(this.props.articleReviewData.grade)} allowHalf
                              defaultValue={0} disabled={true}/>
                        <div className="rateScore">
                            {this.props.articleReviewData.grade}
                        </div>
                    </div>
				<div className="articleReviewDate">
                    <span className="articleReviewDate">{this.props.articleReviewData.comment}</span>
                </div>
            </div>
        );
    }
}

export default ArticleReviewItem;