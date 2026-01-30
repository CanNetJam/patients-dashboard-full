## Future Improvements

### Database & Persistence
- Move database credentials to environment variables
- Add separate configuration for development and production
- Replace in-memory models / interfaces with proper ORM entities
(e.g. TypeORM, Prisma, Mongoose, Entity Framework Core)

### Authentication & Authorization
- Implement secure authentication using JWT, OAuth, or HttpOnly cookies
- Add middleware for protected routes
- Introduce role-based access control (RBAC) for different user levels

### Backend Caching
- Integrate Redis for caching frequently accessed data
- Reduce database load and improve response times

### File Storage & CDN
- Offload file storage to AWS S3
- Use a CDN for faster and more reliable file delivery

### Testing & CI/CD
- Add integration and E2E tests
- Set up automated testing via CI pipeline

### Observability
- Structured logging
- Monitoring and alerting