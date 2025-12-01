# Biology in Data - Vite React Application

A comprehensive platform for biological research data, visualization, and collaboration.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
biology-in-data/
├── index.html                 # Entry HTML file
├── package.json              # Dependencies and scripts
├── vite.config.js            # Vite configuration
├── CONVERSION_GUIDE.md       # TSX to JSX conversion guide
├── convert.sh                # Conversion helper script
└── src/
    ├── main.jsx              # Application entry point
    ├── App.jsx               # Main App component with routing
    ├── components/           # Reusable React components
    │   ├── ChartFrame.jsx
    │   ├── FooterNew.jsx
    │   ├── NavbarNew.jsx
    │   ├── ProtectedRoute.jsx
    │   └── figma/
    │       └── ImageWithFallback.jsx
    ├── contexts/             # React contexts
    │   └── AuthContext.jsx   # Authentication state management
    ├── lib/                  # Utilities and data
    │   └── mockData.js       # Mock research data
    ├── pages/                # Page components
    │   ├── AdminDashboardNew.jsx
    │   ├── AdminLoginPage.jsx
    │   ├── HomePageNew.jsx
    │   ├── LoginPageNew.jsx
    │   ├── ResearchDetailPageNew.jsx
    │   ├── ResearchListPageNew.jsx
    │   └── UserProfilePage.jsx
    └── styles/               # CSS stylesheets
        ├── globals.css
        ├── components.module.css
        ├── HomePage.module.css
        ├── pages.module.css
        └── ResearchListPage.module.css
```

## ✨ Features

### User Features
- 🔍 **Search & Browse** - Search and filter biological research papers
- 📊 **Data Visualization** - Interactive charts with download functionality
- 💾 **Save Research** - Bookmark favorite research papers
- 📧 **Subscriptions** - Subscribe to category updates
- 👤 **User Profile** - Manage saved research and preferences

### Admin Features
- 📝 **Upload Research** - Add new research papers to the database
- 📂 **Manage Studies** - Edit or remove existing research
- 📈 **Charts Upload** - Upload and manage chart data for research

### Technical Features
- ⚡ **Vite** - Lightning-fast build tool
- ⚛️ **React 18** - Modern React with hooks
- 🎨 **CSS Modules** - Scoped styling
- 📱 **Responsive Design** - Mobile-first approach
- 🔒 **Protected Routes** - Authentication-based routing
- 🎭 **Role-based Access** - Separate admin and user permissions

## 🔐 Authentication

The app has two separate authentication systems:

### User Login
- **Purpose**: Research access, bookmarks, and subscriptions
- **URL**: `/login`
- **Demo Credentials**: Use any email/password (e.g., `user@example.com` / `password123`)

### Admin Login
- **Purpose**: Content management and research upload
- **URL**: `/admin-login`
- **Credentials**: `admin@bio.com` / `admin123`

## 🎨 Color Palette

```css
--deep-forest: #2E7D32;      /* Primary green */
--forest-dark: #1B5E20;      /* Dark green */
--eco-green: #66BB6A;        /* Accent green */
--light-mint: #C8E6C9;       /* Light green */
--green-lighter: #E8F5E9;    /* Very light green */
```

## 🗂️ Key Components

### ChartFrame
Interactive chart component with fullscreen and download capabilities:
- Line charts
- Bar charts
- Scatter plots

### ProtectedRoute
HOC for protecting routes based on authentication status:
```jsx
<ProtectedRoute>
  <UserProfilePage />
</ProtectedRoute>

<ProtectedRoute requireAdmin>
  <AdminDashboard />
</ProtectedRoute>
```

### AuthContext
Global authentication state management:
```jsx
const { user, login, logout, isAuthenticated, isAdmin } = useAuth();
```

## 📄 Pages

| Route | Component | Access | Description |
|-------|-----------|--------|-------------|
| `/` | HomePage | Public | Landing page with featured research |
| `/research` | ResearchListPage | Public | Browse all research with filters |
| `/research/:id` | ResearchDetailPage | Public | Individual research details |
| `/login` | LoginPage | Public | User login/signup |
| `/admin-login` | AdminLoginPage | Public | Admin login |
| `/profile` | UserProfilePage | Protected | User profile and saved research |
| `/admin` | AdminDashboard | Admin Only | Admin content management |

## 🛠️ Development

### File Naming Conventions
- Components: `PascalCase.jsx`
- Styles: `kebab-case.module.css`
- Utilities: `camelCase.js`

### Import Aliases
```javascript
// Relative imports for components in same directory
import { Component } from "./Component";

// Relative imports for parent directories  
import { Component } from "../components/Component";
```

### CSS Modules
```jsx
import styles from "../styles/components.module.css";

<div className={styles.navbar}>
  <Link className={styles.navLink}>Home</Link>
</div>
```

## 📦 Dependencies

### Core
- `react` ^18.2.0
- `react-dom` ^18.2.0
- `react-router-dom` ^6.20.0

### UI & Visualization
- `recharts` ^2.10.3
- `lucide-react` ^0.294.0
- `motion` ^10.16.4
- `sonner` ^1.2.3

### Build Tools
- `vite` ^5.0.8
- `@vitejs/plugin-react` ^4.2.1

## 🔧 Configuration

### Vite Config
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

## 📝 Scripts

```json
{
  "dev": "vite",              // Start development server
  "build": "vite build",      // Build for production
  "preview": "vite preview"   // Preview production build
}
```

## 🚧 Migration from TypeScript

This project has been converted from TypeScript to JavaScript. See `CONVERSION_GUIDE.md` for details on:
- TSX to JSX conversion patterns
- Removing type annotations
- Updating imports
- File structure changes

## 📊 Mock Data

The application uses mock data defined in `/src/lib/mockData.js`:
- 6 sample research papers
- 3 categories (Genetics, Microbiology, Ecology)
- Sample chart data for visualizations
- Reference citations

## 🎯 Future Enhancements

- [ ] Backend API integration
- [ ] Real authentication system
- [ ] Database persistence
- [ ] Advanced search filters
- [ ] Export research data (PDF, CSV)
- [ ] Real-time collaboration features
- [ ] Email notifications for subscriptions

## 📄 License

All rights reserved © 2024 Biology in Data

## 🤝 Contributing

This is a demo project. For production use, please ensure:
1. Real authentication system
2. Secure backend API
3. Data validation
4. Error handling
5. Production-ready security measures

## ⚠️ Important Notes

- **Demo Mode**: The authentication is for demonstration only
- **No PII**: Do not use for collecting personally identifiable information
- **Data Storage**: All data is stored in localStorage (client-side only)
- **Production**: Not configured for production use without additional security measures

---

Built with ⚛️ React + ⚡ Vite
