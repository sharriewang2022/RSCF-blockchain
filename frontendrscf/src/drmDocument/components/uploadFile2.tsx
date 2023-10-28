import React, { Component } from "react";
// import UploadService from "../services/upload-files.service";
import {uploadFileService, getDocumentList} from "../../api/fileApi";

interface fileProps {
}

interface fileState {
    selectedFiles: any,
    currentFile: any,
    progress: any,
    message: string,

    fileInfos: Array<any>,
}

class UploadFileView extends Component<fileProps, fileState> {
  constructor(props: fileProps) {
    super(props);
    this.selectFile = this.selectFile.bind(this);
    this.upload = this.upload.bind(this);

    this.state = {
      selectedFiles: undefined,
      currentFile: undefined,
      progress: 0,
      message: "",
      fileInfos: [],
    };
  }

  componentDidMount() {
    getDocumentList().then((response) => {
      this.setState({
        fileInfos: response.data,
      });
    });
  }

  selectFile(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      selectedFiles: e.target.files,
    });
  }

  upload() {
    let currentFile = this.state.selectedFiles[0];

    this.setState({
      progress: 0,
      currentFile: currentFile,
    });

    uploadFileService(currentFile, (e: ProgressEvent) => {
      this.setState({
        progress: Math.round((100 * e.loaded) / e.total),
      });
    }).then((response) => {
        this.setState({
          message: response.data.message,
        });
        return getDocumentList();
      })
      .then((files) => {
        this.setState({
          fileInfos: files.data,
        });
      })
      .catch(() => {
        this.setState({
          progress: 0,
          message: "Could not upload the file!",
          currentFile: undefined,
        });
      });

    this.setState({
      selectedFiles: undefined,
    });
  }

  render() {
    const {
      selectedFiles,
      currentFile,
      progress,
      message,
      fileInfos,
    } = this.state;

    return (
      <div>
        {currentFile && (
          <div className = "progress">
            <div
              className = "progress-bar progress-bar-info progress-bar-striped"
              role="progressbar"
              aria-valuenow = {progress}
            //   aria-valuemin = "0"
            //   aria-valuemax = '100'
              style={{ width: progress + "%" }}
            >
              {progress}%
            </div>
          </div>
        )}

        <label className="btn btn-default">
          <input type="file" onChange={this.selectFile} />
        </label>

        <button
          className="btn btn-success"
          disabled={!selectedFiles}
          onClick={this.upload}
        >
          Upload
        </button>

        <div className="alert alert-light" role="alert">
          {message}
        </div>

        <div className="card">
          <div className="card-header">List of Files</div>
          <ul className="list-group list-group-flush">
            {fileInfos &&
              fileInfos.map((file, index) => (
                <li className="list-group-item" key={index}>
                  <a href={file.url}>{file.name}</a>
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  }
}

export  default UploadFileView 