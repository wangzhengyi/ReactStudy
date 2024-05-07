import { v4 as uuidV4 } from "uuid";
import avatar from "./images/bozai.png";

export function getFormattedTime() {
  const date = new Date();
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // 月份从 0 开始，所以 +1
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

export function sortListByTime(list) {
  return list.slice().sort((itemA, itemB) => {
    if (itemB.ctime > itemA.ctime) {
      return 1;
    } else if (itemB.ctime < itemA.ctime) {
      return -1;
    } else {
      return 0;
    }
  });
}

export function sortListByLike(list) {
  return list.slice().sort((itemA, itemB) => {
    return itemB.like - itemA.like;
  });
}

export function generateComment(inputComment) {
  return {
    rpid: uuidV4(), // 评论id
    content: inputComment,
    ctime: getFormattedTime(), // 评论时间
    like: 0,
    user: {
      uid: "30009257", // 用户id
      avatar, // 用户头像
      uname: "黑马前端", // 用户昵称
    },
  };
}
