# Clothing Brand Admin Dashboard

A complete, production-quality Admin Dashboard app for an E-commerce Clothing Brand built with React, Vite, and TailwindCSS.

## Features

- ✅ **Dashboard** - Comprehensive overview with metrics, charts, and lists
- ✅ **Products Management** - Full CRUD with clothing-specific fields (sizes, colors, fabric, fit)
- ✅ **Categories Management** - Create, edit, and manage product categories
- ✅ **Orders Management** - View orders, update status, and download invoices
- ✅ **Users Management** - View users, block/unblock, and view details
- ✅ **Inquiries** - Manage customer inquiries and send replies
- ✅ **Payments** - View payment history and revenue analytics
- ✅ **Settings** - Configure website settings, banners, logos, and SEO
- ✅ **Authentication** - Secure login with JWT token simulation

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **React Router v6** - Client-side routing
- **Recharts** - Chart library
- **Lucide React** - Icon library
- **React Hook Form + Zod** - Form handling and validation
- **Axios** - HTTP client

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Login Credentials

- **Email:** admin@example.com
- **Password:** admin123

## Project Structure

```
src/
  ├── components/       # Reusable UI components
  │   ├── Sidebar.jsx
  │   ├── Topbar.jsx
  │   ├── Card.jsx
  │   ├── ChartArea.jsx
  │   ├── ChartLine.jsx
  │   ├── ChartPie.jsx
  │   └── Table.jsx
  ├── pages/           # Page components
  │   ├── Dashboard.jsx
  │   ├── Products.jsx
  │   ├── ProductAdd.jsx
  │   ├── ProductEdit.jsx
  │   ├── Categories.jsx
  │   ├── CategoryAdd.jsx
  │   ├── CategoryEdit.jsx
  │   ├── Orders.jsx
  │   ├── OrderDetails.jsx
  │   ├── Users.jsx
  │   ├── Inquiries.jsx
  │   ├── Payments.jsx
  │   ├── Settings.jsx
  │   └── Login.jsx
  ├── api/            # API service layer
  │   └── api.jsx
  ├── App.jsx         # Main app component with routing
  ├── main.jsx        # Entry point
  └── index.css       # Global styles
```

## UI Theme

- **Primary Color:** Deep Indigo (#3A3D98)
- **Accent Color:** Coral (#FF6F61)
- **Style:** Modern, clean, soft round edges, smooth shadows

## Features Details

### Products Module
- Clothing-specific fields: Size options (XS-XXL), Colors, Fabric type, Fit type
- Multiple image upload
- Featured, New Arrival, Best Seller toggles
- SEO fields
- Search and filter functionality

### Orders Module
- Filter by status (Pending, Packed, Shipped, Delivered, Cancelled)
- Detailed order view with customer info, shipping address, and payment details
- Update order status
- Download invoice (placeholder)

### Dashboard
- 8 key metrics cards
- Monthly sales area chart
- Order trends line chart
- Category sales pie chart
- Latest orders, new signups, and low inventory lists

## Building for Production

```bash
npm run build
```

The build output will be in the `dist` directory.

## Notes

- This app uses dummy data stored in memory. In a production environment, you would connect to a real backend API.
- The API service layer (`src/api/api.jsx`) is structured to be compatible with PHP REST APIs.
- All file uploads are currently handled client-side with object URLs. In production, you would upload to a server.

## License

MIT


