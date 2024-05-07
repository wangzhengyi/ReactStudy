import { useEffect, useState } from "react";

const URL = "http://geek.itheima.net/v1_0/channels";

function getChannelList(onSetChannelList) {
  fetch(URL)
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("wzy say Network is error!");
      }
    })
    .then((data) => {
      onSetChannelList(data.data.channels);
    })
    .catch(() => {
      onSetChannelList([]);
    });
}

function Son() {
  useEffect(() => {
    const timer = setInterval(() => {
      console.log("开启定时器");
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <div>
      <span>this is son</span>
    </div>
  );
}
function StudyEffectComponent() {
  const [channelList, setChannelList] = useState([]);
  const [count, setCount] = useState(0);
  const [anotherCount, setAnotherCount] = useState(0);
  useEffect(() => {
    console.log("useEffect 执行了:" + count + "次");
  }, [count]);
  return (
    <div>
      this is app
      <br />
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        <span>更改count状态{count}</span>
      </button>
      <br />
      <button
        onClick={() => {
          setAnotherCount(anotherCount + 1);
        }}
      >
        <span>更改anotherCount状态{anotherCount}</span>
      </button>
      <ul>
        {channelList.map((channel) => {
          return <li key={channel.id}>{channel.name}</li>;
        })}
      </ul>
      <br />
      {count === 0 && <Son />}
    </div>
  );
}

export default StudyEffectComponent;
