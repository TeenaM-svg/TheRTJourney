document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Days Counter
  const calculateDaysActive = () => {
    const today = new Date();
    const startDate = new Date('2026-06-04');
    const timeDiff = today.getTime() - startDate.getTime();
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1;
    
    // Update all elements with the 'days-active' class
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
    // Clear any existing timeouts
    if (hideCelebrationTimeout) {
      clearTimeout(hideCelebrationTimeout);
    }

    // Activate celebration mode: hide page chrome so balloons are on top
    document.body.classList.add('celebration-active');
    // Prevent scrolling or any interaction with underlying page
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    // Reset container contents
    balloonWrapper.innerHTML = '';
    balloonWrapper.style.display = 'block';
    balloonWrapper.style.pointerEvents = 'auto';

    const container = document.createElement('div');
    container.className = 'balloon-container';
    // Center celebration text
    // Background bubbles layer
    const bgBubbles = document.createElement('div');
    bgBubbles.className = 'bg-bubbles';
    // create gentle floating bubbles
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

    // Center celebration text
    const textBox = document.createElement('div');
    textBox.className = 'balloon-text';
    textBox.innerHTML = `
      <div class="balloon-text-box">
        <h2>Happy 2-Week Anniversary</h2>
        <p>Ray & Teena</p>
      </div>
    `;
    container.appendChild(textBox);

    // Create 30 balloons
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

      // Balloon inner bubble
      const innerBalloon = document.createElement('div');
      innerBalloon.style.width = '100%';
      innerBalloon.style.height = '100%';
      innerBalloon.style.borderRadius = '50%';
      innerBalloon.style.backgroundColor = color;
      innerBalloon.style.opacity = '0.9';
      innerBalloon.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
      balloon.appendChild(innerBalloon);

      // Balloon String
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

    // Dismiss overlay button
    const dismissBtn = document.createElement('button');
    dismissBtn.className = 'balloon-dismiss-btn';
    dismissBtn.setAttribute('aria-label', 'Close celebration');
    dismissBtn.addEventListener('click', () => {
      hideCelebrationSmooth();
    });
    container.appendChild(dismissBtn);

    balloonWrapper.appendChild(container);

    // Ensure wrapper gets active class to fade in
    balloonWrapper.classList.remove('fade-out');
    balloonWrapper.classList.add('active');

    // Hide after 3.5 seconds with a smooth fade
    hideCelebrationTimeout = setTimeout(() => {
      hideCelebrationSmooth();
    }, 3500);
  };

  // Smooth hide helper: fade overlay then cleanup
  function hideCelebrationSmooth() {
    // start fade-out
    balloonWrapper.classList.add('fade-out');
    balloonWrapper.classList.remove('active');
    // after CSS transition (1s) clear
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

  // Wire up manual celebration triggers
  window.addEventListener('trigger-balloon-celebration', triggerBalloonCelebration);

  // Auto trigger only if navigation requested celebration
  try {
    const shouldCelebrate = sessionStorage.getItem('celebrateOnLoad');
    if (shouldCelebrate === 'true') {
      // clear flag so it doesn't repeat
      sessionStorage.removeItem('celebrateOnLoad');
      setTimeout(triggerBalloonCelebration, 300);
    }
  } catch (err) {
    // ignore storage errors
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
    
    // Hide FAB during celebration and show it back
    window.addEventListener('trigger-balloon-celebration', () => {
      fabCelebrate.style.display = 'none';
    });
    
    // Check when celebration ends to display FAB again
    const checkTimer = setInterval(() => {
      if (balloonWrapper.style.display === 'none' || balloonWrapper.innerHTML === '') {
        fabCelebrate.style.display = 'flex';
      }
    }, 500);
  }

  // 3. Modals Manager (Proposal and Secrets)
  const modalOverlay = document.getElementById('modal-overlay');
  const modalBox = document.getElementById('modal-box');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  const openModal = (htmlContent) => {
    modalBox.innerHTML = htmlContent;
    modalOverlay.style.display = 'flex';
    
    // Attach close listener to the new button inside
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

  // Proposal Modal Details
  window.openProposalModal = () => {
    const content = `
      <div class="modal-img-area">
        <img src="public/couple-journey.jpeg" alt="Will you be my girlfriend?">
      </div>
      <div class="modal-body">
        <h3>She's Said YES! ❤️</h3>
        <p class="modal-subtitle">June 16th - The day that changed everything</p>
        <button id="modal-close-btn" class="btn-modal-close">Close</button>
      </div>
    `;
    openModal(content);
  };

  // Testimonials Secret Message Modal
  window.openSecretModal = (personName) => {
    let message = '';
    if (personName === 'Ray') {
      message = 'funny, beautiful inside out, thoughtful, and easy to talk to. You are the kind of person who makes every conversation feel effortless. From the moment we met, something just felt different. I genuinely enjoy getting to know you, hearing your thoughts, and sharing little moments throughout the day. Your smile always seems to make things better, and somehow you\'ve become that one person I look forward to talking to more than I\'d like to admit. These past two weeks have been special, and I\'m excited to see where this journey takes us.';
    } else if (personName === 'Teena') {
      message = 'Go ahead, my dear. There\'s something in there that belongs to you.';
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
  const mobileTabBtns = document.querySelectorAll('.mobile-tab-btn');
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

  // 5. Testimonials Carousel (Mobile dot indicators selector)
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
});
