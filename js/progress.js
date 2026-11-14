window.CA = window.CA || {};
CA.progress = (function () {
  const XP_LEVEL = 200;
  const defaults = () => ({ name: 'Player', xp: 0, lessons: [], puzzles: { solved: 0, attempts: 0 }, games: { played: 0, won: 0, lost: 0, drawn: 0 }, streak: { count: 0, last: '' }, daily: {}, lastLesson: null, openingsViewed: [], mates: 0, settings: { reducedMotion: false } });
  let s = Object.assign(defaults(), CA.storage.load() || {});
  s.settings = Object.assign(defaults().settings, s.settings || {});
  const save = () => CA.storage.save(s);
  const pad = n => String(n).padStart(2, '0');
  const fmt = d => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  const today = () => fmt(new Date());
  function touchStreak() {
    const t = today(); if (s.streak.last === t) return;
    const y = new Date(); y.setDate(y.getDate() - 1);
    s.streak.count = s.streak.last === fmt(y) ? s.streak.count + 1 : 1;
    s.streak.last = t; save();
  }
  const total = () => CA.CHAPTERS.reduce((a, c) => a + c.l.length, 0);
  const ACH = [
    ['First Lesson', 'Complete any lesson', s => s.lessons.length >= 1, '♙'], ['First Puzzle', 'Solve a puzzle', s => s.puzzles.solved >= 1, '♘'],
    ['First Victory', 'Win a game', s => s.games.won >= 1, '♔'], ['Tactical Beginner', 'Solve 10 puzzles', s => s.puzzles.solved >= 10, '♗'],
    ['Opening Explorer', 'View all 8 openings', s => s.openingsViewed.length >= 8, '♖'], ['Checkmate Master', 'Deliver 5 checkmates', s => s.mates >= 5, '♕'],
    ['Seven-Day Streak', 'Study 7 days in a row', s => s.streak.count >= 7, '★']
  ];
  const dayNo = () => { const d = new Date(); return Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 864e5); };
  return {
    get: () => s, save, today, touchStreak, total,
    level: () => Math.floor(s.xp / XP_LEVEL) + 1,
    levelPct: () => Math.round((s.xp % XP_LEVEL) / XP_LEVEL * 100),
    overall: () => Math.round(s.lessons.length / total() * 100),
    accuracy: () => s.puzzles.attempts ? Math.round(s.puzzles.solved / s.puzzles.attempts * 100) : null,
    daily() { const c = CA.DAILY[dayNo() % CA.DAILY.length]; return { title: c[0], text: c[1], xp: 50, done: !!s.daily[today()] }; },
    achievements: () => ACH.map(a => ({ title: a[0], text: a[1], on: a[2](s), g: a[3] })),
    reset() { CA.storage.clear(); s = defaults(); touchStreak(); }
  };
})();