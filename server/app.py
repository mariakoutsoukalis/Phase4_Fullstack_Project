from flask import make_response, jsonify, request, render_template
from faker import Faker
from flask import Flask
from models import db, BookClub, DiscussionPost, Book, User, UserBookClubAssociation
from datetime import datetime
from flask_migrate import Migrate


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
migrate = Migrate(app, db)
db.init_app(app)

"""Route for Flask Initialization"""
# GET route to access database.
#curl -i http://127.0.0.1:5000/
@app.route("/")
def root():
    return "<h1>Flask application is active!</h1>"

"""Route for User"""
#curl i- http://127.0.0.1:5000/users
@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([user.to_dict(rules=('-password', '-discussion_posts', '-bookclub_associations')) for user in users])

@app.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get(user_id)
    return jsonify(user.to_dict(rules=('-password', '-discussion_posts', '-bookclub_associations')))

"""Route for BookClub"""
#curi i- http://127.0.0.1:5000/bookclubs
@app.route('/bookclubs', methods=['GET'])
def get_bookclubs():
    bookclubs = BookClub.query.all()
    return jsonify([bookclub.to_dict() for bookclub in bookclubs])

@app.route('/bookclubs/<int:bookclub_id>', methods=['GET'])
def get_bookclub(bookclub_id):
    bookclub = BookClub.query.get(bookclub_id)
    return jsonify(bookclub.to_dict())

"""Routes for DiscussionPost"""
#Route for Discussion Post by Book Club
#curl -i http://127.0.0.1:5000/discussions/bybookclub/<int:bookclub_id>
@app.route('/discussions/bybookclub/<int:bookclub_id>', methods=['GET'])
def get_discussions_by_bookclub(bookclub_id):
    posts = DiscussionPost.query.filter_by(bookclub_id=bookclub_id).all()
    return jsonify([post.to_dict() for post in posts])

#curl -i http://127.0.0.1:5000/discussions
@app.route('/discussions', methods=['GET'])
def get_discussion_posts():
    posts = DiscussionPost.query.all()
    return jsonify([post.to_dict(rules=('-user', '-bookclub')) for post in posts])

@app.route('/discussions/<int:post_id>', methods=['GET'])
def get_discussion_post(post_id):
    post = DiscussionPost.query.get(post_id)
    return jsonify(post.to_dict())

#curl -X DELETE http://127.0.0.1:5000/discussions/1
@app.route('/discussions/<int:post_id>', methods=['DELETE'])
def delete_discussion_post(post_id):
    post = DiscussionPost.query.get(post_id)
    if not post:
        return jsonify({"error": "Post not found"}), 404
    db.session.delete(post)
    db.session.commit()
    return jsonify({"message": "Post deleted"}), 200

#curl -X PATCH http://127.0.0.1:5000/discussions/1 -H "Content-Type: application/json" -d '{"content":"Updated post content"}'
@app.route('/discussions/<int:post_id>', methods=['PATCH'])
def update_discussion_post(post_id):
    post = DiscussionPost.query.get(post_id)
    if not post:
        return jsonify({"error": "Post not found"}), 404
    new_content = request.json.get('content')
    if new_content:
        post.content = new_content
        db.session.commit()
        return jsonify(post.to_dict()), 200
    return jsonify({"error": "No content provided"}), 400

#curl -X POST http://127.0.0.1:5000/discussions/1 \ -H "Content-Type: application/json" \ -d '{"content": "Buenos Dias"}'
@app.route('/discussions/<int:bookclub_id>', methods=['POST'])
def create_discussion_post(bookclub_id):
    def get_fake_user_id():
        fake = Faker()
        return fake.random_int(min=1, max=10)  # Adjust the range as needed

    def get_fake_likes():
        fake = Faker()
        return fake.random_int(min=0, max=500)  # Adjust the range as needed for likes

    user_id = get_fake_user_id()
    likes = get_fake_likes()  # Generate fake likes
    content = request.json.get('content')
    
    if not content:
        return jsonify({"error": "No content provided"}), 400

    post_date = datetime.utcnow()  # Sets the current UTC time as the post date
    post = DiscussionPost(content=content, post_date=post_date, likes=likes, user_id=user_id, bookclub_id=bookclub_id)
    
    db.session.add(post)
    db.session.commit()
    return jsonify(post.to_dict()), 201

"""Route for Books"""
#Route for Books by BookClub
#curl -i http://127.0.0.1:5000/books/bybookclub/<int:bookclub_id>
@app.route('/books/bybookclub/<int:bookclub_id>', methods=['GET'])
def get_books_by_bookclub(bookclub_id):
    books = Book.query.filter_by(bookclub_id=bookclub_id).all()
    return jsonify([book.to_dict() for book in books])

#curl -i http://127.0.0.1:5000/books
@app.route('/books', methods=['GET'])
def get_books():
    books = Book.query.all()
    return jsonify([book.to_dict() for book in books])

@app.route('/books/<int:book_id>', methods=['GET'])
def get_book(book_id):
    book = Book.query.get(book_id)
    return jsonify(book.to_dict())


"""Route for UserBookClubAssociation"""
#curl -i http://127.0.0.1:5000/user_bookclub
@app.route('/user_bookclub', methods=['GET'])
def get_user_bookclub_associations():
    associations = UserBookClubAssociation.query.all()
    return jsonify([association.to_dict(rules=('-user', '-bookclub')) for association in associations])


if __name__ == "__main__":
    app.run(debug=True)