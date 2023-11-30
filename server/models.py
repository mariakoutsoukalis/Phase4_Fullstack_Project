from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import Column, Integer, String, Boolean, CheckConstraint, Text, ForeignKey
from sqlalchemy.orm import validates
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.associationproxy import association_proxy
from datetime import datetime
import re

db = SQLAlchemy()

class UserBookClubAssociation(db.Model, SerializerMixin):
    __tablename__ = 'user_bookclub_association'
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    bookclub_id = db.Column(db.Integer, db.ForeignKey('bookclubs.id'), primary_key=True)

    # Relationships
    user = db.relationship('User', back_populates='bookclub_associations')
    bookclub = db.relationship('BookClub', back_populates='user_associations')
    serialize_rules = ('-user', '-bookclub')

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    username = Column(String(20), unique=True, nullable=False)
    password = Column(String(20), nullable=False)
    first_name = Column(String(20), nullable=False)
    last_name = Column(String(20), nullable=False)
    last_login = Column(String(20), nullable=False)
    email = Column(String(20), unique=True, nullable=False)

    # One-to-Many: A user can have many discussion posts
    discussion_posts = db.relationship('DiscussionPost', back_populates='user')

    bookclub_associations = db.relationship('UserBookClubAssociation', back_populates='user')

    serialize_rules = ('-password', '-discussion_posts', '-bookclub_associations')
    
    @validates("username")
    def validate_username(self, key, username):
        if len(username) < 1:
            raise ValueError("Username must be at least 1 character long")
        return username
    
    @validates('first_name')
    def validate_first_name(self, key, first_name):
        if len(first_name) < 1:
            raise ValueError("First name must be at least 1 character long")
        if not re.match(r"^[a-zA-Z]+$", first_name):
            raise ValueError("First name must contain only letters")
        return first_name
    
    @validates('last_name')
    def validate_last_name(self, key, last_name):
        if len(last_name) < 1:
            raise ValueError("Last name must be at least 1 character long")
        if not re.match(r"^[a-zA-Z]+$", last_name):
            raise ValueError("Last name must contain only letters")
        return last_name
    
    @validates('email')
    def validate_email(self, key, email):
        # Regular expression for validating an Email
        email = email.lower()  # Convert email to lowercase
        email_regex = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
        if not re.match(email_regex, email):
            raise ValueError("Invalid email format")
        return email

class BookClub(db.Model, SerializerMixin):
    #Add a image url to table
    __tablename__ = "bookclubs"
    id = Column(Integer, primary_key=True)
    name = Column(String(20), unique=True, nullable=False)
    description = Column(Text, nullable=False)
    image_url = Column(String(255)) 

    # One-to-Many: A book club can have many books
    books = db.relationship('Book', back_populates='bookclub')

    # One-to-Many: A book club can have many discussion posts
    discussion_posts = db.relationship('DiscussionPost', back_populates='bookclub')

    user_associations = db.relationship('UserBookClubAssociation', back_populates='bookclub')

    serialize_rules = ('-books.discussion_posts', '-discussion_posts.user')


class DiscussionPost(db.Model, SerializerMixin):
    __tablename__ = 'discussion_posts'
    
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    post_date = Column(String(20), nullable=False)
    likes = Column(Integer, nullable=False)

    # Foreign Key: Linking each post to a user
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    # Relationship back to user
    user = db.relationship('User', back_populates='discussion_posts')
    
    # Foreign Key: Linking each book to a book club
    bookclub_id = db.Column(db.Integer, db.ForeignKey('bookclubs.id'))

    # Relationship back to book club
    bookclub = db.relationship('BookClub', back_populates='discussion_posts')

    serialize_rules = ('-user', '-bookclub')


class Book(db.Model, SerializerMixin):
    __tablename__ = 'books'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    author = db.Column(db.String(100))
    ISBN = db.Column(db.String(13), unique=True, nullable=False)
    summary = db.Column(db.Text, nullable=False)

    # Foreign Key: Linking each book to a book club
    bookclub_id = db.Column(db.Integer, db.ForeignKey('bookclubs.id'))

    # Relationship back to book club
    bookclub = db.relationship('BookClub', back_populates='books')

    serialize_rules = ('-bookclub',)