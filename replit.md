# Site Surgeon - Website Performance Audit Tool

## Overview

Site Surgeon is a comprehensive website audit tool that combines Google Lighthouse performance testing with additional SEO and accessibility checks. The application provides professional audit reports with actionable insights, generating both HTML and PDF reports for clients. Built as a full-stack TypeScript application with React frontend and Express backend, it integrates with GoHighLevel (GHL) for automated lead capture and follow-up workflows.

The system analyzes websites for performance metrics, SEO optimization, accessibility compliance, and provides prioritized recommendations with estimated implementation times. It's designed for digital agencies and SEO professionals who need quick, professional audit reports for client acquisition and retention.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

**January 8, 2025**
- Successfully implemented comprehensive Site Surgeon v1.0 application
- Built complete Node.js/Express API backend with Lighthouse integration
- Created React frontend with professional audit form and results dashboard
- Integrated Core Web Vitals analysis (LCP, INP, CLS) with visual status indicators
- Added SEO analysis including meta tags, heading structure, and E-E-A-T signals
- Implemented professional HTML/PDF report generation with mobile screenshots
- Added GoHighLevel webhook integration for automated lead capture
- Created priority-ranked fix recommendations with impact scoring system
- Application successfully running and responsive on port 5000

## System Architecture

**Frontend Architecture**
- React 18 with TypeScript using Vite for build tooling and development server
- Wouter for lightweight client-side routing instead of React Router
- shadcn/ui component library built on Radix UI primitives for consistent design system
- TanStack Query for server state management and API data fetching
- Tailwind CSS with custom design tokens for styling and responsive design
- Form handling with React Hook Form and Zod validation schemas

**Backend Architecture**  
- Express.js server with TypeScript support using ESM modules
- Modular route structure with separate audit processing pipeline
- Lighthouse integration for core performance metrics and Core Web Vitals
- Custom audit modules for extended SEO and accessibility checks
- Report generation system creating both HTML and PDF outputs
- Rate limiting and CORS protection for API security
- Static file serving for generated audit reports

**Audit Processing Pipeline**
- Lighthouse mobile audit execution with Chrome headless browser
- Additional SEO checks including meta tags, heading structure, and social media optimization
- Accessibility validation beyond Lighthouse's built-in checks
- Scoring algorithm that prioritizes fixes by impact and implementation difficulty
- Template-based report generation with dynamic data injection
- File system storage for generated reports with UUID-based organization

**Data Storage**
- Drizzle ORM configured for PostgreSQL with Neon Database integration
- Simple user management schema with username/password authentication
- In-memory storage fallback for development and testing environments
- Database migrations managed through Drizzle Kit

**Report Generation System**
- HTML template engine for dynamic report creation with embedded JavaScript
- PDF generation capability (implementation pending)
- Static asset serving through Express for report accessibility
- Structured scoring system with categorized recommendations
- Visual dashboard components for score visualization and metric display

**Integration Architecture**
- GoHighLevel webhook integration for automated lead capture
- Environment-based configuration for different deployment environments
- CORS configuration allowing frontend-backend communication
- RESTful API design with JSON request/response format

## External Dependencies

**Core Framework Dependencies**
- Express.js for backend server framework
- React 18 with TypeScript for frontend user interface
- Vite for frontend build tooling and development server
- Wouter for lightweight client-side routing

**UI and Styling**
- shadcn/ui component library built on Radix UI primitives
- Tailwind CSS for utility-first styling approach
- Radix UI components for accessible interface elements
- FontAwesome icons for visual elements and branding

**Performance and Audit Tools**
- Google Lighthouse for core performance metrics and auditing
- Chrome Launcher for headless browser automation
- Puppeteer for additional browser control and screenshot generation
- Custom audit modules for extended SEO and accessibility analysis

**Database and Storage**
- PostgreSQL as primary database with Neon Database hosting
- Drizzle ORM for type-safe database interactions
- Drizzle Kit for database schema management and migrations

**State Management and Data Fetching**
- TanStack Query for server state management and API caching
- React Hook Form for form state management and validation
- Zod for runtime type validation and schema definition

**Development and Build Tools**
- TypeScript for type safety across frontend and backend
- ESBuild for backend bundling and optimization
- PostCSS with Autoprefixer for CSS processing
- TSX for TypeScript execution in development environment

**Third-party Integrations**
- GoHighLevel CRM for lead capture and workflow automation
- Rate limiting middleware for API protection
- CORS middleware for cross-origin request handling
- Session management for user authentication (if implemented)

**Utility Libraries**
- UUID generation for unique report identification
- Day.js for date manipulation and formatting
- clsx and class-variance-authority for conditional CSS classes
- Lodash utilities for data manipulation (if needed)