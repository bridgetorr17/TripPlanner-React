# Triply

Triply is a web application powered by **Node.js (Express)**, **React**, **Vite**, **Vercel**, and **MongoDB**. Users can create accounts, make trips with friends, and share photos and memories. It's designed to make reliving your adventures easy and fun.

##  Features
- **User Accounts**: Secure sign-up and authentication.
- **Trip Creation**: Plan trips and invite friends.
- **Media Sharing**: Upload photos and share memories.
- **Interactive Maps**: Integrates Google Maps for location-based features.

---

##  Tech Stack
- **Server**: Node.js with Express
- **Client**: React (via Vite)
- **DB**: MongoDB
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
