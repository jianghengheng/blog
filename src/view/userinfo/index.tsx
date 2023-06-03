


import { Button, Col, Row } from 'antd'
import Index from '../main/index'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '~/src/store'
import { GetArticle } from '~/src/api/article'
import UserInfo from '~/src/components/userInfo'

// 主页
function Main() {


    const navigate = useNavigate()
    useEffect(() => {
        if (
            window.screen.width <= 480
          ) {
            navigate('/user')
          } else {
            navigate('/index')
          }
          
       
      }, [])
  const skipCagegory = () => {
      navigate('/cagegory')
    }
    return (
    <div>
      <Index showInfo>
        <div className='container'>
       


        </div>


      </Index>
    </div>
    )
}

    export default Main
