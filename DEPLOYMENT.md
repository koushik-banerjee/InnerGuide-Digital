# Digital Psychological Intervention System - Deployment Guide

## Prerequisites

- Node.js 18+ and npm
- MongoDB instance (MongoDB Atlas recommended for production)
- Git
- GitHub account (for GitHub deployment)

## Environment Variables

Create a `.env.local` file with the following variables:

\`\`\`env
# Database
MONGODB_URI=your_mongodb_connection_string

# Authentication
JWT_SECRET=your_very_secure_jwt_secret_key

# Socket.io
NEXT_PUBLIC_BASE_URL=http://localhost:3000  # Update for production

# API Keys (if using specific providers)
# For AI SDK with Vercel AI Gateway (default - no key needed)
# Or add provider-specific keys if using custom models
\`\`\`

## Local Development

1. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

2. **Run the development server:**
   \`\`\`bash
   npm run dev
   \`\`\`

3. **Access the application:**
   Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment to Vercel

### Method 1: Using GitHub

1. **Push your code to GitHub:**
   \`\`\`bash
   git remote add origin https://github.com/yourusername/your-repo.git
   git branch -M main
   git push -u origin main
   \`\`\`

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure environment variables in Vercel dashboard
   - Deploy

### Method 2: Using Vercel CLI

1. **Install Vercel CLI:**
   \`\`\`bash
   npm i -g vercel
   \`\`\`

2. **Deploy:**
   \`\`\`bash
   vercel
   \`\`\`

3. **Follow the prompts and configure environment variables**

## Database Setup

### MongoDB Atlas (Recommended for Production)

1. Create a cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a database user with username and password
3. Whitelist your IP address
4. Get the connection string and add to `MONGODB_URI`

### Schema Initialization

Run the following script to initialize collections:

\`\`\`javascript
// In MongoDB shell or MongoDB Compass
db.createCollection('users');
db.createCollection('counselors');
db.createCollection('bookings');
db.createCollection('forumthreads');
db.createCollection('resources');
db.createCollection('analytics');
db.createCollection('notifications');
db.createCollection('volunteers');
db.createCollection('chatmessages');
\`\`\`

## Socket.io Configuration for Production

Update the Socket.io CORS settings in `lib/socket.ts`:

\`\`\`typescript
cors: {
  origin: 'https://yourdomain.com',
  credentials: true,
}
\`\`\`

## Security Best Practices

1. **JWT Secret:** Use a strong, random 32+ character secret
2. **HTTPS:** Ensure all traffic is encrypted in production
3. **Environment Variables:** Never commit sensitive data
4. **CORS:** Configure allowed origins appropriately
5. **Rate Limiting:** Consider implementing rate limiting for API endpoints
6. **Data Encryption:** For sensitive health data, consider additional encryption

## Monitoring & Analytics

- Enable Vercel Analytics for performance monitoring
- Set up MongoDB Atlas alerts for database issues
- Monitor Socket.io connections and events

## Backup Strategy

1. **Database Backups:** Enable automated backups in MongoDB Atlas
2. **Code Backups:** Maintain GitHub repository backups
3. **Data Export:** Regularly export analytics and user data for analysis

## Scaling Considerations

- **Database:** MongoDB Atlas auto-scaling for production workloads
- **Socket.io:** Use Redis adapter for multi-instance deployments
- **CDN:** Enable Vercel's Edge Network for static assets
- **Caching:** Implement Redis caching for frequently accessed data

## Support & Maintenance

- Monitor error logs via Vercel dashboard
- Set up email notifications for critical issues
- Schedule regular security updates
- Monitor API rate limits and quotas

## Troubleshooting

**Socket.io connection issues:**
- Check CORS configuration
- Verify network connectivity
- Check firewall settings

**MongoDB connection issues:**
- Verify connection string
- Check IP whitelist in MongoDB Atlas
- Ensure network connectivity from Vercel

**Authentication issues:**
- Verify JWT_SECRET is set correctly
- Check token expiration settings
- Verify CORS for authentication endpoints
