console.clear();

var counterr = 0;
window.onload = function () {
  if (sessionStorage.getItem("game_played") != "0" && sessionStorage.getItem("game_played") != null) {
    document.getElementById("myModal3").style.display = "none";
  }
}

function inCircle() {
  var radius = 150; // adjust to move out items in and out
  if (screen.width < 400) {
    radius = 100;
  }
  var fields = $('.items'),
    container = $('.centric-elem'),
    width = container.width(),
    height = container.height();
  // console.log(width + " " + height);
  var angle = 0,
    step = (2 * Math.PI) / fields.length;
  // console.log(angle + " " + step);
  fields.each(function () {
    var x = Math.round(width / 2 + radius * Math.cos(angle) - $(this).width() / 2);
    var y = Math.round(height / 2 + radius * Math.sin(angle) - $(this).height() / 2);
    // if (window.console) {
    // console.log($(this).text(), x, y);
    // }
    $(this).css({
      left: x + 'px',
      top: y + 'px'
    });
    angle += step;

    // console.log(angle + " " +  step);
  });
}

setTimeout("inCircle()", 100);

function resetGame() {
  location.reload();
}

/* Handmade Timer */
$("#proceed-btn").click(function () {
  var modal3 = document.getElementById("myModal3");
  modal3.style.display = 'none';
})
$("#start-btn").click(function () {
  document.querySelectorAll(".timer-inside")[0].style.opacity = 1;
  $(this).hide();
  sessionStorage.setItem("game_played", ++counterr);

  var tDuration = 44;
  var display = document.querySelector('#tiktok');

  var timer = tDuration, minutes, seconds, mili = 100, seconds = 45;
  var dinesh = setInterval(function () {
    minutes = 0;
    if ((seconds == 0) && (mili == 0)) {
      gameOver();
      clearInterval(dinesh);
    }
    else{
    if (mili == 0) {
      mili = 99;
      seconds = seconds - 1;
      seconds = seconds < 10 ? "0" + seconds : seconds;
    }
    else {
      mili = --mili;
    }
  }
    mili = mili < 10 ? "0" + mili : mili;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    display.textContent = minutes + ":" + seconds + ":" + mili;

    // if (--timer < 0) {
    //   gameOver();
    //   clearInterval(dinesh);
    // }
  }, 10);



  function gameOver() {
    var modal = document.getElementById("myModal");
    modal.style.display = 'flex';
  }


  function baggedItAll() {
    var successTime = document.querySelector('#tiktok').textContent;
    var timeNumber = parseInt(successTime[3] + successTime[4]);
    var timemili = parseInt(successTime[6] + successTime[7]);
    var winningTime;
    if ((tDuration - timeNumber) < 10) {
      winningTime = "00:" + "0" + (tDuration - timeNumber) +":"+ (100 - timemili);
    }
    else {
      winningTime = "00:" + (tDuration - timeNumber) +":"+ (100 - timemili);
    }
    setInterval(function () {
      document.getElementById("ladoo").textContent = winningTime;
    }, 10);
    clearInterval(dinesh);
    var modal2 = document.getElementById("myModal2");
    modal2.style.display = 'flex';
    // console.log(winningTime);
  }


  /*
  * Credits to http://www.htmldrive.net/items/show/13/HTML5-Demo-drag-and-drop
  *
  */

  var addEvent = (function () {
    if (document.addEventListener) {
      return function (el, type, fn) {
        if (el && el.nodeName || el === window) {
          el.addEventListener(type, fn, false);
        } else if (el && el.length) {
          for (var i = 0; i < el.length; i++) {
            addEvent(el[i], type, fn);
          }
        }
      };
    } else {
      return function (el, type, fn) {
        if (el && el.nodeName || el === window) {
          el.attachEvent('on' + type, function () { return fn.call(el, window.event); });
        } else if (el && el.length) {
          for (var i = 0; i < el.length; i++) {
            addEvent(el[i], type, fn);
          }
        }
      };
    }
  })();

  (function () {

    var pre = document.createElement('pre');
    pre.id = "view-source"

    // private scope to avoid conflicts with demos
    addEvent(window, 'click', function (event) {
      if (event.target.hash == '#view-source') {
        // event.preventDefault();
        if (!document.getElementById('view-source')) {
          pre.innerHTML = ('<!DOCTYPE html>\n<html>\n' + document.documentElement.innerHTML + '\n</html>').replace(/[<>]/g, function (m) { return { '<': '&lt;', '>': '&gt;' }[m] });
          document.body.appendChild(pre);
        }
        document.body.className = 'view-source';

        var sourceTimer = setInterval(function () {
          if (window.location.hash != '#view-source') {
            clearInterval(sourceTimer);
            document.body.className = '';
          }
        }, 200);
      }
    });

  })();


  // var eat = ['yum!', 'gulp', 'burp!', 'nom'];
  // var yum = document.createElement('img');
  // var msie = /*@cc_on!@*/0;
  // yum.style.opacity = 1;

  var links = document.querySelectorAll('li > img'), el = null;
  for (var i = 0; i < links.length; i++) {
    el = links[i];

    el.setAttribute('draggable', 'true');

    addEvent(el, 'dragstart', function (e) {
      e.dataTransfer.effectAllowed = 'copy'; // only dropEffect='copy' will be dropable
      e.dataTransfer.setData('Text', this.id); // required otherwise doesn't work
    });
  }

  var dropzone = document.querySelector('#dropzone');

  addEvent(dropzone, 'dragover', function (e) {
    if (e.preventDefault) e.preventDefault(); // allows us to drop
    this.className = 'over';
    e.dataTransfer.dropEffect = 'copy';
    return false;
  });

  // to get IE to work
  addEvent(dropzone, 'dragenter', function (e) {
    this.className = 'over';
    return false;
  });

  addEvent(dropzone, 'dragleave', function () {
    this.className = '';
  });

  addEvent(dropzone, 'drop', function (e) {
    e.preventDefault();
    if (e.stopPropagation) e.stopPropagation(); // stops the browser from redirecting...why???

    var el = document.getElementById(e.dataTransfer.getData('Text'));
    // console.log(el);
    // console.log(el.parentNode.previousElementSibling);
    if (el.parentNode.previousElementSibling == undefined && el.parentNode.nextElementSibling == undefined) {
      baggedItAll();
    }
    // el.parentNode.parentNode.removeChild(el);
    el.parentNode.outerHTML = "";

    // stupid nom text + fade effect
    dropzone.className = '';
    // yum.innerHTML = eat[parseInt(Math.random() * eat.length)];

    return false;
  });

  console.clear();
  // For discussion and comments, see: https://remysharp.com/2009/01/07/html5-enabling-script/
  /*@cc_on'abbr article aside audio canvas details figcaption figure footer header hgroup mark menu meter nav output progress section summary time video'.replace(/\w+/g,function(n){document.createElement(n)})@*/

})