


import { Button, Col, Row } from 'antd'
import Index from '../main/index'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// 主页
function Main() {
  const navigate = useNavigate()
  const [infoList, setInfo] = useState<Array<any>>([{
    name: "记录类",
    href: "",
    count: 20,
    id: 0
  }, {
    name: "创作类",
    href: "",
    count: 40,
    id: 1
  }])
  const skipCagegory = () => {
    navigate('/cagegory')
  }
  return (
    <div>
      <Index>
        <div className='container'>
          <div className='left'></div>
          <div className='right'>
            <div className='containerinfo'>
              {infoList.map((list: any) => (
                <div key={list.id} className='InfoList'>
                  <div className='name'>{list.name}
                    <span className='trm-number'>{list.count}</span>
                  </div>
                  <div className='point'></div>
                  <div onClick={skipCagegory} style={{ color: '#000' }}>查看分类 <i className='iconfont icon-youjiantou'></i></div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <h5 style={{
                width: '130px', fontSize: '26px', color: '#000'
              }}>最近发布</h5>
              <div className='point'></div>
            </div>
            <Row >
              <Col span={11}>
                <div className='Card'>
                  <div className='img'>
                    <img width={"100%"} height={"100%"} src="https://img.lkxin.cn/tu/2022/11/14/6371c7efc8e04.png" alt="" />
                  </div>
                  <div className='title'>
                    <h5>记录类</h5>
                    <div style={{ marginTop: '20px', fontSize: '20px', color: "#000", fontWeight: 'bolder' }}> 瀑布流使用虚拟列表性能优化</div>
                    <div className='point'></div>
                    <div className='time'>22/11/14
                      12:05</div>
                  </div>
                </div>
              </Col>
              <Col span={11} offset={2}>col</Col>
            </Row>
          </div>


        </div>


      </Index>
    </div>
  )
}

export default Main
