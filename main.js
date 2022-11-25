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

            $('body'). on('contextmenu', 'img', function(e){ return false; });
});
    
      

      //LOAD ABOUT
      for(a = 0; a <= about.length - 1;a++){
        $('#profile_info').append('<p class="flow-text"><b>'+ about[a][0]+'</b>&nbsp;'+ about[a][1] +'</p>');
      }

      //LOAD TECH STACK
      for(t = 0; t <= tech_stack.length - 1;t++){
        $('#tech_stack').append('<div class="col l2 m4 s6" style="margin-bottom:3%;">'+
                                '<img src="'+tech_stack[t][0]+'"  class="responsive-img skill_stack" id="skill_icon">'+
                                '<p class="center" style="font-size:1rem;">'+ tech_stack[t][1] +'</p>'+
                                '</div>');
      }
      
      // LOAD UPSKILL
      for(u = 0; u <= upskill.length -1;u++){
        $('#upskill').append('<div class="col s12 l6 m6" style="min-height:30vh;">' +
                              '<h5 class="left" class="">'+ parseInt(u + 1) + '. '+ upskill[u][0] +'</h5>'+
                              '<div class="row">'+
                                '<div class="col s12">'+ upskill[u][2] +'</div>'+
                                '<div class="col s12">'+ upskill[u][1] +'</div>'+
                                '<div class="col s12">'+ '<a href="'+ upskill[u][3] + '" target="_blank">VIEW LEARNER&#8216;S VERIFICATION</div>'+
                              '</div>'+
                              '</div>'

          );
      }


      //LOAD SERVICES
      for(s = 0; s <= services.length -1;s++){
        $('#services_content').append('<div class="col l4 m4 s12" style="text-align: center;height:40vh;margin-bottom:5%;">'+
                '<img src="'+services[s][0]+'" alt="" style="width:30%;" class="services_icon">'+
                '<p style="font-weight: bold;">'+services[s][1]+'</p>'+
                '<p>'+services[s][2]+'</p>'+
            '</div>');
      }

      // LOAD PORTFOLIO
      for(p = 0; p <= portfolio.length -1;p++){
        $('#work').append('<div class="col l4 m12 s12">'+
          '<div class="col s12 card">'+
            '<div class="card-image">'+
              '<center>'+
                  '<img src="'+portfolio[p][0]+'" alt="" class="responsive-img materialboxed" id="system_preview" style="padding-top:10px;">'+
              '</center>'+
            '</div>'+
            '<div class="card-content">'+
              '<p id="system_name">'+portfolio[p][1]+'</p>'+
              '<p id="system_info">'+portfolio[p][2]+'</p>'+
            '</div>'+
          '</div>'+
      '</div>');
      }

      // SQL DEVELOPER
      for(r = 0; r <= reports.length -1;r++){
        $('#executive_reports').append('<div class="col l4 m12 s12">'+
          '<div class="col s12 card">'+
            '<div class="card-image">'+
              '<center>'+
                  '<img src="'+reports[r][0]+'" alt="" class="responsive-img materialboxed" id="system_preview" style="padding-top:10px;">'+
              '</center>'+
            '</div>'+
            '<div class="card-content">'+
              '<p id="sql_title">'+reports[r][1]+'</p>'+
              '<a href="'+reports[r][2]+'" target="_blank" class="btn">View</a>'+
            '</div>'+
          '</div>'+
      '</div>');
      }


        // TYPEWRITER EFFECT
        var i = 0;
        var txt = 'PROGRAMMER | DATAOPS | TECH SUPPORT | GRAPHICS DESIGNER';
        var speed = 20;
        function typeWriter() {
        if (i < txt.length) {
            document.getElementById("title").innerHTML += txt.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
            }
        }
        //DEFAULT DARK MODE ON
        localStorage.setItem('theme','dark');

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
            $('#bktotopbtn').addClass('white black-text');
            $('#myPic').css('filter','brightness(70%)');
            $('#executive_reports .card').addClass('N/A transparent');
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
            $('#bktotopbtn').removeClass('white black-text');
             $('#myPic').css('filter','brightness(100%)');
             $('#executive_reports .card').removeClass('N/A transparent');
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
