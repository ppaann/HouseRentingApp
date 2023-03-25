import React from 'react'
import {
  useNavigate,
  useLocation,
  Outlet
} from "react-router-dom";


import { TabBar } from "antd-mobile"
import "./index.css"

const Home = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { pathname } = location

  const setRouteActive = (value) => {
    navigate(value)
  }

  const tabs = [
    {
      key: '/home',
      title: '首页',
      icon: <i className="iconfont icon-ind" />,
    },
    {
      key: '/home/list',
      title: '找房',
      icon: <i className="iconfont icon-findHouse" />,
    },
    {
      key: '/home/news',
      title: '咨询',
      icon: <i className="iconfont icon-message" />,
    },
    {
      key: '/home/profile',
      title: '我的',
      icon: <i className="iconfont icon-my" />,
    },
  ]


  return (
    <div className="app">
      <div className='body'>

        <Outlet />

      </div>
      <div className="bottom">
        <TabBar activeKey={pathname} onChange={value => setRouteActive(value)}>
          {tabs.map(item => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
      </div>

    </div>
  )
}

export default Home