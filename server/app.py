from flask import make_response, jsonify, request, render_template
from flask import Flask
from models import db, BookClub, DiscussionPost, Book, User, UserBookClubAssociation
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

"""Route for BookClub"""
#curi i- http://127.0.0.1:5000/bookclubs
@app.route('/bookclubs', methods=['GET'])
def get_bookclubs():
    bookclubs = BookClub.query.all()
    return jsonify([bookclub.to_dict() for bookclub in bookclubs])

"""Route for DiscussionPost"""
#curl -i http://127.0.0.1:5000/discussions
@app.route('/discussions', methods=['GET'])
def get_discussion_posts():
    posts = DiscussionPost.query.all()
    return jsonify([post.to_dict(rules=('-user', '-bookclub')) for post in posts])

"""Route for Books"""
#curl -i http://127.0.0.1:5000/books
@app.route('/books', methods=['GET'])
def get_books():
    books = Book.query.all()
    return jsonify([book.to_dict() for book in books])

"""Route for UserBookClubAssociation"""
#curl -i http://127.0.0.1:5000/user_bookclub
@app.route('/user_bookclub', methods=['GET'])
def get_user_bookclub_associations():
    associations = UserBookClubAssociation.query.all()
    return jsonify([association.to_dict(rules=('-user', '-bookclub')) for association in associations])


if __name__ == "__main__":
    app.run(debug=True)