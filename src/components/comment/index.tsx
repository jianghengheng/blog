
import { Button, Card, Col, Row, Input } from 'antd'
import { useState, useEffect, memo } from 'react'
const { TextArea } = Input;

// 文章页面
function Article() {
    const [value, setValue] = useState<string>('')
    const [showbutton, setShowBtuton] = useState<boolean>(false)
    useEffect(() => {

    }, [])
    const onChange = (value: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(value.target.value)
    }
    const focus = () => {
        setShowBtuton(true)
    }
    const cancleButton = () => {
        setShowBtuton(false)
    }
    return (
        <div className='w-100%'>
            <Card title='评论'>
                <div>
                    <TextArea onFocus={focus}  style={{ height: 100 }} showCount maxLength={100} value={value} onChange={onChange} placeholder='输入评论（Enter换行）' />
                    {showbutton ? <div className='flex  justify-between mt-3%'><div>图片</div>  <Button type='primary'>发表评论</Button> </div> : <></>}
                </div>
                <div onClick={cancleButton}>
                    2323
                </div>


            </Card >
        </div>
    )
}

export default Article
