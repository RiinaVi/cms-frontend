import 'antd/dist/antd.css';
import {Icon, Rate} from 'antd';

import React, {Component} from 'react';

class ArticleItem extends Component {
    render() {
        return (
            <div className="articleItem">
                <div className="articleInfo">
                    <div className="articleAuthorName">{this.props.articleData.userAuthorID}</div>
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
                        <Icon type="read" className="readArticle" />
                </div>
            </div>
        );
    }
}

export default ArticleItem;