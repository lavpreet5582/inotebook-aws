from django.contrib import admin
from accounts.models import *
# Register your models here.
class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'first_name', 'last_name', 'is_active')  # Customize the fields displayed in the list view
    search_fields = ('email', 'first_name', 'last_name')  # Add search functionality based on these fields
    list_filter = ('is_active',)  # Add filters to the right sidebar


admin.site.site_header = 'iNotebook Admin'
admin.site.site_title = 'iNotebook Admin Portal'
admin.site.index_title = 'Welcome to iNotebook Admin Portal'

admin.site.register(User, UserAdmin)