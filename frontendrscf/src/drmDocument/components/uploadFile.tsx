import React from 'react';

class DocumentView extends React.Component {
    constructor(props:any) {
        super(props);
        this.state = {
            fileURL: '',
        };
        this.handleUploadFile = this.handleUploadFile.bind(this);
    }

    uploadInputRef = React.useRef<HTMLInputElement>(null);
    

    handleUploadFile(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const files = this.uploadInputRef.current?.files;
        if (files) {
            // get the `FormData` for the whole form
            const formData = new FormData(e.currentTarget);
             // logs a `File` object
             const avatar = formData.get("avaInput"); // type is `string | File | null`
             if ( avatar instanceof File ) {
               console.log("we have a file", avatar); // type is now just `File`
             }
            formData.append('file', files[0]);
            formData.append('filename', files[0].name);

            console.log("upload fileName is : " + files[0].name);

            fetch('http://localhost:8000/upload', {
                method: 'POST',
                body: formData,
            }).then((response) => {
                response.json().then((body) => {
                    this.setState({ fileURL: `http://localhost:8000/${body.file}` });
                });
            });
        }
    }

    render() {
        return (
            <form onSubmit={this.handleUploadFile}>
                <div>
                {/* onInput={(e: React.FormEvent<HTMLFormElement>) => {this.handleUploadFile(e);}}  */}
                    <input id="avaInput" ref={ this.uploadInputRef }  type="file" />
                </div>
                <br />
                <div>
                    <button type = "submit">Upload</button>
                </div>

                
            </form>
        );
    }
}

export default DocumentView;