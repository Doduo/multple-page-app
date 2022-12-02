import { useEffect } from "react";
import AAA from "@components/aaa/index";
import "./index.less";

const Aaa = () => {
  // 更新form数据
  useEffect(() => {
    console.log("aaa useEffect 333");
  }, []);
  return (
    <div className="a-box">
      <p className="a-p">aaa jsx</p>
      <AAA />
    </div>
  );
};
export default Aaa;
