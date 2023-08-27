from django.contrib import admin
from notes.models import *
# Register your models here.
class NotesAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'created_at', 'updated_at', 'tag')  # Customize the fields displayed in the list view
    search_fields = ('title', 'id')  # Add search functionality based on these fields
    list_filter = ('tag',)  # Add filters to the right sidebar


admin.site.register(Notes, NotesAdmin)