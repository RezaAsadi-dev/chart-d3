# 📊 Chart D3 - D3.js Chart Project

This project is a React application designed to display interactive charts using the D3.js library.

## 🚀 Features

- **Interactive Charts**: Using D3.js to create dynamic and interactive charts
- **React + TypeScript**: Development with React and TypeScript for safe coding
- **Tailwind CSS**: Beautiful and responsive design with Tailwind CSS
- **Vite**: High-speed development with Vite
- **Data Loading**: Fetching data from external JSON file
- **Loading State**: Displaying skeleton during loading
- **Error Handling**: Proper error management

## 🛠️ Technologies Used

- **React 19**: Main UI library
- **TypeScript**: For type safety
- **D3.js**: For creating interactive charts
- **Tailwind CSS**: For styling
- **Vite**: For build and development
- **ESLint**: For code linting

## 📦 Installation and Setup

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation Steps

1. **Clone the project**:

```bash
git clone <repository-url>
cd chart-d3
```

2. **Install dependencies**:

```bash
npm install
```

3. **Run the project in development mode**:

```bash
npm run dev
```

4. **Open browser**:
   The project will be accessible at `http://localhost:5173`.

## 🏗️ Building the Project

To build the production version:

```bash
npm run build
```

## 📁 Project Structure

```
chart-d3/
├── public/
│   ├── data.json          # Chart data
│   └── logo.svg
├── src/
│   ├── components/
│   │   ├── Chart.tsx      # Main chart component
│   │   ├── ChartContainer.tsx  # Chart container
│   │   └── SkeletonChart.tsx   # Loading skeleton
│   ├── types/
│   │   └── chart.ts       # Chart type definitions
│   ├── assets/
│   ├── App.tsx           # Main component
│   ├── main.tsx          # Entry point
│   └── style.css         # Main styles
├── package.json
├── vite.config.ts
└── tsconfig.json
```


## 🎯 Main Components

### ChartContainer

- Managing chart states
- Loading data from API
- Displaying loading and error states

### Chart

- Rendering charts with D3.js
- Supporting different data types
- User interaction

### SkeletonChart

- Displaying skeleton during loading
- Improving user experience

