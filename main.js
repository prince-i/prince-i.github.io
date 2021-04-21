$(document).ready(function(){
            $('.sidenav').sidenav({
                draggable:true,
                inDuration: 600,
                outDuration:500
            });
            $('#main-screen').fadeIn(1500);
            $('.parallax').parallax();
            $('.materialboxed').materialbox();
             typeWriter();
            document.querySelector('#loader').classList.remove("loader")
});
        $(window).on("scroll", function(){
            amountscrolled();
        });

        function amountscrolled(){
        var winheight = $(window).height();
        var docheight = $(document).height();
        var scrollTop = $(window).scrollTop();
        var trackLength = docheight - winheight;
        var pctScrolled = Math.floor(scrollTop/trackLength * 100);
        // console.log(pctScrolled + '% scrolled');
        // FADE IN ABOUT CONTENT
        if(pctScrolled > 10){
          $('#about_content').fadeIn(2000);
        }
        if(pctScrolled >= 95){
            $('#floatingBtn').fadeIn(500);
        }else{
            $('#floatingBtn').fadeOut(500);
        }
    }
    
        // TYPEWRITER EFFECT
        var i = 0;
        var txt = 'Full Stack Web Developer';
        var speed = 60;
        function typeWriter() {
        if (i < txt.length) {
            document.getElementById("title").innerHTML += txt.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
            }
        }
        