document.addEventListener('DOMContentLoaded', () => {
  // Page Transition Fade-in
  const overlay = document.getElementById('transition-overlay');
  if (overlay) {
    setTimeout(() => {
      overlay.classList.add('inactive');
    }, 100);
  }

  // 1. Dynamic Days Counter
  const calculateDaysActive = () => {
    const today = new Date();
    const startDate = new Date('2026-06-04');
    const timeDiff = today.getTime() - startDate.getTime();
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1;
    
    const elements = document.querySelectorAll('.days-active');
    elements.forEach(el => {
      el.textContent = `${days} days`;
    });
  };
  calculateDaysActive();

  // 2. Balloon Celebration Generator
  const balloonWrapper = document.getElementById('balloon-celebration-wrapper');
  let hideCelebrationTimeout = null;

  const triggerBalloonCelebration = () => {
    if (hideCelebrationTimeout) {
      clearTimeout(hideCelebrationTimeout);
    }

    // Activate celebration mode and hide page chrome while balloons play
    document.body.classList.add('celebration-active');

    // Prevent scrolling to avoid any glimpse of the page
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    balloonWrapper.innerHTML = '';
    balloonWrapper.style.display = 'block';
    balloonWrapper.style.pointerEvents = 'auto';

    const container = document.createElement('div');
    container.className = 'balloon-container';
    // Background bubbles layer
    const bgBubbles = document.createElement('div');
    bgBubbles.className = 'bg-bubbles';
    for (let b = 0; b < 12; b++) {
      const bubble = document.createElement('div');
      bubble.className = 'bg-bubble';
      const size = 40 + Math.floor(Math.random() * 160);
      const left = Math.random() * 100;
      const delay = Math.random() * 3;
      const duration = 8 + Math.random() * 8;
      bubble.style.width = size + 'px';
      bubble.style.height = size + 'px';
      bubble.style.left = left + '%';
      bubble.style.bottom = '-120px';
      bubble.style.animationDuration = duration + 's';
      bubble.style.animationDelay = delay + 's';
      bgBubbles.appendChild(bubble);
    }
    container.appendChild(bgBubbles);

    const textBox = document.createElement('div');
    textBox.className = 'balloon-text';
    textBox.innerHTML = `
      <div class="balloon-text-box">
        <h2>Happy 2-Week Anniversary</h2>
    
      </div>
    `;
    container.appendChild(textBox);

    const balloonColors = ['#d4745f', '#e8a898', '#c1a88d', '#e5d5c8', '#d4745f', '#e8a898'];
    for (let i = 0; i < 30; i++) {
      const balloon = document.createElement('div');
      balloon.className = 'balloon-particle animate-pulse';

      const randomX = Math.random() * 100;
      const randomDelay = Math.random() * 0.5;
      const randomDuration = 3 + Math.random() * 2;
      const randomSize = 30 + Math.random() * 40;
      const color = balloonColors[i % balloonColors.length];

      balloon.style.left = `${randomX}%`;
      balloon.style.bottom = '-100px';
      balloon.style.width = `${randomSize}px`;
      balloon.style.height = `${randomSize}px`;
      balloon.style.animation = `float-balloon ${randomDuration}s ease-in infinite`;
      balloon.style.animationDelay = `${randomDelay}s`;

      const innerBalloon = document.createElement('div');
      innerBalloon.style.width = '100%';
      innerBalloon.style.height = '100%';
      innerBalloon.style.borderRadius = '50%';
      innerBalloon.style.backgroundColor = color;
      innerBalloon.style.opacity = '0.9';
      innerBalloon.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
      balloon.appendChild(innerBalloon);

      const string = document.createElement('div');
      string.style.position = 'absolute';
      string.style.left = '50%';
      string.style.top = '100%';
      string.style.width = '1.5px';
      string.style.height = '40px';
      string.style.backgroundColor = 'currentColor';
      string.style.opacity = '0.6';
      balloon.appendChild(string);

      container.appendChild(balloon);
    }

    const dismissBtn = document.createElement('button');
    dismissBtn.className = 'balloon-dismiss-btn';
    dismissBtn.setAttribute('aria-label', 'Close celebration');
    dismissBtn.addEventListener('click', () => {
      hideCelebrationSmooth();
    });
    container.appendChild(dismissBtn);

    balloonWrapper.appendChild(container);

    // Activate wrapper fade-in
    balloonWrapper.classList.remove('fade-out');
    balloonWrapper.classList.add('active');

    hideCelebrationTimeout = setTimeout(() => {
      hideCelebrationSmooth();
    }, 3500);
  };

  function hideCelebrationSmooth() {
    balloonWrapper.classList.add('fade-out');
    balloonWrapper.classList.remove('active');
    setTimeout(() => {
      balloonWrapper.style.display = 'none';
      balloonWrapper.innerHTML = '';
      balloonWrapper.style.pointerEvents = 'none';
      document.body.classList.remove('celebration-active');
      // restore scrolling
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      balloonWrapper.classList.remove('fade-out');
    }, 1000);
  }

  window.addEventListener('trigger-balloon-celebration', triggerBalloonCelebration);

  // Auto trigger only when navigation requested celebration
  try {
    const shouldCelebrate = sessionStorage.getItem('celebrateOnLoad');
    if (shouldCelebrate === 'true') {
      sessionStorage.removeItem('celebrateOnLoad');
      setTimeout(triggerBalloonCelebration, 300);
    }
  } catch (err) {
    // ignore
  }

  // Navbar heart trigger
  const navHeart = document.getElementById('nav-heart-trigger');
  if (navHeart) {
    navHeart.addEventListener('click', () => {
      triggerBalloonCelebration();
    });
  }

  // Hero Card trigger
  const heroCard = document.getElementById('hero-celebrate-card');
  if (heroCard) {
    heroCard.addEventListener('click', () => {
      triggerBalloonCelebration();
    });
  }

  // Bottom right FAB trigger
  const fabCelebrate = document.getElementById('fab-celebrate-trigger');
  if (fabCelebrate) {
    fabCelebrate.addEventListener('click', () => {
      triggerBalloonCelebration();
    });
    
    window.addEventListener('trigger-balloon-celebration', () => {
      fabCelebrate.style.display = 'none';
    });
    
    setInterval(() => {
      if (balloonWrapper.style.display === 'none' || balloonWrapper.innerHTML === '') {
        // Also check that final love letter overlay is not open before showing FAB
        const letterOverlay = document.getElementById('dark-love-letter-overlay');
        if (!letterOverlay || !letterOverlay.classList.contains('active')) {
          fabCelebrate.style.display = 'flex';
        }
      }
    }, 500);
  }

  // 2b. Navbar balloons: automatic, long-lasting but moving
  const createNavbarBalloons = (duration = null) => {
    const header = document.querySelector('header.sticky-nav');
    if (!header) return;

    // Avoid creating multiple sets
    if (header.querySelector('.navbar-balloons')) return;

    const container = document.createElement('div');
    container.className = 'navbar-balloons';

    const colors = ['#d4745f', '#e8a898', '#c1a88d', '#e5d5c8', '#4a63ff', '#d94b4b'];
    const count = 14;
    for (let i = 0; i < count; i++) {
      const b = document.createElement('div');
      b.className = 'navbar-balloon ' + (Math.random() > 0.5 ? 'slow' : 'fast');
      const size = 14 + Math.floor(Math.random() * 32);
      const left = Math.random() * 100;
      const top = 8 + Math.random() * 38; // within header height
      b.style.width = size + 'px';
      b.style.height = size + 'px';
      b.style.left = left + '%';
      b.style.top = top + 'px';
      b.style.background = colors[i % colors.length];
      b.style.opacity = 0.95;
      container.appendChild(b);
    }

    header.appendChild(container);

    // Only remove if duration is specified (default is null = permanent)
    if (duration !== null) {
      setTimeout(() => {
        container.classList.add('fade-out');
        setTimeout(() => container.remove(), 1200);
      }, duration);
    }
  };

  // Auto-trigger navbar balloons on page load
  setTimeout(() => {
    createNavbarBalloons(); // show indefinitely
  }, 600);


  // 3. Modals Manager (Proposal and Secrets)
  const modalOverlay = document.getElementById('modal-overlay');
  const modalBox = document.getElementById('modal-box');

  const openModal = (htmlContent) => {
    modalBox.innerHTML = htmlContent;
    modalOverlay.style.display = 'flex';
    
    const newCloseBtn = modalBox.querySelector('#modal-close-btn');
    if (newCloseBtn) {
      newCloseBtn.addEventListener('click', closeModal);
    }
  };

  const closeModal = () => {
    modalOverlay.style.display = 'none';
    modalBox.innerHTML = '';
  };

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  window.openProposalModal = () => {
    const content = `
      <div class="modal-img-area">
        <img src="public/couple-journey.jpg" alt="Will you be my girlfriend?">
      </div>
      <div class="modal-body">
        <h3>Will You Be My Girlfriend?
        <h4>I Said YES! ❤️ </h4></h3>
        <p class="modal-subtitle">June 16th: The day that changed everything</p>
        <button id="modal-close-btn" class="btn-modal-close">Close</button>
      </div>
    `;
    openModal(content);
  };

  window.openSecretModal = (personName) => {
    let message = '';
    if (personName === 'Ray') {
      message = 'funny, visionary, beautiful inside out, thoughtful, and easy to talk to. You are the kind of person who makes every conversation feel effortless. From the moment we met, something just felt different. I genuinely enjoy getting to know you, hearing your thoughts, and sharing little moments throughout the day. Your laughter always seems to make me smile, and somehow you have become that one person I look forward to talking to more than I would like to admit. These past two weeks have been special, and I am excited to see where our journey takes us.';
    } else if (personName === 'Teena') {
      message = 'My heart to Teena...';
    }

    const content = `
      <div class="modal-body">
        <h3>A Special Message</h3>
        <p class="modal-desc">"${message}"</p>
        <button id="modal-close-btn" class="btn-modal-close">Close</button>
      </div>
    `;
    openModal(content);
  };

  // 4. Mobile Timeline Tabs Selector
  const mobileTabBtns = document.querySelectorAll('.timeline-mobile:not(#future-mobile-tabs) .mobile-tab-btn');
  const mobileCard = document.getElementById('mobile-timeline-card');
  
  const events = [
    {
      date: 'June 4',
      day: 1,
      title: 'The Beginning',
      description: 'The night we met. A simple moment that changed everything.',
      icon: '✨',
    },
    {
      date: 'June 5',
      day: 2,
      title: 'First Connection',
      description: 'Getting to know each other, laughing and sharing dreams.',
      icon: '💭',
    },
    {
      date: 'June 7',
      day: 4,
      title: 'Growing Closer',
      description: 'Every moment together feels like home.',
      icon: '🌿',
    },
    {
      date: 'June 10',
      day: 7,
      title: 'One Week Strong',
      description: 'A week of pure joy, laughter, and unforgettable memories.',
      icon: '⭐',
    },
    {
      date: 'June 14',
      day: 11,
      title: 'Distance, No Barrier',
      description: 'Miles apart but hearts forever connected.',
      icon: '🌍',
    },
    {
      date: 'June 16',
      day: 13,
      title: 'The Question',
      description: 'A moment we\'ll never forget. Will you be my girlfriend?',
      icon: '💫',
      hasProposal: true,
    },
    {
      date: 'June 18',
      day: 15,
      title: 'Two Weeks of Love',
      description: 'Here we are, stronger than ever. The best is yet to come.',
      icon: '❤️',
    }
  ];

  mobileTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      mobileTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const index = parseInt(btn.getAttribute('data-index'));
      const event = events[index];
      
      let proposalBtnHTML = '';
      if (event.hasProposal) {
        proposalBtnHTML = `
          <button onclick="window.openProposalModal()" class="btn-proposal" style="margin-top: 1rem;">
            View Proposal
          </button>
        `;
      }

      mobileCard.innerHTML = `
        <div class="icon">${event.icon}</div>
        <h3 class="font-heading">${event.title}</h3>
        <p class="date">${event.date}</p>
        <p class="desc">${event.description}</p>
        ${proposalBtnHTML}
      `;
    });
  });

  // 5. Future Timeline mobile selectors (Chapter 4)
  const futureMobileBtns = document.querySelectorAll('#future-mobile-tabs .mobile-tab-btn-future');
  const futureCard = document.getElementById('mobile-future-card');

  const futureEvents = [
    {
      title: 'One Month Together',
      date: 'July 4, 2026',
      description: 'Celebrating 30 days of pure happiness and building our beautiful connection day by day.',
      icon: '💖'
    },
    {
      title: 'First Real Date',
      date: 'Accra or Kumasi',
      description: 'No more barriers, no more screens. Just you and me, sharing laughs, dinner, and our first real connection in person.',
      icon: '✨'
    },
    {
      title: 'First Adventure Together',
      date: 'To Be Decided',
      description: 'Exploring a new city, hiking, or simply getting lost somewhere beautiful together. Creating unforgettable memories.',
      icon: '🎒'
    },
    {
      title: 'First Anniversary',
      date: 'June 4, 2027',
      description: 'One year of love, milestones, laughter, and conquering distance. Celebrating our rock-solid foundation.',
      icon: '🎂'
    },
    {
      title: 'Growing Old Together',
      date: 'Forever',
      description: 'An eternity of partnership, caring for each other, and sharing a lifetime of warmth and endless devotion.',
      icon: '👵👴'
    }
  ];

  futureMobileBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      futureMobileBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Add background primary styling for active tab button
      futureMobileBtns.forEach(b => {
        b.style.background = 'var(--card)';
        b.style.color = 'var(--foreground)';
      });
      btn.style.background = 'var(--primary)';
      btn.style.color = 'white';
      
      const index = parseInt(btn.getAttribute('data-index'));
      const fEvent = futureEvents[index];

      futureCard.innerHTML = `
        <div class="icon">${fEvent.icon}</div>
        <h3 class="font-heading">${fEvent.title}</h3>
        <p class="date">${fEvent.date}</p>
        <p class="desc">${fEvent.description}</p>
      `;
    });
  });

  // 6. Testimonials Carousel
  const carouselDots = document.querySelectorAll('.carousel-dot');
  const testimonials = document.querySelectorAll('.testimonial-mobile-item');

  carouselDots.forEach(dot => {
    dot.addEventListener('click', () => {
      carouselDots.forEach(d => d.classList.remove('active'));
      dot.classList.add('active');

      const activeIndex = parseInt(dot.getAttribute('data-index'));
      testimonials.forEach((t, index) => {
        if (index === activeIndex) {
          t.style.display = 'block';
        } else {
          t.style.display = 'none';
        }
      });
    });
  });

  // 7. Chapter 5: Love Letter Sequence ("One Last Thing...")
  const lastThingBanner = document.getElementById('one-last-thing-banner');
  const loveLetterOverlay = document.getElementById('dark-love-letter-overlay');
  const loveLetterLines = document.querySelectorAll('.love-letter-text');
  const closeLetterBtn = document.getElementById('btn-letter-close');
  let letterTimers = [];

  if (lastThingBanner && loveLetterOverlay) {
    // Generate background stars
    for (let i = 0; i < 60; i++) {
      const star = document.createElement('div');
      star.className = 'star-particle';
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.animation = `twinkle ${1 + Math.random() * 2}s infinite alternate`;
      star.style.animationDelay = `${Math.random() * 2}s`;
      loveLetterOverlay.appendChild(star);
    }

    lastThingBanner.addEventListener('click', () => {
      // 1. Disable scrolling
      document.body.style.overflow = 'hidden';
      if (fabCelebrate) fabCelebrate.style.display = 'none';

      // 2. Open overlay
      loveLetterOverlay.classList.add('active');

      // 3. Clear existing timers & reset classes
      letterTimers.forEach(clearTimeout);
      letterTimers = [];
      loveLetterLines.forEach(line => line.classList.remove('revealed'));
      closeLetterBtn.classList.remove('visible');

      // 4. Reveal lines one-by-one
      loveLetterLines.forEach((line, index) => {
        const timer = setTimeout(() => {
          line.classList.add('revealed');
        }, 1500 + index * 2500); // Start after 1.5s, delay 2.5s between lines
        letterTimers.push(timer);
      });

      // 5. Reveal end close/replay button
      const finalTimer = setTimeout(() => {
        closeLetterBtn.classList.add('visible');
        
        // Final ending celebration fireworks
        triggerBalloonCelebration();
      }, 1500 + loveLetterLines.length * 2500 + 1000);
      letterTimers.push(finalTimer);
    });

    closeLetterBtn.addEventListener('click', () => {
      // Re-enable scrolling
      document.body.style.overflow = '';
      if (fabCelebrate) fabCelebrate.style.display = 'flex';
      
      // Close overlay
      loveLetterOverlay.classList.remove('active');
      loveLetterLines.forEach(line => line.classList.remove('revealed'));
      closeLetterBtn.classList.remove('visible');
      
      // Clear timers
      letterTimers.forEach(clearTimeout);
      letterTimers = [];
    });
  }

  // Smooth page transition helper
  const transitionLinks = document.querySelectorAll('a[href$=".html"]');
  transitionLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetUrl = link.getAttribute('href');
      
      overlay.classList.remove('inactive'); // Show white fade transition
      
      setTimeout(() => {
        window.location.href = targetUrl;
      }, 500); // Match CSS fade duration
    });
  });
});
