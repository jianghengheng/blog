import { Button, Card, Col, Row } from "antd";
import Index from "../main/index";
import { useState, useEffect, memo } from "react";
import "./index.scss";
import TextArea from "antd/es/input/TextArea";
import { setmessageId } from '~/src/store/reducer/countReducer'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "~/src/store";
import dayjs from "dayjs";
import { addMessage } from "~/src/api/message";
interface Props {
    resfresh: Function
    MessageData: MessageType
}
interface MessageType {
    id: number | null,
    content: string
    releaseTime: string;
    parentId: number
    children: MessageType[]
}
//留言板页面
function MessageRender({ MessageData: med, resfresh }: Props) {
    const dispath = useDispatch()
    const { messageId } = useSelector((state: RootState) => state.countReducer)
    useEffect(() => { }, []);

    const [content, setContent] = useState<string>("");
    const onChangeComment = (
        value: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setContent(value.target.value);
    };
    const replymessage = () => {
        if (messageId == med.id) {
            dispath(setmessageId(null))
        } else {
            dispath(setmessageId(med.id))
        }
    }
    const publishmessage = async () => {
        let data = {
            content: content,
            parentId: med.id,
            releaseTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            userId: 0
        }
        await addMessage(data)
        setContent('')
        resfresh()
    }
    const [show, setShow] = useState<boolean>(false);
    const nestedComments = (med.children || [])
        .map((item, index) => {
            return (
                <MessageRender MessageData={item} resfresh={resfresh} key={item.id} />
            );
        });
    return (
        <div>
            <Card className="mt-15px ">
                <div className="flex ">
                    <div>
                        <img src="../../../public//avatar.jpg" width={50} height={50} />
                    </div>
                    <div className="ml-10px w-100%">
                        <span className="color-#26709a">名字</span>
                        <span className="ml-10px color-#9B9B9B">第1楼</span>
                        <div className="mt-15px">
                            {med.content}
                        </div>
                        <div className="mt-30px">{med.releaseTime}<Button type="link" onClick={replymessage} >{messageId == med.id ? '取消回复' : '回复'}</Button>
                       {(med.parentId==null&&med.children.length>0)? <Button className="ml--15px" type="link" onClick={()=>setShow(!show)}>{show?'收起':'展开'}</Button>:<span></span>}
                        </div>
                        {messageId == med.id ? <div>
                            <TextArea
                                style={{ height: 100 }}
                                showCount
                                maxLength={320}
                                value={content}
                                onChange={onChangeComment}
                                placeholder="输入评论（Enter换行）"
                            />
                            <div className="overflow-hidden">
                                <Button type="primary" className="mt-10px float-left" disabled={content.length == 0} onClick={publishmessage}>
                                    回复
                                </Button> 
                            </div>
                        </div>

                            : <span></span>}
                    </div>
                </div>

                {show?nestedComments:(<></>)}
            </Card>
        </div>



    );
}

export default memo(MessageRender);
