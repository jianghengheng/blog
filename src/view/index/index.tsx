


import { Button, Col, Row } from 'antd'
import Index from '../main/index'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '~/src/store'
import { GetArticle } from '~/src/api/article'
// 主页
function Main() {
  const [ArticleList, setArticleList] = useState<any>([])
  useEffect(() => {
    GetArticle().then(res => {

      setArticleList(res.data)


    })
  }, [])
  const navigate = useNavigate()
  const init = useSelector((state: RootState) => state.countReducer)
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
              {init.infoList.map((list: any) => (
                <div key={list.id} className='InfoList'>
                  <div className='name'>{list.category}
                    <span className='trm-number'>{list.num}</span>
                  </div>
                  <div className='point'></div>
                  <div onClick={skipCagegory} style={{ color: '#000', cursor:'pointer'}}>查看分类 <i className='iconfont icon-youjiantou'></i></div>
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

              {ArticleList?.map((artl: any, index: number) => (
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


        </div>


      </Index>
    </div>
  )
}

export default Main
