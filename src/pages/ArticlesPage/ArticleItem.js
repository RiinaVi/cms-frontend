import 'antd/dist/antd.css';
import {Icon, Rate, Modal, Input} from 'antd';
import * as download from 'downloadjs';

import React, {Component} from 'react';
import {Link} from "react-router-dom";
import { downloadArticle, addReview, updateReview, fetchReviewForArticle } from '../../connect/connectService';
import { roles, hasUserAnyRole } from '../../utils/security';

class ArticleItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalEditVisible: false,
      modalShowVisible: false,
      saveReviewLoading: false,
      reviewEditGrade: 2.5,
      reviewEditComment: '',
      reviewCurrent: null
    }
  }

  getReview = () => {
    const articleId = this.props.articleData.article && this.props.articleData.article.articleID;
    fetchReviewForArticle(articleId).then(responseJson => {
			this.setState({reviewCurrent: responseJson, reviewEditGrade: responseJson ? responseJson.grade : 2.5, reviewEditComment: responseJson ? responseJson.comment : ''})
		}).catch(error => console.log(error))
  }

  saveReview = () => {
    this.setState({saveReviewLoading: true});
    const params = {
      articleID: this.props.articleData.article && this.props.articleData.article.articleID,
      grade: this.state.reviewEditGrade,
      comment: this.state.reviewEditComment
    }
    !this.state.reviewCurrent ? addReview(params).then(responseJson => {
			this.setState({saveReviewLoading: false, modalEditVisible: false})
		}).catch(error => console.log(error)) : updateReview(this.state.reviewCurrent.reviewID, params).then(responseJson => {
			this.setState({saveReviewLoading: false, modalEditVisible: false})
		}).catch(error => console.log(error))
  }

  downloadArticle = () => {
    downloadArticle(this.props.articleData.documentUrl).then(responseBlob => {
      const articleName = !!this.props.articleData.article ? this.props.articleData.article.name : 'article.pdf';
      download(responseBlob, articleName);
    }).catch(error => console.log(error));
  }

  readOrEditReview = editModeActive => {
    this.getReview();
    editModeActive ? this.setState({modalEditVisible: true}) : this.setState({modalShowVisible: true});
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
          <Icon type="download" onClick={this.downloadArticle} style={{fontSize: '2em', cursor: 'pointer'}} />
          <Icon type="read" onClick={() => this.readOrEditReview(false)} style={{fontSize: '2em', cursor: 'pointer'}} />
          {this.props.userData && hasUserAnyRole(this.props.userAttendance, roles.REVIEWER) && <Icon type="edit" onClick={() => this.readOrEditReview(true)} style={{fontSize: '2em', cursor: 'pointer'}} />}
        </div>
        <Modal
          title="Read review"
          visible={this.state.modalShowVisible}
          onOk={() => this.setState({modalShowVisible: false})}
          onCancel={() => this.setState({modalShowVisible: false})}
          >
          {this.state.reviewCurrent && <Rate disabled allowHalf defaultValue={2.5} value={this.state.reviewCurrent.grade} />}
          <br />
          {this.state.reviewCurrent && this.state.reviewCurrent.comment}
          {!this.state.reviewCurrent && 'No review'}
        </Modal>
        <Modal
          title={`${this.state.reviewCurrent ? 'Edit' : 'Add'} review`}
          visible={this.state.modalEditVisible}
          onOk={this.saveReview}
          onCancel={() => this.setState({modalEditVisible: false})}
          confirmLoading={this.state.saveReviewLoading}
          >
          <Rate allowHalf defaultValue={2.5} value={this.state.reviewEditGrade} onChange={grade => this.setState({reviewEditGrade: grade})} />
          <Input.TextArea rows={4} value={this.state.reviewEditComment} onChange={e => this.setState({reviewEditComment: e.target.value})} />
        </Modal>
      </div>
    );
  }
}

export default ArticleItem;