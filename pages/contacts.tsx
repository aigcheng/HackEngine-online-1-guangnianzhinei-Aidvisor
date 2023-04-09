import { Avatar, List, Layout, Input, Button } from 'antd'
import { useState } from 'react'
import Header from '@/components/header'
const { Content } = Layout

interface Contact {
  id: number
  name: string
  phone: string
  company: string
  industry: string
  position: string
  birthday: string
  soundImpression: string
  avatar: string
}

const contacts: Contact[] = [
  {
    id: 1,
    name: '张三',
    phone: '13812345678',
    company: 'ABC公司',
    industry: 'IT',
    position: '工程师',
    birthday: '1990年1月1日',
    soundImpression: '说话很温柔',
    avatar: 'https://cdn.pixabay.com/photo/2016/03/31/19/58/avatar-1295429_960_720.png'
  },
  {
    id: 2,
    name: '李四',
    phone: '13987654321',
    company: 'XYZ公司',
    industry: '金融',
    position: '经理',
    birthday: '1985年5月5日',
    soundImpression: '声音很有磁性',
    avatar: 'https://cdn.pixabay.com/photo/2016/03/31/20/27/avatar-1295773_960_720.png'
  },
  {
    id: 3,
    name: '王五',
    phone: '13987654321',
    company: 'XYZ公司',
    industry: '互联网',
    position: '经理',
    birthday: '1998年5月5日',
    soundImpression: '声音很有特点',
    avatar: 'https://cdn.pixabay.com/photo/2016/04/01/11/25/avatar-1300331_960_720.png'
  }
]

function ContactsPage() {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(contacts[0])
  const [editableField, setEditableField] = useState('')

  const handleContactSelect = (contact: Contact) => {
    setSelectedContact(contact)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedContact) {
      setSelectedContact({
        ...selectedContact,
        [editableField]: event.target.value
      })
    }
  }

  const handleSaveClick = () => {
    // 将修改后的联系人信息保存到数据库或其他状态管理器中
    console.log('Saved:', selectedContact)
    setEditableField('')
  }

  const getFieldEditor = (field: keyof Contact) => {
    return (
      <Input
        value={selectedContact ? selectedContact[field] : ''}
        onChange={handleInputChange}
        onPressEnter={handleSaveClick}
        onBlur={() => setEditableField('')}
        autoFocus
      />
    )
  }

  return (
    <Layout>
      <Header></Header>
      <Content className="flex">
        <div className="w-1/5 h-screen bg-blue-200 bg-opacity-15">
          <List
            itemLayout="horizontal"
            dataSource={contacts}
            renderItem={contact => (
              <List.Item
                key={contact.id}
                onClick={() => handleContactSelect(contact)}
                className={`p-4 cursor-pointer ${selectedContact?.id === contact.id ? 'bg-gray-200' : ''}`}
              >
                <List.Item.Meta
                  className="mx-4"
                  avatar={<Avatar src={contact.avatar} />}
                  title={contact.name}
                  description={contact.phone}
                />
              </List.Item>
            )}
          />
        </div>
        {selectedContact && (
          <div className="w-4/5 h-screen bg-gray-100 text-black flex flex-col">
            <div className="flex flex-col items-center justify-around py-6">
              <Avatar src={selectedContact.avatar} size={96} />
              <h2 className="text-2xl font-bold">{selectedContact.name}</h2>
            </div>
            <div className="grid grid-cols-2 gap-8 px-12">
              <div className="flex">
                <div className="font-bold mb-4">公司：</div>
                <div>
                  {editableField === 'company' ? (
                    getFieldEditor('company')
                  ) : (
                    <span onClick={() => setEditableField('company')} className="cursor-pointer">
                      {selectedContact.company}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex">
                <div className="font-bold mb-4">行业：</div>
                <div>
                  {editableField === 'industry' ? (
                    getFieldEditor('industry')
                  ) : (
                    <span onClick={() => setEditableField('industry')} className="cursor-pointer">
                      {selectedContact.industry}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex">
                <div className="font-bold mb-4">职位：</div>
                <div>
                  {editableField === 'position' ? (
                    getFieldEditor('position')
                  ) : (
                    <span onClick={() => setEditableField('position')} className="cursor-pointer">
                      {selectedContact.position}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex">
                <div className="font-bold mb-4">生日：</div>
                <div>
                  {editableField === 'birthday' ? (
                    getFieldEditor('birthday')
                  ) : (
                    <span onClick={() => setEditableField('birthday')} className="cursor-pointer">
                      {selectedContact.birthday}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-center my-8">
              <Button onClick={handleSaveClick} className=" w-60 h-10 bg-blue rounded-full">
                保存
              </Button>
            </div>
          </div>
        )}
      </Content>
    </Layout>
  )
}

export default ContactsPage
