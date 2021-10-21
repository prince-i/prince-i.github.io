$(document).ready(function(){
            $('#main-screen').fadeIn(1500);
            $('.sidenav').sidenav({
                draggable:true,
                inDuration: 600,
                outDuration:500
            });
            $('.tooltipped').tooltip();
            $('.parallax').parallax();
            $('.materialboxed').materialbox();
             typeWriter();
            document.querySelector('#loader').classList.remove("loader");
            $('.tooltipped').tooltip();
            get_theme();
});
        // TYPEWRITER EFFECT
        var i = 0;
        var txt = 'PHP Developer - IT Technical Support - UX/UI Designer';
        var speed = 50;
        function typeWriter() {
        if (i < txt.length) {
            document.getElementById("title").innerHTML += txt.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
            }
        }
        const get_theme =()=>{
          localStorage.getItem("theme");
          var theme = localStorage.theme;
          console.log(theme);
          if(theme == 'dark'){
            $('#theme_button').html('Light Mode<i class="material-icons white-text">brightness_5<i>');
            $('#theme_button_nav').html('<i class="material-icons white-text">brightness_5<i>');
            $('nav').removeClass('white');
            $('nav').addClass('#212121 grey darken-4');
            $('nav a').addClass('white-text');
            $('.brand-logo').addClass('white-text');
            $('.sidenav-trigger').addClass('white-text');
            $('.sidenav').addClass('#212121 grey darken-4');
            $('.sidenav a').addClass('white-text');
            $('body').addClass('#212121 grey darken-4');
            $('body').addClass('white-text');
            $('#work .card').addClass('N/A transparent');
            $('#title').removeClass('grey-text text-darken-3 lighten-3');
            $('#title').addClass('white-text');
          }else{
            $('#theme_button').html('Dark Mode<i class="material-icons black-text">brightness_2<i>');
            $('#theme_button_nav').html('<i class="material-icons black-text">brightness_2<i>');
            $('nav').addClass('white');
            $('nav').removeClass('#212121 grey darken-4');
            $('nav a').removeClass('white-text');
              $('nav a').addClass('black-text');
            $('.brand-logo').removeClass('white-text');
            $('.sidenav-trigger').removeClass('white-text');
            $('.sidenav').removeClass('#212121 grey darken-4');
            $('.sidenav a').removeClass('white-text');
            $('body').removeClass('#212121 grey darken-4');
            $('body').removeClass('white-text');
            $('#work .card').removeClass('N/A transparent');
            $('#title').addClass('grey-text text-darken-3 lighten-3');
            $('#title').removeClass('white-text');
          }
        }

        // TOGGLE LIGHT MODE AND DARK MODE
        $('#theme_button').click(function(){
          if(localStorage.getItem("theme") == '' || localStorage.getItem("theme") == undefined || localStorage.getItem("theme") == 'light'){
            localStorage.setItem("theme","dark");
          }else{
            localStorage.setItem("theme","light");
          }
          get_theme();
        });

        $('#theme_button_nav').click(function(){
          if(localStorage.getItem("theme") == '' || localStorage.getItem("theme") == undefined || localStorage.getItem("theme") == 'light'){
            localStorage.setItem("theme","dark");
          }else{
            localStorage.setItem("theme","light");
          }
          get_theme();
        });
