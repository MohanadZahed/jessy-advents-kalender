$(document).ready(function () {
  $("input").blur(function () {
    const id = $(this).attr("id");
    if (id === "input1" && $(this).val().trim() == "Frost") {
      correct($(this));
    } else if (id === "input2" && $(this).val().trim() == "Christmas") {
      correct($(this));
    } else if (id === "input3" && $(this).val().trim() == "Magical") {
      correct($(this));
    } else if (id === "input4" && $(this).val().trim() == "Miracle") {
      correct($(this));
    } else {
      $(this).closest("div").addClass("error");
      $(this).val("");
      setTimeout(() => {
        $(this).closest("div").removeClass("error");
      }, 2000);
    }
  });
  document.body.addEventListener('touchstart', function(e){ e.preventDefault(); });
  document.body.addEventListener("click", playChillMusic);
  
});

function correct($this) {
  $this.closest("div").addClass("correct");
  setTimeout(() => {
    $this.closest("div").addClass("remove");
    if($(".remove").length === 4) {
      $(".night").fadeOut();
      $('.night-sky').addClass('fade-out');
      document.getElementById("chill_audio").pause();
      $('#chill_audio').remove();
      document.getElementById("final_audio").play();
      setTimeout(() => {
        sky();
      }, 1000);
    }
      
  }, 2000);
  
}

function playChillMusic() {
  let audio = document.getElementById("chill_audio");
    audio.play(); 
  document.body.removeEventListener("mousemove", playChillMusic)
}

// Snow from https://codepen.io/radum/pen/xICAB

sky = () => {
  $(".sky").show();
  var COUNT = 300;
  var masthead = document.querySelector(".sky");
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  var width = masthead.clientWidth;
  var height = masthead.clientHeight;
  var i = 0;
  var active = false;

  function onResize() {
    width = masthead.clientWidth;
    height = masthead.clientHeight;
    canvas.width = width;
    canvas.height = height;
    ctx.fillStyle = "#FFF";

    var wasActive = active;
    active = width > 600;

    if (!wasActive && active) requestAnimFrame(update);
  }

  var Snowflake = function () {
    this.x = 0;
    this.y = 0;
    this.vy = 0;
    this.vx = 0;
    this.r = 0;

    this.reset();
  };

  Snowflake.prototype.reset = function () {
    this.x = Math.random() * width;
    this.y = Math.random() * -height;
    this.vy = 1 + Math.random() * 3;
    this.vx = 0.5 - Math.random();
    this.r = 1 + Math.random() * 2;
    this.o = 0.5 + Math.random() * 0.5;
  };

  canvas.style.position = "absolute";
  canvas.style.left = canvas.style.top = "0";

  var snowflakes = [],
    snowflake;
  for (i = 0; i < COUNT; i++) {
    snowflake = new Snowflake();
    snowflake.reset();
    snowflakes.push(snowflake);
  }

  function update() {
    ctx.clearRect(0, 0, width, height);

    if (!active) return;

    for (i = 0; i < COUNT; i++) {
      snowflake = snowflakes[i];
      snowflake.y += snowflake.vy;
      snowflake.x += snowflake.vx;

      ctx.globalAlpha = snowflake.o;
      ctx.beginPath();
      ctx.arc(snowflake.x, snowflake.y, snowflake.r, 0, Math.PI * 2, false);
      ctx.closePath();
      ctx.fill();

      if (snowflake.y > height) {
        snowflake.reset();
      }
    }

    requestAnimFrame(update);
  }

  // shim layer with setTimeout fallback
  window.requestAnimFrame = (function () {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      }
    );
  })();

  onResize();
  window.addEventListener("resize", onResize, false);

  masthead.appendChild(canvas);
  $(".sky").css("position", "absolute");
};
