import json
import os
from datetime import datetime
import subprocess

# === Helper Functions ===

def load_blog_posts():
    try:
        with open('./JSON/blog-posts.json', 'r') as file:
            return json.load(file)
    except FileNotFoundError:
        return {"posts": []}

def save_blog_posts(data):
    with open('./JSON/blog-posts.json', 'w') as file:
        json.dump(data, file, indent=4)

def load_projects():
    try:
        with open('./JSON/projects.json', 'r') as file:
            return json.load(file)
    except FileNotFoundError:
        return {"projects": []}

def save_projects(data):
    with open('./JSON/projects.json', 'w') as file:
        json.dump(data, file, indent=4)

def validate_url(url):
    return url.startswith(('http://', 'https://'))

def get_next_id(project_data):
    max_id = 0
    for project in project_data["featured"] + project_data["recent"]:
        if project["id"] > max_id:
            max_id = project["id"]
    return max_id + 1

def git_commands(title, file_name):
    try:
        # Git commands
        subprocess.run(["git", "add", file_name], check=True)
        commit_message = f"Add new {file_name.split('.')[0]}: {title}"
        subprocess.run(["git", "commit", "-m", commit_message], check=True)
        subprocess.run(["git", "push"], check=True)
        print("\nSuccessfully committed and pushed to git!")
    except subprocess.CalledProcessError as e:
        print(f"\nError with git commands: {e}")
        print("You may need to handle git operations manually.")
def push_all_git_commands():
    try:
        subprocess.run(["git", "add", "."], check=True)
        subprocess.run(["git", "commit", "-m", "Update all files"], check=True)
        subprocess.run(["git", "push"], check=True)
        print("\nSuccessfully committed and pushed to git!")
    except subprocess.CalledProcessError as e:
        print(f"\nError with git commands: {e}")
    except FileNotFoundError:
        print("\nNo git repository found. Please initialize a git repository in the project directory.")
# === Add Functions ===

def add_new_post():
    print("\n=== Adding New Blog Post ===")
    
    # Get basic information
    title = input("Enter post title: ")
    description = input("Enter post description: ")
    
    # Get URL
    print("\nEnter the writeup URL:")
    print("Example: https://example.com/writeups/my-ctf-writeup")
    link = input().strip()
    if not validate_url(link):
        print("Invalid URL. Please enter a valid URL starting with http:// or https://")
        return None
    
    # Tags
    print("\nEnter tags (comma-separated):")
    print("Example: Web Security, HTB, Privilege Escalation")
    tags = [tag.strip() for tag in input().split(',')]
    
    # Create post object
    new_post = {
        "title": title,
        "date": datetime.now().strftime("%Y-%m-%d"),
        "tags": tags,
        "description": description,
        "link": link
    }
    
    # Load existing posts and add new one
    blog_data = load_blog_posts()
    blog_data["posts"].insert(0, new_post)  # Add at the beginning
    save_blog_posts(blog_data)
    
    return title

def add_new_project():
    print("\n=== Adding New Project ===")
    
    # Get basic information
    title = input("Enter project title: ")
    description = input("Enter project description: ")
    image = input("Enter project image URL: ")
    github = input("Enter GitHub link: ").strip()
    if not validate_url(github):
        print("Invalid GitHub URL. Please enter a valid URL starting with http:// or https://")
        return None
    
    # Features
    print("Enter the features (comma-separated):")
    print("Example: User authentication, Real-time face detection")
    features = [tag.strip() for tag in input().split(',')]
    
    # Tech stack
    print("Enter the tech stack (comma-separated):")
    print("Example: React.js, Node.js, PostgreSQL")
    stack = [tag.strip() for tag in input().split(',')]
    
    # Implementation
    implementation = input("Enter implementation details: ")
    
    # Date
    date = input("Enter project date (e.g., February 2024): ")
    
    # Determine if the project is featured
    is_featured = input("Is this a featured project? (y/n): ").lower() == 'y'
    project_data = load_projects()
    next_id = get_next_id(project_data)
    # Create project object
    new_project = {
        "id": next_id,  # Unique ID based on timestamp
        "title": title,
        "description": description,
        "image": image,
        "github": github,
        "isFeatured": is_featured,
        "features": features,
        "stack": stack,
        "implementation": implementation,
        "date": date
    }
    
    # Load existing projects and add new one
    project_data = load_projects()
    if is_featured:
        project_data["featured"].insert(0, new_project)  # Add to featured
    else:
        project_data["recent"].insert(0, new_project)  # Add to recent
    save_projects(project_data)
    
    return title

# === Delete Functions ===

def delete_post():
    blog_data = load_blog_posts()
    if not blog_data["posts"]:
        print("No blog posts found to delete.")
        return
    
    print("\n=== Blog Posts ===")
    for i, post in enumerate(blog_data["posts"]):
        print(f"{i + 1}. {post['title']}")
    
    choice = int(input("Enter the number of the post to delete: ")) - 1
    if 0 <= choice < len(blog_data["posts"]):
        deleted_post = blog_data["posts"].pop(choice)
        save_blog_posts(blog_data)
        print(f"Deleted post: {deleted_post['title']}")
    else:
        print("Invalid choice.")

def delete_project():
    project_data = load_projects()
    if not project_data["featured"] and not project_data["recent"]:
        print("No projects found to delete.")
        return
    
    print("\n=== Projects ===")
    print("Featured Projects:")
    for i, project in enumerate(project_data["featured"]):
        print(f"{i + 1}. {project['title']} (ID: {project['id']}, Featured)")
    
    print("\nRecent Projects:")
    for i, project in enumerate(project_data["recent"]):
        print(f"{i + 1}. {project['title']} (ID: {project['id']})")
    
    choice = int(input("Enter the number of the project to delete: ")) - 1
    if 0 <= choice < len(project_data["featured"]):
        deleted_project = project_data["featured"].pop(choice)
        save_projects(project_data)
        print(f"Deleted featured project: {deleted_project['title']} (ID: {deleted_project['id']})")
    elif 0 <= choice - len(project_data["featured"]) < len(project_data["recent"]):
        deleted_project = project_data["recent"].pop(choice - len(project_data["featured"]))
        save_projects(project_data)
        print(f"Deleted recent project: {deleted_project['title']} (ID: {deleted_project['id']})")
    else:
        print("Invalid choice.")

# === Main Function ===

def main():
    print("=== Blog Post and Project Manager ===")
    
    while True:
        print("\nOptions:")
        print("1. Add a Blog Post")
        print("2. Add a Project")
        print("3. Delete a Blog Post")
        print("4. Delete a Project")
        print("5. Push all")
        print("6. Exit")
        
        choice = input("Enter your choice: ")
        
        if choice == '1':
            title = add_new_post()
            if title:
                git_choice = input("\nDo you want to commit and push to git? (y/n): ")
                if git_choice.lower() == 'y':
                    git_commands(title, "blog-posts.json")
        elif choice == '2':
            title = add_new_project()
            if title:
                git_choice = input("\nDo you want to commit and push to git? (y/n): ")
                if git_choice.lower() == 'y':
                    git_commands(title, "projects.json")
        elif choice == '3':
            delete_post()
        elif choice == '4':
            delete_project()
        elif choice == '5':
            push_all_git_commands()
            print("Exiting...")
            break
        elif choice == '6':
            print("Exiting...")
            break
        else:
            print("Invalid choice. Please try again.")

if __name__ == "__main__":
    main()