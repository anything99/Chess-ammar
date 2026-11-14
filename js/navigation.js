window.CA = window.CA || {};
CA.icons = {
  home: '<path d="M3 11l9-8 9 8v10H3z"/><path d="M9 21v-7h6v7"/>',
  learn: '<path d="M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2z"/><path d="M4 19V5M9 8h6"/>',
  training: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3"/>',
  play: '<path d="M8 4l12 8-12 8z"/>',
  progress: '<path d="M4 20V11M10 20V4M16 20v-6M22 20H2"/>',
  profile: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/>',
  settings: '<circle cx="12" cy="12" r="3.2"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2"/>'
};
CA.icon = n => '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true">' + CA.icons[n] + '</svg>';
CA.NAV = [['home', 'Home'], ['learn', 'Learn'], ['training', 'Training'], ['play', 'Play'], ['progress', 'Progress'], ['profile', 'Profile']];
CA.navigation = {
  build() {
    const mk = () => CA.NAV.map(n => `<a href="#/${n[0]}" data-r="${n[0]}">${CA.icon(n[0])}<span>${n[1]}</span></a>`).join('');
    document.getElementById('sidenav').innerHTML = mk();
    document.getElementById('bottomnav').innerHTML = mk();
    document.getElementById('settingsBtn').innerHTML = CA.icon('settings');
  },
  parent: { openings: 'learn', endgames: 'learn', analysis: 'play', settings: '' },
  mark(route) {
    const tab = route in this.parent ? this.parent[route] : route;
    document.querySelectorAll('[data-r]').forEach(a => a.dataset.r === tab ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current'));
  },
  route() { const r = (location.hash.replace(/^#\/?/, '') || 'home'); return r; }
};