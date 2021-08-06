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
            document.querySelector('#loader').classList.remove("loader");
            $('.tooltipped').tooltip();
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

    }
    
        // TYPEWRITER EFFECT
        var i = 0;
        var txt = 'PHP Web Developer / IT Hardware & Network Technician / IT Consultant / Entrepreneur';
        var speed = 70;
        function typeWriter() {
        if (i < txt.length) {
            document.getElementById("title").innerHTML += txt.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
            }
        }
        