# MindSet 

<!-- ![MindSet Icon Concept](https://via.placeholder.com/150/2B5CE6/FFFFFF?text=MS) -->
A **developer-centric text editor** built with Tauri + React, designed to organize ideas and notes with the power of a database-backed system.

## 📝 Why I Built This
As developers, our tools shape our workflow. I grew tired of juggling ideas across scattered files, so I built MindSet - a desktop text editor tailored to how I work. I needed:
- A centralized place for technical notes and ideas
- Better organization than scattered text files
- A project to explore Tauri's capabilities

## 🚀 Features

- **Rich Text Editing** - Markdown support, syntax highlighting, and clean UI  
- **Database Storage** - SQLite backend to centralize notes (no more scattered `.txt` files!)  
- **PDF Export** - Generate polished docs with one click  
- **Cross-Platform** - Runs on Windows, macOS, and Linux  
- **Lightweight** - Tauri’s Rust core ensures native performance  

## 🛠 Tech Stack

| Component       | Technology          |
|-----------------|---------------------|
| **Frontend**    | React (TypeScript)  |
| **Backend**     | Tauri (Rust)        |
| **Database**    | SQLite              |
| **Styling**     | Tailwind CSS        |
| **Packaging**   | Tauri CLI           |


## 📦 Installation

1. **Prerequisites**:  
   - Node.js ≥ 18  
   - Rust (via `rustup`)  

2. **Run locally**:
   ```bash
   git clone https://github.com/ConstantinBerson/mind-set.git
   cd mindset
   npm install
   npm run tauri dev
3. **Build**:
    ```bash
    npm run tauri build

<!-- ## 🖥️ UI Preview  
*(Replace with actual screenshot)*  


|   MindSet - Notes Manager      |
|--------------------------------|
| 📝 Notes List     |  Editor    |
|-------------------|-----------|
| • Idea 1          |           |
| • Project Draft   |   ### Hi  |
| • Bug Fixes       |   *Italics* | -->

## 📜 License
MIT © ConstantinBerson
