import React from 'react'

import { Swiper } from 'antd-mobile'

const colors = ['#ace0ff', '#bcffbd', '#e4fabd', '#ffcfac']

const items = colors.map((color, index) => (
  <Swiper.Item
    key={index}>
    <div
      style={{ background: color, height: 200 }}
    >
      {index + 1}
    </div>
  </Swiper.Item>
))


const Index = () => {
  return (
    <div className="index">
      <Swiper
        loop={true}
      >{items}</Swiper>
    </div>
  )
}

export default Index