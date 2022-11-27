// js


$('[type="file"]').ezdz({
  
  text: 'drop a picture',
  
  validators: {
    maxWidth: 1024,
    maxHeight: 1024
  },
  
  reject: function(file, errors) {
    
    if (errors.mimeType) {
      alert(file.name + ' must be an image');
    }
      
    if (errors.maxWidth) {
      alert(file.name + ' must be width:600px max');
    }

    if (errors.maxHeight) {
      alert(file.name + ' must be height:400px max');
    }
    
  }
});