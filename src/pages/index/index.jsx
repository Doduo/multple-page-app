import { useEffect } from "react";

const Index = () => {
  // 更新form数据
  useEffect(() => {
    console.log("Index useEffect 000");
  }, []);
  return <div>Index jsx</div>;
};
export default Index;
