import { useState } from "react";

function useToggle() {
  const [value, setValue] = useState(true);
  const toggle = () => {
    setValue(!value);
  };

  return {
    value,
    toggle,
  };
}

export function AppHook() {
  const { value, toggle } = useToggle();
  return (
    <div>
      {value && <span>this is span</span>}
      <br />
      <button onClick={toggle}>toggle</button>
    </div>
  );
}
