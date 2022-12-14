import React, { useEffect, useState } from 'react';
import { Breadcrumb, Col, Layout, Menu, Row, theme } from 'antd';
import './index.scss'
import UserInfo from '~/src/components/userInfo';
import { useNavigate } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

const App: React.FC<any> = (props) => {
    const navigate = useNavigate()


    useEffect(() => {
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
    return (
        <Layout style={{ borderRadius: "10px", backgroundColor: "#ffffff", height: '100vh', overflowY: 'auto', background: "#f4f5f7" }}>
            <UserInfo scrolltop={scrollTop}></UserInfo>
            <Header style={{ position: 'fixed', top: 0, zIndex: 2, width: '100%', borderRadius: "10px", backgroundColor: "#ffffff", boxShadow: '0 2px 4px 0 rgba(0,0,0,.15)' }}>


                <Menu
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    items={new Array(3).fill(null).map((_, index) => ({
                        key: String(index + 1),
                        label: `nav ${index + 1}`,
                    }))}
                />
            </Header>
            <Content className="site-layout" style={{ padding: '0 50px' }}>
                <div className='trm-banner'>
                    <video data-scroll data-scroll-direction data-scroll-speed autoPlay loop muted playsInline className='trm-banner-cover trm-active-el'>
                        <source src="//cdn.moji.com/websrc/video/autumn20190924.mp4" type="video/mp4; " />
                    </video>
                    <div className="trm-banner-content trm-overlay">
                        <div className="container" data-scroll data-scroll-direction="vertical"
                            data-scroll-speed="0">
                            <div className="textContent">
                                <div >
                                    <div className="trm-banner-text">
                                        <div style={{
                                            color: '#fcfcfe',
                                            textShadow: ' 0 1px 10px rgb(0 0 0 / 30%)',
                                            fontSize: "20px",
                                            marginBottom: '20px'
                                        }}>Hi my new friend!</div>
                                        <h1 style={{
                                            color: '#fcfcfe',
                                            textShadow: ' 0 1px 10px rgb(0 0 0 / 30%)',
                                            fontSize: "2.5rem",
                                            marginBottom: '30px',
                                            fontWeight: 'bloder'
                                        }}>??????????????????<br />??????????????????</h1>

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
                </div>
                {props.children}

            </Content>

        </Layout >
    );
};

export default App;