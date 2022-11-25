var imageLoader = document.getElementById('imageLoader');
    imageLoader.addEventListener('change', handleImage, false);
var canvas = document.getElementById('imageCanvas');
    canvas.width = 1000;
    canvas.height = 1000;
var ctx = canvas.getContext('2d');


function popupResult(result) {
  var html;

  if (result.html) {
  	html = result.html;
  }

  if (result.src) {
  	html = '<img src="' + result.src + '" />'
  }

  Swal.fire({
    html:html
  });

  Swal.fire({
    title: 'Share ke sosial media kamu',
    html:html,
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: `Share`,
    denyButtonText: `Download`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      shareImage();
      return false;
    } else if (result.isDenied) {
      downloadImage();
    }
  })

}

/**
 * Draw image
 */
function drawFrame() {
  var img = new Image();
  img.crossOrigin = "Anonymous";
  img.src = 'images/'+kampanye;  
  img.onload = function() {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    popupResult({
			src: document.getElementById('imageCanvas').toDataURL('image/jpg'),
		});
	   console.log('popup ok');
  }
}


function drawProfPict(src) {
  var img = new Image();
  img.onload = function(){
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    drawFrame();
  }

  img.src = src;
}

/**
 * Load image from user
 */
function handleImage(e) {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  var img_url = e.target.files[0];
  loadImage.parseMetaData(img_url, function(data) {
    var ori = 0;
    if (data.exif) {
      ori = data.exif.get('Orientation');
    }

    var loadingImage = loadImage(
      img_url,
      function(canvas) {
        $('.cr-slider').css('visibility', 'visible');
        $('.loader').remove();

        var dataUrl = canvas.toDataURL('image/jpeg');
        basic.croppie('bind', {
            url: dataUrl
        });
      },
      {
        maxWidth: 2800,
        maxHeight: 2800,
        orientation: ori,
        canvas: true
      });

    loadingImage.onloadstart = function(event) {
      $('.cr-viewport').append('<div class="loader"></div>');
    }
  });
}


/**
 * Download image from canvas
 */

function downloadCanvas(link, canvasId, filename) {
  link.href = document.getElementById(canvasId).toDataURL('image/jpeg');
  link.download = filename;
}

/*
$('#unduh').on('click', '.sweet-alert', function() {
  downloadCanvas(this, 'imageCanvas', 'udb-twibbon');
});
*/

function downloadImage() {
  var link = document.getElementById("downloadlink");
  link.href = document.getElementById("imageCanvas").toDataURL();
  link.download = "udb_twibbon.png";
  link.click();
}


//share
function shareImage() {
  var gambar = document.getElementById("imageCanvas");
  gambar.toBlob( async function(blob) {

    var file = new File([blob], "udb_twibbon.png", {type: 'image/png'});

    const shareData = {
      title: 'Share UDB Twibbon',
      text: '#'+judul+' | UDB The Global Entrepreneur University',
      url: 'https://twibbon.udb.ac.id?udb='+judul,
      files: [file]
    };

    if (navigator.share) {
        await navigator.share(shareData).then(() => {
          console.log("Berhasil sharing");
        })
        .catch(err => {
          console.log(err.message);
        });
    } else {
        Swal.fire("Browser tidak support share");
    }

  });
};

var basic = $('#demo-basic').croppie({
    viewport: {
        width: Math.min(300, window.innerWidth - 50),
        height: Math.min(300, window.innerWidth - 50)
    },
    boundary: {
      width: Math.min(300, window.innerWidth - 50),
      height: Math.min(300, window.innerWidth - 50),
    },
    enableOrientation: true,
    enableResize: true,
    enforceBoundary:false
});


$('.basic-result').on('click', function(e) {
  e.preventDefault();
  console.log('OK');
  var downloadButton = this;
  basic.croppie('result', {
		type: 'canvas',
    size:'original',
	}).then(function (resp) {
		drawProfPict(resp);
	});
});

//putar
$('#putar').click(function() {
  basic.croppie('rotate', -90);
});
