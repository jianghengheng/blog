


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
    console.log(init.isphone,787878);
    
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
            <Index showInfo={init.isphone>480}>  <div className='container'>
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


                    <div  className='flex items-center mb-20px'>
                        <h5 className='w-130px text-26px color-#000' >{init.category[0]?.category}</h5>
                        <div className='point'></div>
                    </div>
                    <Row >
                    {articleList?.map((artl: any, index: number) => (
                <Col  key={artl.id} span={init.isphone<=480?24:11} offset={init.isphone<=480?0:index % 2 == 0 ? 0 : 2}>
                  <div className='Card' onClick={() => navigate('/article',{
                    state:{
                      id:artl.id
                    }
                  })}>
                   
                    <div className='img'>
                      <img width={"100%"} height={"100%"} src={`/api/${artl.fileId}`} alt="" />
                    </div>
                    <div className='title'>
                      <h5>{artl.category}</h5>
                      <div className='mt-20px text-20px  font-bold'>{artl.title}</div>
                      <div className='point'></div>
                      <div className='time'>{artl.create_time}</div>
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
