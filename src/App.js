import "./App.scss";
import avatar from "./images/bozai.png";
import { useState } from "react";
import classNames from "classnames";

/**
 * 评论列表的渲染和操作
 *
 * 1. 根据状态渲染评论列表
 * 2. 删除评论
 */

// 评论列表数据
const defaultList = [
  {
    // 评论id
    rpid: 3, // 用户信息
    user: {
      uid: "13258165",
      avatar: avatar,
      uname: "周杰伦",
    }, // 评论内容
    content: "哎哟，不错哦-1", // 评论时间
    ctime: "10-18 08:15",
    like: 87,
  },
  {
    rpid: 2,
    user: {
      uid: "36080105",
      avatar: avatar,
      uname: "许嵩",
    },
    content: "我寻你千百度 日出到迟暮",
    ctime: "11-13 11:29",
    like: 88,
  },
  {
    rpid: 1,
    user: {
      uid: "30009257",
      avatar: avatar,
      uname: "黑马前端",
    },
    content: "学前端就来黑马",
    ctime: "10-19 09:00",
    like: 66,
  },
];
// 当前登录用户信息
const user = {
  // 用户id
  uid: "30009257", // 用户头像
  avatar, // 用户昵称
  uname: "黑马前端",
};

/**
 * 导航 Tab 的渲染和操作
 *
 * 1. 渲染导航 Tab 和高亮
 * 2. 评论列表排序
 *  最热 => 喜欢数量降序
 *  最新 => 创建时间降序
 */

// 导航 Tab 数组
const tabs = [
  { type: "hot", text: "最热" },
  { type: "time", text: "最新" },
];

const App = () => {
  const [commentList, setCommentList] = useState(
    defaultList.sort((itemA, itemB) => {
      if (itemB.ctime > itemA.ctime) {
        return 1;
      } else if (itemB.ctime < itemA.ctime) {
        return -1;
      } else {
        return 0;
      }
    }),
  );
  const [tabType, setTabType] = useState("time");
  return (
    <div className="app">
      {/* 导航 Tab */}
      <div className="reply-navigation">
        <ul className="nav-bar">
          <li className="nav-title">
            <span className="nav-title-text">评论</span>
            {/* 评论数量 */}
            <span className="total-reply">{10}</span>
          </li>
          <li className="nav-sort">
            {/* 高亮类名： active */}
            {tabs.map((tab) => {
              return (
                <span
                  className={classNames("nav-item", {
                    active: tab.type === tabType,
                  })}
                  onClick={() => {
                    setTabType(tab.type);
                    if (tab.type === "hot") {
                      setCommentList(
                        commentList.slice().sort((itemA, itemB) => {
                          return itemB.like - itemA.like;
                        }),
                      );
                    } else {
                      setCommentList(
                        commentList.slice().sort((itemA, itemB) => {
                          if (itemB.ctime > itemA.ctime) {
                            return 1;
                          } else if (itemB.ctime < itemA.ctime) {
                            return -1;
                          } else {
                            return 0;
                          }
                        }),
                      );
                    }
                  }}
                  key={tab.type}
                >
                  {tab.text}
                </span>
              );
            })}
          </li>
        </ul>
      </div>

      <div className="reply-wrap">
        {/* 发表评论 */}
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
              className="reply-box-textarea"
              placeholder="发一条友善的评论"
            />
            {/* 发布按钮 */}
            <div className="reply-box-send">
              <div className="send-text">发布</div>
            </div>
          </div>
        </div>
        {/* 评论列表 */}
        <div className="reply-list">
          {commentList.map((comment) => {
            return (
              <div className="reply-item" key={comment.rpid}>
                {/* 头像 */}
                <div className="root-reply-avatar">
                  <div className="bili-avatar">
                    <img
                      className="bili-avatar-img"
                      alt=""
                      src={comment.user.avatar}
                    />
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
                            setCommentList(
                              commentList.filter((item) => {
                                return item.user.uid !== comment.user.uid;
                              }),
                            );
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
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
