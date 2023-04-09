import { Avatar, List } from 'antd';

const contacts = [
  {
    id: 1,
    name: '张三',
    phone: '13512345678',
    avatar: 'https://cdn.pixabay.com/photo/2016/03/31/19/58/avatar-1295429_960_720.png',
  },
  {
    id: 2,
    name: '李四',
    phone: '13612345678',
    avatar: 'https://cdn.pixabay.com/photo/2016/03/31/20/27/avatar-1295773_960_720.png',
  },
  {
    id: 3,
    name: '王五',
    phone: '13712345678',
    avatar: 'https://cdn.pixabay.com/photo/2016/04/01/11/25/avatar-1300331_960_720.png',
  },
];

function ContactsPage() {
  return (
    <div>
      <List
        itemLayout="horizontal"
        dataSource={contacts}
        renderItem={(contact) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={contact.avatar} />}
              title={contact.name}
              description={contact.phone}
            />
          </List.Item>
        )}
      />
    </div>
  );
}

export default ContactsPage;
