$(document).ready(function () {
  $('#main-screen').fadeIn(1500);
  $('.sidenav').sidenav({
    draggable: true,
    inDuration: 600,
    outDuration: 500
  });
  $('.modal').not('#cliModal').modal({
    inDuration: 600,
    outDuration: 500
  });
  $('#cliModal').modal({
    inDuration: 600,
    outDuration: 500,
    onOpenEnd: function () {
      $('#terminalInput').focus();
    },
    onCloseEnd: function () {
      $('#cliModal').removeClass('maximized');
      $('#termMaxBtn').attr('title', 'Maximize');
    }
  });
  $('.tooltipped').tooltip();
  $('.parallax').parallax();
  $('.materialboxed').materialbox();

  typeWriter();

  document.querySelector('#loader').classList.remove("loader");
  get_theme();

  $('body').on('contextmenu', 'img', function (e) {
    return false;
  });

  // Clear PDF modal iframe on close
  $('#certModal').on('modalclose', function () {
    $('#pdfIframe').attr('src', '');
  });

  // Initialize Interactive Features
  setupStatObserver();
  setupScrollReveal();
  setupCLI();
  initPortfolioControls();

  // TEXT SCRAMBLE ON HOVER
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
});

// ====================================================================================
// LOAD ABOUT ME
const aboutContainer = $('#profile_info');
let aboutHTML = '';
for (let a = 0; a < about.length; a++) {
  aboutHTML += `<p class="flow-text"><b>${about[a][0]}</b>&nbsp;${about[a][1]}</p>`;
}
aboutContainer.append(aboutHTML);

// LOAD TECH STACK (WITH INTERACTIVE CLICK-TO-FILTER)
const techContainer = $('#tech_tools');
for (let t = 0; t < tech_tools.length; t++) {
  techContainer.append(`
    <div class="col l2 m4 s4 tech-stack-item tooltipped" data-position="top" data-tooltip="Click to filter projects with ${tech_tools[t][1]}" data-tech="${tech_tools[t][2]}">
      <img src="${tech_tools[t][0]}" class="responsive-img skill_stack skill_icon drop_shadow_filter grayscale-50" alt="${tech_tools[t][1]}">
      <p class="center tech-label">${tech_tools[t][1]}</p>
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

// NETWORK DESIGN
const networkContainer = $('#network_design');
let networkHTML = '';
for (let n = 0; n < networks.length; n++) {
  networkHTML += `
    <div class="col l4 m12 s12">
      <div class="col s12 card" style="border-radius:30px;">
        <div class="card-image center-align">
          <img src="${networks[n][0]}" alt="" class="responsive-img materialboxed" id="system_preview" style="padding-top:10px;">
        </div>
      </div>
    </div>
  `;
}
networkContainer.append(networkHTML);

// LOAD CREDENTIALS
const credentialContainer = $('#credential_data');
let credentialHTML = '';
for (let c = 0; c < credentials.length; c++) {
  credentialHTML += `
    <div class="l4 m6 col s12">
      <div class="card transparent" style="border-radius: 30px; margin-bottom: 10px;">
        <div class="card-content">
          <h5 style="font-weight: bold;">${credentials[c][0]}</h5>
          <h6 style="font-style: italic; margin-bottom: 10px;">${credentials[c][1]}</h6>
          <p><b class="green-text">[ ${credentials[c][2]} ]</b></p>
          <p>${credentials[c][3]}</p>
        </div>
      </div>
    </div>
  `;
}
credentialContainer.append(credentialHTML);


// ====================================================================================
// INTERACTIVE PORTFOLIO FILTERING & SEARCH
let currentFilter = 'all';
let currentSearch = '';
let currentTechFilter = '';

function renderPortfolio(filter = currentFilter, search = currentSearch, tech = currentTechFilter) {
  currentFilter = filter;
  currentSearch = search.toLowerCase().trim();
  currentTechFilter = tech;

  const container = $('#portfolio_content');
  container.empty();

  const filtered = portfolio.filter(item => {
    const itemTitle = item[1];
    const itemInfo = item[2];
    const itemCat = item[3] || 'web';
    const itemTechs = item[4] || [];

    // Category Pill Filter
    if (currentFilter !== 'all' && itemCat !== currentFilter) {
      return false;
    }

    // Tech Tag Filter
    if (currentTechFilter && !itemTechs.includes(currentTechFilter)) {
      return false;
    }

    // Search Query Filter
    if (currentSearch) {
      const matchTitle = itemTitle.toLowerCase().includes(currentSearch);
      const matchInfo = itemInfo.toLowerCase().includes(currentSearch);
      const matchTech = itemTechs.some(t => t.toLowerCase().includes(currentSearch));
      if (!matchTitle && !matchInfo && !matchTech) {
        return false;
      }
    }

    return true;
  });

  // Update Portfolio Counter
  $('#portfolio-counter').text(`Showing ${filtered.length} of ${portfolio.length} projects`);

  if (filtered.length === 0) {
    container.html(`
      <div class="col s12 center-align" style="padding: 40px 0;">
        <i class="material-icons grey-text" style="font-size: 4rem;">search_off</i>
        <h5 class="grey-text">No matching projects found</h5>
        <p class="grey-text">Try adjusting your search terms or clearing the selected tech filter.</p>
      </div>
    `);
    return;
  }

  let html = '';
  for (let p = 0; p < filtered.length; p++) {
    if (p % 3 === 0) html += `<div class="row">`;

    const originalIndex = portfolio.indexOf(filtered[p]);

    html += `
      <div class="col l4 m12 s12">
        <div class="card project-card-item" data-index="${originalIndex}">
          <div class="card-image center-align">
            <img src="${filtered[p][0]}" alt="" class="responsive-img" style="padding-top:10px;">
          </div>
          <div class="card-content">
            <p id="system_name">${filtered[p][1]}</p>
            <p id="system_info">${filtered[p][2]}</p>
          </div>
        </div>
      </div>
    `;

    if (p % 3 === 2 || p === filtered.length - 1) html += `</div>`;
  }

  container.append(html);
  get_theme();
}

function initPortfolioControls() {
  // Render default portfolio
  renderPortfolio();

  // Category Filter Pill Handler
  $('.filter-pill').on('click', function () {
    $('.filter-pill').removeClass('active');
    $(this).addClass('active');
    const filterVal = $(this).data('filter');
    renderPortfolio(filterVal, currentSearch, currentTechFilter);
  });

  // Real-Time Search Handler
  $('#portfolio-search').on('keyup input', function () {
    const searchVal = $(this).val();
    renderPortfolio(currentFilter, searchVal, currentTechFilter);
  });

  // Tech Stack Item Click Handler
  $(document).on('click', '.tech-stack-item', function () {
    const techKey = $(this).data('tech');
    if (currentTechFilter === techKey) {
      // Toggle off
      currentTechFilter = '';
      $('.tech-stack-item').removeClass('selected-tech');
      $('#tech-badge-container').hide();
    } else {
      currentTechFilter = techKey;
      $('.tech-stack-item').removeClass('selected-tech');
      $(this).addClass('selected-tech');
      const techName = $(this).find('.tech-label').text();
      $('#active-tech-name').text(techName);
      $('#tech-badge-container').show();

      // Smooth scroll to portfolio section
      $('html, body').animate({
        scrollTop: $("#work").offset().top - 70
      }, 500);
    }
    renderPortfolio();
  });

  // Clear Tech Badge Handler
  $('#clear-tech-filter').on('click', function () {
    currentTechFilter = '';
    $('.tech-stack-item').removeClass('selected-tech');
    $('#tech-badge-container').hide();
    renderPortfolio();
  });

  // Project Card Detail Modal Handler
  $(document).on('click', '.project-card-item', function () {
    const index = $(this).data('index');
    const project = portfolio[index];
    if (!project) return;

    $('#projectModalImg').attr('src', project[0]);
    $('.project-modal-img-wrap').css('--bg-img', `url('${project[0]}')`);

    // Extract link if present in title HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = project[1];
    const linkEl = tempDiv.querySelector('a');

    $('#projectModalTitle').html(project[1]);
    $('#projectModalCategory').text(project[2]);

    const techTags = project[4] || [];
    let tagsHTML = '';
    techTags.forEach(tag => {
      tagsHTML += `<span class="tech-tag">${tag.toUpperCase()}</span>`;
    });
    $('#projectModalTags').html(tagsHTML);

    if (linkEl && linkEl.href) {
      $('#projectModalLink').attr('href', linkEl.href).show();
    } else {
      $('#projectModalLink').hide();
    }

    $('#projectModal').modal('open');
  });
}

// ====================================================================================
// FULLSCREEN IMAGE VIEWER
(function () {
  const overlay = document.getElementById('imgFullscreenOverlay');
  const fsImg = document.getElementById('imgFullscreenSrc');
  const closeBtn = document.getElementById('imgFullscreenClose');

  function openFullscreen(src) {
    fsImg.src = src;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeFullscreen() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Click the modal image to go fullscreen
  document.addEventListener('click', function (e) {
    if (e.target && e.target.id === 'projectModalImg') {
      openFullscreen(e.target.src);
    }
  });

  // Close on overlay click, close button, or Escape key
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay || e.target === fsImg) closeFullscreen();
  });
  closeBtn.addEventListener('click', closeFullscreen);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('active')) closeFullscreen();
  });
})();


// ====================================================================================
// ANIMATED STAT COUNTER (COUNT-UP EFFECT)
function animateCounters() {
  const duration = 1800;
  const frameDuration = 1000 / 60;
  const totalFrames = Math.round(duration / frameDuration);

  const targets = {
    works: achievements.works_completed,
    exp: achievements.years_of_exp,
    clients: achievements.total_clients,
    awards: achievements.awards
  };

  let frame = 0;
  const counterInterval = setInterval(() => {
    frame++;
    const progress = frame / totalFrames;
    const easeOut = 1 - Math.pow(1 - progress, 3);

    $('#works_completed_count').text(Math.floor(targets.works * easeOut));
    $('#yrs_of_exp').text(Math.floor(targets.exp * easeOut));
    $('#total_clients').text(Math.floor(targets.clients * easeOut));
    $('#total_awards').text(Math.floor(targets.awards * easeOut));

    if (frame === totalFrames) {
      clearInterval(counterInterval);
      $('#works_completed_count').text(targets.works);
      $('#yrs_of_exp').text(targets.exp);
      $('#total_clients').text(targets.clients);
      $('#total_awards').text(targets.awards);
    }
  }, frameDuration);
}

function setupStatObserver() {
  const statsElem = document.getElementById('stats_content');
  if (!statsElem || !('IntersectionObserver' in window)) {
    $('#works_completed_count').text(achievements.works_completed);
    $('#yrs_of_exp').text(achievements.years_of_exp);
    $('#total_clients').text(achievements.total_clients);
    $('#total_awards').text(achievements.awards);
    return;
  }

  let animated = false;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        animateCounters();
      }
    });
  }, { threshold: 0.3 });

  observer.observe(statsElem);
}


// ====================================================================================
// SCROLL REVEAL OBSERVER
function setupScrollReveal() {
  if (!('IntersectionObserver' in window)) {
    $('.reveal-on-scroll').addClass('visible');
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.02, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    observer.observe(el);
  });
}


// ====================================================================================
// RETRO CLI TERMINAL MODAL
function setupCLI() {
  const $input = $('#terminalInput');
  const $output = $('#terminalOutput');

  function appendLog(lineHtml, color = '#00e676') {
    $output.append(`<div style="color: ${color}; margin-bottom: 4px;">${lineHtml}</div>`);
    $output.scrollTop($output[0].scrollHeight);
  }

  // Maximize / Restore toggle
  $('#termMaxBtn').on('click', function () {
    const $modal = $('#cliModal');
    $modal.toggleClass('maximized');
    const isMax = $modal.hasClass('maximized');
    $(this).attr('title', isMax ? 'Restore' : 'Maximize');
  });

  $input.on('keypress', function (e) {
    if (e.which === 13) {
      const cmd = $(this).val().trim();
      $(this).val('');
      if (!cmd) return;

      appendLog(`prince-i@prince-i.github.io$ ${cmd}`, '#58a6ff');

      const cleanCmd = cmd.toLowerCase();

      switch (cleanCmd) {
        case 'help':
          appendLog(`Available Commands:`);
          appendLog(`  <span style="color:#ffbd2e">skills</span>    - Display core technical stack`);
          appendLog(`  <span style="color:#ffbd2e">projects</span>  - List portfolio highlights & stats`);
          appendLog(`  <span style="color:#ffbd2e">exp</span>       - Display work experience & credentials`);
          appendLog(`  <span style="color:#ffbd2e">contact</span>   - Show contact channels & website links`);
          appendLog(`  <span style="color:#ffbd2e">whoami</span>    - Display developer profile summary`);
          appendLog(`  <span style="color:#ffbd2e">stats</span>     - System monitor: skills & GitHub stats`);
          appendLog(`  <span style="color:#ffbd2e">certs</span>       - View compilation of certificates`);
          appendLog(`  <span style="color:#ffbd2e">badges</span>      - View digital credentials and badges`);
          appendLog(`  <span style="color:#ffbd2e">theme</span>     - Toggle dark / light color mode`);
          appendLog(`  <span style="color:#ffbd2e">date</span>      - Print current system date & time`);
          appendLog(`  <span style="color:#ffbd2e">clear</span>     - Clear terminal screen`);
          appendLog(`  <span style="color:#ffbd2e">sudo hire</span> - Special recruiter command`);
          appendLog(`  <span style="color:#ffbd2e">exit</span>      - Close the terminal`);
          break;

        case 'skills':
        case 'tech':
          appendLog(`Core Tech Stack: HTML5, CSS3, JavaScript, PHP, MySQL, MS-SQL, Python, Visual Basic .Net, Git, Linux/Windows Server, Bash, MSDOS`);
          break;

        case 'projects':
        case 'works':
          appendLog(`Total Works Completed: 46+ Projects across Web, Data Science, AI & Systems.`);
          appendLog(`Featured Systems: BATELEC II DDCC Portal, LWAP Forecaster, Hourly Energy Aggregator, PayTrack Payroll, Andon System, Motorpool Vehicle and Maintenance Management System [MpVMMS].`);
          break;

        case 'exp':
        case 'credentials':
          appendLog(`Current Role: APP PROGRAMMER / MIS - BATELEC II Main (May 2025 - Present)`);
          appendLog(`Previous: JUNIOR PROGRAMMER - Precision Data Solution (3.5 yrs)`);
          appendLog(`Previous: IT JUNIOR STAFF - Furukawa Automotive Systems (2 yrs)`);
          break;

        case 'contact':
          appendLog(`Website: <a href="https://sites.google.com/view/erintech" target="_blank" style="color:#58a6ff; text-decoration:underline;">https://sites.google.com/view/erintech</a>`);
          appendLog(`Facebook: <a href="https://www.facebook.com/erintechbusiness" target="_blank" style="color:#58a6ff; text-decoration:underline;">https://www.facebook.com/erintechbusiness</a>`);
          appendLog(`Reach my socials @cyber.pca on <a href="https://instagram.com/cyber.pca" target="_blank" style="color:#28eaeb">IG</a> and <a href="https://facebook.com/cyber.pca" target="_blank" style="color:#28eaeb">FB</a>.`, '#27c93f');
          break;

        case 'whoami':
          appendLog(`Prince Arce - Applications Programmer | IT Officer`);
          appendLog(`Specialties: Programming, Data Mining, Data Science, AI/NLP Automation, System Architecture, IT Infrastructure and Management.`);
          break;

        case 'stats':
        case 'htop': {
          const skills = [
            { name: 'PHP', pct: 92, color: '#8b9cf7' },
            { name: 'JavaScript', pct: 88, color: '#f7df1e' },
            { name: 'HTML / CSS', pct: 95, color: '#e34c26' },
            { name: 'MySQL/MSSQL', pct: 85, color: '#f29111' },
            { name: 'Python', pct: 80, color: '#3776ab' },
            { name: 'Git', pct: 82, color: '#f05032' },
            { name: 'Linux / Bash', pct: 78, color: '#27c93f' },
            { name: 'VB .NET', pct: 75, color: '#68217a' },
            { name: 'Data Science', pct: 72, color: '#17becf' },
            { name: 'AI / NLP', pct: 68, color: '#ff6fd8' },
          ];

          let skillRows = '';
          skills.forEach(s => {
            skillRows += `
              <div style="display:flex; align-items:center; margin-bottom:3px;">
                <span style="color:#aaa; width:110px; flex-shrink:0; font-size:0.85rem;">${s.name}</span>
                <div style="flex:1; height:14px; background:#1a1a2e; border-radius:3px; overflow:hidden; margin:0 10px;">
                  <div style="width:${s.pct}%; height:100%; background:${s.color}; border-radius:3px; transition:width 0.6s ease;"></div>
                </div>
                <span style="color:#888; font-size:0.8rem; width:36px; text-align:right;">${s.pct}%</span>
              </div>`;
          });

          const statsId = 'gh-stats-' + Date.now();

          const html = `
            <div style="border:1px solid #333; border-radius:8px; padding:14px 16px; margin:6px 0; background:#0d1117; font-family: Consolas_Custom, monospace;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; padding-bottom:8px; border-bottom:1px solid #222;">
                <span style="color:#ff5f56; font-weight:bold; font-size:0.95rem;">⣿ prince-i — SYSTEM MONITOR</span>
                <span style="color:#555; font-size:0.8rem;">${new Date().toLocaleTimeString()}</span>
              </div>
              <div style="color:#ffbd2e; font-weight:bold; font-size:0.8rem; margin-bottom:8px; letter-spacing:1px;">SKILL PROFICIENCY</div>
              ${skillRows}
              <div style="border-top:1px solid #222; margin-top:12px; padding-top:10px;">
                <div style="color:#ffbd2e; font-weight:bold; font-size:0.8rem; margin-bottom:8px; letter-spacing:1px;">GITHUB STATS</div>
                <div id="${statsId}" style="color:#555; font-size:0.85rem;">
                  <span style="color:#555;">⟳ connecting to github...</span>
                </div>
              </div>
            </div>`;

          $output.append(html);
          $output.scrollTop($output[0].scrollHeight);

          // ── Fetch GitHub stats with auto-retry ──
          let retries = 0;
          const maxRetries = 6;

          function fetchGH() {
            fetch('https://api.github.com/users/prince-i')
              .then(r => {
                if (!r.ok) throw new Error(r.status);
                return r.json();
              })
              .then(gh => {
                const el = document.getElementById(statsId);
                if (!el) return;
                el.innerHTML = `
                  <div style="display:flex; flex-wrap:wrap; gap:6px 24px;">
                    <div><span style="color:#888;">Public Repos</span> <span style="color:#27c93f; font-weight:bold;">${gh.public_repos ?? '-'}</span></div>
                    <div><span style="color:#888;">Followers</span> <span style="color:#27c93f; font-weight:bold;">${gh.followers ?? '-'}</span></div>
                    <div><span style="color:#888;">Following</span> <span style="color:#27c93f; font-weight:bold;">${gh.following ?? '-'}</span></div>
                    <div><span style="color:#888;">Gists</span> <span style="color:#27c93f; font-weight:bold;">${gh.public_gists ?? '-'}</span></div>
                    <div><span style="color:#888;">Joined</span> <span style="color:#666;">${gh.created_at ? new Date(gh.created_at).getFullYear() : '-'}</span></div>
                  </div>
                  <div style="margin-top:6px; display:flex; justify-content:space-between; align-items:center;">
                    <span style="color:#27c93f; font-size:0.75rem;">● online</span>
                    <span style="font-size:0.7rem; color:#555;">src: <a href="https://api.github.com/users/prince-i" target="_blank" style="color:#58a6ff; text-decoration:none;">api.github.com/users/prince-i</a></span>
                  </div>`;
              })
              .catch(() => {
                retries++;
                const el = document.getElementById(statsId);
                if (!el) return;
                if (retries < maxRetries) {
                  el.innerHTML = `<span style="color:#ff5f56;">✗ offline</span> <span style="color:#555;">— retry ${retries}/${maxRetries} in 5s...</span>`;
                  setTimeout(fetchGH, 5000);
                } else {
                  el.innerHTML = `<span style="color:#ff5f56;">✗ offline</span> <span style="color:#555;">— github unreachable after ${maxRetries} attempts</span>`;
                }
              });
          }
          fetchGH();
          break;
        }

        case 'certs':
        case 'certificates':
        case 'cert':
          appendLog(`Viewing certificates... <a href="Image/certification/CERT-COMPILATION.pdf" target="_blank" style="color:#58a6ff; text-decoration:underline;">Click here to open PDF</a>`);
          break;

        case 'badges':
        case 'badge':
          appendLog(`Viewing badges... <a href="https://www.credly.com/users/prince-arce" target="_blank" style="color:#58a6ff; text-decoration:underline;">Click here to view on Credly</a>`);
          break;

        case 'theme':
          toggleTheme();
          appendLog(`Theme toggled to: ${localStorage.getItem('theme').toUpperCase()}`);
          break;

        case 'date':
          appendLog(new Date().toString());
          break;

        case 'clear':
          $output.empty();
          appendLog(`Type <span style="color:#ffbd2e">help</span> for a list of commands.`);
          break;

        case 'sudo hire':
        case 'sudo hire prince':
          appendLog(`[OK] Access Granted! Prince Arce is ready to bring high performance to your organization! 🚀`, '#27c93f');
          appendLog(`Reach my socials @cyber.pca on <a href="https://instagram.com/cyber.pca" target="_blank" style="color:#28eaeb">IG</a> and <a href="https://facebook.com/cyber.pca" target="_blank" style="color:#28eaeb">FB</a>.`, '#27c93f');
          break;

        case 'exit':
        case 'close':
          $('#cliModal').modal('close');
          break;

        default:
          appendLog(`Command not found: "${cmd}". Type 'help' for options.`, '#ff5f56');
          break;
      }
    }
  });
}


// ====================================================================================
// TYPEWRITER EFFECT
const txt = 'APPLICATIONS PROGRAMMER | IT OFFICER';
const speed = 30;
const sChars = "!@#$%^&*()_+-=[]{}|;:',.<>?/`~";
let i = 0;
const titleEl = document.getElementById("title");

function typeWriter() {
  if (!titleEl) return;
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


// ====================================================================================
// THEME TOGGLER (DEFAULT DARK MODE)
if (!localStorage.getItem('theme')) {
  localStorage.setItem('theme', 'dark');
}

const get_theme = () => {
  const theme = localStorage.getItem("theme");
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
    $body.addClass('grey darken-4 white-text');
    $cards.addClass('transparent');
    $title.removeClass('grey-text text-darken-3 lighten-3').addClass('white-text');
    $buttons.addClass('white black-text').removeClass('black white-text');
    $upskillLinks.removeClass('black-text').addClass('white-text');
    $divider.removeClass('white').addClass('black');
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

function toggleTheme() {
  const theme = localStorage.getItem("theme") === "dark" ? "light" : "dark";
  localStorage.setItem("theme", theme);
  get_theme();
}

$('#theme_button, #theme_button_nav').on('click', toggleTheme);


// ===========================================================================================================================================================