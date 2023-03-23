import React from 'react'
import {
  Route,
  useNavigate,
  useLocation,
  Routes,
} from "react-router-dom";

import News from '../News';
import HouseList from '../HouseList'
import Index from '../Index';
import Profile from '../Profile';

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
      key: '/',
      title: '首页',
      icon: <i className="iconfont icon-ind" />,
    },
    {
      key: '/list',
      title: '找房',
      icon: <i className="iconfont icon-findHouse" />,
    },
    {
      key: '/news',
      title: '咨询',
      icon: <i className="iconfont icon-message" />,
    },
    {
      key: '/profile',
      title: '我的',
      icon: <i className="iconfont icon-my" />,
    },
  ]


  return (
    <div className="app">
      <div className='body'>
        <Routes>
          <Route path='' element={<Index />} />
          <Route path='list' element={<HouseList />} />
          <Route path='news' element={<News />} />
          <Route path='profile' element={< Profile />} />

        </Routes>

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