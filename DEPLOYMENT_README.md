# SAWBHAVI POS SYSTEM - DEPLOYMENT GUIDE

## For Customers (Shop Owners)

### System Requirements
- Windows 7/8/10/11
- 4GB RAM minimum
- 100MB free disk space
- Any modern web browser (Chrome/Edge/Firefox)

### Installation Steps

1. **Install Node.js** (One-time only)
   - Download from: https://nodejs.org
   - Install the LTS version (recommended)
   - Accept all default settings during installation

2. **Extract the POS folder**
   - Copy the entire "Sawbhavi-POS" folder to your desired location
   - Example: `C:\Program Files\Sawbhavi-POS`

3. **First Time Setup**
   - Open the folder
   - Double-click `START_POS.bat`
   - Wait for automatic installation (first time only - takes 1-2 minutes)
   - The app will open in your browser automatically

4. **Daily Usage**
   - Double-click `START_POS.bat` to start
   - App opens in your default browser
   - Do NOT close the black command window while using the app
   - Close browser tab when done
   - Press any key in the command window to exit

### Important Notes

✅ **Data Storage**: All your data stays on your PC (not in the cloud)
✅ **Offline**: Works completely offline - no internet required
✅ **Backup**: Your data is stored in your browser's database
✅ **Updates**: We will provide updated folders when available

### Troubleshooting

**Problem**: "Node.js is not installed" error
**Solution**: Install Node.js from https://nodejs.org

**Problem**: Browser doesn't open automatically
**Solution**: Manually open browser and goto: http://localhost:3000

**Problem**: Port 3000 already in use
**Solution**: Close other applications and try again

---

## For You (Distributor)

### Creating Customer Package

1. **Build the app** (when you make changes):
   ```
   npm run build
   ```

2. **Copy these files to customer folder**:
   - `dist/` folder (entire folder)
   - `server.js`
   - `START_POS.bat`
   - `package-deploy.json` (rename to `package.json`)
   - This `README.md`

3. **Create "Sawbhavi-POS" folder** with structure:
   ```
   Sawbhavi-POS/
   ├── dist/           (built app files)
   ├── server.js       (server file)
   ├── package.json    (dependencies)
   ├── START_POS.bat   (startup script)
   └── README.md       (this file)
   ```

4. **Zip it and send to customer**

### Updating Customer Systems

1. Build new version: `npm run build`
2. Send them new `dist/` folder
3. They replace old `dist/` folder with new one
4. Restart the app

### Licensing (Optional)

You can add license key verification in `server.js` if needed.

---

## Support

For technical support, contact your distributor.

Version: 1.0.0
Last Updated: December 2024
