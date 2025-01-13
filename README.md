# 📝 Django Blog

This app made with Django allows users to create posts, interact with others' posts, and manage their profiles. 🚀

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
  - Edit your comments 
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
git clone https://github.com/damachad/django_blog.git
```
2. **Navigate into the project directory:**:
```bash
cd django_blog
```
3. **Set up a virtual environment:**
```bash
python -m venv venv
source venv/bin/activate
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

### Demo 🖥️

<div class="image-gallery">
  <img src="https://github.com/user-attachments/assets/fa336727-47d1-4606-95bf-3a84bd071d8d" alt="Dashboard" width="500">
  <img src="https://github.com/user-attachments/assets/1580cfd7-deb4-4b5c-a863-77442f2c40ad" alt="Profile view" width="500">
  <img src="https://github.com/user-attachments/assets/49501c3f-f2e3-4138-ade8-73f38a5830c3" alt="Example post" width="500">
  <img src="https://github.com/user-attachments/assets/08a51e6e-8707-4eb7-bb34-9722239e9585" alt="Example post and comments" width="500">
</div>

