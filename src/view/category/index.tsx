


import { Button, Col, Row } from 'antd'
import Index from '../main/index'
import './index.scss'
import { useState, useEffect } from 'react'
import { GetCategroyList } from '~/src/api/category'
import { RootState } from '~/src/store'
import { useSelector } from 'react-redux'

// 分类页面
function Cagegory() {
  
  
    const init = useSelector((state: RootState) => state.countReducer)

    // setCagegory(count1.category)
    return (
        <div>
            <Index>  <div className='container'>
                <div className='left'></div>
                <div className='right'>

                    <Row >
                        <Col span={24}>
                            <div className='categoryInfo'>
                                <div className='category'>
                                    <Row >
                                        {init.category.map((cateData: any) => (
                                            <Col key={cateData.id} span={8}>
                                                <div className='cateName'>{cateData.category} <span>({cateData.num})</span></div>

                                            </Col>
                                        ))}

                                    </Row>
                                </div>
                            </div>
                        </Col>
                    </Row>


                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                        <h5 style={{
                            width: '130px', fontSize: '26px', color: '#000'
                        }}>{init.category[0]?.category}</h5>
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


            </div></Index>
        </div>
    )
}

export default Cagegory
