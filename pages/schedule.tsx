import { useState } from 'react'
import { Layout, Row, Col, Avatar, Button, List, Input, DatePicker, Select } from 'antd'
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import moment, { Moment } from 'moment'
import Header from '@/components/header'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const { Content } = Layout
const { Option } = Select
const localizer = momentLocalizer(moment)

type Contact = {
  name: string
  email: string
}

type Event = {
  title: string
  start: Date
  end: Date
  participants: string[]
}

function SchedulePage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const [newContact, setNewContact] = useState<string>('')
  const [newEvent, setNewEvent] = useState<Partial<Event>>({})

  const handleAddContact = () => {
    if (newContact) {
      setContacts([...contacts, { name: newContact, email: '' }])
      setNewContact('')
    }
  }

  const handleAddEvent = (value: Moment[]) => {
    if (newEvent.title && value.length === 2) {
      setEvents([
        ...events,
        {
          ...newEvent,
          start: value[0].toDate(),
          end: value[1].toDate(),
          participants: newEvent.participants || []
        }
      ])
      setNewEvent({})
    }
  }

  return (
    <Layout>
      <Header></Header>
      <Content style={{ padding: '50px' }}>
        <Row gutter={24}>
          <Col span={8}>
            <div style={{ height: '25%' }}>
              <h2>联系人列表</h2>
              <List
                dataSource={contacts}
                renderItem={contact => (
                  <List.Item>
                    <List.Item.Meta avatar={<Avatar size="large" />} title={contact.name} description={contact.email} />
                  </List.Item>
                )}
              />
              <Input.Search
                value={newContact}
                onChange={e => setNewContact(e.target.value)}
                onSearch={handleAddContact}
                placeholder="添加联系人"
                enterButton={<Button type="primary">添加</Button>}
              />
            </div>
            <div style={{ height: '75%' }}>
              <h2>会面安排</h2>
              <List
                dataSource={events}
                renderItem={event => (
                  <List.Item>
                    <List.Item.Meta
                      title={moment(event.start).format('YYYY-MM-DD HH:mm')}
                      description={`参与人：${event.participants.join(', ')}`}
                    />
                    <div>{event.title}</div>
                  </List.Item>
                )}
              />
              <DatePicker.RangePicker showTime={{ format: 'HH:mm' }} onOk={handleAddEvent} style={{ marginBottom: '10px' }} />
              <Input
                value={newEvent.title}
                onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
                placeholder="会议标题"
                style={{ marginBottom: '10px' }}
              />
              <Select
                mode="multiple"
                value={newEvent.participants}
                onChange={value => setNewEvent({ ...newEvent, participants: value })}
                placeholder="参与人员"
                style={{ width: '100%', marginBottom: '10px' }}
              >
                {contacts.map(contact => (
                  <Select.Option key={contact.email} value={contact.name}>
                    {contact.name}
                  </Select.Option>
                ))}
              </Select>
            </div>
          </Col>
          <Col span={16}>
            <Calendar
              localizer={localizer}
              events={events}
              views={[Views.MONTH]}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 'calc(100vh - 120px)' }}
            />
          </Col>
        </Row>
      </Content>
    </Layout>
  )
}

export default SchedulePage
