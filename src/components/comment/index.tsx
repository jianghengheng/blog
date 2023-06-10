
import { Button, Card, Col, Row, Input } from 'antd'
import { useState, useEffect, memo } from 'react'
const { TextArea } = Input;
import { GetCommonByArticeleId, addComment } from '~/src/api/comment/index'
import dayjs from 'dayjs'
import { LikeOutlined, MessageOutlined } from '@ant-design/icons';
// 文章页面
interface Props {
    articleId: string | number | undefined
}
interface Comment {
    articleId: number
    children: Comment[]
    content: string
    id: number
    parentId: null | number
    praiseNum: number
    readNum: number
    releaseTime: string
    userId: null | number
}
function Article({ articleId }: Props) {
    const [commentList, setCommentList] = useState<Comment[]>([])

    const [commentData, setCommentData] = useState<{
        userId?: string
        content: string
        parentId?: string | undefined | number

        releaseTime: string;
        articleId: string | number | undefined

    }>({
        content: '',
        releaseTime: '',
        articleId: undefined,
    })
    const [commentContent, setCommenContent] = useState<string>('')
    const [showbutton, setShowBtuton] = useState<boolean>(false)
    useEffect(() => {
        getCommentList()


    }, [articleId])
    const getCommentList = () => {
        GetCommonByArticeleId(articleId).then(res => {
            console.log(res);
            setCommentList(res.data)

        })
    }
    const onChange = (value: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setCommentData({ ...commentData, articleId, content: value.target.value, releaseTime: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss') })
    }
    const focus = () => {
        setShowBtuton(true)
    }
    const cancleButton = () => {
        setShowBtuton(false)
    }


    const addcomment = async () => {
        await addComment(commentData)
        setCommenContent('')
        setCommentData({
            content: '',
            releaseTime: '',
            articleId: undefined,
        })

        getCommentList()
    }
    const addCommentdata = async (item: Comment) => {
        console.log(item);

        const commentDataInfo = {
            content: commentContent,
            releaseTime: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
            articleId: item.articleId,
            parentId: item.id
        }
        console.log(commentData);

        await addComment(commentDataInfo)
        setCommenContent('')
        setCommentData({
            content: '',
            releaseTime: '',
            articleId: undefined,
        })

        getCommentList()

    }
    const [commentId, setCommenId] = useState<string | number>('')

    const onChangeComment = (value: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setCommenContent(value.target.value)
    }
    const commonHandle = (id: string | number) => {
        setCommenId(id)
    }

    return (
        <div className='w-100% mt-10px'>
            <Card title='评论' className='mb-15px'>
                <div>
                    <TextArea onFocus={focus} style={{ height: 100 }} showCount maxLength={100} value={commentData.content} onChange={onChange} placeholder='输入评论（Enter换行）' />
                    {showbutton ? <div className='flex  justify-between mt-5%'><div>图片</div>  <Button type='primary' onClick={addcomment}>发表评论</Button> </div> : <></>}
                </div>
                <div className='mt-10px'>
                    <div className='text-20px font-800'>全部评论 {commentList.length == 0 ? null : commentList.length}</div>
                </div>
                <div onClick={cancleButton} className='mt-15px'>
                    {commentList.map(res => {
                        return <div key={res.id}>
                            <div>
                                <div className='flex justify-between mt-15px'>
                                    <div>姓名</div><div>{res.releaseTime}</div>
                                </div>
                                <div className='mt-10px mb-10px'>{res.content}</div>
                                <div className='flex w-130px justify-between color-#8a919f'>
                                    <div className='cursor-pointer'><LikeOutlined rev={undefined} /> 点赞</div>
                                    <div className='cursor-pointer' onClick={() => commonHandle(res.id)}><MessageOutlined rev={undefined} /> {commentId == res.id ? '取消回复' : '回复'}</div>


                                </div>
                                {res.children.map(item => {
                                    return <div className='bg-#f7f8fa p-20px'>
                                        <div className='flex justify-between'>
                                            <div>姓名</div><div>{item.releaseTime}</div>
                                        </div>
                                        <div className='mt-10px mb-10px'>{item.content}</div>
                                        <div className='flex w-130px justify-between color-#8a919f'>
                                            <div className='cursor-pointer'><LikeOutlined rev={undefined} /> 点赞</div>
                                            <div className='cursor-pointer' onClick={() => commonHandle(item.id)}><MessageOutlined rev={undefined} /> {commentId == item.id ? '取消回复' : '回复'}</div>


                                        </div>
                                        {commentId == item.id ?
                                            <div className='mt-15px overflow-hidden'>
                                                <TextArea style={{ height: 100 }} showCount maxLength={100} value={commentContent} onChange={onChangeComment} placeholder='输入评论（Enter换行）' />
                                                <Button type='primary' className='float-right mt-20px' disabled={commentContent == ''} onClick={() => addCommentdata(res)}>发布</Button>
                                            </div>

                                            :
                                            <></>}
                                    </div>
                                })}
                                {commentId == res.id ?
                                    <div className='mt-15px overflow-hidden'>
                                        <TextArea style={{ height: 100 }} showCount maxLength={100} value={commentContent} onChange={onChangeComment} placeholder='输入评论（Enter换行）' />
                                        <Button type='primary' className='float-right mt-20px' disabled={commentContent == ''} onClick={() => addCommentdata(res)}>发布</Button>
                                    </div>

                                    :
                                    <></>}

                            </div>
                        </div>
                    })}
                </div>


            </Card >
        </div>
    )
}

export default Article
