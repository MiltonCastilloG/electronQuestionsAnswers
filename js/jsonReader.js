var remote = require('electron').remote;
var electronFs = remote.require('fs');
var electronDialog = remote.dialog;
 var selectedFile = "";
$
("#selectFile").on('click',function(e) {
    var newFile = electronDialog.showOpenDialog({ 
        properties: ['openFile'],
        filters: [
            { name: 'Custom File Type', extensions: ['json'] },
          ]
    });
    selectedFile = newFile[0];
    $("#fileName").append(selectedFile);
    $("#uploadJSON").css("display", "inline-block")
});

function ReadFile(route) {
    return new Promise((resolve, reject) =>{
        electronFs.readFile(route, 'utf-8', (err, data) => {
            if(err){
                alert("An error ocurred reading the file :" + err.message);
                reject(err);
            }
            // Change how to handle the file content
            resolve(data);
        });
    });
}