import React, { useEffect, useState, useRef } from "react";
import { Toast } from "antd-mobile"
import "./index.scss"
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { AutoSizer, List } from 'react-virtualized'

import { getCurrentCity } from "../../utils"
import NavHeader from "../../components/NavHeaders";

const TITLE_HEIGHT = 50;
const HOUSE_CITY = ['北京', '上海', '广州', '深圳']

const formatCityIndex = (letter) => {
  switch (letter) {
    case '#':
      return '当前城市'
    case 'hot':
      return '热门城市'
    default:
      return letter.toUpperCase()
  }
}


// {a: [{}, {}], b:[{}, {}]}
const formatCityData = (list) => {
  let clist = {}

  for (let city of list) {
    const first = city.short.substr(0, 1)
    if (clist[first]) {
      clist[first].push(city)
    } else {
      clist[first] = [city]
    }
  }

  const index = Object.keys(clist).sort();

  return {
    clist,
    index
  }
}


const CityList = () => {
  const [cityList, setCityList] = useState([]);
  const [cityIndex, setCityIndex] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const cityListIndex = useRef(0)

  useEffect(() => {
    const getCityList = async function () {
      try {
        const res = await axios.get('http://localhost:8080/area/city?level=1')

        const { clist, index } = formatCityData(res.data.body)
        const hotRes = await axios.get('http://localhost:8080/area/hot')
        clist['hot'] = hotRes.data.body
        index.unshift('hot')

        const curCity = await getCurrentCity()

        clist["#"] = [curCity]
        index.unshift('#')

        setCityList(clist)
        setCityIndex(index)

      }
      catch (error) {
        console.log('error getting city list', error)
      }
    }
    getCityList();
  }, []);

  const navigate = useNavigate();
  const back = () => {
    navigate(-1)
  }

  const changeCity = function ({ label, value }) {
    if (HOUSE_CITY.indexOf(label) > -1) {
      localStorage.setItem('hkzf_city', JSON.stringify({ label, value }))
      back();
    } else {
      Toast.show({
        content: '没有该城市房源信息',
      })
    }
  }

  const rowRenderer = function ({
    key, // Unique key within array of rows
    index, // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style, // Style object to be applied to row (to position it)
  }) {

    const letter = cityIndex[index]
    const list = cityList[letter]
    return (
      <div key={key} style={style} className='city'>
        <div className="title">{formatCityIndex(letter)}</div>
        {
          list.map(item =>
            <div className='name' key={item.value} onClick={() => changeCity(item)}>
              {item.label}
            </div>
          )
        }
      </div>
    );
  }

  const getRowHeight = ({ index }) => {
    return TITLE_HEIGHT + cityList[cityIndex[index]].length * TITLE_HEIGHT
  }

  const RenderCityIndex = () => {
    return (
      cityIndex.map((item, index) =>
        <li key={index} className="city-index-item" onClick={() => {
          cityListIndex.current.scrollToRow(index)
        }}>
          <span className={index === activeIndex ? "index-active" : ''}>
            {item === 'hot' ? '热' : item.toUpperCase()}
          </span>
        </li>
      )
    )
  }

  const onRowsRendered = ({ startIndex }) => {
    if (startIndex !== activeIndex) {
      setActiveIndex(startIndex);
    }
  }


  return (
    <div className='city-list'>
      <NavHeader>城市找房</NavHeader>
      <AutoSizer>
        {({ height, width }) => (
          <List
            height={height}
            rowCount={cityIndex.length}
            rowHeight={getRowHeight}
            rowRenderer={rowRenderer}
            width={width}
            onRowsRendered={onRowsRendered}
            scrollToAlignment='start'
            ref={cityListIndex}
          />
        )}
      </AutoSizer>

      <ul className="city-index">
        <RenderCityIndex />
      </ul>
    </div>
  )
}

export default CityList