$(document).ready(function() { 
    imgData = '';
    imgInfo = '';
    $('#image').change(async function() {
        var imagen = document.getElementById('image').files;
        for (i = 0; i < imagen.length; i++) {
            if (validarFormato(imagen[i])) {
                encodeImgURL(imagen[i]);
            }
        }
    });
});

function encodeImgURL(imagen){
    var file = new FileReader();
        file.onloadend = function() {
            imgData += '|'+file.result;
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
    var lengthData = imgData.split('|');
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
    for (i = 0; i < lengthData.length; i++) {
        if (lengthData[i] != '') {
            var width = doc.internal.pageSize.width;
            var height = doc.internal.pageSize.height;
            doc.addImage(lengthData[i], 'JPEG', 0, 0, width, height);
            if (lengthInfo[i+1] != undefined){
                if (lengthInfo[i+1].split('x')[0] > lengthInfo[i+1].split('x')[1]){
                    doc.addPage('a4', 'landscape');
                }else{
                    doc.addPage('a4', 'portrait');
                }
            }
        }
    }
    doc.deletePage(lengthData.length);
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



