from django.db import models
from django.conf import settings

# Create your models here.

class Notes(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    title = models.CharField(max_length=100)
    description = models.TextField()
    tag = models.CharField(max_length=100)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='notes', on_delete=models.CASCADE, null=True, default=None)

    def __str__(self):
        return self.title

    class Meta:
        db_table = 'Notes'
        ordering = ['-created_at']