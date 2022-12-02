import { useEffect } from "react";

const Bbb = () => {
  // 更新form数据
  useEffect(() => {
    console.log("bbb useEffect 222");
  }, []);
  return <div>bbb jsx</div>;
};
export default Bbb;
