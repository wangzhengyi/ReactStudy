import classNames from "classnames";
import React from "react";

function CommentNavigation({ tabs, tabType, handleTabClick }) {
  return (
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
                  handleTabClick(tab.type);
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
  );
}
export default CommentNavigation;
