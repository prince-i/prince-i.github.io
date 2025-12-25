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
            hasStarted = false;
          }
        }, 30);
      });
    });
    // ----------
});


// DATA -------------------------------------------------------------------------------------------------------------------------
   
// LOAD ABOUT
const aboutContainer = $('#profile_info');
let aboutHTML = '';
for (let a = 0; a < about.length; a++) {
  aboutHTML += `<p class="flow-text"><b>${about[a][0]}</b>&nbsp;${about[a][1]}</p>`;
}
aboutContainer.append(aboutHTML);


/* LOAD TECH STACK */
const techContainer = $('#tech_tools');
for (let t = 0; t < tech_tools.length; t++) {
  if (t % 6 === 0) techContainer.append(`<div class="row" id="row_${Math.floor(t / 6)}"></div>`);
  $(`#row_${Math.floor(t / 6)}`).append(`
    <div class="col l2 m4 s4" style="margin-bottom:3%;">
      <img src="${tech_tools[t][0]}" class="responsive-img skill_stack skill_icon drop_shadow_filter grayscale-50">
      <p class="center" style="font-size:1rem;">${tech_tools[t][1]}</p>
    </div>
  `);
}


// LOAD SERVICES
const servicesContainer = $('#services_content');
let servicesHTML = '';
for (let s = 0; s < services.length; s++) {
  servicesHTML += `
    <div class="col l4 m4 s12" style="text-align:center; height:40dvh; margin-bottom:3%;">
      <img src="${services[s][0]}" alt="" style="width:30%;" class="services_icon drop_shadow_filter rotate_hover grayscale-50">
      <p style="font-weight:bold;">${services[s][1]}</p>
      <p>${services[s][2]}</p>
    </div>
  `;
}
servicesContainer.append(servicesHTML);


// LOAD PORTFOLIO
const portfolioContainer = $('#work');
let portfolioHTML = '';
for (let p = 0; p < portfolio.length; p++) {
  portfolioHTML += `
    <div class="col l4 m12 s12">
      <div class="col s12 card" style="border-radius:30px;">
        <div class="card-image center-align">
          <img src="${portfolio[p][0]}" alt="" class="responsive-img materialboxed" id="system_preview" style="padding-top:10px;">
        </div>
        <div class="card-content">
          <p id="system_name">${portfolio[p][1]}</p>
          <p id="system_info">${portfolio[p][2]}</p>
        </div>
      </div>
    </div>
  `;
}
portfolioContainer.append(portfolioHTML);


// NETWORK DESIGN
const networkContainer = $('#network_design');
let networkHTML = '';
for (let n = 0; n < networks.length; n++) {
  networkHTML += `
    <div class="col l4 m12 s12">
      <div class="col s12 card">
        <div class="card-image center-align">
          <img src="${networks[n][0]}" alt="" class="responsive-img materialboxed" id="system_preview" style="padding-top:10px;">
        </div>
      </div>
    </div>
  `;
}
networkContainer.append(networkHTML);

// END DATA ------------------------------------------------------------------------------------------------------------------------------------------------

// TYPEWRITER
const txt = 'DATA & APPLICATIONS PROGRAMMER | IT ETHICIST';
const speed = 30;
const sChars = "!@#$%^&*()_+-=[]{}|;:',.<>?/`~";
let i = 0;
const titleEl = document.getElementById("title");

function typeWriter() {
  if (i <= txt.length) {
    let scrambled = '';
    for (let j = 0; j < txt.length; j++) {
      if (txt[j] === ' ') scrambled += ' ';
      else scrambled += j < i ? txt[j] : sChars[Math.floor(Math.random() * sChars.length)];
    }
    titleEl.innerHTML = scrambled + ' &#x258E;';
    i++;
    setTimeout(typeWriter, speed);
  } else {
    titleEl.innerHTML = txt;
  }
}



// DEFAULT TO DARKMODE
if (!localStorage.getItem('theme')) {
  localStorage.setItem('theme', 'dark');
}

const get_theme = () => {
  const theme = localStorage.getItem("theme");
  console.log(theme);

  const isDark = theme === 'dark';

  const $nav = $('nav');
  const $sidenav = $('.sidenav');
  const $body = $('body');
  const $title = $('#title');
  const $buttons = $('#bktotopbtn, #cert_button, #badges_button, #viewMore');
  const $cards = $('#work .card, #executive_reports .card');
  const $divider = $('.divider');
  const $upskillLinks = $('#upskill a');
  const $myPic = $('#myPic');

  if (isDark) {
    $('#theme_button').html('Light Mode<i class="material-icons white-text">brightness_5</i>');
    $('#theme_button_nav').html('<i class="material-icons white-text">brightness_5</i>');

    $nav.removeClass('white').addClass('grey darken-4')
      .find('a, .brand-logo, .sidenav-trigger').addClass('white-text');
    $sidenav.addClass('grey darken-4').find('a').addClass('white-text');
    $body.addClass('grey darken-3 white-text');
    $cards.addClass('transparent');
    $title.removeClass('grey-text text-darken-3 lighten-3').addClass('white-text');
    $buttons.addClass('white black-text').removeClass('black white-text');
    $upskillLinks.removeClass('black-text').addClass('white-text');
    $divider.removeClass('black').addClass('white');
    $myPic.css('filter', 'brightness(90%)');

  } else {
    $('#theme_button').html('Dark Mode<i class="material-icons black-text">brightness_2</i>');
    $('#theme_button_nav').html('<i class="material-icons black-text">brightness_2</i>');

    $nav.add($sidenav).removeClass('grey darken-4').addClass('white');
    $nav.add($sidenav).find('a, .brand-logo, .sidenav-trigger').removeClass('white-text').addClass('black-text');
    $body.removeClass('grey darken-4 white-text');
    $cards.removeClass('transparent');
    $title.removeClass('white-text').addClass('grey-text text-darken-3 lighten-3');
    $buttons.removeClass('white black-text').addClass('black white-text');
    $upskillLinks.removeClass('white-text').addClass('black-text');
    $divider.removeClass('white').addClass('black');
    $myPic.css('filter', 'brightness(100%)');
  }
};


// TOGGLE
function toggleTheme() {
  const theme = localStorage.getItem("theme") === "dark" ? "light" : "dark";
  localStorage.setItem("theme", theme);
  get_theme();
}

// EVENT LISTENER FOR TOGGLE
$('#theme_button, #theme_button_nav').on('click', toggleTheme);

// APPLY THEME ON PAGE LOAD
$(document).ready(get_theme);
