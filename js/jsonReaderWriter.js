var remote = require('electron').remote;
var electronFs = remote.require('fs');
var electronDialog = remote.dialog;
 var selectedFile = "";

function ReadFile() {
    var newFile = electronDialog.showOpenDialog({
        defaultPath: "./questionJSON",
        properties: ['openFile'],
        filters: [
            { name: 'Custom File Type', extensions: ['json'] },
          ]
    });
    selectedFile = newFile[0];

    return new Promise((resolve, reject) =>{
        electronFs.readFile(selectedFile, 'utf-8', (err, data) => {
            if(err){
                alert("An error ocurred reading the file :" + err.message);
                reject(err);
            }
            // Change how to handle the file content
            resolve(data);
        });
    });
}

function WriteFile(content) {
    var fileName = electronDialog.showSaveDialog({
        defaultPath: "./questionJSON",
        filters: [
            {name: 'Custom File Type', extensions: ['json']},
        ]
    });
    return new Promise((resolve, reject) =>{
        electronFs.writeFile(fileName, content, (err) => {
            if(err){
                reject(err)
            }        
            resolve("The file has been succesfully saved");
        });
    });
};