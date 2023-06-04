
import { Button, Card, Col, Row } from 'antd'
import Index from '../main/index'
import './index.scss'
import { useState, useEffect, memo } from 'react'

import { useLocation } from 'react-router-dom'
import { GetArticleById } from '~/src/api/article'
import MDEditor from '@uiw/react-md-editor';
import Comment from '~/src/components/comment/index'
// 文章页面
function Article() {
    const { state: { id } } = useLocation()

    const [articleInfo, setArticleInfo] = useState<any>({
        creatTime: "",
        content: "",
        title: ""
    })
    useEffect(() => {
        GetArticleById(id).then((res) => {
            console.log(res.data);
            setArticleInfo(res.data)
        })
    }, [])
    // setArticle(count1.category)
    return (
        <div>
            <Index showInfo={window.screen.width>480} title={articleInfo.title}>  <div className='container'>
                <div className='left'></div>
                <div className='rightart'>
                    <Row gutter={24}>
                        <Col span={8}>
                            <div className='category'>
                                <div className='iconfont icon-yonghu-xianxing'></div>
                                <div className='name'>蒋衡</div>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className='category'>

                                <div className='iconfont icon-riqi'></div>
                                <div className='name'>{articleInfo?.category}</div>

                            </div>
                        </Col>
                        <Col span={8}>
                            <div className='category'>
                                <div className='iconfont icon-shijian'>
                                </div>
                                <div className='name'>{articleInfo?.create_time}</div>
                            </div>
                        </Col>

                    </Row>




                    <Card title={articleInfo.title}>
                        <MDEditor.Markdown source={articleInfo?.content} style={{ whiteSpace: 'pre-wrap' }} />
                    </Card>
                    <Comment articleId={id}></Comment>
                </div>


            </div></Index>
        </div>
    )
}

export default memo(Article)
