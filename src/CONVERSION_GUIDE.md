# TSX to JSX Conversion Guide for Vite React Project

## Project Structure

Your project is being converted from TypeScript (.tsx) to JavaScript (.jsx) with proper Vite React structure:

```
biology-in-data/
├── index.html
├── package.json
├── vite.config.js
├── public/
│   └── (static assets)
└── src/
    ├── main.jsx              ✅ CONVERTED
    ├── App.jsx               ✅ CONVERTED  
    ├── components/
    │   ├── ChartFrame.jsx    ✅ CONVERTED
    │   ├── FooterNew.jsx     ✅ CONVERTED
    │   ├── NavbarNew.jsx     ✅ CONVERTED
    │   ├── ProtectedRoute.jsx ✅ CONVERTED
    │   ├── CategoryChipsNew.jsx  (needs conversion)
    │   ├── ResearchCardNew.jsx   (needs conversion)
    │   ├── SearchBarNew.jsx      (needs conversion)
    │   └── figma/
    │       └── ImageWithFallback.jsx (needs conversion)
    ├── contexts/
    │   └── AuthContext.jsx   ✅ CONVERTED
    ├── lib/
    │   └── mockData.js       ✅ CONVERTED
    ├── pages/
    │   ├── AdminDashboardNew.jsx    (needs conversion)
    │   ├── AdminLoginPage.jsx       (needs conversion)
    │   ├── HomePageNew.jsx          (needs conversion)
    │   ├── LoginPageNew.jsx         (needs conversion)
    │   ├── ResearchDetailPageNew.jsx (needs conversion)
    │   ├── ResearchListPageNew.jsx  (needs conversion)
    │   └── UserProfilePage.jsx      (needs conversion)
    └── styles/
        ├── globals.css       ✅ MOVED
        ├── components.module.css  (needs moving)
        ├── HomePage.module.css    (needs moving)
        ├── pages.module.css       (needs moving)
        └── ResearchListPage.module.css (needs moving)
```

## TSX to JSX Conversion Rules

### 1. Remove TypeScript Interfaces and Types
**Before (TSX):**
```typescript
interface UserProps {
  name: string;
  email: string;
}

export function User({ name, email }: UserProps) {
  return <div>{name}</div>;
}
```

**After (JSX):**
```javascript
export function User({ name, email }) {
  return <div>{name}</div>;
}
```

### 2. Remove Type Annotations
**Before (TSX):**
```typescript
const [count, setCount] = useState<number>(0);
const handleClick = (e: React.MouseEvent) => {};
```

**After (JSX):**
```javascript
const [count, setCount] = useState(0);
const handleClick = (e) => {};
```

### 3. Update Imports
**Before (TSX):**
```typescript
import { ReactNode } from "react";
import type { SomeType } from "./types";
```

**After (JSX):**
```javascript
import React from "react";
// Remove type-only imports
```

### 4. Remove Generic Type Parameters
**Before (TSX):**
```typescript
const items = Array<string>();
const map = new Map<string, number>();
```

**After (JSX):**
```javascript
const items = [];
const map = new Map();
```

### 5. Change File Extensions
- `.tsx` → `.jsx`
- `.ts` → `.js`

### 6. Update Import Statements
**Before:**
```typescript
import { Component } from "./Component.tsx";
```

**After:**
```javascript
import { Component } from "./Component.jsx";
// OR
import { Component } from "./Component"; // extension can be omitted
```

## Quick Conversion Template

For any component file, follow this pattern:

### Original TSX File:
```typescript
import { useState } from "react";

interface Props {
  title: string;
  onSubmit: (data: any) => void;
}

export function MyComponent({ title, onSubmit }: Props) {
  const [value, setValue] = useState<string>("");
  
  const handleClick = (e: React.MouseEvent) => {
    onSubmit(value);
  };
  
  return (
    <div>
      <h1>{title}</h1>
      <button onClick={handleClick}>Submit</button>
    </div>
  );
}
```

### Converted JSX File:
```javascript
import { useState } from "react";

export function MyComponent({ title, onSubmit }) {
  const [value, setValue] = useState("");
  
  const handleClick = (e) => {
    onSubmit(value);
  };
  
  return (
    <div>
      <h1>{title}</h1>
      <button onClick={handleClick}>Submit</button>
    </div>
  );
}
```

## Files Already Converted

✅ `/index.html` - Entry HTML file
✅ `/vite.config.js` - Vite configuration
✅ `/package.json` - Dependencies
✅ `/src/main.jsx` - Application entry point
✅ `/src/App.jsx` - Main App component
✅ `/src/contexts/AuthContext.jsx` - Authentication context
✅ `/src/lib/mockData.js` - Mock data
✅ `/src/components/ProtectedRoute.jsx` - Route protection
✅ `/src/components/ChartFrame.jsx` - Chart component
✅ `/src/components/NavbarNew.jsx` - Navigation component
✅ `/src/components/FooterNew.jsx` - Footer component
✅ `/src/styles/globals.css` - Global styles

## Files That Need Conversion

You need to convert the following files following the same pattern:

### Components:
- `/components/CategoryChipsNew.tsx` → `/src/components/CategoryChipsNew.jsx`
- `/components/ResearchCardNew.tsx` → `/src/components/ResearchCardNew.jsx`
- `/components/SearchBarNew.tsx` → `/src/components/SearchBarNew.jsx`
- `/components/figma/ImageWithFallback.tsx` → `/src/components/figma/ImageWithFallback.jsx`

### Pages:
- `/pages/AdminDashboardNew.tsx` → `/src/pages/AdminDashboardNew.jsx`
- `/pages/AdminLoginPage.tsx` → `/src/pages/AdminLoginPage.jsx`
- `/pages/HomePageNew.tsx` → `/src/pages/HomePageNew.jsx`
- `/pages/LoginPageNew.jsx` → `/src/pages/LoginPageNew.jsx`
- `/pages/ResearchDetailPageNew.tsx` → `/src/pages/ResearchDetailPageNew.jsx`
- `/pages/ResearchListPageNew.tsx` → `/src/pages/ResearchListPageNew.jsx`
- `/pages/UserProfilePage.tsx` → `/src/pages/UserProfilePage.jsx`

### Styles (just move/copy):
- `/styles/components.module.css` → `/src/styles/components.module.css`
- `/styles/HomePage.module.css` → `/src/styles/HomePage.module.css`
- `/styles/pages.module.css` → `/src/styles/pages.module.css`
- `/styles/ResearchListPage.module.css` → `/src/styles/ResearchListPage.module.css`

## Steps to Complete Conversion

1. **Copy CSS files** from `/styles/` to `/src/styles/` (they don't need conversion)
   
2. **Convert each TSX component** following the template above:
   - Remove all `interface` and `type` declarations
   - Remove all type annotations (`: Type`)
   - Remove generic type parameters (`<Type>`)
   - Update the file extension to `.jsx`

3. **Update all import paths** to point to `/src/`:
   ```javascript
   // Before
   import { Component } from "../components/Component"
   
   // After (if needed)
   import { Component } from "../components/Component"
   ```

4. **Run the development server**:
   ```bash
   npm install
   npm run dev
   ```

## Common TypeScript Patterns to Remove

1. **Function return types:**
   ```typescript
   // Remove ": JSX.Element" or ": ReactNode"
   function Component(): JSX.Element { }
   ```

2. **Event types:**
   ```typescript
   // Remove ": React.ChangeEvent<HTMLInputElement>"
   onChange(e: React.ChangeEvent<HTMLInputElement>) { }
   ```

3. **Prop types in destructuring:**
   ```typescript
   // Remove the ": PropType" part
   function Component({ prop1, prop2 }: { prop1: string, prop2: number }) { }
   ```

4. **Optional chaining is fine** - Keep it in JSX:
   ```javascript
   user?.name // This works in JSX too
   ```

## Testing After Conversion

After converting all files:

1. Check that there are no `.tsx` or `.ts` files in `/src/`
2. All imports should resolve correctly
3. Run `npm run dev` to start the development server
4. Check browser console for any errors
5. Test all routes and functionality

## Notes

- The logic remains the same - you're only removing type information
- CSS modules work the same way in both TSX and JSX
- All React hooks and patterns remain unchanged
- Keep all existing className, styles, and component structure
