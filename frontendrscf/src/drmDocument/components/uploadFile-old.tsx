import React, {useState } from "react";
import { SERVER_BASE_URL } from "../../config/sysConfig";

function DocumentView(){
    // constructor(props:any) {
    //     super(props);
    //     this.state = {
    //         fileURL: '',
    //     };
    //     this.handleUploadFile = this.handleUploadFile.bind(this);
    // }
    const [fileURL,setStateFileURL] = useState('')
    const uploadInputRef = React.useRef<HTMLInputElement>(null);
    

    function handleUploadFile(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const files = uploadInputRef.current?.files;
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

            fetch(SERVER_BASE_URL+'/upload', {
                method: 'POST',
                body: formData,
            }).then((response) => {
                response.json().then((body) => {
                     setStateFileURL(SERVER_BASE_URL+`/${body.file}`);
                });
            });
        }
    }

   
        return (
            <form onSubmit={handleUploadFile}>
                <div>
                {/* onInput={(e: React.FormEvent<HTMLFormElement>) => {this.handleUploadFile(e);}}  */}
                    <input id="avaInput" ref={ uploadInputRef }  type="file" />
                </div>
                <br />
                <div>
                    <button type = "submit">Upload</button>
                </div>

                
            </form>
        );
    } 

export default DocumentView;