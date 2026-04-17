# 🍅 Tomate App — RECAP v1.4

## C'est quoi ?
Application compagnon pour **Zélie (9 ans)**, thème Supercross/Motocross.  
Interface full dark mode, 6 onglets, 0 dépendances npm — HTML/CSS/JS pur.

## Fonctionnalités

| Onglet | Contenu |
|--------|---------|
| 🏁 CIRCUIT | Humeur du jour, citations moto, chat IA Tomate, carrousel news |
| 🏗️ PADDOCK | Historique conversations, coffre secret (code 0303) |
| ▶️ PLAY | Lecteur YouTube Kids intégré |
| 🎨 STUDIO | Créateur de chansons (6 styles) + éditeur photo avec filtres & stickers |
| 🏎️ GARAGE | Sujets tendance + recherche web libre |
| 🏆 PODIUM | Dictée notée avec récompenses (carte cadeau, soirée TV, confettis) |

## Voix — Google Cloud TTS Wavenet (v1.4)

- **Moteur** : Google Cloud Text-to-Speech, voix `fr-FR-Wavenet-C`
- **Auth** : Service account JWT signé côté client via Web Crypto API (RSASSA-PKCS1-v1_5 / SHA-256)
- **Token** : Auto-renouvelé toutes les 55 min, mis en cache en mémoire
- **Audio** : MP3, speakingRate 0.9, pitch -1.0 (voix douce et posée)
- **Cache** : Map en mémoire — chaque phrase n'est générée qu'une fois par session
- **Fallback** : Web Speech API (fr-FR) si erreur réseau

## Stack technique

```
HTML5 / CSS3 / JavaScript ES6+ (Vanilla)
Google Cloud TTS Wavenet — fr-FR-Wavenet-C
Web Crypto API — JWT RS256 côté client
Web Audio API — synthétiseur musical
MediaDevices API — accès caméra
Canvas API — dessin + photo editing
Web Speech API — reconnaissance vocale (fr-FR) + fallback TTS
localStorage — persistance (humeurs, notes, historique, code coffre)
```

## Déploiement

- **URL live** : https://zelie-tomate.surge.sh
- **Outil** : Surge.sh (static hosting)
- **Commande** : `npx surge . zelie-tomate.surge.sh`

## GitHub

- **Repo** : https://github.com/benito2223-ux/zelie-tomate
- **Branch** : main

## Changelog

### v1.4 — Google TTS Wavenet
- Remplacement de OpenRouter (openai/tts-1) par Google Cloud TTS Wavenet
- Implémentation JWT service account dans le navigateur (Web Crypto)
- Voix fr-FR-Wavenet-C : ton naturel, chaleureux, adapté aux enfants
- Cache token OAuth2 pour éviter les appels répétés

### v1.3
- Fix eraser (destination-out composite)
- Voix "maman" : pitch 0.9, rate 0.8
- Support iPad tactile (PointerEvents)
- Mode automatique Prép/Entraînement selon le jour

### v1.2
- Studio musical avec synthétiseur Web Audio
- Éditeur photo avec 8 filtres et 16 stickers emoji
- Système de récompenses Podium

### v1.1
- Coffre secret avec code PIN
- Chat IA Tomate (12 catégories de réponses)
- Carrousel news (Sciences, Animaux, IA)

### v1.0
- App de base avec 6 onglets
- Thème Supercross dark mode
