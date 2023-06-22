import { Button, Card, Col, Row, message } from "antd";
import Index from "../main/index";
import { useState, useEffect, memo } from "react";
import "./index.scss";
import TextArea from "antd/es/input/TextArea";
import MessageRender from './message'
import { addMessage, getMessage } from "~/src/api/message";
import dayjs from "dayjs";
interface MessageType {
  id: number | null,
  content: string
  releaseTime: string;
  parentId: number
  children: MessageType[]
}
//留言板页面
function Message() {

  const [content, setContent] = useState<string>("");
  const [page, setPage] = useState<{
    pageSize: number
    pageNumber: number,
    total: number
  }>({
    pageSize: 1,
    pageNumber: 10,
    total: 0
  });
  useEffect(() => {
    getmessagelist()

  }, []);
  const [messageList, setMessageList] = useState<MessageType[]>([])

  const getmessagelist = async () => {
    let { data } = await getMessage(page)
    console.log(data);
    setMessageList(data.records)
    setPage({ ...page, total: data.total })
  }
  const publishmessage = async () => {
    let data = {
      content: content,
      releaseTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      userId: 0
    }
    await addMessage(data)
    setContent('')
    getmessagelist()

  }
  const onChangeComment = (
    value: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setContent(value.target.value);
  };

  return (
    <div>
      <Index showBanner={false}>
        <div className="pt-65px content">
          <div>留言板</div>
          <div className="mt-15px">
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
                发表
              </Button>
            </div>
            {messageList.map(res => {
              return (
                <MessageRender key={res.id} MessageData={res} resfresh={() => getmessagelist()}></MessageRender>
              )
            })}

          </div>
        </div>
      </Index>
    </div>
  );
}

export default memo(Message);
