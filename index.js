var width = $(window).width(); 
window.onscroll = function(){
if ((width >= 1000)){
    if(document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        $("#header").css("background","#fff");
        $("#header").css("color","#000");
        $("#header").css("box-shadow","0px 0px 20px rgba(0,0,0,0.09)");
        $("#header").css("padding","4vh 4vw");
        $("#navigation a").hover(function(){
            $(this).css("border-bottom","2px solid rgb(255, 44, 90)");
        },function(){
            $(this).css("border-bottom","2px solid transparent");
        });
    }else{
        $("#header").css("background","transparent");
        $("#header").css("color","#fff");
        $("#header").css("box-shadow","0px 0px 0px rgba(0,0,0,0)");
        $("#header").css("padding","6vh 4vw");
        $("#navigation a").hover(function(){
            $(this).css("border-bottom","2px solid #fff");
        },function(){
            $(this).css("border-bottom","2px solid transparent");
        });
    }
}
}

function magnify(imglink){
    $("#img_here").css("background",`url('${imglink}') center center`);
    $("#magnify").css("display","flex");
    $("#magnify").addClass("animated fadeIn");
    setTimeout(function(){
        $("#magnify").removeClass("animated fadeIn");
    },800);
}

function closemagnify(){
    $("#magnify").addClass("animated fadeOut");
    setTimeout(function(){
        $("#magnify").css("display","none");
        $("#magnify").removeClass("animated fadeOut");
        $("#img_here").css("background",`url('') center center`);
    },800);
}

setTimeout(function(){
    $("#loading").addClass("animated fadeOut");
    setTimeout(function(){
      $("#loading").removeClass("animated fadeOut");
      $("#loading").css("display","none");
    },800);
},1650);

$(document).ready(function(){
    $("a").on('click', function(event) {
      if (this.hash !== "") {
        event.preventDefault();
        var hash = this.hash;
        $('body,html').animate({
        scrollTop: $(hash).offset().top
        }, 1800, function(){
        window.location.hash = hash;
       });
       } 
      });
  });



//Typewriter Js Start from here.


const TypeWritter = function (txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = ''; //by default words which will be on the screen
    this.wordIndex = 0; //Index of words during the effect
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false; //Deleted words = false
}
// Type Method
TypeWritter.prototype.type = function () {
    //Current index of word
    const current = this.wordIndex % this.words.length;

    //Get full text of current word
    const fullTxt = this.words[current];

    //check if deleting
    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        //Add Character
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    //Insert Text Into Element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    //Initial TypeSpeed
    let TypeSpeed = 200;
    if (this.isDeleting) {
        TypeSpeed /= 2;
    }

    //If Word is Complete
    if (!this.isDeleting && this.txt === fullTxt) {
        //make pause at the end
        TypeSpeed = this.wait;
        //Set isDeleting = true
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        //Move to next Word
        this.wordIndex++;
        //Pause before start typing
        TypeSpeed = 300;
    }


    setTimeout(() => this.type(), TypeSpeed)
}

//InIt on DOM load
document.addEventListener('DOMContentLoaded', init);

//init app
function init() {
    const txtElement = document.querySelector(".txt-type");
    const words = JSON.parse(txtElement.getAttribute('data-words')); //JSON is a method for parsing all the words
    const wait = txtElement.getAttribute('data-wait');

    //init typewriter
    new TypeWritter(txtElement, words, wait);
}
  

