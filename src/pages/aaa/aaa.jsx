<<<<<<< HEAD
import { useEffect } from 'react';
import AAA from '@components/aaa/index';
import './index.less';
import { Button, DatePicker, Space, version } from 'antd';
const Aaa = () => {
	// 更新form数据
	useEffect(() => {
		console.log('aaa useEffect 333');
	}, []);
	return (
		<div className="a-box">
			<p className="a-p">aaa jsx</p>
			<AAA />
			<div className="App">
				<h1>antd version: {version}</h1>
				<Space>
					<DatePicker />
					<Button type="primary">Primary Button</Button>
				</Space>
			</div>
		</div>
	);
=======
import { useEffect } from "react";
import AAA from "@components/aaa/index";
import "./index.less";
import { Button, DatePicker, Space, version } from "antd";

const Aaa = () => {
  // 更新form数据
  useEffect(() => {
    console.log("aaa useEffect 333");
  }, []);
  return (
    <div className="a-box">
      <p className="a-p">aaa jsx</p>
      <AAA />
      <div className="App">
        <h1>antd version: {version}</h1>
        <Space>
          <DatePicker />
          <Button type="primary">Primary Button</Button>
        </Space>
      </div>
    </div>
  );
>>>>>>> 6d098a9c0daafd51755cf30273ece53aa669de00
};
export default Aaa;
