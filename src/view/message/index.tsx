import { Button, Card, Col, Row } from "antd";
import Index from "../main/index";
import { useState, useEffect, memo } from "react";
import "./index.scss";
import TextArea from "antd/es/input/TextArea";

//留言板页面
function Message() {
  useEffect(() => {}, []);
  const [content, setContent] = useState<string>("");
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
              style={{ height: 150 }}
              showCount
              maxLength={100}
              value={content}
              onChange={onChangeComment}
              placeholder="输入评论（Enter换行）"
            />
          <div className="overflow-hidden">
          <Button type="primary" className="mt-10px float-left">
              发表
            </Button>
          </div>
            <Card className="mt-15px ">
          <div className="flex">
          <div>
                <img src="../../../public//avatar.jpg" width={50} height={50} />
              </div>
              <div className="ml-10px">
                <span className="color-#26709a">名字</span>
                <span className="ml-10px color-#9B9B9B">第1楼</span>
                <div className="mt-15px">
                  生日快乐呀，今年你毕业了，你成功的成为一名研究生了，你回来了，你变瘦了，哈哈哈，李让也变成一个22岁的大姑娘了，或许你还承担不了什么，但是你绝对是个优秀的女孩子
                  今天的愿望是，研究生生活顺畅一点，烦恼少一点，父母身体好一点，弟弟再长高一点，朋友们早日更幸福一点
                </div>
                <div className="mt-30px">2023-10-11 11:11:11</div>
              </div>
          </div>
    
            </Card>
            <Card className="mt-15px ">
          <div className="flex">
          <div>
                <img src="../../../public//avatar.jpg" width={50} height={50} />
              </div>
              <div className="ml-10px">
                <span className="color-#26709a">名字</span>
                <span className="ml-10px color-#9B9B9B">第1楼</span>
                <div className="mt-15px">
                  生日快乐呀，今年你毕业了，你成功的成为一名研究生了，你回来了，你变瘦了，哈哈哈，李让也变成一个22岁的大姑娘了，或许你还承担不了什么，但是你绝对是个优秀的女孩子
                  今天的愿望是，研究生生活顺畅一点，烦恼少一点，父母身体好一点，弟弟再长高一点，朋友们早日更幸福一点
                </div>
                <div className="mt-30px">2023-10-11 11:11:11</div>
              </div>
          </div>
    
            </Card>
          </div>
        </div>
      </Index>
    </div>
  );
}

export default memo(Message);
