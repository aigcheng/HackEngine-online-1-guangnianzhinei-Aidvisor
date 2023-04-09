import { Avatar, Button, Modal } from 'antd';
import { useState } from 'react';

function MemberInfoPage(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  // 处理点击添加印象按钮
  const handleAddImpressionClick = () => {
    setIsModalVisible(true);
  };

  // 处理模态框关闭
  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Avatar src={props.member.avatar} size={64} />
      <p>姓名：{props.member.name}</p>
      <p>电话号码：{props.member.phone}</p>
      <Button type="primary" onClick={handleAddImpressionClick}>添加印象</Button>

      {/* 添加印象模态框 */}
      <Modal title="添加印象" visible={isModalVisible} onCancel={handleModalClose} footer={[
        <Button key="cancel" onClick={handleModalClose}>取消</Button>,
        <Button key="submit" type="primary" onClick={handleModalClose}>提交</Button>,
      ]}>
        <p>请说出您的印象：</p>
        <textarea rows="4" cols="50"></textarea>
      </Modal>
    </div>
  );
}

export default MemberInfoPage;
