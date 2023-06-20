
import { Button, Card, Col, Row, Input } from 'antd'
import { useState, useEffect, memo } from 'react'
const { TextArea } = Input;
import { GetCommonByArticeleId, addComment } from '~/src/api/comment/index'
import dayjs from 'dayjs'
import { LikeOutlined, MessageOutlined } from '@ant-design/icons';
import { useDispatch,useSelector } from 'react-redux'

import { setcommonId } from '~/src/store/reducer/countReducer'
import { RootState } from '~/src/store';
// 文章页面
interface Props {
    articleId: string | number | undefined
    parentId: null | number
    commonData: Comment,
    getlist:Function
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
function Commont({ articleId, commonData, parentId ,getlist}: Props) {
    const dispath = useDispatch()
    const {commonId} = useSelector((state: RootState) => state.countReducer)
    const [commentData, setCommentData] = useState<{
        userId?: string
        content: string
        parentId?: string | null | number

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

      
    }, [])

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
    }
    const addCommentdata = async (item: Comment) => {
        const commentDataInfo = {
            content: commentContent,
            releaseTime: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
            articleId: item.articleId,
            parentId: item.id
        }
        console.log(commentData);

        await addComment(commentDataInfo)
        setCommenContent('')
        dispath(setcommonId(null))
        setCommentData({
            content: '',
            releaseTime: '',
            articleId: undefined,
        })
        getlist()
    }
    const [commentId, setCommenId] = useState<string | number>('')

    const onChangeComment = (value: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setCommenContent(value.target.value)
    }
    const commonHandle = (id: number ) => {
        if(commonId==id){
            dispath(setcommonId(null))
        }else{
            dispath(setcommonId(id))
        }
  


    }
    const nestedComments = (commonData.children || [])
        .map((item, index) => {
            return (
                <Commont getlist={getlist} parentId={item.parentId} key={item.id} articleId={articleId} commonData={item}
                />
            );
        });

    return (
        <div className='w-100%'>
            <div className={parentId == null ? '' : 'bg-#f7f8fa p-20px'}>
                <div className='flex justify-between'>
                    <div>姓名</div><div>{commonData.releaseTime}</div>
                </div>
                <div className='mt-10px mb-10px'>{commonData.content}</div>
                <div className='flex w-130px justify-between color-#8a919f'>
                    <div className='cursor-pointer'><LikeOutlined rev={undefined} />点赞</div>
                    <div className='cursor-pointer' onClick={() => commonHandle(commonData.id)}><MessageOutlined rev={undefined} /> {commonId == commonData.id ? '取消回复' : '回复'}</div>
                </div>
                {commonId == commonData.id ?

                    <div className='mt-15px overflow-hidden'>
                        <TextArea style={{ height: 100 }} showCount maxLength={100} value={commentContent} onChange={onChangeComment} placeholder='输入评论（Enter换行）' />
                        <Button type='primary' className='float-right mt-20px' disabled={commentContent == ''} onClick={() => addCommentdata(commonData)}>发布</Button>
                    </div>

                    :
                    <></>}
            </div>
            {nestedComments}
        </div>
    )
}

export default Commont
