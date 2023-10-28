import React, { useState }  from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload, Alert } from 'antd';
import { SERVER_BASE_URL } from "../../config/sysConfig";
import 'antd/dist/antd.css';
import './index.css';


const { Dragger } = Upload;

const UploadFileView = () => {
    const [showupload, setShowupload] = useState(false);

    const props = {
        name: 'file',
        multiple: true,
        action: SERVER_BASE_URL +'/file/upload',
        accept:'.xls, .xlsx, .csv, .zip',
        // data:
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

        onDrop(e:React.ChangeEvent<HTMLInputElement>) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };
    return (
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
    )
};
export default UploadFileView;