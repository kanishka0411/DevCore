# DevCore - Local-First Collaborative Development Environment

DevCore is a next-generation collaborative development environment designed for small developer teams. It features local-first architecture, real-time collaboration, AI assistance, and gamification elements to create an engaging and productive coding experience.

## 🚀 Features

### Core Functionality
- **Local File System Integration**: Direct access to your local project files using the File System Access API
- **Real-time Collaborative Editing**: Multi-user synchronization powered by Y.js with shared cursors and awareness
- **Monaco Code Editor**: Professional code editing experience with syntax highlighting and IntelliSense
- **Voice Chat & Screen Sharing**: WebRTC-powered communication for seamless team collaboration
- **AI Companion**: Integrated Gemini AI for coding hints, debugging help, and morale-boosting jokes
- **Game Center**: Fun coding challenges and competitions to boost team engagement

### Design Highlights
- **Premium Dark Theme**: Professional developer-focused interface with carefully crafted color schemes
- **Responsive Three-Panel Layout**: File explorer, code editor, and collaboration hub
- **Modern Typography**: Optimized font stack for code readability and UI aesthetics
- **Micro-interactions**: Subtle animations and transitions for enhanced user experience
- **Glass-morphism Effects**: Contemporary visual design with depth and polish

## 🛠 Technology Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom design system
- **Editor**: Monaco Editor with collaborative editing
- **Collaboration**: Y.js + WebSocket provider
- **Communication**: Socket.IO + WebRTC for real-time features
- **AI Integration**: Google Gemini API
- **File Access**: File System Access API with fallbacks

## 📦 Installation & Setup

1. **Clone and Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

3. **Start the Development Server**
   ```bash
   npm run dev
   ```

4. **Start the Signaling Server** (for collaboration features)
   ```bash
   npm run server
   ```

## 🌟 Usage

1. **Open DevCore** in your browser (typically `http://localhost:5173`)
2. **Choose a Project Folder** using the file explorer or welcome screen
3. **Start Coding** with real-time collaboration features
4. **Invite Team Members** to the same room for collaborative editing
5. **Use AI Companion** for coding assistance and fun interactions
6. **Enable Voice Chat** for real-time communication
7. **Play Games** to boost team morale and engagement

## 🔧 Architecture Overview

### File System Integration
```typescript
// Uses File System Access API for direct local file access
const dirHandle = await window.showDirectoryPicker();
const file = await fileHandle.getFile();
const content = await file.text();
```

### Collaborative Editing
```typescript
// Y.js document synchronization
const ydoc = new Y.Doc();
const yText = ydoc.getText('monaco');
const binding = new MonacoBinding(yText, editor.getModel());
```

### WebRTC Communication
```typescript
// Peer-to-peer voice chat and screen sharing
const peer = new SimplePeer({ initiator: true, stream: localStream });
peer.on('stream', handleRemoteStream);
```

### AI Integration
```typescript
// Gemini API for coding assistance
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
const result = await model.generateContent(prompt);
```

## 🎮 Game Features

### Available Games
1. **Speed Typing**: Race to type code snippets fastest
2. **Code Golf**: Solve problems with minimal code
3. **Bug Hunt**: Find and fix bugs quickly

### Leaderboard System
- Real-time scoring and rankings
- Team-based achievements
- Skill-based matchmaking

## 🤖 AI Companion Features

- **Coding Hints**: Context-aware suggestions for code improvement
- **Debugging Help**: Intelligent error analysis and solutions
- **Fun Interactions**: Programming jokes and team morale boosting
- **Feedback System**: Like/dislike mechanism for AI responses

## 🔒 Privacy & Security

- **Local-First**: Your code never leaves your machine unless explicitly shared
- **P2P Communication**: Direct peer-to-peer connections for collaboration
- **No Cloud Storage**: All files remain on local file system
- **Encrypted Connections**: WebRTC ensures secure communication channels

## 🚧 Development Status

This is a comprehensive scaffold/prototype demonstrating:
- ✅ Complete UI/UX implementation
- ✅ File system integration architecture
- ✅ Collaboration framework setup
- ✅ WebRTC communication structure
- ✅ AI service integration
- ✅ Game system foundation
- 🔄 Full P2P implementation (requires Y.js WebSocket server)
- 🔄 Production-ready WebRTC signaling
- 🔄 Complete game mechanics

## 📝 Development Notes

### File Organization
- Components are modular and focused on single responsibilities
- Hooks encapsulate complex state management logic
- Services provide clean API abstractions
- Types ensure type safety across the application

### Collaboration Implementation
The collaboration system uses:
- Socket.IO for signaling and room management
- Y.js for operational transformation and conflict resolution
- WebRTC for direct peer-to-peer communication
- Monaco Editor bindings for collaborative text editing

### AI Service Architecture
- Modular design supporting multiple AI providers
- Graceful fallbacks for offline/mock usage
- Context-aware prompt engineering
- User feedback integration for continuous improvement

## 🤝 Contributing

This project serves as a foundation for building local-first collaborative development tools. Key areas for contribution:
- Enhanced game mechanics and new game types
- Advanced AI integration features
- Mobile responsiveness improvements
- Accessibility enhancements
- Performance optimizations

## 📄 License

MIT License - feel free to use this as a foundation for your own collaborative development tools!