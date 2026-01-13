# Quick Package Creation Script

## Steps to Create Customer Package:

### 1. Create Deployment Folder
```
mkdir Sawbhavi-POS-Package
cd Sawbhavi-POS-Package
```

### 2. Copy These Files from your project:
- Copy entire `dist` folder → into package folder
- Copy `server.js` → into package folder  
- Copy `START_POS.bat` → into package folder
- Copy `package-deploy.json` → rename to `package.json` in package folder
- Copy `DEPLOYMENT_README.md` → rename to `README.md` in package folder

### 3. Your Package Structure Should Be:
```
Sawbhavi-POS-Package/
├── dist/              ← All website files
├── node_modules/      ← Will be created on customer PC
├── server.js
├── package.json
├── START_POS.bat
└── README.md
```

### 4. Give to Customer
- Zip the entire "Sawbhavi-POS-Package" folder
- Send to customer
- They extract and double-click START_POS.bat

---

## Testing Before Sending:

1. Create test folder
2. Copy required files
3. Double-click START_POS.bat
4. Should work immediately!

---

## Quick Command (Run from your project folder):

```powershell
# Create package folder
New-Item -ItemType Directory -Force -Path "../Sawbhavi-POS-Package"

# Copy files
Copy-Item -Path "dist" -Destination "../Sawbhavi-POS-Package/dist" -Recurse -Force
Copy-Item -Path "server.js" -Destination "../Sawbhavi-POS-Package/"
Copy-Item -Path "START_POS.bat" -Destination "../Sawbhavi-POS-Package/"
Copy-Item -Path "package-deploy.json" -Destination "../Sawbhavi-POS-Package/package.json"
Copy-Item -Path "DEPLOYMENT_README.md" -Destination "../Sawbhavi-POS-Package/README.md"

Write-Host "Package created in ../Sawbhavi-POS-Package"
Write-Host "Now zip it and send to customer!"
```
