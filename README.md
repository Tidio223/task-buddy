# 📋 Gestionnaire de Tâches

Une application web moderne et intuitive pour organiser et suivre vos tâches efficacement.

![React](https://img.shields.io/badge/React-18.3-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC)

## 🎯 Aperçu

Cette application de gestion des tâches permet aux utilisateurs de créer, organiser et suivre leurs tâches quotidiennes avec une interface claire et responsive.

## ✨ Fonctionnalités

### Gestion des tâches
- ✅ **Créer** une nouvelle tâche avec titre, description, priorité et date d'échéance
- ✏️ **Modifier** les tâches existantes
- 🗑️ **Supprimer** des tâches avec confirmation
- ☑️ **Marquer comme terminée** en un clic

### Organisation
- 🔍 **Recherche** par titre ou description
- 🏷️ **Filtrer** par statut (En attente, En cours, Terminée)
- ⚡ **Filtrer** par priorité (Basse, Moyenne, Haute)
- ↕️ **Trier** par date de création, échéance, priorité ou statut

### Tableau de bord
- 📊 Statistiques en temps réel (total, terminées, en cours, en retard)
- ⚠️ Indicateur visuel pour les tâches en retard

## 🛠️ Technologies utilisées

| Technologie | Usage |
|-------------|-------|
| **React 18** | Framework UI |
| **TypeScript** | Typage statique |
| **Tailwind CSS** | Styles utilitaires |
| **shadcn/ui** | Composants UI |
| **React Hook Form** | Gestion des formulaires |
| **Zod** | Validation des données |
| **date-fns** | Manipulation des dates |
| **Lucide React** | Icônes |

## 📁 Structure du projet

```
src/
├── components/
│   ├── tasks/
│   │   ├── TaskCard.tsx          # Carte d'affichage d'une tâche
│   │   ├── TaskFilters.tsx       # Barre de filtres et recherche
│   │   ├── TaskForm.tsx          # Formulaire création/édition
│   │   ├── TaskStats.tsx         # Statistiques du tableau de bord
│   │   └── DeleteConfirmDialog.tsx # Dialog de confirmation
│   └── ui/                       # Composants shadcn/ui
├── hooks/
│   └── useTasks.ts               # Hook de gestion des tâches
├── types/
│   └── task.ts                   # Types TypeScript
└── pages/
    └── Index.tsx                 # Page principale
```

## 🚀 Installation

```bash
# Cloner le projet
git clone <repository-url>

# Installer les dépendances
npm install

# Lancer en développement
npm run dev
```

## 📖 Utilisation

1. **Créer une tâche** : Cliquez sur "Nouvelle tâche" et remplissez le formulaire
2. **Modifier** : Cliquez sur l'icône crayon sur une tâche
3. **Terminer** : Cochez la case à gauche de la tâche
4. **Supprimer** : Cliquez sur l'icône poubelle (confirmation requise)
5. **Filtrer** : Utilisez les menus déroulants pour affiner l'affichage
6. **Rechercher** : Tapez dans la barre de recherche

## 🎨 Design

- Interface épurée et moderne
- Responsive (mobile, tablette, desktop)
- Indicateurs visuels de priorité et statut
- Animations fluides

---

# 📋 Spécification du Projet

## 1. Vue d'ensemble

**Nom** : Gestionnaire de Tâches  
**Type** : Application Web SPA (Single Page Application)  
**Objectif** : Permettre aux utilisateurs de gérer leurs tâches quotidiennes de manière simple et efficace

## 2. Modèle de données

### Entité Task

| Champ | Type | Description |
|-------|------|-------------|
| `id` | string | Identifiant unique (généré automatiquement) |
| `title` | string | Titre de la tâche (1-100 caractères) |
| `description` | string | Description détaillée (0-500 caractères) |
| `priority` | enum | Priorité : `low`, `medium`, `high` |
| `status` | enum | Statut : `pending`, `in_progress`, `completed` |
| `dueDate` | Date \| null | Date d'échéance optionnelle |
| `createdAt` | Date | Date de création |
| `completedAt` | Date \| null | Date de complétion |

## 3. Fonctionnalités détaillées

### 3.1 CRUD Tâches

| Action | Description |
|--------|-------------|
| **Create** | Formulaire avec validation (titre requis, limites de caractères) |
| **Read** | Liste de cartes avec informations complètes |
| **Update** | Modification via le même formulaire en mode édition |
| **Delete** | Suppression avec dialog de confirmation |

### 3.2 Filtrage

- **Par statut** : Tous / En attente / En cours / Terminées
- **Par priorité** : Toutes / Basse / Moyenne / Haute
- **Par recherche** : Texte libre sur titre et description

### 3.3 Tri

- **Champs** : Date de création, Date d'échéance, Priorité, Statut
- **Ordres** : Croissant / Décroissant

### 3.4 Statistiques

- Nombre total de tâches
- Tâches terminées
- Tâches en cours
- Tâches en retard (échéance dépassée + non terminée)

## 4. Interface utilisateur

### Composants principaux

1. **Header** : Titre + bouton "Nouvelle tâche"
2. **TaskStats** : 4 cartes de statistiques
3. **TaskFilters** : Barre de recherche + filtres + tri
4. **TaskList** : Grille de TaskCards
5. **TaskForm** : Dialog modal pour création/édition
6. **DeleteConfirmDialog** : Confirmation avant suppression

### Responsive Design

| Breakpoint | Comportement |
|------------|--------------|
| Mobile (<640px) | Filtres empilés, cartes pleine largeur |
| Tablette (640-1024px) | Filtres en ligne, 2 colonnes stats |
| Desktop (>1024px) | Layout complet, 4 colonnes stats |

## 5. Architecture technique

```
┌─────────────────────────────────────────┐
│              Index.tsx                  │
│         (Orchestration)                 │
├─────────────────────────────────────────┤
│  useTasks Hook                          │
│  - State management                     │
│  - CRUD operations                      │
│  - Filtering & Sorting logic            │
├─────────────────────────────────────────┤
│  UI Components                          │
│  TaskCard │ TaskFilters │ TaskForm      │
│  TaskStats │ DeleteConfirmDialog        │
├─────────────────────────────────────────┤
│  shadcn/ui Components                   │
│  Card, Button, Dialog, Form, etc.       │
└─────────────────────────────────────────┘
```

## 6. Évolutions futures

| Priorité | Fonctionnalité |
|----------|----------------|
| Haute | Persistance localStorage |
| Haute | Mode sombre/clair |
| Moyenne | Catégories personnalisées |
| Moyenne | Notifications de rappel |
| Basse | Backend + authentification |
| Basse | Collaboration multi-utilisateurs |

---

## How can I edit this code?

**Use Lovable** - Simply visit the Lovable Project and start prompting.

**Use your preferred IDE** - Clone this repo and push changes.

```sh
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
npm i
npm run dev
```

## How can I deploy this project?

Open Lovable and click on Share -> Publish.

## 📄 Licence

MIT License - Libre d'utilisation et de modification.
