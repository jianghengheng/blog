
import { Button, Form, Input, Modal, Select, message, Upload, Row, Col } from 'antd'
import { useState, useEffect, forwardRef, useImperativeHandle, useRef, useCallback } from 'react'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
// import './index.scss'
import * as editHelper from "~/src/utils/edit"
import { RootState } from '~/src/store'
import { useSelector } from 'react-redux'
import ImgCrop from 'antd-img-crop';
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload'
import { AddArticle } from '~/src/api/article';
import MDEditor, { commands, comment } from "@uiw/react-md-editor";
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
        setArticleData({
            ...articleData, ...{
                content: value
            }
        })
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
    const editorRef: any = useRef(null);
    const inputRef: any = useRef(null);
    const textApiRef: any = useRef(null);
    const [insertImg, setInsertImg] = useState("");

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
            setImageUrl(`/api/${info.file.response}`);

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
            <div className='mb-8px'>Upload</div>
        </div>
    );
    const inputImageHandler = useCallback(async (event: any) => {
        if (event.target.files && event.target.files.length === 1) {
console.log(event.target.files[0]);

            setInsertImg("");
            await editHelper.onImageUpload(event.target.files[0], textApiRef.current);
        }
    }, []);


    const imgBtn = (inputRef: { current: { click: () => void; }; }, textApiRef: { current: any; }) => ({
        name: "Text To Image",
        keyCommand: "text2image",
        render: (command: { groupName: any; }, disabled: boolean | undefined, executeCommand: (arg0: any, arg1: any) => void) => {
            return (
                <button
                    type="button"
                    aria-label="Insert title3"
                    disabled={disabled}
                    onClick={() => {
                        executeCommand(command, command.groupName);
                    }}
                >
                    <svg width="12" height="12" viewBox="0 0 20 20">
                        <path
                            fill="currentColor"
                            d="M15 9c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm4-7H1c-.55 0-1 .45-1 1v14c0 .55.45 1 1 1h18c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm-1 13l-6-5-2 2-4-5-4 8V4h16v11z"
                        ></path>
                    </svg>
                </button>
            );
        },
        execute: (state: any, api: any) => {
            inputRef.current.click();
            textApiRef.current = api;
        }
    });

    const editor: any = {
        editChoice: (inputRef: { current: { click: () => void; }; }, textApiRef: { current: any; }) => imgBtn(inputRef, textApiRef),


    }
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
                        <ImgCrop >
                            <Upload
                                name="file"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action='/api/file/upload'
                                beforeUpload={beforeUpload}
                                onChange={handleChange}
                            >
                                {imageUrl ? <img src={imageUrl} alt="avatar" className='w-100%' /> : uploadButton}
                            </Upload>
                        </ImgCrop>
                    </Form.Item></Col>

                </Row>


            </Form>
            <input
                ref={inputRef}
                className="hidden"
                type="file"
                accept=".jpg,.png,.jpeg,.jfif,.gif"
                name="avatar"
                value={insertImg}
                onChange={inputImageHandler}
            />
            <MDEditor
                ref={editorRef}
                value={value}
                onChange={(e) => setValue(e)}
                commands={[editor.editChoice(inputRef, textApiRef), commands.link, commands.bold, commands.code, commands.codeBlock, commands.divider, commands.title, commands.hr, commands.italic, commands.unorderedListCommand, commands.title, commands.title6, commands.title5, commands.title4, commands.title3, commands.title2, commands.title1, commands.title, commands.strikethrough, commands.quote]}
                preview="edit"
            />

            {/* <MDEditor.Markdown source={value} style={{ whiteSpace: 'pre-wrap' }} /> */}

        </Modal>

    )
}

export default forwardRef(AddModal)





