import { createContext, useContext, useState } from "react";

const MsgContext = createContext();

function ReactComponentCommunication() {
  const [msgA, setMsgA] = useState("");
  const handleA = (msg) => {
    setMsgA(msg);
  };

  const msgInner = "this is a inner msg";
  return (
    <MsgContext.Provider value={msgInner}>
      <div>
        <ComponentA onHandleA={handleA}>
          <ComponentB msgA={msgA} />
        </ComponentA>
      </div>
    </MsgContext.Provider>
  );
}

function ComponentA({ onHandleA, children }) {
  const name = "this is parent A";
  return (
    <div>
      <span>this is A component</span>
      <br />
      {children}
      <button
        onClick={() => {
          onHandleA(name);
        }}
      >
        send
      </button>
    </div>
  );
}

function ComponentB(props) {
  const msgInner = useContext(MsgContext);
  return (
    <div>
      <span>this is B component</span>
      <br />
      <span>this is prop from A:{props.msgA}</span>
      <br />
      <span>this is msgInner: {msgInner}</span>
    </div>
  );
}

export default ReactComponentCommunication;
