import { useState } from 'react'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'
export default function Header(props: any) {
  const [showModal, setShowModal] = useState(false)
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')

  // 处理表单提交
  const handleSubmit = event => {
    event.preventDefault()
    console.log(`手机号：${phone}，密码：${password}`)
  }

  // 打开弹窗
  const handleOpenModal = () => {
    setShowModal(true)
  }

  // 关闭弹窗
  const handleCloseModal = () => {
    setShowModal(false)
  }

  return (
    <header className="sticky top-0 z-40 w-full h-20 bg-white">
      <div className="flex h-16 items-center space-x-4 mx-20">
        <div className="flex gap-6 md:gap-10">
          <Link href="/">
            <svg viewBox="0 0 34 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.nav_eyes}>
              <g
                id="eyeLeft"
                data-svg-origin="8 8"
                transform="matrix(-0.80326,0.59562,-0.59562,-0.80326,19.19104,9.66112)"
                style={{ transformOrigin: '0px 0px;' }}
              >
                <path
                  d="M8 15.25C12.0041 15.25 15.25 12.0041 15.25 8C15.25 3.99594 12.0041 0.75 8 0.75C3.99594 0.75 0.75 3.99594 0.75 8C0.75 12.0041 3.99594 15.25 8 15.25Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                ></path>
                <path
                  d="M8 9C10.2091 9 12 7.20914 12 5C12 2.79086 10.2091 1 8 1C5.79086 1 4 2.79086 4 5C4 7.20914 5.79086 9 8 9Z"
                  fill="currentColor"
                ></path>
              </g>
              <g
                id="eyeRight"
                data-svg-origin="26 8"
                transform="matrix(-0.80326,0.59562,-0.59562,-0.80326,51.64972,-1.06004)"
                style={{ transformOrigin: '0px 0px;' }}
              >
                <path
                  d="M26 15.25C30.0041 15.25 33.25 12.0041 33.25 8C33.25 3.99594 30.0041 0.75 26 0.75C21.9959 0.75 18.75 3.99594 18.75 8C18.75 12.0041 21.9959 15.25 26 15.25Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                ></path>
                <path
                  d="M26 9C28.2091 9 30 7.20914 30 5C30 2.79086 28.2091 1 26 1C23.7909 1 22 2.79086 22 5C22 7.20914 23.7909 9 26 9Z"
                  fill="currentColor"
                ></path>
              </g>
            </svg>
          </Link>
          <h2 className="font-inter font-bold text-2xl leading-7 text-black flex items-center">
            CHANPIN
            <span className="text-blue-500">MING</span>
          </h2>
        </div>
        {props.showNav && (
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-1 ">
              <ul className=" gap-10 font-display text-[15px] font-medium text-secondary-700 md:flex header-menu w-[50vw]">
                <li>
                  <Link
                    href="/contacts"
                    className="relative cursor-pointer font-inter font-normal text-black text-2xl leading-6 flex items-center justify-center"
                  >
                    联系人
                    <small className="ml-1 rounded bg-primary-500 px-1 py-0.5 text-xs font-medium text-white">NEW</small>
                  </Link>
                </li>
                <li>
                  <Link href="/recording" className="font-inter font-normal text-black text-2xl leading-6 flex items-center justify-center">
                    日程
                  </Link>
                </li>
                <li>
                  <Link
                    href="/member-info"
                    target="_blank"
                    className="font-inter font-normal text-black text-2xl leading-6 flex items-center justify-center"
                  >
                    聊天
                  </Link>
                </li>
              </ul>
              <button
                onClick={handleOpenModal}
                className="bg-blue-500 rounded-full md:min-w-[110px] border border-primary-500 bg-primary-500 px-3 py-1.5 md:px-4 md:py-2 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-primary-700 hover:bg-primary-700 focus:ring focus:ring-primary-200"
              >
                开始使用
              </button>
            </nav>
          </div>
        )}
      </div>

      {/* 弹窗 */}
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">
                      手机号：
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={phone}
                      onChange={event => setPhone(event.target.value)}
                      required
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                      密码：
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={password}
                      onChange={event => setPassword(event.target.value)}
                      required
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    提交
                  </button>
                </form>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                  <button
                    onClick={handleCloseModal}
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-gray-500 text-base leading-6 font-medium text-white shadow-sm hover:bg-gray-400 focus:outline-none focus:border-gray-700 focus:shadow-outline-gray transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                  >
                    关闭
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
