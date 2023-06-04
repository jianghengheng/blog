
import { Button, Card, Col, Row, Input } from 'antd'
import { useState, useEffect, memo } from 'react'
const { TextArea } = Input;
import { GetCommonByArticeleId, addComment } from '~/src/api/comment/index'
import dayjs from 'dayjs'
// 文章页面
interface Props {
    articleId: string | number | undefined
}
interface Comment {
    articleId: Number
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
        parentId?: string

        releaseTime: string;
        articleId: string | number | undefined

    }>({
        content: '',
        releaseTime: '',
        articleId: undefined,
    })
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
        getCommentList()
    }
    return (
        <div className='w-100% mt-10px'>
            <Card title='评论' className='mb-15px'>
                <div>
                    <TextArea onFocus={focus} style={{ height: 100 }} showCount maxLength={100} value={commentData.content} onChange={onChange} placeholder='输入评论（Enter换行）' />
                    {showbutton ? <div className='flex  justify-between mt-5%'><div>图片</div>  <Button type='primary' onClick={addcomment}>发表评论</Button> </div> : <></>}
                </div>
                <div className='mt-10px'>
                    <div className='text-20px font-800'>全部评论</div>
                </div>
                <div onClick={cancleButton}>
                    {commentList.map(res => {
                        return <div key={res.id}>
                            <div >{res.content}</div>
                            </div>
                    })}
                </div>


            </Card >
        </div>
    )
}

export default Article
