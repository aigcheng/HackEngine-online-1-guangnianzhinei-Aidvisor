import { useState } from 'react'
import { Layout, Row, Col, Avatar, Button, List, Input, DatePicker, Select } from 'antd'
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import moment, { Moment } from 'moment'
import 'moment/locale/zh-cn' // 导入中文语言包
import Header from '@/components/header'
import ContactsComponent from '@/components/contacts'
import TodaySchedule from '@/components/TodaySchedule'
import styles from '@/styles/Home.module.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const { Content } = Layout
const localizer = momentLocalizer(moment)

const now = new Date()

type Contact = {
  name: string
  email: string
}

function SchedulePage() {
  const [contacts, setContacts] = useState<Contact[]>([])

  interface Event {
    id: number
    title: string
    start: Date
    end: Date
  }

  const events: Event[] = [
    {
      id: 0,
      title: '应酬',
      start: moment({ hours: 8 }).toDate(),
      end: moment({ hours: 10 }).toDate()
    },
    {
      id: 1,
      title: '午饭',
      start: moment({ hours: 12 }).toDate(),
      end: moment({ hours: 13 }).toDate()
    },
    {
      id: 2,
      title: '访问',
      start: moment({ hours: 14 }).toDate(),
      end: moment({ hours: 17 }).toDate()
    }
  ]

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
            <Calendar<Event>
              events={events}
              localizer={localizer}
              components={{
                eventWrapper: ({ event, children }) => (
                  <div
                    onContextMenu={e => {
                      alert(`${event.title} is clicked.`)
                      e.preventDefault()
                    }}
                  >
                    {children}
                  </div>
                )
              }}
            />
          </Col>
        </Row>
      </Content>
    </Layout>
  )
}

export default SchedulePage
