from django.db import models

class Product(models.Model):
    CATEGORY_CHOICES = [
        ('flowers', 'Flowers'),
        ('technology', 'Technology'),
        ('education', 'Education'),
        ('animals', 'Animals'),
        ('historical', 'Historical Places'),
        ('natural', 'Natural Scene'),
        ('others', 'Others'),
    ]

    name = models.CharField(max_length=255)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='others')  # ✅ Category Field Added
    description = models.TextField()
    image = models.ImageField(upload_to='product_images/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} ({self.get_category_display()})"

    def edit(self, name, category, description, image=None):
        """Product update function"""
        self.name = name
        self.category = category
        self.description = description
        if image:
            self.image = image
        self.save()

    def short_description(self):
        """Return short version of description"""
        words = self.description.split()
        return ' '.join(words[:30]) + '...' if len(words) > 30 else self.description
