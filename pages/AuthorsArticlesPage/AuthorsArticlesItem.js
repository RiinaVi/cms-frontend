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
            <div className="AuthorsArticlesItem">
                <div className="authorsArticlesInfo">
                    {this.userImage}
                    <div className="authorName">{this.props.articleReviewData.name}</div>
                </div>
				<div className="articlesInfo">
                    <span className="articlesName">{this.props.articleReviewData.article_name}</span>
                </div>
				<div className="authorsArticlesDate">
                    <span className="articleReviewDate">{this.props.articleReviewData.publication_date}</span>
                </div>
                <div className="averageScore">
                        <Rate className="rateStars" value={parseFloat(this.props.articleReviewData.average)} allowHalf
                              defaultValue={0} disabled={true}/>
                        <div className="rateScore">
                            {this.props.articleReviewData.average}
                        </div>
                </div>
				<div className="articleAction">
                        <Icon type="download" className="downloadArticle" />
                </div>
            </div>
        );
    }
}

export default ArticleReviewItem;