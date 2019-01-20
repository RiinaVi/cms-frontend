import 'antd/dist/antd.css';
import {Icon, Rate} from 'antd';
import * as download from 'downloadjs';

import React, {Component} from 'react';
import {Link} from "react-router-dom";
import { downloadArticle } from '../../connect/connectService';

class ArticleItem extends Component {
    downloadArticle = () => {
        downloadArticle(this.props.articleData.documentUrl).then(responseBlob => {
            const articleName = !!this.props.articleData.article ? this.props.articleData.article.name : 'article.pdf';
            download(responseBlob, articleName);
        }).catch(error => console.log(error));
    }

    render() {
        const author = this.props.articleData.article && this.props.articleData.article.userAuthor;

        return (
            <div className="articleItem tableItem">
                <div className="articleInfo">
                    <Link to={`/conferenceProfile/${this.props.conferenceId}/${author.id}`}><div className="articleAuthorName">{author && `${author.firstName} ${author.lastName}`}</div></Link>
                </div>
                <div className="articlesInfo">
                    <div className="articleName">
					<span className="theArticleName">{!!this.props.articleData.article && this.props.articleData.article.name}</span>
                    </div>
                </div>
				<div className="articleDate">
                    <span className="articleDate">{!!this.props.articleData.article && this.props.articleData.article.publishDate}</span>
                </div>
                <div className="articleAction">
                        <Icon type="download" className="downloadArticle" onClick={this.downloadArticle} />
                        <Link to="/ArticleReviews"><Icon type="read" className="readArticle" /></Link>
                </div>
            </div>
        );
    }
}

export default ArticleItem;