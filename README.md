# microservice-app


## Prerequisites

Before setting up the project, ensure you have the following installed on your system:

- **Node.js** (version 14 or higher)
- **npm** (Node Package Manager)
- **Git** (for cloning the repository)
- **Docker** (optional, for running services locally if needed)

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/your-repo-name.git

   npm install

├── src
│   ├── e2e
│   │   ├── tests
│   │   │   ├── tasks.spec.ts
│   │   ├── pages
│   │   │   ├── login.page.ts
│   │   │   ├── tasks.page.ts
│   ├── test-data
│   │   ├── testData.ts
├── playwright.config.ts
├── package.json
├── tsconfig.json
├── .env
└── README.md


# .env file
BASE_URL=https://your-live-system-url.com
USERNAME=your-username
PASSWORD=your-password


npx playwright test

npx playwright show-report
