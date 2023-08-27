from rest_framework import serializers
from notes.models import Notes


class NotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notes
        fields = ['id', 'title', 'description', 'tag', 'created_at', 'updated_at']