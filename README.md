# Triply

Triply is a web application powered by **Node.js (Express)**, **React**, **Vite**, **Vercel**, and **MongoDB**. Users can create accounts, make trips with friends, and share photos and memories. It's designed to make reliving your adventures easy and fun.

##  Features
- **User Accounts**: Sign-up, login/logout, session cookies, customize account page
- **Trip Creation**: Create solo or shared trips
- **Media Sharing**: Upload photos and share memories.
- **Interactive Maps**: Integrates Google Maps for trip location viewing

---

##  Tech Stack
- **Server**: Node.js with Express
- **Client**: React (using Vite)
- **DB**: MongoDB/Mongoose
- **Deployment**: Vercel

---

##  Getting Started

### Prerequisites
Before you begin, ensure you have:
- Git installed
- Node.js (v16 or newer) and npm
- A GitHub account
- A Vercel account

### Installation & Setup
1. **Clone the repository**
   
   `git clone https://github.com/bridgetorr17/TripPlanner-React.git`
2. **Intall dependencies**

   - note that there are 2 npm packages to be installed, in the root directory and in the server folder.
     
   `npm install`
3. **Create a vercel project**
   
   - Add a new project on vercel via importing your cloned Git repository
   - If you don't see the repo, you might need to authorize Vercel in Github. Go to Profile -> Settings -> Applications
4. **Update root directory package.json file with repo URLs**
5. **Get environement variables for .env.local file**

   - Contact project owner
6. **Launch application locally**
   
   `vercel dev`
