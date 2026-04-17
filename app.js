// ═══════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════
const CONFIG = {
  tomateCode: localStorage.getItem('tomate_code') || '0303',
  voiceEnabled: false
};

// ═══════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════
const STATE = {
  currentTab: 'circuit',
  currentStudio: 'music',
  chatHistory: [],
  convHistory: JSON.parse(localStorage.getItem('tomate_convs') || '[]'),
  grades: JSON.parse(localStorage.getItem('tomate_grades') || '[]'),
  moods: JSON.parse(localStorage.getItem('tomate_moods') || '[]'),
  currentMood: null,
  musicStyle: null,
  penActive: false,
  eraserActive: false,
  penColor: '#ff0000',
  penSize: 3,
  filter: 'none',
  stickers: [],
  draggingSticker: null,
  dragOffsetX: 0,
  dragOffsetY: 0,
  vaultUnlocked: false,
  pwdInput: '',
  timerInterval: null,
  timerSeconds: 0,
  recognition: null,
  isListening: false
};

// ═══════════════════════════════════════════
// CITATIONS MOTIVANTES
// ═══════════════════════════════════════════
const QUOTES = [
  { text: "Le succès, c'est se lever après être tombé, encore et encore !", author: 'Zélie Tomate #3' },
  { text: 'Chaque jour est une nouvelle course, donne tout sur le circuit !', author: 'Tomate' },
  { text: 'Tu es plus forte que tu ne le penses, plus courageuse que tu ne le crois !', author: 'Tomate #3' },
  { text: "La persévérance, c'est le carburant du champion !", author: 'Eli Tomac' },
  { text: "Aujourd'hui, tu vas faire des trucs incroyables, j'en suis sûr !", author: 'Tomate' },
  { text: "Un vrai pilote, c'est quelqu'un qui n'a jamais peur d'apprendre !", author: 'Tomate #3' },
  { text: 'Mets la nitro dans tes rêves et fonce ! 🚀', author: 'Tomate' }
];

// ═══════════════════════════════════════════
// RÉPONSES MOOD
// ═══════════════════════════════════════════
const MOOD_RESPONSES = {
  super: "WOUHOU Zélie est SUPER ! 🤩 On met la nitro aujourd'hui ! Holeshot ! 🏁💨",
  happy: 'Trop cool que tu sois joyeuse ! 😊 On va faire des trucs géniaux ensemble ! 🎉',
  ok: "OK c'est bien ! 😐 On va faire en sorte que ça devienne SUPER ! Allez Tomate ! 💪",
  tired: "Fatiguée ma championne ? 😴 Pas de souci, on y va cool aujourd'hui. Le repos fait aussi partie de l'entraînement ! 🛋️",
  sad: 'Oh non Zélie 😢 Viens ici, Tomate te fait un gros câlin virtuel ! 🍅❤️ Ça va aller mieux ensemble !'
};

// ═══════════════════════════════════════════
// NEWS DATA
// ═══════════════════════════════════════════
const NEWS_DATA = [
  { tag: 'SCIENCES', title: 'Découverte : les dinosaures avaient-ils des plumes colorées ?', img: 'https://images.unsplash.com/photo-1519999482648-25049578287c?w=400&h=250&fit=crop' },
  { tag: 'ANIMAUX',  title: 'Le dauphin qui utilise des éponges comme outil ! 🐬',           img: 'https://images.unsplash.com/photo-1607153333879-c174d265f1d8?w=400&h=250&fit=crop' },
  { tag: 'IA',       title: "Comment l'IA aide à protéger les océans 🌊",                    img: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop' },
  { tag: 'SCIENCES', title: 'Pourquoi la Lune change de forme ? 🌙',                         img: 'https://images.unsplash.com/photo-1522030299887-227c95b9c619?w=400&h=250&fit=crop' },
  { tag: 'ANIMAUX',  title: 'Le panda qui fait des records de naissance 🐼',                  img: 'https://images.unsplash.com/photo-1564349681325-222440673437?w=400&h=250&fit=crop' },
  { tag: 'IA',       title: 'Un robot qui dessine comme un artiste ! 🤖🎨',                   img: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop' }
];

// ═══════════════════════════════════════════
// CHAT RESPONSES
// ═══════════════════════════════════════════
const CHAT_RESPONSES = [
  { keywords: ['bonjour', 'salut', 'coucou', 'hey', 'hello'],          response: 'Holeshot Zélie ! 🏁 Prête pour une nouvelle aventure sur le circuit ? 💨' },
  { keywords: ['comment', 'ça va', 'ca va'],                            response: "Je suis une tomate de cross, je suis TOUJOURS au top ! 🍅🔥 Et toi, on met la nitro aujourd'hui ?" },
  { keywords: ['cross', 'moto', 'supercross', 'tomac'],                 response: "OUIII ! Le Supercross c'est ma vie ! 🏍️ Eli Tomac est mon héros ! Tu veux que je te raconte une course ?" },
  { keywords: ['école', 'devoirs', 'leçon', 'cours'],                   response: "Ah les devoirs ! C'est comme l'entraînement d'un pilote : faut être régulier ! 💪 Tu veux de l'aide sur quoi ?" },
  { keywords: ['musique', 'chanson', 'chanter'],                        response: 'Allons dans le Studio ! 🎨🎵 On va créer ta chanson ensemble ! Mode Suno activé !' },
  { keywords: ['photo', 'selfie', 'dessin'],                            response: "Le Studio Photo t'attend ! 📸 On va faire des trucs trop cool avec des stickers et des filtres !" },
  { keywords: ['note', 'examen', 'contrôle', 'dictée'],                 response: 'Le Podium est là pour ça ! 🏆 Donne-moi ta note et je te dis ta récompense ! Allez championne !' },
  { keywords: ['poki', 'jeu', 'jouer'],                                 response: 'Si ta note est > 95, tu as 30 min de Poki ! 🎮 Va dans le Podium pour checker ! ⏱️' },
  { keywords: ['papa', 'partager', 'whatsapp'],                         response: 'Clique sur le 💬 dans le header pour partager tes créations avec Papa ! Il va être fier ! 🍅❤️' },
  { keywords: ['triste', 'pas bien', 'mal'],                            response: 'Oh non ma championne 🍅❤️ Viens ici, câlin virtuel ! Ça va passer, je te le promets ! On fait quelque chose de fun ?' },
  { keywords: ['merci', 'thanks'],                                      response: "Mais c'est moi qui te remercie Zélie ! 🍅 T'es ma copilote préférée ! 🏁" },
  { keywords: ['blague', 'drôle', 'rire'],                              response: "Pourquoi la tomate est-elle devenue pilote de cross ? Parce qu'elle avait envie de ROULER ROUGE ! 🍅😂🏍️" }
];

function getTomateResponse(userMsg) {
  const msg = userMsg.toLowerCase();
  for (const item of CHAT_RESPONSES) {
    if (item.keywords.some(k => msg.includes(k))) return item.response;
  }
  const defaults = [
    `Hmmm, "${userMsg}"... Intéressant ! 🤔 En Supercross, faut toujours anticiper ! Dis-moi plus !`,
    `Ah ouais ! 🍅 Tomate est là pour toi ! Tu veux qu'on aille dans quel onglet ? Circuit, Paddock, Play, Studio ou Garage ?`,
    `Je t'écoute Zélie ! 💬 Tu peux me parler de l'école, de cross, de musique... Je suis ton copilote ! 🏁`,
    `Nitro activée ! 🚀 ${userMsg} ? C'est un super sujet ! On explore ça ensemble !`
  ];
  return defaults[Math.floor(Math.random() * defaults.length)];
}

// ═══════════════════════════════════════════
// GÉNÉRATEUR DE PAROLES
// ═══════════════════════════════════════════
function generateLyrics(style, idea) {
  const structures = {
    pop: {
      couplet: `[Couplet 1]
{idea_start}
Dans ce monde magique où tout est possible
On avance ensemble, main dans la main
Avec un sourire et le cœur joyeux

[Refrain]
🎵 ON MET LA NITRO, ON VA DE L'AVANT ! 🎵
🎵 COMME UNE TOMATE SUR LE CIRCUIT ! 🎵
RIEN NE NOUS ARRÊTE, ON EST LES CHAMPIONS
AVEZ-VOUS VU NOTRE PASSION ? 🎵

[Couplet 2]
Chaque jour est une nouvelle course
Chaque rêve est une ligne d'arrivée
On saute les obstacles comme des bosses de cross
Et on finit toujours par gagner

[Refrain]
🎵 ON MET LA NITRO, ON VA DE L'AVANT ! 🎵`
    },
    rock: {
      couplet: `[Couplet 1]
{idea_start}
Le moteur rugit, la terre vole sous les roues
On est là pour gagner, pas pour faire semblant
Casque sur la tête, dossard numéro 3
Prêts pour le holeshot, prêts à dominer !

[Refrain]
🎸 ROOOOCK ! ON DÉCHIRE LE CIRCUIT ! 🎸
🎸 TOMATE PILOTE, C'EST LA FOLIE ! 🎸
LES ROUES TOURNENT, LE CŒUR BAT LA CHARGE
ON EST LES PLUS FORTS, C'EST NOTRE CHARGE ! 🎸`
    },
    rap: {
      couplet: `[Couplet 1]
{idea_start}
Yo yo yo, écoute bien ça
C'est Tomate #3, la reine du cross
Sur la piste, je glisse, je vole
Les autres pilotes, ils me suivent, c'est drôle

[Refrain]
🎤 TOMATE SUR LE BEAT, ON EST AU SOMMET ! 🎤
🎤 ZÉLIE AU GUIDON, PERSONNE PEUT NOUS BATTRE ! 🎤
HOLESHOT, NITRO, ON EST LES BOSS !`
    },
    electro: {
      couplet: `[Intro] 🎹 Bzzzt bzzzt... drop !

[Couplet 1]
{idea_start}
Les néons s'allument sur la piste nocturne
Le bass drop arrive, l'adrénaline monte
On danse sur le rythme du moteur électrique
C'est la rave du Supercross !

[Refrain]
🎶 DROP ! TOMATE SUR LA PISTE ! 🎶
🎶 LES LEDS ROUGES, LES LEDS BLEUES ! 🎶`
    },
    disney: {
      couplet: `[Couplet 1]
{idea_start}
Il était une fois, dans un monde merveilleux
Une petite tomate aux rêves extraordinaires
Elle chaussait ses bottes, montait sur son cross
Et partait à l'aventure, courageuse et fière

[Refrain]
✨ ENVOLÉE SUR LE CIRCUIT MAGIQUE ✨
✨ AVEC ZÉLIE, TOUT EST POSSIBLE ✨
ON CROIT EN SES RÊVES, ON Y CROIT TRÈS FORT !`
    },
    reggaeton: {
      couplet: `[Intro] 🎵 Dale ! ¡Vamos! 🎵

[Couplet 1]
{idea_start}
La piste est chaude, le soleil brille
Zélie arrive avec sa famille
On bouge, on danse sur le cross
Le reggaeton du Supercross !

[Refrain]
💃 BAILA BAILA, TOMATE BAILA ! 💃
💃 ZÉLIE DANSE SUR LE CIRCUIT ! 💃
¡FUEGO! DANS LES ROUES, ¡CALOR! DANS LE CŒUR !`
    }
  };

  const template = structures[style] || structures.pop;
  return template.couplet.replace('{idea_start}', idea ? `Sur le thème : ${idea}` : 'Sur le circuit du Supercross');
}

// ═══════════════════════════════════════════
// SYSTÈME DE RÉCOMPENSES
// ═══════════════════════════════════════════
function getRewardForGrade(grade) {
  if (grade >= 99) return { level: 'gold',   text: '🎉 SOIRÉE TV + Bon Action 5€ + CONFETTIS !',                                                   emoji: '🥇🎊🎉' };
  if (grade >= 97) return { level: 'silver', text: '🎁 Bon virtuel "Action 3€"',                                                                   emoji: '🥈🎁'   };
  if (grade >= 95) return { level: 'bronze', text: '🎮 30 min Poki (avec timer) !',                                                                emoji: '🥉🎮'   };
  return           { level: 'none',   text: '💪 Continue tes efforts Zélie ! Tu peux y arriver ! La prochaine fois sera la bonne ! 🍅', emoji: '💪🍅'   };
}

// ═══════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════
function showToast(msg, duration = 3000) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}

const audioCache = new Map();

// Google Cloud TTS — service account (zelie-tomate project)
const GTTS_SA = {
  client_email: 'zelie-tomate@appspot.gserviceaccount.com',
  token_uri: 'https://oauth2.googleapis.com/token',
  private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCmn/V6ghgTXmq8\nVcKrejofKk3IYpoRJ0XhqiWQhtmzoL7rSpDq2Ec+VSEcmApyNOfwkLCSCiY3ZBzv\nwprgQsXHwMuqun6wWJUFGZXYyZ6L4aqCO5smC28JD2YTMTaSx64jFIolpvKkOCxQ\ny10hmMW0nOSd3fm1o7oUeZZ35cwC9rmAACbE859GG/ZxM2ZIAvKtVOyzhmn0p/L9\nzzJ0dHVUJvkyxpOXPJMdKWWUhnrUDuUGkRQJ6yzUZ2qa6oPGjJMVKV2oLrfotH92\ncrvu3BdD+8ERJakpyOHJw+39rEdzr4V8dC6lSBacNkXToKa61vWSEyGhJ/aTgEgV\nqR2u0iFzAgMBAAECggEAMHD+n/AkabUgWMKiBtJRBXB6DpDD88q0IUgjBaJ+th88\nghE6klvwUmnTZ4m4N72z1JdsDfkPZTkgxH+SITKoZ0tgqrDvVftaz5HBo7Xx9v7T\nYGtNzsCyNjMY3OmI0SFmOeKlyw5/Kkj+cTq+R58vkzOtr0uyZiFEXuF+YjsXlaCG\n5fUX8KHRn7isiR6rhOi9mcY1jKhYrtYRR+Ri8E9BFlfTN+D0cKV7R5hK07tOFDN3\ns/rfUkLskmfg2FuKuOPs6FiH+P+evfidcyJdqNJYANoG2n9xI3zTVRbG+dzBATQ1\n1e1XcPkyvFJZ4PjyOFXJ48Nc+mztL5nOyDzx3CRPYQKBgQDVBZsPVV4K1z01SKod\nz57xCNZxSvPf0iaEVNz1uyw9/w+zgUdxXcJDxYEQnMLRlckf6tjfzSQGNuyHFekO\nhCZzJ8vQOTL6GAfwCGNZ1Cr4SUGi6sjufkNUcZOQzBa2FMjanW7lnGexEgbVEK4r\nDTwitF+SWaWq42D516fHe6vXIwKBgQDIPfxfA6QdRgiT9jOUEWl+tpheiS75BXW6\nTmrlhuFbTnfROAfv1KdPC7jMjLrPJ0aeIyRch+INZ4cSb4QY4TFWKl+Tul2ucxl7\nX39qxKII1XtA9L0ElWEaJMRgWyVkCZrp4pegom4qew4TYCPDuCN+ZgxxkyETlbF/\n9J7Oxm9ZcQKBgBlUllCndQxS9dtNLbVnx92fkGheYkt+IMhhkvjBbgxdNQ/CUq1/\nWadXZ/aCvYPQjN73vRw3t43poAycJV9thWjyFYFIG/CzRNZdGPtIiGeHxn9J7eS2\nLOlwq/xu2FCEfjHIwLQa+hWLMDbLyfoik8EIs8iiUlnUueZbp37IDPIDAoGAeq/P\n4v8+HFl+g/mDHKOWeXay4Kk4yIaZ3S6SvFLp3KG1M9Eau80VPY83CMzo4Gd2EwoB\nC1iOHhxiW99LllrTebG4obC8GViYMkkOroIPrU3vmJra/OXxeq0wTMFLpYFlEwws\nTtV2njyLIT/0acR2qsknsqasy20aNgXRD2vxaWECgYEAynyyeRI94SMTav2aNEB2\nIMUPmsOYBWK1y2OLaFu1etyZdWvjn3iha/+1zlTkiE50bWjBE+Yk29/u3Xjw41SU\nJ2qsEAn/TNOZ0bcS+ffBWap2MnLt0zU5Nl7tCG4Tgw+Ce1beCImI3Xd+SJRP02AR\ndWi3Z6VX//hzl2m2wBUj078=\n-----END PRIVATE KEY-----\n'
};

let _gToken = null;
let _gTokenExp = 0;

async function getGoogleTTSToken() {
  const now = Math.floor(Date.now() / 1000);
  if (_gToken && now < _gTokenExp - 60) return _gToken;

  const b64url = obj => btoa(unescape(encodeURIComponent(JSON.stringify(obj))))
    .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

  const header  = { alg: 'RS256', typ: 'JWT' };
  const payload = {
    iss: GTTS_SA.client_email,
    scope: 'https://www.googleapis.com/auth/cloud-platform',
    aud: GTTS_SA.token_uri,
    iat: now,
    exp: now + 3600
  };

  const sigInput = `${b64url(header)}.${b64url(payload)}`;

  const pemBody = GTTS_SA.private_key.replace(/-----[^-]+-----/g, '').replace(/\s/g, '');
  const keyDer  = Uint8Array.from(atob(pemBody), c => c.charCodeAt(0));
  const cryptoKey = await crypto.subtle.importKey(
    'pkcs8', keyDer,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false, ['sign']
  );

  const sigBuf = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', cryptoKey, new TextEncoder().encode(sigInput));
  const sig    = btoa(String.fromCharCode(...new Uint8Array(sigBuf)))
    .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

  const jwt = `${sigInput}.${sig}`;

  const tokenRes = await fetch(GTTS_SA.token_uri, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`
  });

  const tokenData = await tokenRes.json();
  if (!tokenData.access_token) throw new Error('Token Google TTS invalide');
  _gToken    = tokenData.access_token;
  _gTokenExp = now + (tokenData.expires_in || 3600);
  return _gToken;
}

async function speak(text) {
  if (!text || !CONFIG.voiceEnabled) return;

  const btn = document.getElementById('voiceToggle');
  const originalBg = btn.style.background;
  btn.style.background = 'var(--yellow)';

  try {
    if (audioCache.has(text)) {
      const audio = new Audio(audioCache.get(text));
      audio.onended = () => { btn.style.background = originalBg; };
      await audio.play();
      return;
    }

    const token = await getGoogleTTSToken();
    const res = await fetch('https://texttospeech.googleapis.com/v1/text:synthesize', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        input: { text },
        voice: { languageCode: 'fr-FR', name: 'fr-FR-Wavenet-C' },
        audioConfig: { audioEncoding: 'MP3', speakingRate: 0.9, pitch: -1.0 }
      })
    });

    if (!res.ok) throw new Error(`Google TTS error: ${res.status}`);

    const { audioContent } = await res.json();
    const audioBlob = new Blob(
      [Uint8Array.from(atob(audioContent), c => c.charCodeAt(0))],
      { type: 'audio/mp3' }
    );
    const audioUrl = URL.createObjectURL(audioBlob);
    audioCache.set(text, audioUrl);

    const audio = new Audio(audioUrl);
    audio.onended = () => { btn.style.background = originalBg; };
    await audio.play();

  } catch (error) {
    console.error('Erreur Google TTS:', error);
    btn.style.background = originalBg;
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = 'fr-FR';
      utter.rate = 0.8;
      utter.pitch = 0.9;
      const voices = window.speechSynthesis.getVoices();
      const frVoice = voices.find(v => v.lang.startsWith('fr'));
      if (frVoice) utter.voice = frVoice;
      utter.onend = () => { btn.style.background = originalBg; };
      window.speechSynthesis.speak(utter);
    }
  }
}

function launchConfetti() {
  const container = document.getElementById('confettiContainer');
  const colors = ['#e53935', '#1e88e5', '#ffd54f', '#4caf50', '#ff6b9d', '#ff9800'];
  for (let i = 0; i < 80; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
    confetti.style.animationDelay = Math.random() * 2 + 's';
    confetti.style.width  = (Math.random() * 8 + 6) + 'px';
    confetti.style.height = (Math.random() * 8 + 6) + 'px';
    confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
    container.appendChild(confetti);
  }
  setTimeout(() => container.innerHTML = '', 5000);
}

function formatDate() {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const today = new Date().toLocaleDateString('fr-FR', options);
  return today.charAt(0).toUpperCase() + today.slice(1);
}

function getRandomQuote() {
  return QUOTES[Math.floor(Math.random() * QUOTES.length)];
}

// ═══════════════════════════════════════════
// MODE AUTO : PRÉPARATION (Jeu/Ven) vs ENTRAÎNEMENT
// ═══════════════════════════════════════════
function initModeAuto() {
  const day = new Date().getDay(); // 0=dim, 1=lun ... 4=jeu, 5=ven
  const modeLabel = document.getElementById('modeLabel');
  const modeTitle = document.getElementById('modeAutoTitle');
  const modeDesc  = document.getElementById('modeAutoDesc');

  if (day === 4 || day === 5) {
    modeLabel.textContent = '📋 Mode PRÉPARATION';
    modeLabel.style.color = 'var(--yellow)';
    modeTitle.textContent = '📋 Mode PRÉPARATION';
    modeTitle.style.color = 'var(--yellow)';
    modeDesc.textContent  = "C'est jeudi ou vendredi ! On révise, on prépare la dictée et les notes de la semaine. Allez Zélie ! 💪";
    document.getElementById('modeAutoCard').style.borderColor = 'var(--yellow)';
  } else {
    modeLabel.textContent = '🏁 Mode ENTRAÎNEMENT';
    modeLabel.style.color = 'var(--red-light)';
    modeTitle.textContent = '🏁 Mode ENTRAÎNEMENT';
    modeTitle.style.color = 'var(--red-light)';
    modeDesc.textContent  = "Mode circuit actif ! On s'entraîne, on crée, on explore. NITRO ACTIVÉE ! 🏍️🔥";
    document.getElementById('modeAutoCard').style.borderColor = 'var(--red)';
  }
}
initModeAuto();

// ═══════════════════════════════════════════
// NAVIGATION — ONGLETS PRINCIPAUX
// ═══════════════════════════════════════════
document.querySelectorAll('.nav-tab[data-tab]').forEach(tab => {
  tab.addEventListener('click', () => {
    const tabName = tab.dataset.tab;
    if (tabName !== 'circuit') saveConversation();
    document.querySelectorAll('.nav-tab[data-tab]').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('tab-' + tabName).classList.add('active');
    STATE.currentTab = tabName;
    if (tabName === 'circuit') loadNews();
    if (tabName === 'paddock') loadConvHistory();
  });
});

document.querySelectorAll('.nav-tab[data-studio]').forEach(tab => {
  tab.addEventListener('click', () => {
    const studioName = tab.dataset.studio;
    document.querySelectorAll('.nav-tab[data-studio]').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.studio-content').forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('studio-' + studioName).classList.add('active');
    STATE.currentStudio = studioName;
  });
});

// ═══════════════════════════════════════════
// DATE & QUOTE
// ═══════════════════════════════════════════
document.getElementById('dateDisplay').textContent = '📅 ' + formatDate();
const quote = getRandomQuote();
document.getElementById('quoteText').textContent   = '"' + quote.text + '"';
document.getElementById('quoteAuthor').textContent = '— ' + quote.author;

// ═══════════════════════════════════════════
// MOOD SELECTOR
// ═══════════════════════════════════════════
document.querySelectorAll('.mood-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const mood = btn.dataset.mood;
    STATE.currentMood = mood;
    document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const response = MOOD_RESPONSES[mood];
    addChatMessage(response, 'tomate');
    if (CONFIG.voiceEnabled) speak(response);
    STATE.moods.push({ mood, date: new Date().toISOString() });
    localStorage.setItem('tomate_moods', JSON.stringify(STATE.moods));
  });
});

// ═══════════════════════════════════════════
// NEWS
// ═══════════════════════════════════════════
function loadNews() {
  const scroll = document.getElementById('newsScroll');
  scroll.innerHTML = '';
  const shuffled = [...NEWS_DATA].sort(() => 0.5 - Math.random());
  shuffled.forEach(news => {
    const item = document.createElement('div');
    item.className = 'news-item';
    item.innerHTML =
      '<div class="news-img" style="background-image:url(' + news.img + ');background-size:cover;background-position:center;"></div>' +
      '<div class="news-body">' +
        '<div class="news-tag">'   + news.tag   + '</div>' +
        '<div class="news-title">' + news.title + '</div>' +
      '</div>';
    item.addEventListener('click', () => {
      window.open('https://wa.me/?text=' + encodeURIComponent(news.title), '_blank');
    });
    scroll.appendChild(item);
  });
}
loadNews();
document.getElementById('refreshNews').addEventListener('click', loadNews);

// ═══════════════════════════════════════════
// CHAT
// ═══════════════════════════════════════════
const chatMessages = document.getElementById('chatMessages');
const chatInput    = document.getElementById('chatInput');

function addChatMessage(content, type) {
  type = type || 'tomate';
  const msg = document.createElement('div');
  msg.className = 'msg msg-' + type;
  if (type === 'tomate') {
    msg.innerHTML = '<div class="tomate-msg-header">🍅 Tomate #3</div>' + content;
  } else {
    msg.textContent = content;
  }
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  STATE.chatHistory.push({ role: type === 'user' ? 'user' : 'tomate', content });
}

function sendChatMessage() {
  const msg = chatInput.value.trim();
  if (!msg) return;
  addChatMessage(msg, 'user');
  chatInput.value = '';
  const loading = document.createElement('div');
  loading.className = 'msg msg-tomate';
  loading.innerHTML = '<div class="spinner"></div> Tomate réfléchit...';
  chatMessages.appendChild(loading);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  setTimeout(() => {
    chatMessages.removeChild(loading);
    const response = getTomateResponse(msg);
    addChatMessage(response, 'tomate');
    if (CONFIG.voiceEnabled) speak(response);
  }, 800);
}

chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendChatMessage(); });
document.getElementById('chatSend').addEventListener('click', sendChatMessage);

addChatMessage("Holeshot Zélie ! 🏁 Je suis Tomate #3, ton copilote ! Qu'est-ce qu'on fait aujourd'hui ?", 'tomate');

// ═══════════════════════════════════════════
// VOICE RECOGNITION
// ═══════════════════════════════════════════
const voiceBtns = [document.getElementById('chatVoice')];
voiceBtns.forEach(btn => btn.addEventListener('click', toggleVoice));

function toggleVoice() {
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    showToast('🎤 La reconnaissance vocale n\'est pas disponible sur ce navigateur');
    return;
  }
  if (STATE.isListening) {
    STATE.recognition.stop();
    STATE.isListening = false;
    voiceBtns.forEach(b => b.classList.remove('listening'));
    return;
  }
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  STATE.recognition = new SpeechRecognition();
  STATE.recognition.lang = 'fr-FR';
  STATE.recognition.continuous = false;
  STATE.recognition.interimResults = false;
  STATE.recognition.onstart = () => {
    STATE.isListening = true;
    voiceBtns.forEach(b => b.classList.add('listening'));
  };
  STATE.recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    chatInput.value = transcript;
    sendChatMessage();
  };
  STATE.recognition.onend = () => {
    STATE.isListening = false;
    voiceBtns.forEach(b => b.classList.remove('listening'));
  };
  STATE.recognition.onerror = (event) => {
    STATE.isListening = false;
    voiceBtns.forEach(b => b.classList.remove('listening'));
    const msgs = {
      'not-allowed':      '🔒 Micro bloqué — autorise le micro dans ton navigateur !',
      'no-speech':        '🎤 Je n\'ai rien entendu. Parle plus fort et réessaie !',
      'network':          '🌐 Problème réseau. Réessaie dans quelques secondes.',
      'service-not-allowed': '⚠️ Reconnaissance vocale non autorisée sur ce navigateur.',
      'audio-capture':    '🎙️ Micro introuvable. Vérifie qu\'il est bien branché !'
    };
    showToast(msgs[event.error] || '🎤 Oups ! Réessaie en parlant clairement.');
  };
  STATE.recognition.start();
  showToast('🎤 Je t\'écoute Zélie ! Parle maintenant...');
}

document.getElementById('voiceToggle').addEventListener('click', () => {
  CONFIG.voiceEnabled = !CONFIG.voiceEnabled;
  document.getElementById('voiceToggle').style.background = CONFIG.voiceEnabled ? 'var(--green)' : '';
  showToast(CONFIG.voiceEnabled ? '🎤 Mode vocal ACTIVÉ !' : '🔇 Mode vocal désactivé');
});

// ═══════════════════════════════════════════
// WHATSAPP SHARE
// ═══════════════════════════════════════════
document.getElementById('whatsappShare').addEventListener('click', () => {
  const lastMsgs = STATE.chatHistory.slice(-5).map(m => (m.role === 'user' ? 'Zélie' : '🍅Tomate') + ': ' + m.content).join('\n\n');
  const text = '🍅 *TOMATE v1.3 - Supercross #3*\n\n' + lastMsgs + '\n\n— Partagé depuis l\'app de Zélie ! 🏁';
  if (navigator.share) {
    navigator.share({ title: 'Tomate v1.3', text }).catch(() => {});
  } else {
    window.open('https://wa.me/?text=' + encodeURIComponent(text), '_blank');
  }
});

// ═══════════════════════════════════════════
// PADDOCK - CONVERSATION HISTORY
// ═══════════════════════════════════════════
function loadConvHistory() {
  const container = document.getElementById('convHistory');
  if (STATE.convHistory.length === 0) {
    container.innerHTML = '<p style="color:var(--text-secondary);font-size:14px;">Pas encore de conversations. Commence à discuter dans l\'onglet Circuit ! 💬</p>';
    return;
  }
  container.innerHTML = '';
  STATE.convHistory.slice().reverse().forEach((conv, idx) => {
    const div = document.createElement('div');
    div.className = 'card';
    div.style.cssText = 'padding:14px;margin-bottom:8px;cursor:pointer;';
    div.innerHTML =
      '<div style="display:flex;justify-content:space-between;align-items:center;">' +
        '<div>' +
          '<div style="font-weight:800;">💬 ' + (conv.title || 'Conversation') + '</div>' +
          '<div style="font-size:12px;color:var(--text-secondary);">' + new Date(conv.date).toLocaleDateString('fr-FR') + ' · ' + (conv.messages ? conv.messages.length : 0) + ' messages</div>' +
        '</div>' +
        '<button class="btn btn-sm btn-outline delete-conv" data-idx="' + idx + '">🗑️</button>' +
      '</div>';
    div.addEventListener('click', (e) => {
      if (!e.target.classList.contains('delete-conv')) {
        if (conv.messages) {
          STATE.chatHistory = conv.messages;
          chatMessages.innerHTML = '';
          conv.messages.forEach(m => addChatMessage(m.content, m.role === 'user' ? 'user' : 'tomate'));
          showToast('💬 Conversation restaurée !');
        }
      }
    });
    div.querySelector('.delete-conv').addEventListener('click', (e) => {
      e.stopPropagation();
      STATE.convHistory.splice(STATE.convHistory.length - 1 - idx, 1);
      localStorage.setItem('tomate_convs', JSON.stringify(STATE.convHistory));
      loadConvHistory();
      showToast('🗑️ Conversation supprimée');
    });
    container.appendChild(div);
  });
}

document.getElementById('newConv').addEventListener('click', () => {
  STATE.chatHistory = [];
  chatMessages.innerHTML = '';
  addChatMessage('Nouvelle conversation ! 🆕 Holeshot Zélie, on repart de zéro ! 🏁', 'tomate');
  showToast('🆕 Nouvelle conversation créée !');
});

function saveConversation() {
  if (STATE.chatHistory.length === 0) return;
  const conv = {
    title: (STATE.chatHistory[0] && STATE.chatHistory[0].content ? STATE.chatHistory[0].content.slice(0, 50) : 'Conversation'),
    messages: STATE.chatHistory.slice(-50),
    date: new Date().toISOString()
  };
  STATE.convHistory.push(conv);
  if (STATE.convHistory.length > 20) STATE.convHistory = STATE.convHistory.slice(-20);
  localStorage.setItem('tomate_convs', JSON.stringify(STATE.convHistory));
}

// ═══════════════════════════════════════════
// PASSWORD VAULT — COFFRE-FORT
// ═══════════════════════════════════════════
const pwdOverlay = document.getElementById('pwdOverlay');
const pwdDots    = document.querySelectorAll('#pwdDots .pwd-dot');

function updatePwdDots() {
  pwdDots.forEach((dot, i) => dot.classList.toggle('filled', i < STATE.pwdInput.length));
}

document.querySelectorAll('.pwd-key').forEach(key => {
  key.addEventListener('click', () => {
    const k = key.dataset.key;
    if (k === 'clear') {
      STATE.pwdInput = STATE.pwdInput.slice(0, -1);
    } else if (k === 'ok') {
      if (STATE.pwdInput === CONFIG.tomateCode) {
        pwdOverlay.classList.remove('active');
        STATE.vaultUnlocked = true;
        document.getElementById('vaultContent').classList.remove('hidden');
        showToast('🔒 Coffre-fort débloqué !');
        loadSecretConvs();
      } else {
        showToast('❌ Code incorrect ! Réessaie !');
        STATE.pwdInput = '';
      }
    } else {
      if (STATE.pwdInput.length < 4) STATE.pwdInput += k;
    }
    updatePwdDots();
  });
});

document.getElementById('pwdCancel').addEventListener('click', () => {
  pwdOverlay.classList.remove('active');
  STATE.pwdInput = '';
  updatePwdDots();
});

document.getElementById('openVault').addEventListener('click', () => {
  if (STATE.vaultUnlocked) {
    document.getElementById('vaultContent').classList.toggle('hidden');
  } else {
    STATE.pwdInput = '';
    updatePwdDots();
    pwdOverlay.classList.add('active');
  }
});

function loadSecretConvs() {
  const container = document.getElementById('secretConvs');
  const secretConvs = JSON.parse(localStorage.getItem('tomate_secrets') || '[]');
  if (secretConvs.length === 0) {
    container.innerHTML = '<p style="color:var(--text-secondary);font-size:14px;">Pas de conversations secrètes ici pour le moment ! 🤫</p>';
    return;
  }
  container.innerHTML = secretConvs.map(c =>
    '<div style="padding:10px;border-bottom:1px solid rgba(255,255,255,0.1);font-size:13px;">💬 ' + c.title + ' <span style="color:var(--text-secondary);font-size:11px;">' + new Date(c.date).toLocaleDateString('fr-FR') + '</span></div>'
  ).join('');
}

// ═══════════════════════════════════════════
// PLAY — YOUTUBE
// ═══════════════════════════════════════════
function searchYouTube() {
  const query = document.getElementById('ytSearch').value.trim();
  if (!query) return;
  document.getElementById('ytPlayer').innerHTML =
    '<iframe src="https://www.youtube.com/embed?listType=search&list=' + encodeURIComponent(query) + '" allowfullscreen allow="autoplay; encrypted-media"></iframe>';
  showToast('🎬 Recherche: ' + query);
}

document.getElementById('ytSearchBtn').addEventListener('click', searchYouTube);
document.getElementById('ytSearch').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') searchYouTube();
});

// ═══════════════════════════════════════════
// STUDIO — MUSIQUE
// ═══════════════════════════════════════════
document.querySelectorAll('.music-style-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.music-style-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    STATE.musicStyle = btn.dataset.style;
    showToast('🎵 Style ' + STATE.musicStyle.toUpperCase() + ' sélectionné !');
  });
});

document.getElementById('generateMusic').addEventListener('click', () => {
  if (!STATE.musicStyle) { showToast('🎵 Choisis un style de musique d\'abord !'); return; }
  const idea    = document.getElementById('musicIdea').value.trim();
  const loading = document.getElementById('musicLoading');
  const result  = document.getElementById('musicResult');
  loading.classList.remove('hidden');
  result.classList.add('hidden');

  setTimeout(() => {
    loading.classList.add('hidden');
    result.classList.remove('hidden');
    const lyrics = generateLyrics(STATE.musicStyle, idea);
    document.getElementById('lyricsDisplay').innerHTML = lyrics
      .replace(/\[Couplet/g, '<span class="couplet">[Couplet')
      .replace(/\[Refrain\]/g, '<span class="refrain">[Refrain]</span>')
      .replace(/\[Intro\]/g, '<span class="couplet">[Intro]</span>')
      .replace(/\[Solo\]/g, '<span class="couplet">[Solo]</span>')
      .replace(/\[Break\]/g, '<span class="couplet">[Break]</span>')
      .replace(/\n/g, '<br>');
    showToast('✨ Ta chanson est prête, Zélie ! 🎶');
  }, 1200);
});

document.getElementById('playMusic').addEventListener('click', () => {
  if (!STATE.musicStyle) { showToast('🎵 Génère d\'abord des paroles !'); return; }
  const actx   = new (window.AudioContext || window.webkitAudioContext)();
  const tempos = { pop: 120, rock: 140, rap: 90, electro: 128, disney: 100, reggaeton: 95 };
  const bpm    = tempos[STATE.musicStyle] || 120;
  const beatDuration = 60 / bpm;

  function playNote(freq, startTime, duration, type) {
    const osc  = actx.createOscillator();
    const gain = actx.createGain();
    osc.type = type || 'sine';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.3, startTime);
    gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
    osc.connect(gain);
    gain.connect(actx.destination);
    osc.start(startTime);
    osc.stop(startTime + duration);
  }

  const melodies = {
    pop:       [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25],
    rock:      [196.00, 220.00, 246.94, 261.63, 293.66, 329.63, 349.23, 392.00],
    rap:       [130.81, 146.83, 164.81, 174.61, 196.00, 220.00, 246.94],
    electro:   [261.63, 311.13, 349.23, 415.30, 466.16, 523.25, 622.25],
    disney:    [329.63, 293.66, 261.63, 293.66, 329.63, 329.63, 329.63, 0],
    reggaeton: [196.00, 220.00, 246.94, 261.63, 246.94, 220.00, 196.00, 0]
  };
  const melody = melodies[STATE.musicStyle] || melodies.pop;
  const t0 = actx.currentTime;
  for (let i = 0; i < 16; i++) {
    const note = melody[i % melody.length];
    if (note > 0) playNote(note, t0 + i * beatDuration, beatDuration * 0.8, 'sine');
    playNote(60, t0 + i * beatDuration, beatDuration * 0.3, 'square');
  }
  showToast('🎵 Musique en cours ! Style: ' + STATE.musicStyle.toUpperCase());
});

document.getElementById('singLyrics').addEventListener('click', () => {
  speak(document.getElementById('lyricsDisplay').textContent);
  showToast('🎤 Tomate chante tes paroles !');
});

document.getElementById('shareMusic').addEventListener('click', () => {
  const lyrics = document.getElementById('lyricsDisplay').textContent;
  window.open('https://wa.me/?text=' + encodeURIComponent('🎵 *Ma chanson Tomate v1.3* 🍅\n\nStyle: ' + STATE.musicStyle + '\n\n' + lyrics), '_blank');
});

function searchMusic() {
  const query = document.getElementById('musicSearch').value.trim();
  if (!query) return;
  document.getElementById('musicResults').innerHTML =
    '<div class="iframe-container mt-16"><iframe src="https://www.youtube.com/embed?listType=search&list=' + encodeURIComponent(query + ' music') + '" allowfullscreen allow="autoplay"></iframe></div>' +
    '<div class="mt-8"><a href="https://www.youtube.com/results?search_query=' + encodeURIComponent(query + ' music') + '" target="_blank" class="btn btn-block">Voir plus de résultats sur YouTube</a></div>';
}

document.getElementById('musicSearchBtn').addEventListener('click', searchMusic);
document.getElementById('musicSearch').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') searchMusic();
});

// ═══════════════════════════════════════════
// STUDIO - PHOTO CREATION
// FIX TACTILE : PointerEvents pour dessin + stickers déplaçables
// FIX GOMME   : globalCompositeOperation = 'destination-out'
// ═══════════════════════════════════════════
const photoCanvas = document.getElementById('photoCanvas');
const photoCtx    = photoCanvas.getContext('2d');
let photoImage    = null;
let isDrawing     = false;
let lastX = 0, lastY = 0;
let selectedSticker = null;

function getCanvasCoords(canvas, e) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: (e.clientX - rect.left) * (canvas.width  / rect.width),
    y: (e.clientY - rect.top)  * (canvas.height / rect.height)
  };
}

function drawInitMsg(ctx, canvas, msg) {
  ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = '#1a1a2e';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = '20px Nunito';
  ctx.fillStyle = '#a0a8c0';
  ctx.textAlign = 'center';
  ctx.fillText(msg, canvas.width / 2, canvas.height / 2);
}

drawInitMsg(photoCtx, photoCanvas, '📸 Prends une photo ou importes-en une !');

function redrawStickers() {
  photoCtx.globalCompositeOperation = 'source-over';
  photoCtx.font = '48px serif';
  photoCtx.textAlign = 'center';
  STATE.stickers.forEach(s => photoCtx.fillText(s.emoji, s.x, s.y));
}

function hitTestSticker(x, y) {
  for (let i = STATE.stickers.length - 1; i >= 0; i--) {
    const s = STATE.stickers[i];
    if (Math.abs(x - s.x) < 30 && Math.abs(y - s.y) < 30) return i;
  }
  return -1;
}

photoCanvas.addEventListener('pointerdown', (e) => {
  e.preventDefault();
  photoCanvas.setPointerCapture(e.pointerId);
  const { x, y } = getCanvasCoords(photoCanvas, e);

  const hit = hitTestSticker(x, y);
  if (hit !== -1 && !STATE.penActive && !STATE.eraserActive) {
    STATE.draggingSticker = hit;
    STATE.dragOffsetX = x - STATE.stickers[hit].x;
    STATE.dragOffsetY = y - STATE.stickers[hit].y;
    return;
  }

  if (selectedSticker && !STATE.penActive && !STATE.eraserActive) {
    STATE.stickers.push({ emoji: selectedSticker, x, y });
    if (photoImage) { photoCtx.putImageData(photoImage, 0, 0); applyFilter(); }
    redrawStickers();
    selectedSticker = null;
    showToast('🎭 Sticker posé ! Glisse-le pour le déplacer.');
    return;
  }

  if (STATE.penActive || STATE.eraserActive) {
    isDrawing = true;
    lastX = x;
    lastY = y;
  }
});

photoCanvas.addEventListener('pointermove', (e) => {
  e.preventDefault();
  const { x, y } = getCanvasCoords(photoCanvas, e);

  if (STATE.draggingSticker !== null) {
    STATE.stickers[STATE.draggingSticker].x = x - STATE.dragOffsetX;
    STATE.stickers[STATE.draggingSticker].y = y - STATE.dragOffsetY;
    if (photoImage) { photoCtx.putImageData(photoImage, 0, 0); applyFilter(); }
    else { drawInitMsg(photoCtx, photoCanvas, '📸 Canvas'); }
    redrawStickers();
    return;
  }

  if (!isDrawing) return;

  if (STATE.eraserActive) {
    photoCtx.globalCompositeOperation = 'destination-out';
    photoCtx.lineWidth = 30;
    photoCtx.strokeStyle = 'rgba(0,0,0,1)';
  } else {
    photoCtx.globalCompositeOperation = 'source-over';
    photoCtx.strokeStyle = STATE.penColor;
    photoCtx.lineWidth   = STATE.penSize;
  }
  photoCtx.lineCap  = 'round';
  photoCtx.lineJoin = 'round';
  photoCtx.beginPath();
  photoCtx.moveTo(lastX, lastY);
  photoCtx.lineTo(x, y);
  photoCtx.stroke();
  photoCtx.globalCompositeOperation = 'source-over';
  lastX = x;
  lastY = y;
});

photoCanvas.addEventListener('pointerup',     () => { isDrawing = false; STATE.draggingSticker = null; });
photoCanvas.addEventListener('pointercancel', () => { isDrawing = false; STATE.draggingSticker = null; });

document.getElementById('startCamera').addEventListener('click', async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
    const video  = document.getElementById('cameraFeed');
    video.srcObject = stream;
    video.style.display   = 'block';
    photoCanvas.style.display = 'none';
    showToast('📷 Caméra activée !');
  } catch (e) {
    showToast('📷 Impossible d\'accéder à la caméra');
  }
});

document.getElementById('takePhoto').addEventListener('click', () => {
  const video = document.getElementById('cameraFeed');
  if (video.srcObject) {
    photoCanvas.width  = video.videoWidth;
    photoCanvas.height = video.videoHeight;
    photoCtx.drawImage(video, 0, 0);
    video.srcObject.getTracks().forEach(t => t.stop());
    video.style.display       = 'none';
    photoCanvas.style.display = 'block';
    photoImage = photoCtx.getImageData(0, 0, photoCanvas.width, photoCanvas.height);
    showToast('📸 Photo prise !');
  } else {
    showToast('⚠️ Active d\'abord la caméra !');
  }
});

document.getElementById('uploadPhoto').addEventListener('click', () => document.getElementById('photoUploadInput').click());

document.getElementById('photoUploadInput').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    const img = new Image();
    img.onload = () => {
      photoCanvas.width  = img.width;
      photoCanvas.height = img.height;
      photoCtx.drawImage(img, 0, 0);
      photoImage = photoCtx.getImageData(0, 0, photoCanvas.width, photoCanvas.height);
      showToast('📁 Photo importée !');
    };
    img.src = ev.target.result;
  };
  reader.readAsDataURL(file);
});

document.getElementById('clearCanvas').addEventListener('click', () => {
  photoCtx.globalCompositeOperation = 'source-over';
  drawInitMsg(photoCtx, photoCanvas, '📸 Canvas effacé !');
  photoImage = null;
  STATE.stickers = [];
});

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    STATE.filter = btn.dataset.filter;
    applyFilter();
  });
});

function applyFilter() {
  if (!photoImage) return;
  photoCtx.putImageData(photoImage, 0, 0);
  const imageData = photoCtx.getImageData(0, 0, photoCanvas.width, photoCanvas.height);
  const data = imageData.data;
  switch (STATE.filter) {
    case 'grayscale':
      for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i+1] + data[i+2]) / 3;
        data[i] = data[i+1] = data[i+2] = avg;
      }
      break;
    case 'sepia':
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i], g = data[i+1], b = data[i+2];
        data[i]   = Math.min(255, r * 0.393 + g * 0.769 + b * 0.189);
        data[i+1] = Math.min(255, r * 0.349 + g * 0.686 + b * 0.168);
        data[i+2] = Math.min(255, r * 0.272 + g * 0.534 + b * 0.131);
      }
      break;
    case 'invert':
      for (let i = 0; i < data.length; i += 4) {
        data[i]   = 255 - data[i];
        data[i+1] = 255 - data[i+1];
        data[i+2] = 255 - data[i+2];
      }
      break;
    case 'brightness':
      for (let i = 0; i < data.length; i += 4) {
        data[i]   = Math.min(255, data[i]   + 40);
        data[i+1] = Math.min(255, data[i+1] + 40);
        data[i+2] = Math.min(255, data[i+2] + 40);
      }
      break;
    case 'contrast':
      for (let i = 0; i < data.length; i += 4) {
        data[i]   = Math.min(255, Math.max(0, 1.5 * (data[i]   - 128) + 128));
        data[i+1] = Math.min(255, Math.max(0, 1.5 * (data[i+1] - 128) + 128));
        data[i+2] = Math.min(255, Math.max(0, 1.5 * (data[i+2] - 128) + 128));
      }
      break;
    case 'blur':
      // Simple box blur 3×3
      const w = photoCanvas.width, h = photoCanvas.height;
      const src = new Uint8ClampedArray(data);
      for (let y2 = 1; y2 < h - 1; y2++) {
        for (let x2 = 1; x2 < w - 1; x2++) {
          for (let c = 0; c < 3; c++) {
            let sum = 0;
            for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) sum += src[((y2 + dy) * w + (x2 + dx)) * 4 + c];
            data[(y2 * w + x2) * 4 + c] = sum / 9;
          }
        }
      }
      break;
    case 'cross':
      for (let i = 0; i < data.length; i += 4) {
        if (i % 8 < 4) { data[i]   = Math.min(255, data[i]   + 60); }
        else            { data[i+2] = Math.min(255, data[i+2] + 60); }
      }
      break;
  }
  photoCtx.putImageData(imageData, 0, 0);
  redrawStickers();
}

document.querySelectorAll('.sticker-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    selectedSticker = btn.dataset.sticker;
    STATE.penActive = false;
    STATE.eraserActive = false;
    document.getElementById('penToggle').textContent = '✏️ Stylo OFF';
    document.getElementById('penToggle').style.background = '';
    showToast('🎭 ' + selectedSticker + ' — Appuie sur la photo pour poser, glisse pour déplacer !');
  });
});

document.getElementById('penColor').addEventListener('change', (e) => { STATE.penColor = e.target.value; });
document.getElementById('penSize').addEventListener('input', (e) => {
  STATE.penSize = parseInt(e.target.value);
  document.getElementById('penSizeLabel').textContent = STATE.penSize + 'px';
});

document.getElementById('penToggle').addEventListener('click', () => {
  STATE.penActive = !STATE.penActive;
  STATE.eraserActive = false;
  const eraserBtn = document.getElementById('photoEraserToggle');
  if (eraserBtn) { eraserBtn.textContent = '🧹 Gomme OFF'; eraserBtn.style.background = ''; }
  const btn = document.getElementById('penToggle');
  btn.textContent      = STATE.penActive ? '✏️ Stylo ON' : '✏️ Stylo OFF';
  btn.style.background = STATE.penActive ? 'var(--blue)' : '';
});

document.getElementById('photoEraserToggle').addEventListener('click', () => {
  STATE.eraserActive = !STATE.eraserActive;
  STATE.penActive = false;
  const penBtn = document.getElementById('penToggle');
  const btn    = document.getElementById('photoEraserToggle');
  penBtn.textContent      = '✏️ Stylo OFF';
  penBtn.style.background = '';
  btn.textContent      = STATE.eraserActive ? '🧹 Gomme ON' : '🧹 Gomme OFF';
  btn.style.background = STATE.eraserActive ? 'var(--red)' : '';
});

document.getElementById('exportPhoto').addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'tomate-photo-' + Date.now() + '.png';
  link.href = photoCanvas.toDataURL('image/png');
  link.click();
  showToast('📥 Photo sauvegardée !');
});

// ═══════════════════════════════════════════
// GARAGE — TENDANCES & RECHERCHE WEB
// ═══════════════════════════════════════════
document.querySelectorAll('.trend-card').forEach(card => {
  card.addEventListener('click', () => {
    window.open('https://www.google.com/search?q=' + encodeURIComponent(card.dataset.search), '_blank');
  });
});

document.getElementById('webSearchBtn').addEventListener('click', () => {
  const query = document.getElementById('webSearch').value.trim();
  if (!query) return;
  window.open('https://www.google.com/search?q=' + encodeURIComponent(query), '_blank');
});

document.getElementById('webSearch').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') document.getElementById('webSearchBtn').click();
});

// ═══════════════════════════════════════════
// PODIUM - DICTÉE AU STYLET
// FIX GOMME   : destination-out
// FIX TACTILE : PointerEvents
// ═══════════════════════════════════════════
const dicteeCanvas = document.getElementById('dicteeCanvas');
const dicteeCtx    = dicteeCanvas.getContext('2d');
let dicteeDrawing  = false;
let dicteeLastX = 0, dicteeLastY = 0;

drawInitMsg(dicteeCtx, dicteeCanvas, '✏️ Zone d\'écriture...');

document.getElementById('scanWords').addEventListener('click', () => document.getElementById('ocrInput').click());

document.getElementById('ocrInput').addEventListener('change', (e) => {
  if (!e.target.files[0]) return;
  const words = ['champion', 'circuit', 'tomate', 'supercross', 'holeshot', 'nitro', 'victoire'];
  const dicteeWords = words.sort(() => 0.5 - Math.random()).slice(0, 5);
  displayDicteeWords(dicteeWords);
  document.getElementById('dicteeArea').classList.remove('hidden');
  showToast('📷 Mots scannés ! À toi de les écrire !');
});

document.getElementById('startDictee').addEventListener('click', () => {
  const dicteeWords = ['champion', 'victoire', 'circuit', 'tomate', 'supercross'];
  displayDicteeWords(dicteeWords);
  document.getElementById('dicteeArea').classList.remove('hidden');
  showToast('✏️ Dictée commencée ! Écris les mots avec ton stylet !');
});

function displayDicteeWords(words) {
  document.getElementById('dicteeWords').innerHTML = words.map((w, i) =>
    '<span class="badge badge-blue" style="font-size:14px;padding:8px 12px;">' + (i + 1) + '. ' + w + '</span>'
  ).join('');
  document.getElementById('dicteeWords').dataset.words = JSON.stringify(words);
}

dicteeCanvas.addEventListener('pointerdown', (e) => {
  e.preventDefault();
  dicteeCanvas.setPointerCapture(e.pointerId);
  const { x, y } = getCanvasCoords(dicteeCanvas, e);
  dicteeDrawing = true;
  dicteeLastX = x;
  dicteeLastY = y;
});

dicteeCanvas.addEventListener('pointermove', (e) => {
  e.preventDefault();
  if (!dicteeDrawing) return;
  const { x, y } = getCanvasCoords(dicteeCanvas, e);
  const eraserBtn    = document.getElementById('dicteeEraser');
  const eraserActive = eraserBtn && eraserBtn.classList.contains('active');

  if (eraserActive) {
    dicteeCtx.globalCompositeOperation = 'destination-out';
    dicteeCtx.lineWidth   = 20;
    dicteeCtx.strokeStyle = 'rgba(0,0,0,1)';
  } else {
    dicteeCtx.globalCompositeOperation = 'source-over';
    dicteeCtx.strokeStyle = '#1e88e5';
    dicteeCtx.lineWidth   = 3;
  }
  dicteeCtx.lineCap  = 'round';
  dicteeCtx.lineJoin = 'round';
  dicteeCtx.beginPath();
  dicteeCtx.moveTo(dicteeLastX, dicteeLastY);
  dicteeCtx.lineTo(x, y);
  dicteeCtx.stroke();
  dicteeCtx.globalCompositeOperation = 'source-over';
  dicteeLastX = x;
  dicteeLastY = y;
});

dicteeCanvas.addEventListener('pointerup',     () => { dicteeDrawing = false; });
dicteeCanvas.addEventListener('pointercancel', () => { dicteeDrawing = false; });

document.getElementById('dicteePenToggle').addEventListener('click', () => {
  const eraserBtn = document.getElementById('dicteeEraser');
  eraserBtn.classList.remove('active');
  eraserBtn.style.background = '';
  showToast('✏️ Stylet activé !');
});

document.getElementById('dicteeEraser').addEventListener('click', () => {
  const btn = document.getElementById('dicteeEraser');
  btn.classList.toggle('active');
  btn.style.background = btn.classList.contains('active') ? 'var(--red)' : '';
  showToast(btn.classList.contains('active') ? '🧹 Gomme activée !' : '✏️ Stylet activé !');
});

document.getElementById('dicteeClear').addEventListener('click', () => {
  drawInitMsg(dicteeCtx, dicteeCanvas, '✏️ Zone d\'écriture...');
});

document.getElementById('dicteeCheck').addEventListener('click', () => {
  const wordsData = document.getElementById('dicteeWords').dataset.words;
  if (!wordsData) { showToast('⚠️ Lance d\'abord une dictée !'); return; }
  const words = JSON.parse(wordsData);
  document.getElementById('dicteeResult').innerHTML =
    '<div class="card" style="background:var(--surface);">' +
      '<div class="card-title green">🍅 Correction de Tomate</div>' +
      '<p style="margin-bottom:12px;">Vérifie chaque mot !</p>' +
      words.map(w =>
        '<div style="padding:6px;border-bottom:1px solid rgba(255,255,255,0.1);"><strong>' + w + '</strong> <span style="color:var(--text-secondary);font-size:12px;">→ Vérifie bien chaque lettre !</span></div>'
      ).join('') +
      '<p class="mt-8" style="font-weight:700;color:var(--yellow);">💡 Astuce : N\'oublie pas les accents et les lettres muettes !</p>' +
    '</div>';
  showToast('✅ Dictée vérifiée ! Tu fais des progrès ! 💪');
});

// ═══════════════════════════════════════════
// PODIUM — SYSTÈME DE NOTES
// ═══════════════════════════════════════════
document.getElementById('submitGrade').addEventListener('click', () => {
  const val   = document.getElementById('gradeInput').value.trim();
  const grade = parseFloat(val);
  if (isNaN(grade) || grade < 0 || grade > 100) {
    showToast('⚠️ Entre une note entre 0 et 100 !');
    return;
  }

  STATE.grades.push({ grade, date: new Date().toISOString() });
  localStorage.setItem('tomate_grades', JSON.stringify(STATE.grades));

  const reward = getRewardForGrade(grade);
  document.getElementById('podiumCard').style.display = 'block';
  document.getElementById('rewardDisplay').innerHTML =
    '<div style="font-size:24px;margin-bottom:12px;">'                          + reward.emoji + '</div>' +
    '<div style="color:var(--yellow);font-weight:800;font-size:22px;">'         + grade        + '%</div>' +
    '<div class="mt-8" style="font-size:18px;color:var(--text);">'              + reward.text  + '</div>';

  if (grade >= 99) {
    launchConfetti();
    speak('FÉLICITATIONS ZÉLIE ! ' + grade + ' pourcent ! Tu es la championne absolue ! Soirée TV, Bon Action cinq euros, et des confettis !');
  } else if (grade >= 97) {
    speak('Bravo Zélie ! ' + grade + ' pourcent ! Bon Action trois euros !');
  } else if (grade >= 95) {
    speak('Super Zélie ! ' + grade + ' pourcent ! Trente minutes de Poki !');
    startPokiTimer();
  } else {
    speak('Courage Zélie ! ' + grade + ' pourcent. La prochaine fois sera la bonne !');
  }

  loadGradesHistory();
});

function startPokiTimer() {
  document.getElementById('pokiTimer').classList.remove('hidden');
  STATE.timerSeconds = 30 * 60;
  clearInterval(STATE.timerInterval);
  STATE.timerInterval = setInterval(() => {
    STATE.timerSeconds--;
    const mins = Math.floor(STATE.timerSeconds / 60);
    const secs = STATE.timerSeconds % 60;
    document.getElementById('timerDisplay').textContent =
      String(mins).padStart(2, '0') + ':' + String(secs).padStart(2, '0');
    if (STATE.timerSeconds <= 0) {
      clearInterval(STATE.timerInterval);
      showToast('⏱️ Temps Poki terminé !');
      speak('Le temps Poki est terminé ! Reviens à tes devoirs championne !');
    }
  }, 1000);
}

function loadGradesHistory() {
  const container = document.getElementById('gradesHistory');
  if (!container) return;
  if (STATE.grades.length === 0) {
    container.innerHTML = '<p style="color:var(--text-secondary);font-size:14px;">Pas encore de notes.</p>';
    return;
  }
  container.innerHTML = STATE.grades.slice().reverse().map(g => {
    const reward = getRewardForGrade(g.grade);
    const color  = g.grade >= 97 ? 'var(--green)' : g.grade >= 80 ? 'var(--yellow)' : 'var(--red)';
    return '<div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.1);">' +
      '<div><strong style="color:' + color + ';font-size:20px;">' + g.grade + '%</strong>' +
      '<span style="font-size:12px;color:var(--text-secondary);margin-left:8px;">' + new Date(g.date).toLocaleDateString('fr-FR') + '</span></div>' +
      '<span style="font-size:20px;">' + reward.emoji + '</span></div>';
  }).join('');
}

loadGradesHistory();

// ═══════════════════════════════════════════
// INIT FINALE
// ═══════════════════════════════════════════
if ('speechSynthesis' in window) {
  window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
}

console.log('🍅 TOMATE v1.3 — Chargé !');
console.log('Fixes appliqués : Gomme destination-out | Voix maman pitch 0.9 rate 0.8 | PointerEvents iPad | Cycle Auto Jeu/Ven');
