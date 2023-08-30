import os
from django.core.management.base import BaseCommand
from accounts.models import User

class Command(BaseCommand):
    def handle(self, *args, **options):
        if not User.objects.filter(email='Lavpreet@myemail.com').exists():
            User.objects.create_superuser('Lavpreet@myemail.com', 'Test@123')
            print("Superuser created")
        else:
            print("Superuser Already Created")