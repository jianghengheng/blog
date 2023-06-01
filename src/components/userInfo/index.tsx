


import { Button, Modal } from 'antd'
import { useState, useEffect, memo, useRef } from 'react'
import avator from '../../../public/avatar.jpg'
import './index.scss'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import AddModal from '../AddModle'

interface Props {
  scrolltop: number
}
function UserInfo({ scrolltop }: Props) {
const addmodle:any=useRef()
  // 打开对话框
  const addArticle = () => {
   console.log(addmodle);
   addmodle. current. addArticle()
  }
 
  return (
    <>
      <div className='userInfo'   style={{ marginTop: 100 - scrolltop < 54 ? '54px' : scrolltop < 30 ? '100px' : 100 - scrolltop + 'px' }}>
        <div className='trm-mc-header'>
          <div className='trm-avatar' onClick={addArticle}>
            <img className='avatar' src={avator} alt="" />
          </div>
          <h5>衡衡蒋</h5>
          <div className='trm-label'>

            <span className='trm-typed-text'>前端工程师</span>
          </div>
          <div className='point'></div>
          <div className='trm-social'>
            <a className="iconfont icon-github-fill" target='_blank' href="https://github.com/jianghengheng/">

            </a>
            <a className="iconfont icon-weixin" href="weixin://" 
            onClick={'PIWI_SUBMIT.Weixin_Open()'}  ></a>

            <div className="iconfont icon-youxiang" title='wsjiangheng@163.com'></div>

            <a className="iconfont icon-phone" title='16622136952' href="tel:16622136952">

            </a>


          </div>
          <div className='point'></div>
          <div className='Info'>
            <ul>
              <li>
                <div>居住地</div>
                <div>Earth</div>
              </li>
              <li>
                <div>城市</div>
                <div>chengdu</div>
              </li>
              <li>
                <div>年龄</div>
                <div>25</div>
              </li>
              <li>
                <div>联系方式</div>
                <div>16622136952</div>
              </li>
              <li>
                <div>邮箱</div>
                <div>wsjiangheng@163.com</div>
              </li>

            </ul>
          </div>
          <div className='point'></div>
          <div>
            <a href="mailto:wsjiangheng@163.com" className='button '>联系我
              <i className='iconfont icon-youxiang'></i></a>
          </div>
        </div>
      </div>
    <AddModal ref={addmodle}></AddModal>
    </>
  )
}

export default memo(UserInfo)
