# ParkEase

A comprehensive parking management system built with modern web technologies.

## 🌟 Overview

ParkEase is a full-stack parking management application that provides multiple interfaces for different user roles (customers, admins, valets, and managers). The project is structured as a monorepo using Yarn workspaces and nx, combining multiple front-end applications with a unified backend.

## 🏗️ Architecture

### Applications

- **web** - Customer-facing application
- **web-admin** - Administrative interface
- **web-valet** - Valet parking interface
- **web-manager** - Management dashboard
- **api** - Backend service

### Shared Libraries

- **3D** - 3D visualization components
- **UI** - Shared UI components
- **utils** - Common utility functions
- **network** - GraphQL type generation
- **forms** - Shared form components

## 🚀 Tech Stack

- **Frontend**: Next.js
- **Backend**: NestJS
- **API**: GraphQL + REST
- **Database**: Prisma
- **Development**:
  - Yarn Workspaces (Monorepo)
  - Nx(cache and running parallel scripts)
  - GraphQL Codegen
  - Custom Filters
  - Swagger Documentation

## 💻 Getting Started

### Prerequisites

- Node.js
- Yarn
- Docker (for development database)
- VS Code (recommended)

### Environment Setup

1. reference .env.example and create .env.development and .env.staging from it.
2. Replace environment with your own environment values

### Development Scripts

```bash
# Development
yarn dev              # Run all services in development mode
yarn dev:staging      # Run all services in staging mode
yarn dev:web          # Run web application only
yarn dev:api          # Run API service only

# Code Quality
yarn format           # Check formatting
yarn format:write     # Fix formatting
yarn tsc             # Type checking
yarn lint            # Lint check
yarn validate        # Run all validations

# Database
yarn recreate:dev     # Recreate development setup
yarn recreate:staging # Recreate staging setup

# Other
yarn commit          # Interactive commit with gitmoji
yarn style          # Format code
yarn cloc           # Count lines of code
```

## 🌈 Best Practices

The project implements several development best practices:

- **Commit Standards**: Uses Husky, commitlint, and gitmoji for consistent commit messages
- **Build Automation**: Comprehensive Makefile with documented commands
- **Code Quality**: Automated formatting and linting
- **API Documentation**: Swagger for REST API documentation
- **Type Safety**: Strong typing with TypeScript and GraphQL codegen

## 📚 Learning Guide

For developers looking to learn from this project:

1. Install the "Git Graph" extension in VS Code
2. Follow the commit history chronologically
3. Each commit represents a specific implementation step
4. Review commit messages for detailed context about changes

## 🚧 Known Issues

### Docker Setup

Currently experiencing issues with Prisma connection when running Docker Compose from the service directory. Temporary workaround:

1. Navigate to the `api` directory
2. Run Docker Compose from there

- Contributions to fix this issue are welcome!

## 🗺️ Roadmap

- [ ] Comprehensive testing implementation
- [ ] Production environment configuration
- [ ] Environment variable encryption/decryption with .envrc
- [ ] GitHub Actions for automated deployment
  - Disable automatic Vercel deployments
  - Implement manual deployment triggers
- [ ] System monitoring implementation
- [ ] Standardize as a reference architecture for startups

## 🤝 Contributing

Contributions are welcome! Especially looking for help with:

- Docker configuration improvements
- Testing implementation
- CI/CD pipeline setup

## 📝 Notes for Contributors

This project aims to serve as a reference implementation for modern web application development. It's designed to demonstrate best practices and provide a learning resource for developers and organizations.

---

For detailed documentation and API references, please check the respective application directories.
