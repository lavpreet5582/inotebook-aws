#!/bin/bash

# Collect static files
echo "Collect static files"
python3 manage.py collectstatic --no-input
echo "Creating superuser"
python manage.py superusercreation
# Start server

# Migrate database
echo "Migrate database"
python manage.py migrate

echo "Starting server"
# python3 manage.py runserver 0.0.0.0:8000

gunicorn iNotebookBackend.wsgi:application --bind 0.0.0.0:8000

exec "$@"