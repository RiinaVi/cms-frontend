import 'antd/dist/antd.css';
import {Icon, Rate} from 'antd';

import React, {Component} from 'react';
import {Link} from "react-router-dom";

class ArticleItem extends Component {
    render() {
        return (
            <div className="articleItem tableItem">
                <div className="articleInfo">
                    <Link to="/AuthorArticlesPage"><div className="articleAuthorName">{this.props.articleData.authorName}</div></Link>
                </div>
                <div className="articlesInfo">
                    <div className="articleName">
					<span className="theArticleName">{this.props.articleData.name}</span>
                    </div>
                </div>
				<div className="articleDate">
                    <span className="articleDate">{this.props.articleData.publishDate}</span>
                </div>
                <div className="articleAction">
                        <Icon type="download" className="downloadArticle" />
                        <Link to="/ArticleReviews"><Icon type="read" className="readArticle" /></Link>
                </div>
            </div>
        );
    }
}

export default ArticleItem;