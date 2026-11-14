window.CA = window.CA || {};
CA.storage = (function () {
  const KEY = 'chessAcademy.v1';
  return {
    load() { try { const r = localStorage.getItem(KEY); return r ? JSON.parse(r) : null; } catch (e) { return null; } },
    save(d) { try { localStorage.setItem(KEY, JSON.stringify(d)); return true; } catch (e) { return false; } },
    clear() { try { localStorage.removeItem(KEY); } catch (e) {} }
  };
})();