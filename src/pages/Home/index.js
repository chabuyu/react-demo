import React, { Component } from 'react'

import {
  Link,
} from 'react-router-dom'

import Slider from 'react-slick'

import './home.less'

import {
  Card,
  Carousel,
} from 'antd'

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
}

export default class Home extends Component {
  render() {
    return (
      <Card title="主页" className='home'>
        <Slider {...settings} className='slider'>
          <Carousel className='carousel-wrap' autoplay >
            <div className='carousel carousel-a'><h1>a</h1> </div>
            <div className='carousel carousel-b'><h1>b</h1><a href="" className='carousel-href'> <span className='carousel-img2 carousel-img'></span></a></div>
            <div className='carousel carousel-c'><h1>c</h1><a href="" className='carousel-href'> <span className='carousel-img3 carousel-img'></span></a></div>
            <div className='carousel carousel-d'><h1>d</h1><a href="" className='carousel-href'> <span className='carousel-img4 carousel-img'></span></a></div>
          </Carousel>
        </Slider>
        <ul className='card'>
          <li className='img-wrap'><Link to='/admin/article' className='img-href'><img src="../../assimg/1.png" alt="" className='img1 img' /></Link></li>
          <li className='img-wrap'><Link to='/admin/book' className='img-href'><img src="../../assimg/2.png" alt="" className='img2 img' /></Link></li>
          <li className='img-wrap'><Link to='/admin/personnel' className='img-href'><img src="../../assimg/3.png" alt="" className='img3 img' /></Link></li>
          <li className='img-wrap'><Link to='/admin/message' className='img-href'><img src="../../assimg/4.png" alt="" className='img4 img' /></Link></li>
          <li className='img-wrap'><Link to='/admin/setting' className='img-href'><img src="../../assimg/1.png" alt="" className='img5 img' /></Link></li>
          <li className='img-wrap'><Link to='/admin/article' className='img-href'><img src="../../assimg/1.png" alt="" className='img6 img' /></Link></li>
        </ul>
      </Card>
    )
  }
}
