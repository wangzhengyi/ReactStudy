import React, { useRef, useState } from "react";
import avatar from "./images/bozai.png";

function CommentPublish({ handlePublish }) {
  const textArea = useRef(null);
  const [inputComment, setInputComment] = useState("");

  return (
    <div className="box-normal">
      {/* 当前用户头像 */}
      <div className="reply-box-avatar">
        <div className="bili-avatar">
          <img className="bili-avatar-img" src={avatar} alt="用户头像" />
        </div>
      </div>
      <div className="reply-box-wrap">
        {/* 评论框 */}
        <textarea
          ref={textArea}
          className="reply-box-textarea"
          placeholder="发一条友善的评论"
          value={inputComment}
          onChange={(event) => {
            setInputComment(event.target.value);
          }}
        />
        {/* 发布按钮 */}
        <div className="reply-box-send">
          <div
            className="send-text"
            onClick={() => {
              handlePublish(inputComment);
              setInputComment("");
              textArea.current.focus();
            }}
          >
            发布
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentPublish;
