# Biology in Data - TSX to JSX Conversion Status

## ✅ COMPLETED FILES

### Configuration & Setup
- [x] `/index.html` - HTML entry point
- [x] `/package.json` - Dependencies and scripts
- [x] `/vite.config.js` - Vite configuration  
- [x] `/README.md` - Complete project documentation
- [x] `/CONVERSION_GUIDE.md` - TSX to JSX conversion guide
- [x] `/convert.sh` - Conversion helper script

### Core Application
- [x] `/src/main.jsx` - Application entry point
- [x] `/src/App.jsx` - Main App component with routing

### Contexts
- [x] `/src/contexts/AuthContext.jsx` - Authentication management

### Library/Data
- [x] `/src/lib/mockData.js` - Mock research data

### Components (Converted)
- [x] `/src/components/ProtectedRoute.jsx` - Route protection
- [x] `/src/components/ChartFrame.jsx` - Chart visualization
- [x] `/src/components/NavbarNew.jsx` - Navigation bar
- [x] `/src/components/FooterNew.jsx` - Footer

### Pages (Converted)
- [x] `/src/pages/LoginPageNew.jsx` - User login page

### Styles
- [x] `/src/styles/globals.css` - Global styles (moved from /styles)

---

## 📋 REMAINING FILES TO CONVERT

### Components (Need Conversion)
These files exist in `/components/` and need to be converted to JSX and moved to `/src/components/`:

```
/components/CategoryChipsNew.tsx       → /src/components/CategoryChipsNew.jsx
/components/ResearchCardNew.tsx        → /src/components/ResearchCardNew.jsx
/components/SearchBarNew.tsx           → /src/components/SearchBarNew.jsx
/components/figma/ImageWithFallback.tsx → /src/components/figma/ImageWithFallback.jsx
```

### Pages (Need Conversion)
These files exist in `/pages/` and need to be converted to JSX and moved to `/src/pages/`:

```
/pages/AdminDashboardNew.tsx       → /src/pages/AdminDashboardNew.jsx
/pages/AdminLoginPage.tsx          → /src/pages/AdminLoginPage.jsx
/pages/HomePageNew.tsx             → /src/pages/HomePageNew.jsx
/pages/ResearchDetailPageNew.tsx   → /src/pages/ResearchDetailPageNew.jsx
/pages/ResearchListPageNew.tsx     → /src/pages/ResearchListPageNew.jsx
/pages/UserProfilePage.tsx         → /src/pages/UserProfilePage.jsx
```

### Styles (Need Moving/Copying)
These CSS files just need to be copied from `/styles/` to `/src/styles/`:

```
/styles/components.module.css      → /src/styles/components.module.css
/styles/HomePage.module.css        → /src/styles/HomePage.module.css
/styles/pages.module.css           → /src/styles/pages.module.css
/styles/ResearchListPage.module.css → /src/styles/ResearchListPage.module.css
```

---

## 🔧 CONVERSION INSTRUCTIONS

### For CSS Files (Just Copy)
```bash
cp /styles/components.module.css /src/styles/
cp /styles/HomePage.module.css /src/styles/
cp /styles/pages.module.css /src/styles/
cp /styles/ResearchListPage.module.css /src/styles/
```

### For TSX Files (Manual Conversion Required)

Follow these steps for each `.tsx` file:

1. **Read the original file** from its current location
2. **Remove TypeScript syntax**:
   - Remove all `interface` and `type` declarations
   - Remove `: Type` annotations from variables, parameters, and return types
   - Remove `<Type>` generic parameters
   - Remove `as Type` type assertions (keep just the value)
3. **Save as `.jsx`** in the `/src/` directory structure
4. **Update imports** if needed (change `.tsx` to `.jsx` or remove extension)

### Example Conversion

**Before (TypeScript):**
```typescript
import { useState } from "react";

interface Props {
  title: string;
  count: number;
}

export function MyComponent({ title, count }: Props) {
  const [value, setValue] = useState<string>("");
  
  const handleClick = (e: React.MouseEvent) => {
    console.log(e);
  };
  
  return <div onClick={handleClick}>{title}: {count}</div>;
}
```

**After (JavaScript):**
```javascript
import { useState } from "react";

export function MyComponent({ title, count }) {
  const [value, setValue] = useState("");
  
  const handleClick = (e) => {
    console.log(e);
  };
  
  return <div onClick={handleClick}>{title}: {count}</div>;
}
```

---

## 📝 PRIORITY ORDER

Convert files in this order for fastest functionality:

### Priority 1 - Critical Pages
1. `/pages/HomePageNew.tsx` → `/src/pages/HomePageNew.jsx`
2. `/pages/AdminDashboardNew.tsx` → `/src/pages/AdminDashboardNew.jsx`
3. `/pages/AdminLoginPage.tsx` → `/src/pages/AdminLoginPage.jsx`

### Priority 2 - Supporting Components
4. `/components/SearchBarNew.tsx` → `/src/components/SearchBarNew.jsx`
5. `/components/ResearchCardNew.tsx` → `/src/components/ResearchCardNew.jsx`
6. `/components/CategoryChipsNew.tsx` → `/src/components/CategoryChipsNew.jsx`

### Priority 3 - Detail Pages
7. `/pages/ResearchListPageNew.tsx` → `/src/pages/ResearchListPageNew.jsx`
8. `/pages/ResearchDetailPageNew.tsx` → `/src/pages/ResearchDetailPageNew.jsx`
9. `/pages/UserProfilePage.tsx` → `/src/pages/UserProfilePage.jsx`

### Priority 4 - Utilities
10. `/components/figma/ImageWithFallback.tsx` → `/src/components/figma/ImageWithFallback.jsx`

### Priority 5 - Styles (Just Copy)
11. Copy all `.module.css` files to `/src/styles/`

---

## ✅ VERIFICATION CHECKLIST

After converting all files:

- [ ] All `.tsx` files converted to `.jsx` in `/src/` directory
- [ ] All CSS files copied to `/src/styles/`
- [ ] No TypeScript syntax remains (no interfaces, type annotations, etc.)
- [ ] All imports point to correct paths
- [ ] Run `npm install` successfully
- [ ] Run `npm run dev` without errors
- [ ] Test navigation to all routes
- [ ] Test login (user and admin)
- [ ] Test admin dashboard functionality
- [ ] Test chart interactions
- [ ] Check browser console for errors

---

## 🚀 QUICK START (After Conversion)

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Application will be available at http://localhost:5173
```

---

## 📚 HELPFUL RESOURCES

- See `/CONVERSION_GUIDE.md` for detailed conversion patterns
- See `/README.md` for project documentation
- See `/src/` for completed conversion examples

---

## 🎯 CURRENT PROJECT STATE

**Status**: Partially Converted
**Next Step**: Convert remaining components and pages using the pattern shown in completed files
**Estimated Time**: 1-2 hours for manual conversion of remaining files

---

## 💡 TIPS

1. **Use Completed Files as Templates**: Look at `/src/components/ChartFrame.jsx` or `/src/pages/LoginPageNew.jsx` for conversion examples
2. **Keep Logic Intact**: Only remove type annotations, keep all functional code
3. **Test Incrementally**: Convert a few files, test, then continue
4. **Use Find & Replace**: 
   - Find: `: string` → Replace: (empty)
   - Find: `: number` → Replace: (empty)
   - Find: `interface.*{[^}]*}` → Delete entire interface blocks
5. **CSS Files Don't Change**: Just copy them as-is to `/src/styles/`

Good luck with the conversion! 🚀
