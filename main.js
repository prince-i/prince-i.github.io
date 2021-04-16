$(document).ready(function(){
            $('.sidenav').sidenav({
                draggable:true,
                inDuration: 600,
                outDuration:500
            });
            $('#main-screen').fadeIn(1500);
            $('#loader').hide();
            $('.parallax').parallax();
            $('.materialboxed').materialbox();
             typeWriter();
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
          $('#about_content').fadeIn(1500);
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
        
        // CHART
        // var ctx = document.getElementById('myChart').getContext('2d');
        // var myChart = new Chart(ctx, {
        //     type: 'bar',
        //     data: {
        //         labels: ['HTML5','CSS3','PHP','JAVASCRIPT','jQuery','VB .NET','MYSQL','MS SQL','Git','Figma'],
        //         datasets: [{
        //             label: 'Skill Percentage',
        //             data: [100,95,80,90,85,70,80,60,65,75],
        //             backgroundColor: [
        //                 'rgba(255, 99, 132, 0.2)',
        //                 'rgba(54, 162, 235, 0.2)',
        //                 'rgba(255, 206, 86, 0.2)',
        //                 'rgba(75, 192, 192, 0.2)',
        //                 'rgba(153, 102, 255, 0.2)',
        //                 'rgba(255, 159, 64, 0.2)',
        //                 'rgba(255, 99, 132, 0.2)',
        //                 'rgba(54, 162, 235, 0.2)',
        //                 'rgba(255, 206, 86, 0.2)',
        //                 'rgba(75, 192, 192, 0.2)',
        //                 'rgba(153, 102, 255, 0.2)',
        //                 'rgba(255, 159, 64, 0.2)'
        //             ],
        //             borderColor: [
        //                 'rgba(255, 99, 132, 1)',
        //                 'rgba(54, 162, 235, 1)',
        //                 'rgba(255, 206, 86, 1)',
        //                 'rgba(75, 192, 192, 1)',
        //                 'rgba(153, 102, 255, 1)',
        //                 'rgba(255, 159, 64, 1)',
        //                 'rgba(255, 99, 132, 1)',
        //                 'rgba(54, 162, 235, 1)',
        //                 'rgba(255, 206, 86, 1)',
        //                 'rgba(75, 192, 192, 1)',
        //                 'rgba(153, 102, 255, 1)',
        //                 'rgba(255, 159, 64, 1)'
        //             ],
        //             borderWidth: 1
        //         }]
        //     },
        //     options: {
        //         indexAxis: 'y',
        //         scales: {
        //             y: {
        //                 beginAtZero: true
        //             }
        //         }
        //     }
        // });