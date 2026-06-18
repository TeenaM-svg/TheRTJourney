document.addEventListener('DOMContentLoaded', () => {
  // Page Transition Fade-in
  const overlay = document.getElementById('transition-overlay');
  if (overlay) {
    setTimeout(() => {
      overlay.classList.add('inactive');
    }, 100);
  }

  // 1. Treasure Hunt State & Logic
  const foundHearts = new Set();
  const progressBarFill = document.getElementById('progress-bar-fill');
  const progressText = document.getElementById('progress-text');
  const unlockRewardCard = document.getElementById('unlock-reward');
  const continueBtn = document.getElementById('btn-continue-journey');

  const heartThoughts = {
    'heart-1': "From Accra to Kumasi, distance means nothing when you mean everything.",
    'heart-2': "I love your beautiful smile, it makes my days brighter.",
    'heart-3': "Thank you for being my peace in a chaotic world.",
    'heart-4': "Every phone call we share leaves me counting down the hours to the next one.",
    'heart-5': "You're my favorite person to laugh with.",
    'heart-6': "My heart beats for you, today and forever.",
    'heart-7': "You found the secret letter hidden in my heart! You make me complete."
  };

  const showScrollNote = (title, text) => {
    const noteEl = document.getElementById('jar-scroll-note');
    const titleEl = document.getElementById('note-title');
    const textEl = document.getElementById('note-text');
    
    titleEl.textContent = title;
    textEl.textContent = text;
    noteEl.classList.add('active');
  };

  const closeScrollNote = () => {
    const noteEl = document.getElementById('jar-scroll-note');
    noteEl.classList.remove('active');
  };

  document.getElementById('note-close-btn').addEventListener('click', closeScrollNote);

  // Hidden Heart Clicks
  const hiddenHearts = document.querySelectorAll('.hidden-heart');
  hiddenHearts.forEach(heart => {
    heart.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = heart.id;
      
      if (!foundHearts.has(id)) {
        foundHearts.add(id);
        heart.classList.add('found');
        
        // Update Progress
        const count = foundHearts.size;
        const percent = (count / 7) * 100;
        progressBarFill.style.width = `${percent}%`;
        progressText.textContent = `Hearts Found: ${count}/7`;
        
        // Show thought
        showScrollNote("Heart Discovered! ❤️", heartThoughts[id] || "You found a sweet thought!");

        // Unlocked Special Reward
        if (count === 7) {
          setTimeout(() => {
            unlockRewardCard.style.display = 'block';
            unlockRewardCard.scrollIntoView({ behavior: 'smooth' });
            continueBtn.textContent = "Enter The Gateway ❤️";
            continueBtn.style.background = "linear-gradient(135deg, #d4745f, #c1a88d)";
            continueBtn.style.boxShadow = "0 8px 25px rgba(212,116,95,0.4)";
          }, 600);
        }
      }
    });
  });

  // 2. Memory Jar Interactions
  const memoryJarTrigger = document.getElementById('memory-jar-trigger');
  const jarMemories = [
    "Our very first 4-hour phone call, talking about anything and everything.",
    "The moment we realized Accra and Kumasi are just numbers, and distance doesn't stand a chance.",
    "Sharing silly jokes and laughing until our stomachs hurt.",
    "The butterflies in my stomach when you officially said YES on June 16th.",
    "Staying up late just to send a sweet goodnight message.",
    "Talking about our future and planning our first real date."
  ];

  if (memoryJarTrigger) {
    memoryJarTrigger.addEventListener('click', () => {
      const randomIdx = Math.floor(Math.random() * jarMemories.length);
      showScrollNote("Jar Memory 🍯", jarMemories[randomIdx]);
    });
  }

  // 3. Floating Envelopes Spawner
  const spawner = document.getElementById('envelope-spawner');
  const envelopeMessages = [
    "Thinking of you right now! ❤️",
    "You are the best thing that ever happened to me. 💙",
    "I'm sending you a big warm hug across the miles! 🌍",
    "You make my heart skip a beat. ✨",
    "Sending you all my love today and always. 💖"
  ];

  const spawnEnvelope = () => {
    if (!spawner) return;
    
    // Limit active envelopes to 3
    const activeEnvelopes = spawner.querySelectorAll('.floating-envelope');
    if (activeEnvelopes.length >= 3) return;

    const envelope = document.createElement('div');
    envelope.className = 'floating-envelope';
    envelope.textContent = '✉️';
    
    const randomX = 10 + Math.random() * 80;
    const randomDuration = 7 + Math.random() * 4;
    const randomSize = 24 + Math.random() * 12;

    envelope.style.left = `${randomX}%`;
    envelope.style.fontSize = `${randomSize}px`;
    envelope.style.animation = `floatEnvelope ${randomDuration}s linear forwards`;
    envelope.style.pointerEvents = 'auto';

    envelope.addEventListener('click', (e) => {
      e.stopPropagation();
      envelope.remove();
      
      const randomIdx = Math.floor(Math.random() * envelopeMessages.length);
      showScrollNote("Surprise Message ✉️", envelopeMessages[randomIdx]);
    });

    spawner.appendChild(envelope);

    // Remove when animation finishes
    setTimeout(() => {
      envelope.remove();
    }, randomDuration * 1000);
  };

  // Spawn envelope every 4 seconds
  const spawnerInterval = setInterval(spawnEnvelope, 4000);

  // Smooth page transition helper
  if (continueBtn) {
    continueBtn.addEventListener('click', (e) => {
      e.preventDefault();
      clearInterval(spawnerInterval);
      
      overlay.classList.remove('inactive'); // Show transition overlay
      
      setTimeout(() => {
        window.location.href = "gateway.html";
      }, 500); // Redirect after fade animation ends
    });
  }
});
