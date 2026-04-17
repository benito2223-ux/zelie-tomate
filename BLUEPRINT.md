# 🍅 Tomate App — BLUEPRINT

## Architecture

```
zelie-tomate/
├── index.html        — Structure HTML5, 6 onglets + modaux
├── style.css         — Design system dark mode (Supercross rouge/bleu)
├── app.js            — Logique complète (~1300 lignes), Vanilla JS
├── RECAP.md          — Documentation et changelog
└── BLUEPRINT.md      — Ce fichier
```

## Flux de données

```
localStorage ──► STATE (mémoire runtime)
                    │
          ┌─────────┼─────────┐
          ▼         ▼         ▼
      Chat IA    Podium    Humeurs
      (20 max)  (notes)   (historique)
```

## Module Voix — Google Cloud TTS

```
speak(text)
    │
    ├── audioCache.has(text) → play from cache
    │
    └── getGoogleTTSToken()
            │
            ├── Token valide en cache → return
            │
            └── Générer JWT (Web Crypto, RS256)
                    │
                    └── POST /oauth2/token
                            │
                            └── Bearer token → POST /v1/text:synthesize
                                    │
                                    └── base64 MP3 → Blob → AudioURL → play()
                                                │
                                                └── Fallback Web Speech API si erreur
```

## Onglets & Composants

### 🏁 CIRCUIT (tab-home)
- `updateMode()` — badge PRÉPARATION (jeu/ven) ou ENTRAÎNEMENT
- `QUOTES[]` — 8 citations moto aléatoires
- `MOOD_RESPONSES{}` — 5 humeurs → réponses IA + speak()
- `NEWS_TOPICS[]` — carrousel Unsplash (3 catégories)
- `getBotResponse(text)` — 12 patterns regex → réponses Tomate

### 🏗️ PADDOCK (tab-paddock)
- `loadConversations()` / `saveConversation()` — localStorage max 20
- `checkCode(pin)` — coffre secret, PIN 4 chiffres (défaut 0303)

### ▶️ PLAY (tab-play)
- `searchYoutube(q)` — embed `youtube.com/embed/` + recherche

### 🎨 STUDIO (tab-studio)

**Music Creator**
- `SONG_STYLES[]` — Pop/Rock/Rap/Electro/Disney/Reggaeton
- `LYRICS_TEMPLATES{}` — modèles par style
- `playSong()` — Web Audio API, oscillateurs, BPM-based
- `singLyrics()` — iterate phrases → speak()

**Photo Creator**
- Canvas 800×600
- `applyFilter(name)` — 8 filtres CSS + getImageData
- `STICKERS[]` — 16 emojis draggables (PointerEvents)
- Dessin : PointerEvents, destination-out pour la gomme
- `exportPhoto()` — canvas.toDataURL → download PNG

### 🏎️ GARAGE (tab-garage)
- `TRENDING_TOPICS[]` — 6 sujets → window.open Google
- `searchWeb(q)` — window.open Google

### 🏆 PODIUM (tab-podium)

**Dictée**
- Canvas handwriting (PointerEvents)
- `clearDictee()` — reset canvas

**Système de récompenses**
```
note >= 99% → Or   → TV + 5€ + confettis
note >= 97% → Ar   → 3€ carte cadeau
note >= 95% → Br   → 30min Poki
note <  95% → Encouragement + speak()
```
- `launchConfetti()` — 80 particules CSS animées
- `startPokiTimer(30)` — countdown + alerte speak()

## Design System

```css
--red:    #e53935   /* primaire */
--blue:   #1e88e5   /* secondaire */
--yellow: #ffd54f   /* accent / état actif voix */
--bg:     #0a0e1a   /* fond principal */
--card:   #131a2e   /* fond carte */

Font: Fredoka One (titres) / Nunito (corps)
Radius: 12px (cards), 50% (boutons ronds)
```

## APIs externes

| Service | Usage | Auth |
|---------|-------|------|
| Google Cloud TTS | Synthèse vocale fr-FR Wavenet | Service Account JWT |
| YouTube Embed | Lecteur vidéo | Aucune |
| Unsplash | Images news | URL publique |
| WhatsApp Web | Partage paroles | URL scheme |
| Google Search | Garage & recherche | URL publique |

## Points d'extension futurs

- [ ] Notifications push (Service Worker)
- [ ] Thèmes saisonniers (Noël, été)
- [ ] Multi-enfants / profils
- [ ] Sync cloud (Supabase)
- [ ] Mode hors-ligne (PWA / cache manifest)
