// (function (document) {
//   var input = document.getElementById("files"),
//       output = document.getElementById('output');

//   // Eventhandler for file input. 
//   function openfile(evt) {
//     var files = input.files;
//     // Pass the file to the blob, not the input[0].
//     fileData = new Blob([files[0]]);
//     // Pass getBuffer to promise.
//     var promise = new Promise(getBuffer(fileData));
//     // Wait for promise to be resolved, or log error.
//     promise.then(function(data) {
//       // Here you can pass the bytes to another function.
//       output.innerHTML = data.toString();
//       console.log(data);
//     }).catch(function(err) {
//       console.log('Error: ',err);
//     });
//   }

//   /* 
//     Create a function which will be passed to the promise
//     and resolve it when FileReader has finished loading the file.
//   */
//   function getBuffer(fileData) {
//   	return function(resolve) {
//         var reader = new FileReader();
//         reader.readAsArrayBuffer(fileData);
//         reader.onload = function() {
//           var arrayBuffer = reader.result
//           var bytes = new Uint8Array(arrayBuffer);
//           resolve(bytes);
//         }
//     }
//   }
  
//     // Eventlistener for file input.
//   input.addEventListener('change', openfile, false);
// }(document));
// <input type="file" id="files" />
// <div id="output"></div>