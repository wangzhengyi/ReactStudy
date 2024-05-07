import "./App.scss";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CommentItem from "./CommentItem";
import CommentNavigation from "./CommentNavigation";
import CommentPublish from "./CommentPublish";
import { generateComment, sortListByLike, sortListByTime } from "./utils";
import { tabs, user } from "./data";

/**
 * 导航 Tab 的渲染和操作
 *
 * 1. 渲染导航 Tab 和高亮
 * 2. 评论列表排序
 *  最热 => 喜欢数量降序
 *  最新 => 创建时间降序
 */

function useCommentList() {
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    // 定义获取列表函数
    function getCommentList() {
      axios
        .get("http://localhost:3004/list")
        .then((rsp) => {
          return new Promise((resolve) => {
            resolve(sortListByTime(rsp.data));
          });
        })
        .then((list) => {
          setCommentList(list);
        });
    }
    getCommentList();
  }, []);

  return {
    commentList,
    setCommentList,
  };
}

function App() {
  const [tabType, setTabType] = useState("time");
  const { commentList, setCommentList } = useCommentList();

  return (
    <div className="app">
      {/* 导航 Tab */}
      <CommentNavigation
        tabs={tabs}
        tabType={tabType}
        handleTabClick={(type) => {
          setTabType(type);
          if (type === "hot") {
            setCommentList(sortListByLike(commentList));
          } else {
            setCommentList(sortListByTime(commentList));
          }
        }}
      />

      <div className="reply-wrap">
        {/* 发表评论 */}
        <CommentPublish
          handlePublish={(inputComment) => {
            if (inputComment && inputComment.trim().length > 0) {
              setCommentList([generateComment(inputComment), ...commentList]);
              setTabType("time");
            }
          }}
        />
        {/* 评论列表 */}
        <div className="reply-list">
          {commentList.map((comment) => {
            return (
              <CommentItem
                key={comment.rpid}
                comment={comment}
                user={user}
                handleDelete={(comment) => {
                  setCommentList(
                    commentList.filter((item) => {
                      console.log(item, comment);
                      return item.rpid !== comment.rpid;
                    }),
                  );
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
