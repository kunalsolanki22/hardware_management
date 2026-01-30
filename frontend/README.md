# Hardware Management System - Frontend

A modern React application for managing hardware assets, built with React Router for navigation and a clean, responsive UI.

## 📋 Features

### ✅ Implemented
- **Authentication**
  - Login page with role-based access (Employee, Admin, HR)
  - Session management with localStorage
  - Private route protection

- **Navigation & Layout**
  - Responsive sidebar navigation
  - Top navbar with user info
  - Role-based menu items
  - Mobile-friendly hamburger menu

- **Dashboard**
  - Statistics cards (Total, In Use, Maintenance, Available)
  - My Assets table
  - Recent activity feed
  - Quick action buttons

- **Assets Management**
  - Asset listing with search and filters
  - Category and status filtering
  - Pagination
  - Responsive table view

- **Request Form**
  - Asset request form with validation
  - Category selection
  - Priority levels
  - HR-specific fields for new hires

### 🚧 Coming Soon
- Asset detail view with full information
- Maintenance logging system
- Issue/Return workflow
- Notifications system
- Export/Print functionality

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Navigate to project directory**
   ```bash
   cd hardware-management-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

   The app will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

## 📁 Project Structure

```
hardware-management-frontend/
├── public/
│   └── index.html              # HTML template
├── src/
│   ├── components/             # Reusable components
│   │   ├── Layout.js          # Main layout with navbar & sidebar
│   │   ├── Layout.css
│   │   └── PrivateRoute.js    # Authentication wrapper
│   ├── pages/                  # Page components
│   │   ├── Login.js           # Login page
│   │   ├── Login.css
│   │   ├── Dashboard.js       # Dashboard with stats
│   │   ├── Dashboard.css
│   │   ├── AssetsList.js      # Assets listing with filters
│   │   ├── AssetsList.css
│   │   ├── RequestForm.js     # Asset request form
│   │   ├── RequestForm.css
│   │   ├── AssetDetail.js     # Asset detail (placeholder)
│   │   ├── MaintenanceLog.js  # Maintenance (placeholder)
│   │   └── IssueReturn.js     # Issue/Return (placeholder)
│   ├── services/               # API services (future)
│   ├── utils/                  # Utility functions (future)
│   ├── assets/                 # Images, fonts, etc (future)
│   ├── App.js                  # Main app component with routing
│   ├── App.css                 # Global styles
│   └── index.js                # Entry point
├── package.json
├── webpack.config.js           # Webpack configuration
└── README.md
```

## 🎨 Design System

### Color Palette
```css
--primary: #2563EB       /* Blue - Main actions */
--secondary: #10B981     /* Green - Success states */
--warning: #F59E0B       /* Orange - Warnings */
--danger: #EF4444        /* Red - Errors */
--gray-*: Various grays  /* Text and backgrounds */
```

### Typography
- Font Family: System fonts (Apple, Segoe UI, etc.)
- Sizes: 12px to 32px
- Weights: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

### Components
- Buttons: Primary, Secondary, Success, Danger, Warning
- Forms: Input, Textarea, Select with validation
- Cards: White background with subtle shadow
- Tables: Responsive with hover effects
- Badges: Status indicators with colors

## 🔐 Authentication & Roles

### Demo Accounts
The app uses mock authentication. Use these emails to test different roles:

| Role | Email | Features |
|------|-------|----------|
| **Employee** | employee@company.com | View assets, request new assets, report issues |
| **Admin** | admin@company.com | All employee features + manage requests, maintenance, issue/return |
| **HR** | hr@company.com | All features + onboarding requests, exit clearance |

**Password:** Any value (demo mode)

### Role-Based Access
- **Employee**: Limited to personal assets and requests
- **Admin**: Full asset management capabilities
- **HR**: Employee management + asset requests for new hires

## 🛣️ Routing

| Route | Component | Access | Description |
|-------|-----------|--------|-------------|
| `/login` | Login | Public | Authentication page |
| `/` | Dashboard | Protected | Main dashboard |
| `/assets` | AssetsList | Protected | All assets with filters |
| `/assets/:id` | AssetDetail | Protected | Single asset details |
| `/request` | RequestForm | Protected | Request new asset |
| `/maintenance/:id` | MaintenanceLog | Protected | Log maintenance |
| `/issue-return` | IssueReturn | Protected | Issue/return assets |

## 💾 State Management

Currently using:
- **React State** (useState, useEffect) for component state
- **localStorage** for authentication and user session
- **React Router** for navigation state

Future considerations:
- Context API for global state
- React Query for server state management

## 🔌 API Integration (Future)

The app is structured for easy API integration:

1. **Create API service files** in `src/services/`
   ```javascript
   // src/services/api.js
   import axios from 'axios';
   
   const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
   
   export const api = axios.create({
     baseURL: API_URL,
     headers: {
       'Content-Type': 'application/json'
     }
   });
   ```

2. **Replace mock data** in components with API calls
   ```javascript
   // Before
   const mockAssets = [...];
   
   // After
   const { data: assets } = await api.get('/assets');
   ```

3. **Add authentication interceptor**
   ```javascript
   api.interceptors.request.use(config => {
     const token = localStorage.getItem('token');
     if (token) {
       config.headers.Authorization = `Bearer ${token}`;
     }
     return config;
   });
   ```

## 📱 Responsive Design

The app is fully responsive with breakpoints:
- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: Below 768px

Key responsive features:
- Collapsible sidebar on mobile
- Responsive tables with horizontal scroll
- Stacked form layouts on small screens
- Adaptive grid layouts

## 🎯 Next Steps

### Phase 2 - API Integration
- [ ] Connect to Flask backend
- [ ] Implement real authentication
- [ ] Replace mock data with API calls
- [ ] Add error handling
- [ ] Implement loading states

### Phase 3 - Advanced Features
- [ ] Asset detail view with full data
- [ ] Maintenance logging system
- [ ] Issue/Return workflow
- [ ] Real-time notifications
- [ ] File upload for attachments
- [ ] QR code generation
- [ ] Export reports (PDF/Excel)

### Phase 4 - Enhancements
- [ ] Advanced search and filters
- [ ] Asset analytics dashboard
- [ ] Bulk operations
- [ ] Dark mode
- [ ] Accessibility improvements
- [ ] Performance optimization

## 🧪 Testing (Future)

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage
```

## 🐛 Troubleshooting

### Common Issues

**1. Port 3000 already in use**
```bash
# Kill the process on port 3000
kill -9 $(lsof -t -i:3000)

# Or use a different port
PORT=3001 npm start
```

**2. Module not found errors**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**3. Build fails**
```bash
# Clear cache and rebuild
rm -rf dist
npm run build
```

## 📄 License

This project is part of the Hardware Management Module assignment.

## 👥 Contributing

This is an educational project. For improvements:
1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit for review

## 📞 Support

For issues or questions:
- Check existing documentation
- Review console errors
- Check browser compatibility

---

**Version:** 1.0.0  
**Last Updated:** January 30, 2026  
**Status:** Phase 1 Complete - Basic routing and UI implemented
