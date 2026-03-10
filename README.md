<div align="center">

# Aether Maps

<img
  src="https://raw.githubusercontent.com/lguibr/aether-maps/main/public/logo.png"
  alt="screenshot"
  width="400"
/>

**High-Performance, Deterministic, Infinite Procedural Voxel World Generation for TypeScript & React**

[![Version](https://img.shields.io/badge/version-3.5.0-blue.svg?style=for-the-badge)](https://github.com/lguibr/AetherEngine)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

[Overview](#-overview) • [Features](#-key-features) • [Installation](#-installation) • [Usage](#-usage) • [Architecture](#-architecture)

</div>

---

## 📖 Overview

**Aether Maps** (formerly Daicer Map Engine) is a framework-agnostic procedural generation ecosystem meticulously engineered for RPGs, strategy games, and intense dungeon crawlers. Built with a sophisticated multi-layer voxel topology, deterministic structural generation, and a high-performance Canvas 2D rendering pipeline.

This engine does not generate simple heightmaps. Aether produces **gameplay-ready, tactically dense environments**:

- **7 Vertical Z-Layers**: Plunge into deep bedrock caverns (`z: -3`) and ascend to floating sky fortresses (`z: +3`).
- **Coherent Civilizations**: Procedurally woven Cities, Castles, Towers, and Dungeons organically connected by intelligent road networks.
- **Fog of War**: Deep, baked-in recursive shadowcasting designed and optimized for pure exploration.
- **Physics & Navigation**: Zero-configuration A* Pathfinding across chunks.

---

## ✨ Key Features

### 🌍 Infinite World Generation
- **Chunk-based Architecture**: Endless scrolling along the X/Y axes utilizing optimized 32x32 partitions.
- **Strict Determinism**: Powered by `Alea` and `FastNoise`. The exact same seed *always* materializes the exact same universe.
- **Dynamic Biomes**: Algorithmic biome classification derived from multi-layered elevation, moisture, and temperature noise manifolds.

### 🏰 Structural Logic
- **Automata-driven Civilizations**:
  - **Cities**: Sprawling plazas integrated seamlessly with housing clusters.
  - **Castles**: Heavily fortified walls with centralized, imposing keeps.
  - **Towers**: Multi-story vertical puzzles requiring tactical staircase progression.
  - **Dungeons**: Subterranean labyrinths mapped out with alternate traversal zones.
- **Road Network**: Advanced Bresenham path-carving algorithms interconnect structures and intelligently construct bridges across aquatic terrain.

### 👁️ Visibility & Physics
- **Recursive Shadowcasting**: True, physically accurate FOV calculations that respect environmental translucency and solid mass.
- **Exploration Memory**: Built-in state separation distinguishing between active "Visible" terrain and shrouded "Explored" zones.
- **A* Pathfinding**: Instantaneous route calculations weaving intelligently around structures and natural obstacles.

### ⚛️ React Subsystem Integration
- **`<MapRenderer />` Component**: A drop-in, highly optimized HTML5 Canvas canvas orchestrating the render loop, complex depth sorting, and sub-pixel fog overlay precision.
- **Hooks & State**: Ready to plug directly into the React render lifecycle cleanly.

---

## 📦 Installation

To deploy Aether in your local repository environment:

```bash
# Clone the repository and install dependencies
npm install

# Build the SOTA internal stylesheet pipeline
npm run build 

# Ignite the Development Mode
npm run dev
```

---

## 🚀 Usage

Aether exposes a robust, type-safe API directly through `aether.ts`.

### 1. Initialize the Engine 

Configure the raw constraints of your universe:

```typescript
import { WorldGenerator, PhysicsEngine, WorldConfig, CHUNK_SIZE } from './aether';

const config: WorldConfig = {
  seed: 'aether-v5',
  chunkSize: CHUNK_SIZE,
  globalScale: 1.0,
  fogRadius: 16,
  structureChance: 0.8,
};

// Bootstrap the Generator
const generator = new WorldGenerator(config);

// Bind the Physics and FOV Engine
const physics = new PhysicsEngine(generator);
```

### 2. Map Rendering in React

Aether comes with a pre-configured `<MapRenderer>` primitive. Handle complex interactions with minimal boilerplate:

```tsx
import { MapRenderer } from './aether';

<MapRenderer
  width={800}
  height={600}
  center={{ x: 0, y: 0, z: 0 }}
  viewZ={0}
  scale={1.0}
  generator={generator}
  visibleTiles={myVisibleSet}
  exploredTiles={myExploredSet}
  onTileDoubleClick={(x, y) => {
    // Traverse layers or move immediately
    console.log(`Command received for traversal to X:${x} Y:${y}`);
  }}
/>
```

---

## 🧠 Architecture & Deep Context

### 📐 The Navigational Axis

Aether abandons infinite Z to guarantee tightly balanced 2.5D gameplay constraints:
- **X / Y**: Functionally Infinite.
- **Z Bound `[-3, 3]`**:
  - `+1 to +3`: Canopy, Roofs, and Towers.
  - `0`: Surface & Ground Level.
  - `-1 to -3`: Subterranean Dungeons & Crypts.

### 🧩 Core Data Primitives

- **Chunk**: A localized 32x32x7 volume cluster in memory.
- **Tile**: The atomic environmental structure housing:
  - `block`: Physical construction (`BlockType.GRASS`, `BlockType.WALL_STONE`)
  - `biome`: Spatial context (`BiomeType.DESERT`)
  - `isWalkable`: Navigational bit masking.
  - `isTransparent`: Photon & FOV propagation mask.

---

## ⚙️ Configuration Properties

| Parameter | Type | Default | Impact |
| :--- | :--- | :--- | :--- |
| `seed` | `string` | - | Primary DNA strand for PRNG evaluation. |
| `globalScale` | `number` | `1.0` | Topological zoom factor on underlying noise bands. |
| `seaLevel` | `number` | `-0.1` | Generation threshold for liquid domains. |
| `elevationScale` | `number` | `0.015` | Sharpness frequency for organic mountain/valley generation. |
| `structureChance` | `number` | `0.8` | Injection probability index `(0.0 - 1.0)` for Civilization constructs. |
| `fogRadius` | `number` | `16` | Absolute tile-distance limits for recursive shadowcasting calculations. |

---

<div align="center">
  <sub>Engineered by the Aether Development Team.</sub>
</div>
