import { useEffect } from "react";
import "./index.less";

const Aaa = () => {
  // 更新form数据
  useEffect(() => {
    console.log("aaa useEffect 333");
  }, []);
  return (
    <div className="a-box">
      <p className="a-p">aaa jsx</p>
    </div>
  );
};
export default Aaa;
