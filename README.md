# Nyumbani Greens ERP System

A batch-centric ERP system designed for farm-to-customer food operations. Track Product Orders from sourcing through production, inventory, and Zoho sales integration with full traceability.

## Features

### Modules

- **Dashboard** - Overview and KPIs showing active batches, revenue, wastage, and net margin
- **Sourcing** - Manage Product Orders with supplier tracking, payment status, and cost management
- **Production** - Monitor batch progression through intake, grading, processing, and packaging
- **Inventory** - Track punnet inventory with freshness indicators and shrinkage recording
- **Zoho Integration** - Synchronize with Zoho CRM and Books for end-to-end traceability
- **Cost Management** - Detailed cost breakdowns and margin analysis
- **Reports** - Advanced analytics with KPIs, batch comparisons, and financial summaries

## Getting Started

### Landing Page

Visit the landing page (`/landing`) to learn about all features and see an overview of the system.

### Authentication

The system uses a **client-side demo authentication** system for testing and evaluation purposes. No backend database is required.

#### Demo Accounts

Three pre-configured demo users are available:

1. **Admin Account**
   - Email: `demo@nyumbani.com`
   - Password: `demo123`
   - Role: Admin (full system access)

2. **Manager Account**
   - Email: `manager@nyumbani.com`
   - Password: `manager123`
   - Role: Manager (operational permissions)

3. **Operator Account**
   - Email: `operator@nyumbani.com`
   - Password: `operator123`
   - Role: Operator (data entry permissions)

### Login Flow

1. Navigate to `/login`
2. Enter one of the demo credentials above
3. Click "Sign In"
4. You'll be automatically redirected to `/dashboard`
5. Your session is stored in browser localStorage

### Logout

- Click your user profile icon in the bottom of the sidebar
- Select "Log out" from the dropdown menu
- You'll be redirected to the login page

## Architecture

### Authentication System

The authentication system consists of:

- **AuthContext** (`lib/auth-context.tsx`) - Manages user state and authentication logic
- **useAuth Hook** - Provides authentication state and functions to any component
- **ProtectedRoute** (`components/protected-route.tsx`) - Wraps dashboard routes to require authentication
- **Login Page** (`app/login/page.tsx`) - Handles user sign-in
- **AuthProvider** - Wraps the app layout to provide auth context globally

### Route Structure

```
/                          → Redirects to /landing
/landing                   → Landing page with feature overview
/login                     → Public login page
/dashboard                 → Protected: Dashboard home with KPIs
/sourcing                  → Protected: Sourcing module
/production                → Protected: Production module
/inventory                 → Protected: Inventory module
/zoho                      → Protected: Zoho integration module
/costs                     → Protected: Cost management module
/reports                   → Protected: Reports and analytics module
```

### Protected Routes

All dashboard routes (`/dashboard/*`) are protected by the `ProtectedRoute` component. If a user tries to access a protected route without authentication, they're redirected to `/login`.

## Session Management

- Sessions are stored in browser **localStorage** under the key `auth_user`
- Sessions persist across browser tabs and page refreshes
- Logout clears the session from localStorage

## Development

### Installing Dependencies

```bash
pnpm install
```

### Running the Development Server

```bash
pnpm dev
```

The app will be available at `http://localhost:3000`

### Building for Production

```bash
pnpm build
pnpm start
```

## Design System

The application follows a dark-mode-native design with the Nyumbani Greens brand colors:

- **Primary Green**: `#2D8A3E` - Used for primary actions and accents
- **Harvest Gold**: `#D4A017` - Used for secondary accents and highlights
- **Neutral Black**: `#171717` - Background color
- **Text Primary**: White/Light Gray - Main text
- **Text Muted**: Medium Gray - Secondary text

### Fonts

- **Inter** - All UI text
- **JetBrains Mono** - Technical labels (PO numbers, SKU codes)

## Key Components

### Navigation & Layout

- **Sidebar** - Main navigation with collapsible menu and user profile
- **Dashboard Layout** - Wraps all dashboard pages with sidebar and header
- **Protected Route** - Ensures only authenticated users can access dashboard

### Common UI Patterns

- **Pill Buttons** - Primary CTAs with rounded ends (9999px)
- **Status Pills** - Color-coded status indicators
- **Data Tables** - Sortable, filterable tables with pagination
- **Modal Dialogs** - For creating and editing records
- **Cards** - For displaying metrics and data

## Workflow Examples

### Creating a Purchase Order (PO)

1. Navigate to `/sourcing`
2. Click "+ New PO" in the top right
3. Fill in supplier, product details, and quantities
4. Add multiple line items as needed
5. Review the running total
6. Click "Create PO"
7. View the PO in the list with status tracking

### Tracking a Batch Through Production

1. Go to `/production`
2. See the pipeline showing 4 stages: Intake, Grading, Processing, Packaging
3. Drag batches between stages (interactive)
4. Click a batch card to see detailed line items
5. View any variance alerts or wastage

### Managing Inventory

1. Navigate to `/inventory`
2. See punnets grouped by product and batch
3. Track freshness with color-coded indicators
4. Record shrinkage or issues
5. Click "Issue to Zoho" to sync inventory adjustments

## Demo Data

The system comes with sample data pre-populated for demonstration:

- Sample POs from various suppliers
- Active batches in different production stages
- Inventory snapshots with freshness data
- Historical cost data and trends
- Zoho sync logs and SKU mappings

## Notes for Production Implementation

This demo version uses client-side authentication suitable for testing and evaluation. For a production deployment, consider:

1. **Database Integration** - Replace localStorage with a proper database (Supabase, PostgreSQL, etc.)
2. **User Management** - Implement proper user registration and password management
3. **Authentication Service** - Use Auth.js or Supabase Auth for robust authentication
4. **Session Management** - Use secure HTTP-only cookies instead of localStorage
5. **Role-Based Access Control** - Implement server-side permission checks
6. **Data Persistence** - Connect to real database for POs, batches, inventory, etc.
7. **API Routes** - Create backend API for all data operations
8. **Validation** - Add comprehensive form validation and error handling

## Support

For issues or questions about the system, please refer to the inline documentation or contact the development team.

---

Built with Next.js, React, TypeScript, and Tailwind CSS.
