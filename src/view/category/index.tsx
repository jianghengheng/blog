


import { Button, Col, Row } from 'antd'
import Index from '../main/index'
import './index.scss'
import { useState, useEffect } from 'react'
import { GetCategroyList } from '~/src/api/category'
import { RootState } from '~/src/store'
import { useSelector } from 'react-redux'
import { GetArticleByCategoryId } from '~/src/api/article'
import { useNavigate } from 'react-router-dom'

// 分类页面
function Cagegory() {

    const navigate = useNavigate()
    const init = useSelector((state: RootState) => state.countReducer)
const [articleList,setArticleList]=useState([])
useEffect(()=>{
    GetArticleByCategoryId(init.category[0]?.id).then(res=>{
        setArticleList(res.data)
    })
    
},[])
    const getArticleByCategoryId= async(id:number)=>{
     let {data}=await   GetArticleByCategoryId(id)
     setArticleList(data)
    }
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
                                            <Col key={cateData.id} span={8} >
                                                <div className='cateName' onClick={()=>(getArticleByCategoryId(cateData.id))}>{cateData.category} <span>({cateData.num})</span></div>

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
                    {articleList?.map((artl: any, index: number) => (
                <Col  key={artl.id} span={11} offset={index % 2 == 0 ? 0 : 2}>
                  <div className='Card' onClick={() => navigate('/article',{
                    state:{
                      id:artl.id
                    }
                  })}>
                   
                    <div className='img'>
                      <img width={"100%"} height={"100%"} src={`/api/download/${artl.fileId}`} alt="" />
                    </div>
                    <div className='title'>
                      <h5>{artl.categoryName}</h5>
                      <div style={{ marginTop: '20px', fontSize: '20px', color: "#000", fontWeight: 'bolder' }}> {artl.title}</div>
                      <div className='point'></div>
                      <div className='time'>{artl.creatTime}</div>
                    </div>
                  </div>
                </Col>
              ))}
                    </Row>
                </div>


            </div></Index>
        </div>
    )
}

export default Cagegory
