# Troubleshooting Guide

## "Resource not accessible by personal access token" Error

### Possible Causes

1. **Incorrect Repository Name**
   - Default repository name is `hanon-uta/hanon-uta.github.io`
   - If this is your fork, you need to change it to your own repository name

2. **Insufficient Token Permissions**
   - Token must have `repo` permission (full control of private repositories)
   - Check if token has expired

3. **Repository Access Permissions**
   - Confirm you have write access to the repository
   - If it's a private repository, ensure token has appropriate permissions

### Solutions

#### 1. Configure Correct Repository Name

1. Click the extension icon
2. If you see the setup page, enter your repository name in the "GitHub Repository" input field
3. Format: `username/repository-name`
4. Example: `your-username/hanon-uta.github.io`
5. Click "Save Token"

#### 2. Recreate Token (if permissions are insufficient)

1. Visit https://github.com/settings/tokens
2. Delete old token (if exists)
3. Click "Generate new token" → "Generate new token (classic)"
4. Configure:
   - **Note**: Hanon Uta Uploader
   - **Expiration**: No expiration (or choose appropriate expiration time)
   - **Select scopes**: Check `repo` (this will automatically check all sub-options)
5. Click "Generate token"
6. **Copy the token immediately** (only shown once!)
7. Paste the new token in the extension

#### 3. Verify Repository Permissions

1. Visit your GitHub repository page
2. Confirm you are the Owner or have Write permission
3. If it's a fork, confirm the fork was successful

#### 4. Check if Repository is Private

If it's a private repository:
- Token must have `repo` permission
- Ensure your account has access permission

---

## Other Common Errors

### "Failed to extract data: Could not establish connection"

**Cause**: Content script not loaded

**Solution**:
1. Refresh the YouTube page
2. Click "Extract Data" again

### "Upload failed: The string to be encoded contains characters outside of the Latin1 range"

**Cause**: UTF-8 encoding issue (fixed)

**Solution**:
1. Refresh the extension
2. Upload again

### "File exists, updating..."

**Note**: This is normal behavior, not an error

**Solution**: No action needed, the extension will automatically update the file

---

## Testing Steps

### 1. Test if Token is Valid

Open browser console (F12) and run:

```javascript
fetch('https://api.github.com/user', {
  headers: {
    'Authorization': 'token YOUR_TOKEN_HERE'
  }
})
.then(r => r.json())
.then(data => console.log(data))
```

If user information is returned, the token is valid.

### 2. Test Repository Access

```javascript
fetch('https://api.github.com/repos/YOUR_USERNAME/YOUR_REPO', {
  headers: {
    'Authorization': 'token YOUR_TOKEN_HERE'
  }
})
.then(r => r.json())
.then(data => console.log(data))
```

If repository information is returned, you have access permission.

### 3. Test Write Permission

```javascript
fetch('https://api.github.com/repos/YOUR_USERNAME/YOUR_REPO/contents/README.md', {
  headers: {
    'Authorization': 'token YOUR_TOKEN_HERE'
  }
})
.then(r => r.json())
.then(data => console.log(data))
```

---

## Getting Help

If none of the above methods solve the problem:

1. **Check Browser Console**:
   - Press F12 to open Developer Tools
   - Check error messages in Console tab
   - Check request details in Network tab

2. **Check GitHub API Response**:
   - Find the failed request in Network tab
   - View response content
   - Usually contains detailed error information

3. **Confirm Environment**:
   - Browser version (recommend Chrome/Edge latest version)
   - Extension version
   - GitHub Token permissions
   - Repository name and permissions

---

## Quick Checklist

- [ ] Token created and copied correctly
- [ ] Token has `repo` permission
- [ ] Repository name format is correct (`username/repo-name`)
- [ ] You have write access to the repository
- [ ] Extension has been refreshed
- [ ] YouTube page has been refreshed
- [ ] No other errors in browser console

---

## Contact Support

If the problem persists, please provide the following information:

1. Complete error message
2. Error logs from browser console
3. Screenshot of GitHub Token permission settings
4. Repository name and access permissions
5. Browser version and extension version

