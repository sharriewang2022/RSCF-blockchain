import React from 'react';

Class Document extends React.Component {
    constructor(props:any) {
        super(props);

        this.state = {
            fileURL: '',
        };

        this.handleUploadFile = this.handleUploadFile.bind(this);
    }

    handleUploadFile(ev) {
        ev.preventDefault();

        const data = new FormData();
        data.append('file', this.uploadInput.files[0]);
        data.append('filename', this.uploadInput.files[0].name);

        console.log(this.uploadInput.files[0].name);

        fetch('http://localhost:5000/upload', {
            method: 'POST',
            body: data,
        }).then((response) => {
            response.json().then((body) => {
                this.setState({ fileURL: `http://localhost:5000/${body.file}` });
            });
        });
    }

    render() {
        return (
            <form onSubmit={this.handleUploadImage}>
                <div>
                    <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
                </div>
                <br />
                <div>
                    <button onClick = { this.handleUploadFile }>Upload</button>
                </div>
            </form>
        );
    }
}

export default Document;