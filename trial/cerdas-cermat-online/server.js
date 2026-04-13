const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const multer = require('multer');
const XLSX = require('xlsx');
const path = require('path');
const os = require('os');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

const upload = multer({ storage: multer.memoryStorage() });

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// ════════════════════════════════════════
// STATE
// ════════════════════════════════════════
const state = {
  teams: [],
  scores: {},
  round: 'wajib',
  questions: { wajib: [], lemparan: [], cepat: [] },
  currentQuestion: null,
  currentQuestionIndex: -1,
  timerRunning: false,
  timeLeft: 15,
  buzzerLocked: true,     // bel terkunci sampai juri buka
  buzzerWinner: null,      // tim yang pencet bel duluan
  activeTeam: null,        // tim yang sedang giliran
  turnLocked: false,       // giliran terkunci (menunggu benar/salah)
  showAnswer: false,
  phase: 'rules',          // rules | envelopes | question
  openedEnvelopes: [],
  scoreHistory: [],
};

const RULES_DATA = {
  wajib:    { time: 15, badge: 'BABAK WAJIB' },
  lemparan: { time: 10, badge: 'BABAK LEMPARAN' },
  cepat:    { time: 10, badge: 'ADU CEPAT' },
};

let timerInterval = null;

// ════════════════════════════════════════
// HELPERS
// ════════════════════════════════════════
function broadcastState() {
  io.emit('state:update', getPublicState());
}

function getPublicState() {
  return {
    teams: state.teams,
    scores: state.scores,
    round: state.round,
    currentQuestion: state.currentQuestion,
    currentQuestionIndex: state.currentQuestionIndex,
    timerRunning: state.timerRunning,
    timeLeft: state.timeLeft,
    buzzerLocked: state.buzzerLocked,
    buzzerWinner: state.buzzerWinner,
    activeTeam: state.activeTeam,
    turnLocked: state.turnLocked,
    showAnswer: state.showAnswer,
    phase: state.phase,
    questionCount: state.questions[state.round]?.length || 0,
    openedEnvelopes: state.openedEnvelopes,
    scoreHistory: state.scoreHistory.slice(0, 15),
    roundBadge: RULES_DATA[state.round]?.badge || '',
  };
}

function stopTimer() {
  if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
  state.timerRunning = false;
}

function startTimer() {
  stopTimer();
  state.timeLeft = RULES_DATA[state.round]?.time || 15;
  state.timerRunning = true;
  broadcastState();

  timerInterval = setInterval(() => {
    state.timeLeft--;
    if (state.timeLeft <= 0) {
      state.timeLeft = 0;
      stopTimer();
      io.emit('timer:end');
    }
    broadcastState();
  }, 1000);
}

// ════════════════════════════════════════
// ROUTES
// ════════════════════════════════════════
app.get('/', (req, res) => res.redirect('/juri'));
app.get('/juri', (req, res) => res.sendFile(path.join(__dirname, 'public', 'juri.html')));
app.get('/peserta', (req, res) => res.sendFile(path.join(__dirname, 'public', 'peserta.html')));
app.get('/tampilan', (req, res) => res.sendFile(path.join(__dirname, 'public', 'tampilan.html')));

// Health check (untuk Render & UptimeRobot)
app.get('/health', (req, res) => res.json({ status: 'ok', uptime: process.uptime() }));

// Upload Excel
app.post('/upload', upload.single('file'), (req, res) => {
  try {
    const wb = XLSX.read(req.file.buffer, { type: 'buffer' });
    state.questions = { wajib: [], lemparan: [], cepat: [] };

    const sheetMap = {
      'wajib': 'wajib', 'babak wajib': 'wajib', 'sheet1': 'wajib',
      'lemparan': 'lemparan', 'babak lemparan': 'lemparan', 'sheet2': 'lemparan',
      'cepat': 'cepat', 'adu cepat': 'cepat', 'babak cepat': 'cepat', 'sheet3': 'cepat',
    };

    wb.SheetNames.forEach((name, idx) => {
      const key = sheetMap[name.toLowerCase().trim()];
      const target = key || (idx === 0 ? 'wajib' : idx === 1 ? 'lemparan' : 'cepat');
      const rows = XLSX.utils.sheet_to_json(wb.Sheets[name], { header: 1 });
      for (let i = 1; i < rows.length; i++) {
        const q = rows[i][0] ? String(rows[i][0]).trim() : '';
        const a = rows[i][1] ? String(rows[i][1]).trim() : '';
        if (q) state.questions[target].push({ q, a });
      }
    });

    const total = state.questions.wajib.length + state.questions.lemparan.length + state.questions.cepat.length;
    state.openedEnvelopes = new Array(state.questions[state.round].length).fill(false);

    broadcastState();
    res.json({ ok: true, wajib: state.questions.wajib.length, lemparan: state.questions.lemparan.length, cepat: state.questions.cepat.length, total });
  } catch (e) {
    res.status(400).json({ ok: false, error: e.message });
  }
});

// ════════════════════════════════════════
// SOCKET.IO
// ════════════════════════════════════════
io.on('connection', (socket) => {
  console.log(`✓ Terhubung: ${socket.id} (${socket.handshake.query.role || 'unknown'})`);

  // Kirim state terbaru ke client yang baru connect
  socket.emit('state:update', getPublicState());

  // ── JURI: Setup teams ──
  socket.on('juri:setTeams', (teams) => {
    state.teams = teams;
    state.scores = {};
    teams.forEach(t => { state.scores[t.id] = 0; });
    state.scoreHistory = [];
    broadcastState();
  });

  // ── JURI: Ganti babak ──
  socket.on('juri:changeRound', (round) => {
    stopTimer();
    state.round = round;
    state.currentQuestion = null;
    state.currentQuestionIndex = -1;
    state.buzzerLocked = true;
    state.buzzerWinner = null;
    state.activeTeam = null;
    state.turnLocked = false;
    state.showAnswer = false;
    state.phase = 'rules';
    state.openedEnvelopes = new Array(state.questions[round]?.length || 0).fill(false);
    broadcastState();
  });

  // ── JURI: Mulai (dari rules ke envelopes) ──
  socket.on('juri:startRound', () => {
    state.phase = 'envelopes';
    broadcastState();
  });

  // ── JURI: Buka amplop (pilih soal) ──
  socket.on('juri:openEnvelope', (index) => {
    const qs = state.questions[state.round];
    if (index < 0 || index >= qs.length) return;
    state.openedEnvelopes[index] = true;
    state.currentQuestion = qs[index];
    state.currentQuestionIndex = index;
    state.showAnswer = false;
    state.buzzerLocked = true;
    state.buzzerWinner = null;
    state.turnLocked = false;
    state.phase = 'question';
    stopTimer();
    state.timeLeft = RULES_DATA[state.round]?.time || 15;
    broadcastState();
  });

  // ── JURI: Kembali ke amplop ──
  socket.on('juri:backToEnvelopes', () => {
    stopTimer();
    state.phase = 'envelopes';
    state.currentQuestion = null;
    state.showAnswer = false;
    state.buzzerLocked = true;
    state.buzzerWinner = null;
    state.turnLocked = false;
    broadcastState();
  });

  // ── JURI: Start timer ──
  socket.on('juri:startTimer', () => {
    startTimer();
  });

  // ── JURI: Stop timer ──
  socket.on('juri:stopTimer', () => {
    stopTimer();
    broadcastState();
  });

  // ── JURI: Reset timer ──
  socket.on('juri:resetTimer', () => {
    stopTimer();
    state.timeLeft = RULES_DATA[state.round]?.time || 15;
    broadcastState();
  });

  // ── JURI: Tampilkan jawaban ──
  socket.on('juri:toggleAnswer', () => {
    state.showAnswer = !state.showAnswer;
    broadcastState();
  });

  // ── JURI: Set giliran tim ──
  socket.on('juri:setActiveTeam', (teamId) => {
    state.activeTeam = teamId;
    state.turnLocked = true;
    state.buzzerWinner = null;
    broadcastState();
    io.emit('turn:set', { teamId, teamName: state.teams.find(t => t.id === teamId)?.name || teamId });
  });

  // ── JURI: Buka bel (untuk adu cepat) ──
  socket.on('juri:openBuzzer', () => {
    state.buzzerLocked = false;
    state.buzzerWinner = null;
    broadcastState();
    io.emit('buzzer:open');
  });

  // ── JURI: Kunci bel ──
  socket.on('juri:lockBuzzer', () => {
    state.buzzerLocked = true;
    broadcastState();
  });

  // ── JURI: Beri skor ──
  socket.on('juri:addScore', ({ teamId, delta, label }) => {
    if (!state.scores.hasOwnProperty(teamId)) return;
    const before = state.scores[teamId];
    state.scores[teamId] += delta;
    const after = state.scores[teamId];

    const teamName = state.teams.find(t => t.id === teamId)?.name || teamId;
    state.scoreHistory.unshift({ teamId, teamName, delta, before, after, label, ts: Date.now() });
    if (state.scoreHistory.length > 30) state.scoreHistory.pop();

    // Setelah dinilai, buka kunci giliran
    state.turnLocked = false;
    state.buzzerWinner = null;
    state.activeTeam = null;

    broadcastState();
    io.emit('score:added', { teamId, teamName, delta, after });
  });

  // ── JURI: Lewati (tidak ada yang benar) ──
  socket.on('juri:skip', () => {
    state.turnLocked = false;
    state.buzzerWinner = null;
    state.activeTeam = null;
    broadcastState();
  });

  // ── JURI: Undo skor ──
  socket.on('juri:undoScore', (index) => {
    const entry = state.scoreHistory[index];
    if (!entry) return;
    if (state.scores.hasOwnProperty(entry.teamId)) {
      state.scores[entry.teamId] = entry.before;
    }
    state.scoreHistory.splice(index, 1);
    broadcastState();
  });

  // ── PESERTA: Pencet bel ──
  socket.on('peserta:buzzer', ({ teamId }) => {
    // Abaikan kalau bel terkunci atau sudah ada pemenang
    if (state.buzzerLocked || state.buzzerWinner) return;

    state.buzzerWinner = teamId;
    state.buzzerLocked = true;
    state.activeTeam = teamId;
    state.turnLocked = true;

    // Stop timer
    stopTimer();

    const teamName = state.teams.find(t => t.id === teamId)?.name || teamId;
    console.log(`🔔 BEL: ${teamName} (${teamId})`);

    broadcastState();
    io.emit('buzzer:winner', { teamId, teamName, timestamp: Date.now() });
  });

  socket.on('disconnect', () => {
    console.log(`✗ Terputus: ${socket.id}`);
  });
});

// ════════════════════════════════════════
// START
// ════════════════════════════════════════
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log('');
  console.log('╔══════════════════════════════════════════════════╗');
  console.log('║     🏆  CERDAS CERMAT ONLINE  🏆               ║');
  console.log('║     Sistem Pertandingan Jarak Jauh              ║');
  console.log('╠══════════════════════════════════════════════════╣');
  console.log(`║  Server berjalan di port ${PORT}                    ║`);
  console.log('╠══════════════════════════════════════════════════╣');

  const nets = os.networkInterfaces();
  const ips = [];
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) ips.push(net.address);
    }
  }

  console.log('║  Alamat akses:                                  ║');
  console.log(`║  Lokal   : http://localhost:${PORT}                 ║`);
  ips.forEach(ip => {
    const url = `http://${ip}:${PORT}`;
    console.log(`║  Jaringan: ${url.padEnd(37)}║`);
  });
  console.log('╠══════════════════════════════════════════════════╣');
  console.log(`║  🎓 Juri     : http://localhost:${PORT}/juri         ║`);
  console.log(`║  📱 Peserta  : http://[IP]:${PORT}/peserta           ║`);
  console.log(`║  📺 Tampilan : http://[IP]:${PORT}/tampilan          ║`);
  console.log('╠══════════════════════════════════════════════════╣');
  console.log('║  Peserta konek via WiFi yang sama,              ║');
  console.log('║  atau pakai ngrok untuk akses internet.         ║');
  console.log('╚══════════════════════════════════════════════════╝');
  console.log('');
});
