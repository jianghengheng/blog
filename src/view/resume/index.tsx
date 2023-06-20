import { Button, Card, Col, Row } from "antd";
import Index from "../main/index";

import { useState, useEffect, memo } from "react";

import MDEditor from "@uiw/react-md-editor";
import { getResume } from "~/src/api/resume";

// 文章页面

function Resume() {
  useEffect(() => {
    getResume().then((res) => {
      console.log(res);
    });
  }, []);
  return (
    <div >
      <Index showBanner={false}>
      <div className="mt-60px">
      <MDEditor.Markdown source="111" style={{ whiteSpace: "pre-wrap", background:"#fff" }} />
      </div>
    

      </Index>
     
    </div>
  );
}

export default memo(Resume);
