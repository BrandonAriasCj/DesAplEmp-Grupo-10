import random
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from news.models import Category, Reporter, Article, Tag

class Command(BaseCommand):
    help = "Seed the database with sample news articles"

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS("Starting to seed the database..."))

        # Crear categorías
        categories = ["Technology", "Sports", "Politics", "Science", "Entertainment"]
        category_objects = [Category.objects.create(name=name) for name in categories]

        # Crear etiquetas
        tags = ["Breaking", "Exclusive", "Trending", "Opinion", "Analysis"]
        tag_objects = [Tag.objects.create(name=name) for name in tags]

        # Crear usuarios y reporteros
        users = [
            {"username": "reporter1", "first_name": "John", "last_name": "Doe"},
            {"username": "reporter2", "first_name": "Jane", "last_name": "Smith"},
        ]

        reporter_objects = []
        for user_data in users:
            user = User.objects.create_user(
                username=user_data["username"],
                first_name=user_data["first_name"],
                last_name=user_data["last_name"],
                password="password123"
            )
            reporter_objects.append(Reporter.objects.create(user=user))

        # Crear artículos de prueba
        articles = [
            {"title": "Tech Innovations 2025", "content": "Latest trends in AI and tech."},
            {"title": "Championship Highlights", "content": "Exciting sports moments."},
            {"title": "Government Reforms", "content": "New policies being implemented."},
            {"title": "Space Exploration", "content": "NASA's latest discoveries."},
            {"title": "Hollywood Breaking News", "content": "Updates on major films."}
        ]

        for article_data in articles:
            article = Article.objects.create(
                title=article_data["title"],
                content=article_data["content"],
                reporter=random.choice(reporter_objects),
                category=random.choice(category_objects),
                status="published"
            )
            # Asignar etiquetas aleatorias
            article.tags.add(*random.sample(tag_objects, k=random.randint(1, 3)))

        self.stdout.write(self.style.SUCCESS("Seeding completed successfully!"))