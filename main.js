$(document).ready(function() {
    $('#main-screen').fadeIn(1500);
    $('.sidenav').sidenav({
        draggable: true,
        inDuration: 600,
        outDuration: 500
    });
    $('.modal').modal({
      inDuration:600,
      outDuration:500
    });
    $('.tooltipped').tooltip();
    $('.parallax').parallax();
    $('.materialboxed').materialbox();
    typeWriter();
    
    document.querySelector('#loader').classList.remove("loader");
    
    $('.tooltipped').tooltip();
    get_theme();

    $('body').on('contextmenu', 'img', function(e) {
        return false;
    });

    // PDF MODAL
    $('#cert_button').on('click', function() {
        var pdfUrl = 'Image/certification/CERT-COMPILATION.pdf'; // Replace with your PDF URL
        $('#pdfIframe').attr('src', pdfUrl);
        $('#certModal').modal('open'); // Open the modal
    });

    // Clear the iframe source when the modal is closed
    $('#certModal').on('modalclose', function() {
        $('#pdfIframe').attr('src', '');
    });

    
    // WORKS COUNTER
    $('#works_completed_count').html(achievements.works_completed);
    $('#yrs_of_exp').html(achievements.years_of_exp);
    $('#total_clients').html(achievements.total_clients);
    $('#total_awards').html(achievements.awards);


    //TEXT SCRAMBLE
    const specialChars = "!@#$%^&*()_+-=[]{}|;:',.<>?/`~";

    document.querySelectorAll('.scramble-on-hover').forEach(element => {
      const originalText = element.textContent;
      let interval = null;
      let hasStarted = false;
      let hasCompleted = false;

      element.addEventListener('mouseenter', () => {
        if (hasCompleted || hasStarted) return;

        hasStarted = true;
        let iterations = 0;

        interval = setInterval(() => {
          const scrambled = originalText
            .split('')
            .map((char, i) => {
              if (char === ' ') return ' ';
              if (i < iterations) return originalText[i];
              return specialChars[Math.floor(Math.random() * specialChars.length)];
            })
            .join('');

          element.textContent = scrambled;

          iterations += 1 / 3;
          if (iterations >= originalText.length) {
            clearInterval(interval);
            element.textContent = originalText;
            hasCompleted = true;
            hasStarted = false; // Reset for safety, though it's no longer used
          }
        }, 30);
      });
    });
    // ----------
});


// DATA -------------------------------------------------------------------------------------------------------------------------
   
// LOAD ABOUT
for (var a = 0; a <= about.length - 1; a++) {
    $('#profile_info').append('<p class="flow-text"><b>' + about[a][0] + '</b>&nbsp;' + about[a][1] + '</p>');
}


/* LOAD TECH STACK */
for (var t = 0; t < tech_stack.length; t++) {
    if (t % 6 === 0) {
        $('#tech_stack').append('<div class="row" id="row_' + Math.floor(t / 6) + '"></div>');
    }
    $('#row_' + Math.floor(t / 6)).append(
        '<div class="col l2 m4 s4" style="margin-bottom:3%;">' +
        '<img src="' + tech_stack[t][0] + '" class="responsive-img skill_stack skill_icon drop_shadow_filter">' +
        '<p class="center" style="font-size:1rem;">' + tech_stack[t][1] + '</p>' +
        '</div>'
    );
}



// LOAD SERVICES
for (var s = 0; s <= services.length - 1; s++) {
    $('#services_content').append('<div class="col l4 m4 s12" style="text-align: center; height: 40vh; margin-bottom: 5%;">' +
        '<img src="' + services[s][0] + '" alt="" style="width: 30%;" class="services_icon drop_shadow_filter">' +
        '<p style="font-weight: bold;">' + services[s][1] + '</p>' +
        '<p>' + services[s][2] + '</p>' +
    '</div>');
}


// LOAD PORTFOLIO
for (var p = 0; p <= portfolio.length - 1; p++) {
    $('#work').append('<div class="col l4 m12 s12">' +
        '<div class="col s12 card">' +
            '<div class="card-image">' +
                '<center>' +
                    '<img src="' + portfolio[p][0] + '" alt="" class="responsive-img materialboxed" id="system_preview" style="padding-top:10px;">' +
                '</center>' +
            '</div>' +
            '<div class="card-content">' +
                '<p id="system_name">' + portfolio[p][1] + '</p>' +
                '<p id="system_info">' + portfolio[p][2] + '</p>' +
            '</div>' +
        '</div>' +
    '</div>');
}


// NETWORK DESIGN
for (var n = 0; n <= networks.length - 1; n++) {
    $('#network_design').append('<div class="col l4 m12 s12">' +
        '<div class="col s12 card">' +
            '<div class="card-image">' +
                '<center>' +
                    '<img src="' + networks[n][0] + '" alt="" class="responsive-img materialboxed" id="system_preview" style="padding-top:10px;">' +
                '</center>' +
            '</div>' +
        '</div>' +
    '</div>');
}


// END DATA ------------------------------------------------------------------------------------------------------------------------------------------------

// TYPEWRITER EFFECT
let i = 0;
const txt = 'PROGRAMMER | IT CONTRACTOR | IT TECHNICIAN';
const speed = 40;
const sChars = "!@#$%^&*()_+-=[]{}|;:',.<>?/`~";

function typeWriter() {
    if (i <= txt.length) {
        const scrambled = txt
            .split('')
            .map((char, index) => {
                if (char === ' ') return ' ';
                if (index < i) return txt[index];
                return sChars[Math.floor(Math.random() * sChars.length)];
            })
            .join('');

        document.getElementById("title").innerHTML = scrambled + ' &#x258E;';
        i++;
        setTimeout(typeWriter, speed);
    } else {
        document.getElementById("title").innerHTML = txt; // final clean text
    }
}


// DEFAULT DARK MODE ON
localStorage.setItem('theme', 'dark');
const get_theme = () => {
    const theme = localStorage.getItem("theme");
    console.log(theme);

    if (theme === 'dark') {

        $('#theme_button').html('Light Mode<i class="material-icons white-text">brightness_5</i>');
        $('#theme_button_nav').html('<i class="material-icons white-text">brightness_5</i>');
        $('nav').removeClass('white').addClass('#212121 grey darken-4')
          .find('a, .brand-logo, .sidenav-trigger').addClass('white-text');
        $('.sidenav').addClass('#212121 grey darken-4').find('a').addClass('white-text');
        $('body').addClass('#212121 grey darken-4 white-text');
        $('#work .card, #executive_reports .card').addClass('N/A transparent');
        $('#title').removeClass('grey-text text-darken-3 lighten-3').addClass('white-text');
        $('#bktotopbtn, #cert_button, #badges_button, #viewMore').addClass('white black-text')
          .removeClass('black white-text');
        $('#upskill a').removeClass('black-text').addClass('white-text');
        $('.divider').removeClass('black').addClass('white');
        $('#myPic').css('filter', 'brightness(70%)');

    } else {
        $('#theme_button').html('Dark Mode<i class="material-icons black-text">brightness_2</i>');
        $('#theme_button_nav').html('<i class="material-icons black-text">brightness_2</i>');
        $('nav, .sidenav').removeClass('#212121 grey darken-4').addClass('white');
        $('nav a, .sidenav a, #upskill a').removeClass('white-text').addClass('black-text');
        $('.brand-logo, .sidenav-trigger').removeClass('white-text');
        $('body').removeClass('#212121 grey darken-4 white-text');
        $('#work .card, #executive_reports .card').removeClass('N/A transparent');
        $('#title').removeClass('white-text').addClass('grey-text text-darken-3 lighten-3');
        $('#bktotopbtn, #cert_button, #badges_button, #viewMore').removeClass('white black-text').addClass('black white-text');
        $('#myPic').css('filter', 'brightness(100%)');
        $('.divider').removeClass('white').addClass('black');

    }
};


// TOGGLE LIGHT MODE AND DARK MODE
function toggleTheme() {
    const currentTheme = localStorage.getItem("theme");
    const newTheme = (currentTheme === 'dark') ? 'light' : 'dark';  // Toggle between light and dark
    localStorage.setItem("theme", newTheme);
    get_theme(); // Apply the new theme
}

// Event listener for theme toggle on button click
$('#theme_button, #theme_button_nav').click(function() {
    toggleTheme();
});