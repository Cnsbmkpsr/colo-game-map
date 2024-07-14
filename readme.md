# Map colo 3D

## Description

Une map 3D représentant un terrain virtuel, composé de tuiles colorables et troupes posables / déplacables. Les troupes disposent aussi d'un système de combat basique, basé sur le poule / renard / vipère ou le niveau technologique.

## Problématique / Objectifs

Contraintes : 
- Affichage efficace d'une map avec beaucoup de tuiles / troupes => utilisation de THREE.js / 3D GPU
- Contrôles simples et intuitifs => controles caméra 3D implémenté par THREE.js
- Système de combat simple et efficace => poule renard vipère
- Système de déplacement simple et efficace => déplacement par clic sur la map
- Identification simple et efficace des troupes et tuiles possédés par les factions => couleur des tuiles et troupes + formes uniques et intuitives des troupes
- Affichage responsive et en temps réelle => Utilisation des snapshots de firestore
- Temps extrêmement limité => utilisation de firebase pour le stockage des données (Pas besoin de faire un back puisque Firebase = BaaS) et de R3F (React Three Fiber) pour le rendu 3D (pas besoin de faire un moteur 3D from scratch).
- Déploiement rapide en cas de problème => déploiement vercel en une ligne de commande

## Architecture

```
.
├── public/
│   └── imgs/ => Icons, images, videos, ...
├── src/
│   ├── assets/
│   │   ├── css/
│   │   └── js/
│   ├── features/
│   │   ├── game/ => Fonctionnalités spécifiques rangés
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   ├── utils/
│   │   │   ├── store.ts / nameStore.ts
│   │   │   └── types.ts
│   │   ├── movie/
│   │   └── [...]/
│   ├── shared/ => Ressources globales à toutes les features
│   │   ├── components/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── store.ts / nameStore.ts
│   │   └── types.ts
│   ├── router.ts
│   └── index.ts => React base
└── .env
```