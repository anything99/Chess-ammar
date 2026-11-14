window.CA = window.CA || {};
CA.PIECES = [
  { g: '♔', n: 'King', t: 'One square in any direction' }, { g: '♕', n: 'Queen', t: 'Any distance, any straight line' },
  { g: '♖', n: 'Rook', t: 'Straight along ranks and files' }, { g: '♗', n: 'Bishop', t: 'Diagonals only' },
  { g: '♘', n: 'Knight', t: 'An L-shape, jumps over pieces' }, { g: '♙', n: 'Pawn', t: 'Forward, captures diagonally' }
];
CA.CHAPTERS = [
  { n: 'The Basics', l: ['Chessboard orientation', 'The 64 squares', 'The six pieces', 'Piece movement', 'Capturing', 'Check', 'Checkmate', 'Stalemate', 'Draw conditions'] },
  { n: 'First Strategies', l: ['Controlling the center', 'Developing pieces', 'Protecting pieces', 'King safety', 'Connecting rooks', 'Avoiding unnecessary moves'] },
  { n: 'Tactical Thinking', l: ['Forks', 'Pins', 'Skewers', 'Discovered attacks', 'Double attacks', 'Removing the defender', 'Deflection', 'Back-rank tactics'] },
  { n: 'Openings', l: ['Opening principles', 'Italian Game', 'Ruy Lopez', 'London System', "Queen's Gambit", 'Basic opening traps'] },
  { n: 'Middlegame', l: ['Planning', 'Piece activity', 'Pawn structure', 'Weak squares', 'Attacking the king', 'Positional understanding'] },
  { n: 'Endgames', l: ['King and pawn endings', 'Opposition', 'Rook endings', 'Basic checkmate patterns', 'King and queen vs king', 'King and rook vs king'] }
];
CA.OPENINGS = [['Italian Game', 'Open game'], ['Ruy Lopez', 'Open game'], ['Sicilian Defense', 'Semi-open'], ['French Defense', 'Semi-open'], ['Caro-Kann Defense', 'Semi-open'], ["Queen's Gambit", 'Closed game'], ['London System', 'System opening'], ["King's Indian Defense", 'Indian defense']];
CA.ENDGAMES = [['King and queen vs king', 'Checkmate'], ['King and rook vs king', 'Checkmate'], ['King and pawn vs king', 'Pawn ending'], ['Opposition', 'King technique'], ['Pawn promotion', 'Pawn ending'], ['Basic rook endings', 'Rook ending'], ['Checkmate patterns', 'Checkmate']];
CA.TRAIN = { puzzles: ['Mate in one', 'Mate in two', 'Find the best move', 'Win material', 'Save your piece', 'Defend your king'], concepts: ['Fork', 'Pin', 'Skewer', 'Discovered attack', 'Double check', 'Deflection'], levels: ['Beginner', 'Intermediate', 'Advanced', 'Expert'] };
CA.MODES = [['Play against AI', 'Five difficulty levels'], ['Two-player local', 'Share one device'], ['Practice mode', 'Undo any move'], ['Custom position', 'Start from a FEN']];
CA.AI = ['Beginner', 'Easy', 'Medium', 'Hard', 'Expert'];
CA.DAILY = [
  ['Mate in one: the back rank', 'Find the single move that ends the game.'],
  ['Win a piece with a fork', 'One knight move attacks two pieces at once.'],
  ['Escape the pin', 'Your piece is pinned. Find the way out.'],
  ['Save the attacked bishop', 'Two pieces are in danger. Choose the right one.'],
  ['Mate in two', 'A quiet move first, then checkmate.'],
  ['Remove the defender', 'Take the piece that guards the king.'],
  ['Defend against the threat', 'Spot the opponent’s plan before it lands.']
];