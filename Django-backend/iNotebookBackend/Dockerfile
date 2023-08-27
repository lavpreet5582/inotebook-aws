# # Use the official Python image as the base image
# FROM python:3.10-alpine as pythonWork

# # Set environment variables
# ENV PYTHONDONTWRITEBYTECODE 1
# ENV PYTHONUNBUFFERED 1

# # Set the working directory inside the container
# WORKDIR /app

# # Install system dependencies
# # RUN apt-get update && apt-get install -y gcc libpq-dev

# # Copy the requirements file to the container
# COPY requirements.txt .
# RUN pip install --upgrade pip

# # Install Python dependencies
# RUN pip install --no-cache-dir -r requirements.txt

# # Copy the rest of the backend files to the container
# COPY . .

# COPY ./entrypoint.sh /
# # Expose the port on which the backend will run
# # EXPOSE 8000

# # # Command to start the Django development server
# # CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
# ENTRYPOINT [ "sh", "/entrypoint.sh" ]

#new image 




# Use the official Python image as the base image
FROM python:3.10-slim-buster as pythonWork


# Set the working directory inside the container
WORKDIR /app

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1


# Install system dependencies
RUN apt-get update && apt-get install -y --fix-missing gcc libpq-dev build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy the requirements file to the container
COPY requirements.txt .
RUN pip install --upgrade pip

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the backend files to the container
COPY . .

# COPY ./entrypoint.sh /
# Expose the port on which the backend will run
# EXPOSE 8000

# # Command to start the Django development server
# CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
# ENTRYPOINT [ "sh", "/entrypoint.sh" ]
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
