import { Avatar, List, Layout, Input, Button, Modal } from 'antd'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { useState } from 'react'

interface Contact {
  id: number
  name: string
  phone: string
  date: string
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
    name: '王丽',
    phone: '13812345678',
    company: 'ABC公司',
    date: '2023年3月3日',
    industry: 'IT',
    position: '工程师',
    birthday: '1990年1月1日',
    soundImpression: '说话很温柔',
    avatar: 'p2.jpg'
  },
  {
    id: 2,
    name: 'jack',
    phone: '13987654321',
    company: 'XYZ公司',
    date: '2023年3月5日',
    industry: '金融',
    position: '经理',
    birthday: '1985年5月5日',
    soundImpression: '声音很有磁性',
    avatar: 'p3.jpg'
  },
  {
    id: 3,
    name: 'dan',
    phone: '13987654321',
    company: 'XYZ公司',
    date: '2023年3月6日',
    industry: '互联网',
    position: '经理',
    birthday: '1998年5月5日',
    soundImpression: '声音很有特点',
    avatar: 'p4.jpg'
  }
]

function TodaySchedule() {
  const [selectedContact, setSelectedContact] = useState<Contact | null>()
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [editableField, setEditableField] = useState('')
  const [isNewContactModalVisible, setIsNewContactModalVisible] = useState(false)

  const handleContactSelect = (contact: Contact) => {
    setSelectedContact(contact)
    setEditModalVisible(true)
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
    if (!editableField || !selectedContact) {
      return
    }

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

  const handleNewContactClick = () => {
    setIsNewContactModalVisible(true)
  }

  const handleModalCancel = () => {
    setIsNewContactModalVisible(false)
  }

  const handleEditModalCancel = () => {
    setEditModalVisible(false)
  }

  const handleModalOk = () => {
    // TODO: 将新建联系人保存到数据库或其他状态管理器中
    setIsNewContactModalVisible(false)
  }

  const handleEditModalOk = () => {
    setEditModalVisible(false)
  }

  return (
    <div className="min-h-500">
      <div className={styles.contact}>
        <div className="flex mb-5">
          <Image width={82} height={82} src="/schedule.png" className="cursor-pointer w-[82px] h-[82px]" alt={''} />
          <h2 className="font-bold text-black text-xl leading-6 mt-auto mb-3">今日日程</h2>
        </div>
        <div className="flex flex-col">
          {contacts.map((contact, index) => {
            return (
              <div key={index} className="contact flex  items-center cursor-pointer pr-5" onClick={() => handleContactSelect(contact)}>
                <Avatar src={contact.avatar} className="w-[50px] h-[50px] mr-3 mb-3" />
                <div className="flex flex-col">
                  <div className="name text-black mr-3">{contact.date} </div>
                  <div className="name text-black mr-3"> {contact.soundImpression}</div>
                </div>
              </div>
            )
          })}
          <Image
            width={50}
            height={50}
            onClick={handleNewContactClick}
            src="/add.png"
            className="cursor-pointer w-[50px] h-[50px]"
            alt={''}
          />
        </div>
      </div>

      {selectedContact && (
        <Modal title="编辑日程信息" open={editModalVisible} onCancel={handleEditModalCancel} onOk={handleEditModalOk}>
          <div className="bg-gray-100 text-black flex flex-col">
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
        </Modal>
      )}

      {/* 新增联系人弹窗 */}
      <Modal title="新建日程" open={isNewContactModalVisible} onCancel={handleModalCancel} onOk={handleModalOk}>
        <Input placeholder="请输入姓名" className="my-4" />
        <Input placeholder="请输入电话号码" className="my-4" />
        <Input placeholder="请输入公司名称" className="my-4" />
        <Input placeholder="请输入行业" className="my-4" />
        <Input placeholder="请输入职位" className="my-4" />
        <Input placeholder="请输入生日" className="my-4" />
        <div className="flex justify-center my-8">
          <Button onClick={handleSaveClick} className=" w-60 h-10 bg-blue rounded-full">
            保存
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default TodaySchedule
