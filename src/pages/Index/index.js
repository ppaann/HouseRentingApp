import React from 'react'
import { useNavigate } from 'react-router-dom';

import { Swiper, Grid, Divider, SearchBar } from 'antd-mobile'
import axios from 'axios'

import Nav1 from '../../assets/images/nav-1.png'
import Nav2 from '../../assets/images/nav-2.png'
import Nav3 from '../../assets/images/nav-3.png'
import Nav4 from '../../assets/images/nav-4.png'

import "./index.scss"

import { getCurrentCity } from "../../utils"

const navs = [
  {
    id: 1,
    img: Nav1,
    title: '整租',
    path: '/home/list'
  },
  {
    id: 2,
    img: Nav2,
    title: '合租',
    path: '/home/'
  },
  {
    id: 3,
    img: Nav3,
    title: '地图找房',
    path: '/home/map'
  },
  {
    id: 4,
    img: Nav4,
    title: '去出租',
    path: '/home/'
  }
]

function NavigateItem(props) {
  const navigate = useNavigate();
  let data = props.item
  const handleClick = () => {
    return navigate(data.path)
  }

  return (
    <Grid.Item onClick={handleClick}>
      <img src={data.img} alt="" />
      <h2>{data.title}</h2>
    </Grid.Item>
  )
}

function CityListButton(props) {
  const navigate = useNavigate();
  const naviToCityList = () => {
    return navigate("/citylist")
  }
  return (
    <div className="location" onClick={naviToCityList}>
      <span className="name">{props.label}</span>
      <i className='iconfont icon-arrow' />
    </div>
  )
}
function MapButton() {
  const navigate = useNavigate();
  return (
    <i className="iconfont icon-map" onClick={() => navigate('/map')} />
  )
}
function SearchComponent() {
  const navigate = useNavigate();
  return (

    <SearchBar placeholder='请输入内容' onClick={() => navigate('/search')} />

  )
}
/* use class for now, later shall be replaced by useEffect 
*/

export default class Index extends React.Component {

  state = {
    swipers: [],
    isSwiperLoaded: false,
    group: [],
    news: [],
    curCityName: ''
  }

  async getSwipers() {
    const res = await axios.get('http://localhost:8080/home/swiper')
    this.setState({
      swipers: res.data.body,
      isSwiperLoaded: true
    })
  }
  async getGroups() {
    const res = await axios.get('http://localhost:8080/home/groups', {
      params: {
        area: 'AREA%7C88cff55c-aaa4-e2e0'
      }
    })
    this.setState({
      group: res.data.body
    })
  }
  async getNews() {
    const res = await axios.get('http://localhost:8080/home/news', {
      params: {
        area: 'AREA%7C88cff55c-aaa4-e2e0'
      }
    })
    this.setState({
      news: res.data.body
    })
  }

  async componentDidMount() {
    this.getSwipers()
    this.getGroups()
    this.getNews()

    const curCity = await getCurrentCity();
    this.setState({
      curCityName: curCity.label
    })
  }

  renderSwiperItems() {
    return (
      this.state.swipers.map(item =>
        <Swiper.Item key={item.id}>
          <div style={{ height: '212px' }}>
            <img alt="" style={{ width: '100%' }} src={`http://localhost:8080${item.imgSrc}`} />
          </div>
        </Swiper.Item>))
  }

  renderNavs() {
    return navs.map(item =>
      <NavigateItem key={item.id} item={item} />
    )
  }

  renderNews() {
  }


  render() {
    return (
      <div>
        <div className="swiper">
          {
            this.state.isSwiperLoaded ?
              <Swiper autoplay>
                {this.renderSwiperItems()}
              </Swiper> : ''
          }

          <div className='search-box'>
            <div className="search">
              <CityListButton label={this.state.curCityName} />
              <SearchComponent />
            </div>
            <MapButton />
          </div>
        </div>


        <Grid key='nav' className="nav" columns={4}>
          {this.renderNavs()}
        </Grid>


        <div className="group">
          <h3 className='title'>
            租房小组 <span className='more'>更多</span>
          </h3>
          <Grid key='groupGrid' className='groupGrid' columns={2}>
            {this.state.group.map((item) =>
              <Grid.Item key={item.id}>
                <div className='group-item'>
                  <div className='desc'>
                    <p className='title'>{item.title}</p>
                    <span className='info'>{item.desc}</span>
                  </div>
                  <img
                    src={`http://localhost:8080${item.imgSrc}`}
                    alt=''
                  />
                </div>
              </Grid.Item>
            )}
          </Grid>
        </div>

        <div className="news">
          <h3 className="title">最新资讯</h3>

          <Grid key='newGrid' className="news-grid" columns={1}>
            {this.state.news.map(item =>
              <><Grid.Item key={item.id}>
                <img src={`http://localhost:8080${item.imgSrc}`} alt="" />
                <div className="desc">
                  <div className='title'>
                    {item.title}
                  </div>
                  <div className="info">
                    <div className='from'>{item.from}</div>
                    <div className='data'>{item.date}</div>
                  </div>
                </div>
              </Grid.Item>

                <Divider />
              </>)
            }

          </Grid>
        </div>
      </div>
    )
  }

}