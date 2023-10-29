import React, { useState, useRef }  from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload, Alert, Input } from 'antd';
import { SERVER_BASE_URL } from "../../config/sysConfig";
// import 'antd/dist/antd.css';
import 'antd/dist/reset.css';

const { Dragger } = Upload;

const UploadFileView = () => {
    const [showupload, setShowupload] = useState(false);
    const specRef = useRef<any>();
    const props = {
        name: 'file',
        multiple: true,
        action: SERVER_BASE_URL +'/file/upload',
        // beforeUpload:"beforeUpload",
        // accept:'.xls, .xlsx, .csv, .zip',
        data:{userName: sessionStorage.getItem("userName"), description:specRef.current.value},
        onChange(info:any) {
            setShowupload(true);
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

        
    };

    function beforeUpload(){

    }
    return (
        <div>
            <div>
                <Dragger {...props} showUploadList={showupload}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                        Click or drag file to this area to upload
                    </p>
                    <p className="ant-upload-hint">
                    
                    </p>
                </Dragger>
            </div>

            <div>
                        {/* <input type="text" onClick={getProductsList}>
                Description */}
                <Input id = "specific" placeholder="file description"  ref={specRef} />;                
            </div>
        </div>
    )
};
export default UploadFileView;