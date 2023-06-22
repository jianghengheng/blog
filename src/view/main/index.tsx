import React, { useEffect, useState } from 'react';
import { Breadcrumb, Col, Layout, Menu, Row, theme } from 'antd';
import './index.scss'
import UserInfo from '~/src/components/userInfo';
import { useNavigate ,useLocation, To} from 'react-router-dom';
import { routes } from '~/src/utils/emojs';

const { Header, Content, Footer } = Layout;

const App: React.FC<any> = (props) => {
    const {showInfo=false,showBanner=true}=props
    const navigate = useNavigate()
    const location = useLocation()


    useEffect(() => {
    
      console.log(location);
      if(location.pathname=='/index'||location.pathname=='/user'){
        setCurrent('/')

      }else{
        setCurrent(location.pathname)

      }
        return () => {
        
         
            window.removeEventListener('scroll', () => { })
        }
    }, [])
    const [scrollTop, setscrollTop] = useState<number>(0)
    const handleScroll = (e: any) => {
        var scrollTop = (document.querySelector('section') as any).scrollTop;

        setscrollTop(scrollTop)

    }
    window.addEventListener('scroll', handleScroll, true)
  
    const skipCagegory = () => {
        navigate('/cagegory')
    }
    const [current, setCurrent] = useState<any>();
    const menuselect=(value: { key: To; })=>{
      
        navigate(value.key)
        // setCurrent(value.key)
    }
    return (
        <Layout className='rd-10px bgc-#f4f5f7 h-100vh overflow-y-auto'>
          {showInfo?<UserInfo scrolltop={scrollTop}></UserInfo>:<></>}  
            <Header className='bd-10px bgc-#fff w-100%'  style={{ position: 'fixed', top: 0, zIndex: 2,  boxShadow: '0 2px 4px 0 rgba(0,0,0,.15)' }}>


                <Menu
                    mode="horizontal"
                    onClick={menuselect}
                    selectedKeys={[current]}
                    items={routes.map((_, index) => ({
                        key: _.path,
                        label: _.title,
                    }))}
                />
            </Header>
            <Content className="site-layout pt-0 pb-0 pr-50px pl-50px" >
              {showBanner?<div className='trm-banner'>
                    <video data-scroll data-scroll-direction data-scroll-speed autoPlay loop muted playsInline className='trm-banner-cover trm-active-el'>
                        <source src="//cdn.moji.com/websrc/video/autumn20190924.mp4" type="video/mp4; " />
                    </video>
                    <div className="trm-banner-content trm-overlay">
                        <div className="container" data-scroll data-scroll-direction="vertical"
                            data-scroll-speed="0">
                            <div className="textContent">
                                <div >
                                    <div className="trm-banner-text">
                                        <div className='text-20px mb-20px color-#fcfefe' style={{
                                            textShadow: ' 0 1px 10px rgb(0 0 0 / 30%)',
                                        }}>Hi my new friend!</div>
                                        <h1
                                        className='mb-30px'
                                        style={{
                                            color: '#fcfcfe',
                                            textShadow: ' 0 1px 10px rgb(0 0 0 / 30%)',
                                            fontSize: "2.5rem",
                                           
                                            fontWeight: 'bloder'
                                        }}>树深时见鹿，<br />溪午不闻钟。</h1>

                                    </div>
                                    <a href="#about-triger" data-scroll-to="#about-triger"
                                        data-scroll-offset="-130" className="trm-scroll-hint-frame">
                                        <div className="trm-scroll-hint"></div><span className="trm-label">Scroll
                                            down</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>:<></>}  
                {props.children}

            </Content>

        </Layout >
    );
};

export default App;