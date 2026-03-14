# Stage 1: Build the React Frontend
FROM node:18-alpine AS frontend-builder
WORKDIR /app/frontend
COPY sleepeace-new-main/package*.json ./
RUN npm install
COPY sleepeace-new-main/ ./
RUN npm run build

# Stage 2: Build the Python Backend
FROM python:3.10-slim
WORKDIR /app

# Install backend dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend source code (now in root)
COPY . ./

# Copy the frontend build from Stage 1 into the backend's static folder
COPY --from=frontend-builder /app/frontend/dist ./static

# Expose the port
EXPOSE 8000

# Start the application
CMD ["python", "main.py"]
