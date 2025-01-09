## TODOs:
- Improve site visuals (Add background image, some color and styling)
- Allow editing of own comments

<hr>

# 📝 Django Blog App

Welcome to the **Django Blog App**! This app allows users to create posts, interact with others' posts, and manage their profiles. 🚀

### Features 🌟

- **User Authentication**: 
  - Sign up, log in, and log out.
  - Change your password securely 🔑.
  
- **Blog Post Management**: 
  - Create, update, and delete your own blog posts ✍️.
  - View posts sorted by creation date 📅.
  - See detailed views of individual blog posts and their comments 💬.
  
- **Commenting**: 
  - Add comments to posts 📝.
  - Delete comments to your posts, if needed 🚮.
  
- **User Profiles**: 
  - Create and update your user profile 🧑‍💻.
  - Upload and choose a profile picture 📸.
  - View other users' profiles and their posts 👤.

### Technologies 🛠

- **Django**: A high-level Python framework that simplifies app development with built-in features like authentication, ORM, and routing.
- **Class-Based Views (CBVs)**: CBVs make the code more modular, reusable, and easier to maintain by handling common operations like creating, updating, and deleting resources with minimal boilerplate.
- **Bootstrap**: A front-end framework for creating responsive, mobile-first websites with pre-designed components, ensuring a polished UI with minimal effort.
- **SQLite**: Lightweight database for storing user data, posts, and comments (can be replaced with PostgreSQL or MySQL if needed).

### Installation 🏗

1. **Clone the repository**:
```bash
git clone https://github.com/yourusername/django-blog-app.git
```
2. **Navigate into the project directory:**:
```bash
cd django-blog-app
```
3. **Set up a virtual environment:**
```bash
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
```
4. **Install dependencies:**
```bash
pip install -r requirements.txt
```
5. **Apply migrations:**
```bash
python manage.py migrate
```
6. **Run the server:**
```bash
python manage.py runserver
```
7. **Visit http://localhost:8000 to see the app in action!** 🌍
