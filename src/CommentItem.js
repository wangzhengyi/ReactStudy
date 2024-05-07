import React from "react";

function CommentItem({ comment, user, handleDelete }) {
  return (
    <div className="reply-item" key={comment.rpid}>
      {/* 头像 */}
      <div className="root-reply-avatar">
        <div className="bili-avatar">
          <img className="bili-avatar-img" alt="" src={comment.user.avatar} />
        </div>
      </div>

      <div className="content-wrap">
        {/* 用户名 */}
        <div className="user-info">
          <div className="user-name">{comment.user.uname}</div>
        </div>
        {/*评论内容*/}
        <div className="root-reply">
          <span className="reply-content">{comment.content}</span>
          <div className="reply-info">
            {/* 评论时间 */}
            <span className="reply-time">{comment.ctime}</span>
            {/* 评论数量 */}
            <span className="reply-time">点赞数:{comment.like}</span>
            {comment.user.uid === user.uid && (
              <span
                className="delete-btn"
                onClick={() => {
                  handleDelete(comment);
                }}
              >
                删除
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentItem;
