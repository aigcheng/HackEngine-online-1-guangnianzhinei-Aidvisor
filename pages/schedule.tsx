import { useState } from 'react'
import { Layout, Row, Col, Avatar, Button, List, Input, DatePicker, Select } from 'antd'
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import moment, { Moment } from 'moment'
import Header from '@/components/header'
import ContactsComponent from '@/components/contacts'
import TodaySchedule from '@/components/TodaySchedule'
import styles from '@/styles/Home.module.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const { Content } = Layout
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

  interface Event {
    title: string
    start: Date
    end: Date
    participants?: string[]
  }

  return (
    <Layout>
      <Header></Header>
      <Content style={{ padding: '50px' }}>
        <Row gutter={24}>
          <Col span={6} className={styles.schedule_left}>
            <ContactsComponent />
            <TodaySchedule />
          </Col>
          <Col span={16} style={{ color: '#000' }}>
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
