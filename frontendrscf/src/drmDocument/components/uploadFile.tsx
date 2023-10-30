import React, { useState, useRef, useMemo,CSSProperties }  from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload, Layout, Input } from 'antd';
// import PropTypes from 'prop-types';
import { SERVER_BASE_URL, fileSizeLimit } from "../../config/sysConfig";
// import 'antd/dist/antd.css';
import 'antd/dist/reset.css';
import { Label } from 'reactstrap';
const { TextArea } = Input;
const { Dragger } = Upload;
const { Header, Content, Footer } = Layout;


const UploadFileView = () => {
    const [showupload, setShowupload] = useState(false);
    //file description
    const [specValue, setSpecValue] = useState('');
    const specRef = useRef<HTMLTextAreaElement>(null);

    const textAreaStyle: CSSProperties = useMemo(() => ({
        // resize: "none" ,
        // innerWidth: '300px'

    }), []);

    // const propTypes = {
	// 	onChange: PropTypes.func,
	// 	limit: PropTypes.number,
	// 	accept: PropTypes.string,
	// };

	// const defaultProps = {
	// 	limit: 20,
	// };
 
    const props = {
        name: 'file',
        multiple: true,
        action: SERVER_BASE_URL +'/file/upload/'+ sessionStorage.getItem("userName"),
        // accept:'.xls, .xlsx, .csv, .zip',
        // headers: {
        //    "content-type": 'application/json'
        // },        
        data:{"userName": sessionStorage.getItem("userName"), "description":'upload file to IPFS'},
        onChange(info:any) {
            setShowupload(true);
            const isLimit = info.file.size / 1024 / 1024 < fileSizeLimit;
            if (!isLimit) {
                message.error(`Limited to ${fileSizeLimit}MB or less`);
                return false;
            }
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
                setShowupload(false);
            }
        },

        onDrop(e:React.DragEvent<HTMLDivElement>) {
            console.log('Dropped files', e.dataTransfer.files);
        },
        FileList,
        beforeUpload: (file:any) => {
            const isLimit = file.size / 1024 / 1024 < fileSizeLimit;
            if (!isLimit) {
                return false;
            }            
            return true;
        },            
    };

    return (
       <>
        <Layout className="body" style={{ 
            width:500, 
            height:400,
            background: 'none', 
            padding: 0, 
            // margin: 100,
            position:'relative',
            left:200,
            top:100, 
            }}
            >
            <Header style={{ background: '#fff', padding: 0 }}>
                <Label>
                    <h3>Choose File:</h3>
                </Label>
            </Header>
            <Content style={{        
                margin: 10 
                }} >
                <Dragger {...props} showUploadList={showupload}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                        Click or drag file to this area to upload
                    </p>
                    <p className="ant-upload-hint">
                        {`Support for a single upload. Limited to ${fileSizeLimit}MB or less`}
                    </p>
                </Dragger>
            </Content>
            {/* <Footer style={{ background: '#fff', padding: 0 }}>
            <TextArea placeholder="file description"
                 style = {textAreaStyle}
                maxLength={100}  
                 autoSize={{ minRows: 2, maxRows: 6 }}
                 ref={specRef}
                 value={specValue}
                 onChange={(e) => setSpecValue(e.target.value)}
             /> 
            </Footer>            */}
        </Layout>
        </> 
    )
};
export default UploadFileView;