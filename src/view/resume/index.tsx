import React, { useEffect, useState } from 'react';
import { Breadcrumb, Card, Col, Layout, Menu, Row, theme } from 'antd';
import PDF from 'react-pdf-js';
import resume from '../../../public/jh.pdf'

const App: React.FC<any> = (props) => {

    return (
        <Card>
            <PDF file={resume} />
        </Card>
    );
};

export default App;