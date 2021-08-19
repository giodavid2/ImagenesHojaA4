var imgUrl = '';
var imgInfo = '';
$(document).ready(function() { 
    $('#image').change(async function() {
        var imagen = document.getElementById('image').files;
        for (let value of Object.keys(imagen)) {
            if (validarFormato(imagen[value])) {
                encodeImgURL(imagen[value]);
            }
        }
    });
});

function encodeImgURL(imagen){
    var file = new FileReader();
        file.onloadend = function() {
            imgUrl += '|'+file.result;
            var _URL = window.URL || window.webkitURL;
            var img = new Image();
            img.src = _URL.createObjectURL(imagen);
            img.onload = function () {
                var ancho = img.width;
                var alto = img.height;
                imgInfo += '|'+ancho+'x'+alto;
            }            
        }
        file.readAsDataURL(imagen);
}

function generarPDF() {
    var lengthUrl = imgUrl.split('|');
    var lengthInfo = imgInfo.split('|');
    if (lengthInfo[1].split('x')[0] > lengthInfo[1].split('x')[1]) {
        var doc = new jsPDF({
            orientation: 'l'
        });
    }else{
        var doc = new jsPDF({
            orientation: 'p'
        });
    }
    for (let i = 0; i < lengthUrl.length; i++) {
        if (lengthUrl[i] != '') {
            var width = doc.internal.pageSize.width;
            var height = doc.internal.pageSize.height;
            doc.addImage(lengthUrl[i], 'JPEG', 0, 0, width, height);
            if (lengthInfo[i+1] != undefined){
                if (lengthInfo[i+1].split('x')[0] > lengthInfo[i+1].split('x')[1]){
                    doc.addPage('a4', 'landscape');
                }else{
                    doc.addPage('a4', 'portrait');
                }
            }
        }
    }
    doc.deletePage(lengthUrl.length);
    doc.save('imagenes.pdf');
}

function validarFormato(imagen) {
    if (imagen.name.split('.')[1] === 'jpg') {
        if (imagen.type === 'image/jpeg') {
            return true;
        }else{
            return false;
        }
    }else{
        return false;
    }
} 



