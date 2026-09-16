# Chandrapura Kidney Care Hospital - Production Rollback & Disaster Recovery Plan

## 1. Objective & Rollback Triggers

This document defines standard operating procedures (SOP) to safely revert a failed production or staging deployment within **< 3 minutes**, guaranteeing zero patient data loss and maximum system availability.

### Automated Rollback Triggers

The deployment pipeline automatically cancels or triggers rollback if:

1. **Health Check Failure**: The post-deploy smoke test (`/api/health`) does not return `HTTP 200 { "status": "ok" }` within 60 seconds.
2. **Crash Loop / Startup Error**: The Node.js application process exits or fails to bind to the allocated port (`PORT=5000`).
3. **Database Migration Error**: SQLite schema migrations fail or corrupt existing table definitions.
4. **Elevated Error Rate**: Unhandled HTTP 500 exceptions exceed 1% of total incoming traffic within 5 minutes of deployment.

---

## 2. Deployment Architecture & Rollback Strategies

### Strategy A: Blue-Green / Zero-Downtime Container Switch (Recommended for Cloud/Docker)

1. **Current Production (Blue)** is live and handling patient traffic.
2. **New Release (Green)** is deployed to isolated port/container.
3. Automated integration smoke tests execute against Green container.
4. **On Success**: Reverse proxy / load balancer switches traffic from Blue to Green.
5. **On Failure**: Reverse proxy retains Blue traffic; Green container is terminated.
   - **Rollback Time**: `0 seconds` (traffic was never routed to Green).

### Strategy B: Container Image Tag Reversion (Docker / Kubernetes / Cloud Run)

When a regression is detected after traffic has routed:

1. Identify the last known good commit SHA or container tag (e.g., `ghcr.io/ari-23o/hospital:release-c536c43`).
2. Trigger the GitHub Actions manual workflow dispatch: `Deploy Production` with the specific rollback tag.
3. Pull previous image and restart the container:
   ```bash
   docker stop hospital-production
   docker rm hospital-production
   docker run -d --name hospital-production -p 5000:5000 \
     -v hospital_data:/app/server/data \
     --env-file /etc/hospital/production.env \
     ghcr.io/ari-23o/hospital:release-c536c43
   ```
4. Confirm health check:
   ```bash
   curl -f http://localhost:5000/api/health || exit 1
   ```

### Strategy C: Git-Based Monorepo Reversion (PM2 / Systemd / Bare Metal)

If deployed via bare-metal Node.js host with PM2:

1. SSH into the production server:
   ```bash
   cd /var/www/chandrapura-hospital
   ```
2. Checkout previous known stable tag/commit:
   ```bash
   git fetch origin
   git checkout tags/v1.0.0 # or specific commit SHA
   ```
3. Rebuild frontend bundle and restart server:
   ```bash
   npm run build:prod
   pm2 restart hospital-backend --update-env
   ```
4. Verify backend status:
   ```bash
   pm2 status
   curl -i http://localhost:5000/api/health
   ```

---

## 3. Database State & Preservation Procedures

SQLite uses Write-Ahead Logging (WAL) mode for concurrency and durability.

### Database Backup Prior to Deployment

Every CI/CD deployment execution takes an instantaneous snapshot:

```bash
# Automated pre-deployment snapshot
sqlite3 /app/server/data/hospital.db ".backup '/app/server/data/backups/hospital-predeploy-$(date +%s).db'"
```

### Database Recovery in Disaster Event

If schema corruption occurs during an update:

1. Stop backend service:
   ```bash
   pm2 stop hospital-backend
   # or docker stop hospital-production
   ```
2. Restore database from latest backup:
   ```bash
   cp /app/server/data/backups/hospital-predeploy-LATEST.db /app/server/data/hospital.db
   ```
3. Verify integrity:
   ```bash
   sqlite3 /app/server/data/hospital.db "PRAGMA integrity_check;"
   # Expected output: ok
   ```
4. Start backend service and verify API status.

---

## 4. Emergency Contacts & Escalation Matrix

| Role                         | Responsibility                              | Escalation Target                   |
| :--------------------------- | :------------------------------------------ | :---------------------------------- |
| **Lead DevOps Engineer**     | Pipeline execution & rollback orchestration | devops@chandrapurahospital.com      |
| **Lead Full-Stack Engineer** | Code regression analysis & hotfix creation  | engineering@chandrapurahospital.com |
| **Hospital Operations Lead** | Patient OPD & appointment continuity        | ops@chandrapurahospital.com         |
| **Data Protection Officer**  | Patient data integrity audit                | security@chandrapurahospital.com    |
