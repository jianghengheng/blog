import { Button, Card, Col, Row } from "antd";
import Index from "../main/index";

import { useState, useEffect, memo } from "react";

import MDEditor from "@uiw/react-md-editor";
import { getResume } from "~/src/api/resume";

// 文章页面

function Resume() {
  const [content,setContent]=useState<string>('')
  useEffect(() => {

  }, []);
  return (
    <div >
      <Index >
      <div className="mt-60px">
    11
      </div>
    

      </Index>
     
    </div>
  );
}

export default memo(Resume);
