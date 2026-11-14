(function () {
  const P = CA.progress, $ = s => document.querySelector(s);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const phase = n => `<div class="note">Playable board and interaction arrive in <b>Phase ${n}</b>. What you see here is the real structure and saved data.</div>`;
  const head = (t, p) => `<div class="page-head"><h1>${t}</h1><p class="lead">${p}</p></div>`;
  const tiles = (arr, cls) => `<div class="grid ${cls || 'g3'}">` + arr.map(a => `<div class="card"><h3>${esc(a[0] || a)}</h3>${a[1] ? `<p class="muted">${esc(a[1])}</p>` : ''}</div>`).join('') + '</div>';
  const empty = (g, t, p, href, b) => `<div class="card empty"><div class="glyph">${g}</div><h2>${t}</h2><p class="lead">${p}</p><a class="btn gold" href="${href}">${b}</a></div>`;
  const stat = (v, l) => `<div class="card stat"><b data-count="${v}">${v}</b><span>${l}</span></div>`;

  const kingSvg = `<svg viewBox="0 0 200 220" role="img" aria-label="Golden king chess piece on a chessboard"><defs><linearGradient id="gk" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F0D69A"/><stop offset="1" stop-color="#9A7448"/></linearGradient></defs>
  <g opacity=".95">${[0, 1, 2, 3].map(r => [0, 1, 2, 3].map(c => `<rect x="${20 + c * 40}" y="${150 + r * 14}" width="40" height="14" fill="${(r + c) % 2 ? '#8B725B' : '#E9DFC9'}" opacity=".55"/>`).join('')).join('')}</g>
  <g class="king" fill="url(#gk)"><rect x="94" y="14" width="12" height="34" rx="3"/><rect x="83" y="25" width="34" height="11" rx="3"/>
  <path d="M72 150C75 118 84 100 78 84C74 70 86 56 100 56C114 56 126 70 122 84C116 100 125 118 128 150Z"/><rect x="62" y="148" width="76" height="14" rx="5"/></g></svg>`;

  function dashHome() {
    const s = P.get(), d = P.daily(), ch = P.accuracy();
    const nxt = s.lastLesson || { c: 0, l: 0 }, lname = CA.CHAPTERS[nxt.c].l[nxt.l];
    const cards = [['learn', '♘', 'Learn the moves', 'How every piece moves, step by step.', '#D6B36A'], ['training', '♖', 'Training', 'Tactics and puzzles with instant feedback.', '#64C99A'],
    ['play', '♔', 'Play chess', 'Full games against the computer.', '#E47777'], ['openings', '♙', 'Openings', 'Eight famous openings, move by move.', '#9A7448'],
    ['endgames', '♕', 'Endgames', 'Checkmates and king-and-pawn technique.', '#8FA9C9'], ['analysis', '♗', 'Game analysis', 'Review a finished game and find your mistakes.', '#E9DFC9']];
    return `<section class="hero"><div><h1>Master the game.</h1><p class="lead">Every move makes you stronger.</p>
      <div class="row"><a class="btn gold" href="#/learn">Continue learning</a><a class="btn ghost" href="#/training">Start training</a></div>
      <div class="pill">Daily challenge · ${d.done ? 'Completed' : '+' + d.xp + ' XP waiting'}</div></div>${kingSvg}</section>
    <section class="section"><div class="grid g3">${cards.map(c => `<a class="card nav-card" style="--tint:${c[4]}" href="#/${c[0]}"><span class="glyph" aria-hidden="true">${c[1]}</span><h3>${c[2]}</h3><p>${c[3]}</p></a>`).join('')}</div></section>
    <section class="section"><h2>Your progress</h2><div class="card"><div class="row" style="justify-content:space-between"><span>Overall learning</span><b>${P.overall()}%</b></div><div class="bar"><i style="width:${P.overall()}%"></i></div></div>
      <div class="grid g3" style="margin-top:16px">${stat(s.lessons.length + '/' + P.total(), 'Lessons completed')}${stat(ch === null ? '–' : ch + '%', 'Training accuracy')}${stat(s.games.played, 'Games played')}${stat(s.streak.count + (s.streak.count === 1 ? ' day' : ' days'), 'Current streak')}${stat(s.xp, 'XP earned')}${stat('Lv ' + P.level(), 'Current level')}</div></section>
    <section class="section grid g2">
      <div class="card"><span class="tag gold">Daily challenge</span><h3 style="margin:12px 0 6px">${esc(d.title)}</h3><p class="muted">${esc(d.text)}</p><p style="margin-top:14px"><span class="tag ${d.done ? 'ok' : ''}">${d.done ? 'Completed today' : '+' + d.xp + ' XP · changes at midnight'}</span></p></div>
      <div class="card"><span class="tag gold">Pick up where you left off</span><h3 style="margin:12px 0 6px">${esc(lname)}</h3><p class="muted">Chapter ${nxt.c + 1}: ${esc(CA.CHAPTERS[nxt.c].n)}</p><p style="margin-top:14px"><a class="btn ghost" href="#/learn">Open the journey</a></p></div></section>`;
  }
  function learn() {
    const s = P.get();
    return head('Learn the moves', 'Start with the six pieces, then follow your chess journey chapter by chapter.') + phase(3) +
      `<h2>The six pieces</h2><div class="grid g6 pieces">${CA.PIECES.map(p => `<div class="card"><div class="glyph" aria-hidden="true">${p.g}</div><h3>${p.n}</h3><p>${p.t}</p></div>`).join('')}</div>
      <section class="section"><h2>Your chess journey</h2>${CA.CHAPTERS.map((c, ci) => `<div class="card chapter"><header><h3>Chapter ${ci + 1}: ${c.n}</h3><span class="tag ${ci === 0 ? 'gold' : ''}">${ci === 0 ? 'Unlocked' : 'Locked'}</span></header>
      <ul class="lessons">${c.l.map((l, li) => { const done = s.lessons.includes(ci + '.' + li), next = ci === 0 && li === 0 && !done; return `<li class="${done ? 'done' : next ? 'next' : ''}"><span>${esc(l)}</span><span class="tag">${done ? 'Done' : next ? 'Next up' : 'Locked'}</span></li>`; }).join('')}<li><span>Final assessment</span><span class="tag">Locked</span></li></ul></div>`).join('')}</section>
      <section class="section"><h2>Keep exploring</h2><div class="grid g2"><a class="card" href="#/openings"><h3>Openings</h3><p class="muted">Eight openings to study.</p></a><a class="card" href="#/endgames"><h3>Endgames</h3><p class="muted">Finish what you start.</p></a></div></section>`;
  }
  const training = () => head('Training', 'Short exercises that check your answer and explain why.') + phase(4) +
    `<h2>Puzzle types</h2>${tiles(CA.TRAIN.puzzles)}<section class="section"><h2>Tactical ideas</h2>${tiles(CA.TRAIN.concepts)}</section><section class="section"><h2>Difficulty</h2>${tiles(CA.TRAIN.levels, 'g4')}</section>`;
  const play = () => head('Play chess', 'Choose a mode, pick an opponent, and play a full game.') + phase(2) +
    `<h2>Modes</h2>${tiles(CA.MODES, 'g2')}<section class="section"><h2>Computer levels</h2>${tiles(CA.AI.map((a, i) => [a, ['Learns the rules', 'Casual', 'Club level', 'Strong', 'Maximum'][i]]), 'g3')}</section>
    <section class="section"><a class="card" href="#/analysis"><h3>Game analysis</h3><p class="muted">Review a finished game.</p></a></section>`;
  const openings = () => head('Openings', 'Learn the first moves and the ideas behind them.') + phase(5) +
    tiles(CA.OPENINGS.map(o => [o[0], o[1]]), 'g2');
  const endgames = () => head('Endgames', 'Technique that turns a small advantage into a win.') + phase(6) + tiles(CA.ENDGAMES, 'g2');
  const analysis = () => head('Game analysis', 'Review every move, spot mistakes, and see what to practice next.') +
    empty('♗', 'No games to review yet', 'Finish a game and it will appear here, ready for review.', '#/play', 'Go to Play') + `<div class="note" style="margin-top:20px">Engine evaluations will be shown only when a real engine produced them. Simplified explanations will be labeled separately. Arrives in Phase 6.</div>`;
  function progress() {
    const s = P.get(), a = P.achievements(), acc = P.accuracy();
    return head('Progress', 'Everything you have earned so far.') +
      `<div class="card"><div class="row" style="justify-content:space-between"><span>Level ${P.level()}</span><span class="muted">${s.xp % 200} / 200 XP</span></div><div class="bar"><i style="width:${P.levelPct()}%"></i></div></div>
      <div class="grid g3" style="margin-top:16px">${stat(s.lessons.length, 'Lessons completed')}${stat(s.puzzles.solved, 'Puzzles solved')}${stat(acc === null ? '–' : acc + '%', 'Training accuracy')}${stat(s.games.won, 'Wins')}${stat(s.games.lost, 'Losses')}${stat(s.games.drawn, 'Draws')}</div>
      <section class="section"><h2>Achievements</h2><div class="grid g2">${a.map(x => `<div class="card badge ${x.on ? 'on' : ''}"><div class="glyph" aria-hidden="true">${x.g}</div><div><b>${x.title}</b><small>${x.on ? 'Unlocked' : x.text}</small></div></div>`).join('')}</div></section>`;
  }
  function profile() {
    const s = P.get();
    return head('Profile', 'Your name, level, and record.') +
      `<div class="card"><div class="row"><div class="avatar" style="width:64px;height:64px;font-size:28px">${esc(s.name[0].toUpperCase())}</div><div><h2 style="margin:0">${esc(s.name)}</h2><span class="muted">Level ${P.level()} · ${s.xp} XP</span></div></div>
      <div class="field" style="margin-top:18px"><label for="nm">Player name<small>Shown in the header and on your profile</small></label><input id="nm" type="text" maxlength="20" value="${esc(s.name)}"></div></div>
      <div class="grid g3" style="margin-top:16px">${stat(s.games.played, 'Games played')}${stat(s.streak.count, 'Day streak')}${stat(s.puzzles.solved, 'Puzzles solved')}</div>
      <p style="margin-top:20px"><a class="btn ghost" href="#/settings">Open settings</a></p>`;
  }
  function settings() {
    const s = P.get();
    return head('Settings', 'Changes save automatically on this device.') + `<div class="card">
      <div class="field"><label for="rm">Reduce motion<small>Turns off animated effects</small></label><input id="rm" class="switch" type="checkbox" ${s.settings.reducedMotion ? 'checked' : ''}></div>
      <div class="field"><div>Offline status<small id="netTxt"></small></div></div>
      <div class="field"><div>Reset progress<small>Deletes XP, lessons, streak, and games on this device</small></div><button class="btn danger" id="reset">Reset</button></div></div>
      <div class="note" style="margin-top:20px">Language, sound, piece style, and board theme will appear here when those features exist (Phases 2 and 7).</div>`;
  }
  const VIEWS = { home: dashHome, learn, training, play, openings, endgames, analysis, progress, profile, settings };

  function chrome() {
    const s = P.get();
    $('#chip').innerHTML = `<span class="avatar">${esc(s.name[0].toUpperCase())}</span><span><b>${esc(s.name)}</b><small>Level ${P.level()} · ${s.xp} XP</small></span>`;
    document.documentElement.dataset.motion = s.settings.reducedMotion ? 'reduced' : 'full';
  }
  function net() {
    const on = navigator.onLine; const t = on ? 'Online' : 'Offline';
    $('#net').textContent = t; $('#net').className = 'net' + (on ? '' : ' off');
    const x = $('#netTxt'); if (x) x.textContent = on ? 'Online. Offline caching arrives in Phase 7.' : 'You are offline. Saved progress still works.';
  }
  function countUp() {
    if (document.documentElement.dataset.motion === 'reduced' || matchMedia('(prefers-reduced-motion:reduce)').matches) return;
    document.querySelectorAll('[data-count]').forEach(el => {
      const n = parseInt(el.dataset.count, 10); if (!(n > 0) || String(n) !== el.dataset.count) return;
      const t0 = performance.now(); (function f(t) { const k = Math.min(1, (t - t0) / 700); el.textContent = Math.round(n * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(f); })(t0);
    });
  }
  function bind(r) {
    if (r === 'profile') $('#nm').addEventListener('input', e => { const v = e.target.value.trim(); if (v) { P.get().name = v.slice(0, 20); P.save(); chrome(); } });
    if (r === 'settings') {
      $('#rm').addEventListener('change', e => { P.get().settings.reducedMotion = e.target.checked; P.save(); chrome(); });
      $('#reset').addEventListener('click', () => {
        $('#confirmTitle').textContent = 'Reset all progress?'; $('#confirmText').textContent = 'This permanently deletes your XP, lessons, streak, and game record on this device.';
        const dlg = $('#confirm'); dlg.addEventListener('close', function h() { dlg.removeEventListener('close', h); if (dlg.returnValue === 'yes') { P.reset(); chrome(); render(); } });
        dlg.showModal();
      });
    }
  }
  function render() {
    let r = CA.navigation.route(); if (!VIEWS[r]) r = 'home';
    const v = $('#view'); v.classList.remove('enter'); v.innerHTML = VIEWS[r](); void v.offsetWidth; v.classList.add('enter');
    CA.navigation.mark(r); bind(r); net(); countUp(); window.scrollTo(0, 0); v.focus({ preventScroll: true });
    document.title = (r === 'home' ? '' : r[0].toUpperCase() + r.slice(1) + ' · ') + 'Chess Academy';
  }
  CA.navigation.build(); P.touchStreak(); chrome();
  window.addEventListener('hashchange', render); window.addEventListener('online', net); window.addEventListener('offline', net);
  render();
})();