import 'antd/dist/antd.css';
import {Icon, Rate} from 'antd';

import React, {Component} from 'react';

class ArticleItem extends Component {
    constructor(props) {
        super(props);
        this.props.articleData.average = Number(this.props.articleData.average).toFixed(1);
        if (this.props.articleData.profile_image_url != null) {
            this.userImage =
                <div className="profileImage">
                    <img src={this.props.articleData.profile_image_url} alt=""/>
                </div>
        } else {
            this.userImage = <Icon className="userImage" type="user"/>
        }
    }

    render() {
        return (
            <div className="articleItem">
                <div className="articleInfo">
                    {this.userImage}
                    <div className="articleAuthorName">{this.props.articleData.name}</div>
                </div>
                <div className="articlesInfo">
                    <div className="articleName">
					<span className="theArticleName">{this.props.articleData.article_name}</span>
                    </div>
                </div>
				<div className="articleDate">
                    <span className="articleDate">{this.props.articleData.publication_date}</span>
                </div>
                <div className="articleAction">
                        <Icon type="download" className="downloadArticle" />
                        <Icon type="read" className="readArticle" />
                </div>
            </div>
        );
    }
}

export default ArticleItem;