
import { Button, Form, Input, Modal, Select, message, Upload, Row, Col } from 'antd'
import { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
// import './index.scss'

import { RootState } from '~/src/store'
import { useSelector } from 'react-redux'
import ImgCrop from 'antd-img-crop';
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload'
import { AddArticle } from '~/src/api/article';
import MDEditor from '@uiw/react-md-editor';
// import Vditor from "vditor";
function AddModal(props: any, ref: any) {
    const init = useSelector((state: RootState) => state.countReducer)
    // 打开文本编辑器
    const [open, setOpen] = useState<boolean>(false);
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
    const [value, setValue] = useState<string | undefined>("");

    const [form] = Form.useForm();
    // 及时销毁 editor
  
    useEffect(() => {
        setArticleData({ ...articleData, content: value })
    }, [value])
    // 打开对话框
    const addArticle = () => {
        setOpen(true)
    }
    useImperativeHandle(ref, () => ({ // 暴露给父组件的方法
        addArticle,

    }))
    // 添加文章
    const handleOk = async () => {
    
        const values = await form.validateFields();
        setArticleData({...articleData, ...{
            content: value
        }})
        await AddArticle(articleData)
        message.success('添加成功')
        setValue('')
        setArticleData({
            title: "",
            content: "",
            fileId: null,
            category: "",
            categoryId: null,
        })
        setOpen(false)
    }
    /**上传图片展示 */
    const [imageUrl, setImageUrl] = useState<string>();
    /**加载 */
    const [loading, setLoading] = useState(false);
    /**添加文章的数据 */
    const [articleData, setArticleData] = useState<{
        title: string;
        content: string | undefined;
        fileId: null
        category: string
        categoryId: null
    }>({
        title: "",
        content: "",
        fileId: null,
        category: "",
        categoryId: null,
    })
    /**上传前 */
    const beforeUpload = (file: RcFile) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('只能上传 JPG/PNG 的文件!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('文件大小不能超过 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };
    const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        console.log(info);

        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // response
            setLoading(false);
            setImageUrl(`/api/static/${info.file.response}`);

            setArticleData({ ...articleData, ...{ fileId: info.file.response } })
        }
    };
    const SelectChange = (id: any) => {


        setArticleData({
            ...articleData, ...{
                category: init.category?.find((res: any) => (res.id == id))?.category,
                categoryId: id
            }
        })
    }

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined rev={undefined} /> : <PlusOutlined rev={undefined} />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    return (

        <Modal
            title="添加文章"
            open={open}
            width={'80%'}
            cancelText="取消"
            okText='添加'
            onOk={handleOk}
            onCancel={() => {
                setArticleData({
                    title: "",
                    content: "",
                    fileId: null,
                    category: "",
                    categoryId: null,
                })
                setOpen(false)
            }}
            confirmLoading={confirmLoading}

        >

            <Form
                name="basic"
                form={form}
                initialValues={{ remember: true }}

                autoComplete="off"
            >
                <Row justify="space-between">
                    <Col span={19}><Form.Item
                        label="标题"
                        name="title"
                        rules={[{ required: true, message: '请输入标题' }]}
                    >
                        <Input value={articleData.title} onChange={(e) => setArticleData({ ...articleData, ...{ title: e.target.value } })} />
                    </Form.Item>
                        <Form.Item
                            label="类型"
                            name="category"
                            rules={[{ required: true, message: '请选择文章类型' }]}
                        >
                            <Select
                                fieldNames={{ label: 'category', value: 'id', options: init.category }}
                                onChange={SelectChange}
                                options={init.category}
                            />
                        </Form.Item></Col>
                    <Col span={4}>  <Form.Item
                        label="上传文件"
                        name="file"
                    >
                        <ImgCrop rotate>
                            <Upload
                                name="file"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action='/api/file/upload'
                                beforeUpload={beforeUpload}
                                onChange={handleChange}
                            >
                                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                            </Upload>
                        </ImgCrop>
                    </Form.Item></Col>

                </Row>


            </Form>
            <MDEditor
                value={value}
                onChange={setValue}
            />
            {/* <MDEditor.Markdown source={value} style={{ whiteSpace: 'pre-wrap' }} /> */}

        </Modal>

    )
}

export default forwardRef(AddModal)




