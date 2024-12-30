# Grinnage Ex - Modern Property Management Platform

Grinnage Ex is a comprehensive property management platform that streamlines the interaction between property managers, residential tenants, and commercial clients. Built with modern web technologies, it offers a seamless experience for managing properties, payments, and communications.

## 🚀 Features

### Multi-User Dashboard System
- **Residential Dashboard**
  - Appointment scheduling and management
  - Document storage and access
  - Billing and payment history
  - Digital wallet integration
  - Maintenance request tracking
  - Real-time notifications and alerts

- **Commercial Dashboard**
  - Property portfolio management
  - Contract management
  - Financial reporting
  - Analytics and insights
  - Custom billing solutions

- **Admin Dashboard**
  - User management
  - Property oversight
  - System-wide analytics
  - Activity monitoring
  - Settings management

### Core Features
- 🔐 Secure Authentication System
- 💰 Integrated Digital Wallet
- 📱 Responsive Design
- 🌓 Dark/Light Mode
- 📄 Document Management
- 📅 Appointment Scheduling
- 💳 Payment Processing
- 📨 Notification System

## 🛠️ Technology Stack

- **Frontend**
  - React 18
  - TypeScript
  - Tailwind CSS
  - React Router v6
  - Lucide Icons
  - Jotai (State Management)

- **Development Tools**
  - Vite
  - ESLint
  - PostCSS
  - Node.js
  - npm

## 🏗️ Project Structure

```
grinnage-ex/
├── src/
│   ├── components/         # Reusable UI components
│   ├── pages/             # Page components
│   ├── lib/               # Utilities and helpers
│   ├── hooks/             # Custom React hooks
│   ├── store/             # State management
│   ├── types/             # TypeScript type definitions
│   └── styles/            # Global styles and themes
├── public/                # Static assets
└── config files          # Various configuration files
```

## 🚦 Getting Started

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Fill in the required environment variables.

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🔑 Environment Variables

Create a `.env` file in the root directory with the following variables:
```env
VITE_API_URL=your_api_url
VITE_AUTH_DOMAIN=your_auth_domain
VITE_STRIPE_PUBLIC_KEY=your_stripe_key
```

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop (1024px and above)
- Tablet (768px to 1023px)
- Mobile (below 768px)

## 🎨 Theme Customization

The application supports both light and dark modes, with a customizable color scheme defined in `tailwind.config.js`. The theme can be extended or modified to match your brand colors.

## 🔒 Security Features

- JWT-based authentication
- Role-based access control
- Secure password handling
- Protected API endpoints
- XSS protection
- CSRF protection

## 📈 Performance Optimization

- Code splitting
- Lazy loading of components
- Image optimization
- Caching strategies
- Minimized bundle size

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support, please contact:
- Email: support@grinnageex.com
- Phone: +1 (555) 123-4567

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
