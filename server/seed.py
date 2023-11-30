from faker import Faker
from models import User, BookClub, DiscussionPost, Book, UserBookClubAssociation
from random import choice, randint, random
from models import db
from app import app
from datetime import datetime, timedelta

fake = Faker()

def create_users():
    for i in range(1, 11):
        first_name = fake.first_name()
        last_name = fake.last_name()

        # Generate a random date within the last 30 days
        days_ago = randint(0, 29)
        date = (datetime.now() - timedelta(days=days_ago)).strftime('%Y-%m-%d')
        time = fake.time()
        last_login_date = f"{date} {time}"

        user = User(
            username=f"{first_name}_{last_name}".lower(),
            password=fake.password(),
            first_name=first_name,
            last_name=last_name,
            last_login=last_login_date,
            email=f"{first_name.lower()}.{last_name.lower()}@example.com"
        )
        db.session.add(user)
    db.session.commit()

def create_bookclubs():
    pairs = [
    ("Mystery Masters", "A group for enthusiasts who relish unraveling the twists and turns of mystery novels, from classic whodunits to contemporary thrillers."),
    ("Fantasy Realm Readers", "This club dives into the imaginative worlds of fantasy literature, exploring epic sagas, magical realms, and mythical creatures."),
    ("Sci-Fi Explorers Club", "A haven for those passionate about science fiction, discussing everything from space operas to dystopian futures and advanced technologies."),
    ("Historical Fiction Chronicles", "A gathering for lovers of historical fiction, where members travel back in time through stories that blend real history with rich narrative."),
    ("Romantic Hearts Book Club", "For those who adore romance novels, this club explores tales of love, relationships, and emotional journeys across various settings."),
    ("Biography Buffs Circle", "A forum for readers fascinated by biographies and memoirs, delving into the lives and experiences of notable figures from past and present.")
]
    for name, description in pairs:
        bookclub = BookClub(
            name=name,
            description=description
        )

        db.session.add(bookclub)
    db.session.commit()

def create_discussion_posts():

    books_data = [
        # Mystery Masters
        {"bookclub_category": "Mystery Masters", "title": "Shadows Over Baker Street", "author": "Sarah J. Maas", "ISBN": "978-0316253031", "summary": "A thrilling mystery set in Victorian London, where a brilliant detective unravels a series of enigmatic crimes entangled with dark secrets."},
        {"bookclub_category": "Mystery Masters", "title": "The Last Alibi", "author": "David Ellis", "ISBN": "978-0425273501", "summary": "A gripping legal thriller about a defense attorney caught in a web of deceit, murder, and the struggle to clear his name."},
        {"bookclub_category": "Mystery Masters", "title": "Echoes in the Dark", "author": "Robin Cook", "ISBN": "978-0399158876", "summary": "A suspenseful tale following a journalist investigating a series of strange occurrences in a small town, revealing a conspiracy that runs deep."},

        # Fantasy Realm Readers
        {"bookclub_category": "Fantasy Realm Readers", "title": "The Crown of Stars", "author": "Kate Elliott", "ISBN": "978-0756407917", "summary": "An epic fantasy adventure set in a mythical world, where a young hero must navigate ancient prophecies and magical conflicts to save their kingdom."},
        {"bookclub_category": "Fantasy Realm Readers", "title": "Dragon's Legacy", "author": "Deborah A. Wolf", "ISBN": "978-1785651076", "summary": "In a realm where dragons rule the skies, a fierce warrior embarks on a quest to uncover her mysterious past and shape the fate of her world."},
        {"bookclub_category": "Fantasy Realm Readers", "title": "The Shadow Queen", "author": "C.J. Redwine", "ISBN": "978-0062360243", "summary": "A dark and compelling retelling of a classic fairy tale, filled with magic, betrayal, and a struggle for power in a cursed kingdom."},

        # Sci-Fi Explorers Club
        {"bookclub_category": "Sci-Fi Explorers Club", "title": "Galactic Outlaws", "author": "Michael Mammay", "ISBN": "978-0062694683", "summary": "A fast-paced space opera about a crew of outcasts and rebels fighting against a corrupt galactic empire."},
        {"bookclub_category": "Sci-Fi Explorers Club", "title": "Quantum Void", "author": "Douglas Phillips", "ISBN": "978-1542047084", "summary": "A thrilling journey through space and time, exploring the mysteries of quantum physics and the universe."},
        {"bookclub_category": "Sci-Fi Explorers Club", "title": "The Dystopia Chronicles", "author": "Matthew Mather", "ISBN": "978-1495273487", "summary": "In a future world ravaged by climate change and war, a group of survivors seeks to rebuild society amidst the ruins."},

        # Historical Fiction Chronicles
        {"bookclub_category": "Historical Fiction Chronicles", "title": "The Silk Weaver's Wife", "author": "Debbie Rix", "ISBN": "978-1786811565", "summary": "A sweeping historical saga spanning centuries, tracing the lives of two women connected by a mysterious piece of silk."},
        {"bookclub_category": "Historical Fiction Chronicles", "title": "Echoes of the Runes", "author": "Christina Courtenay", "ISBN": "978-1472268229", "summary": "A mesmerizing tale of love and destiny, weaving together the past and present through ancient Viking runes."},
        {"bookclub_category": "Historical Fiction Chronicles", "title": "The Painter's Apprentice", "author": "Laura Morelli", "ISBN": "978-0989367133", "summary": "Set in Renaissance Italy, this novel follows a young apprentice who becomes entangled in a dangerous world of art and intrigue."},

        # Romantic Hearts Book Club
        {"bookclub_category": "Romantic Hearts Book Club", "title": "Moonlight Over Paris", "author": "Jennifer Robson", "ISBN": "978-0062389824", "summary": "A poignant love story set in the 1920s, where a young woman discovers love and herself in the romantic city of Paris."},
        {"bookclub_category": "Romantic Hearts Book Club", "title": "The Memory of You", "author": "Jamie Beck", "ISBN": "978-1503901249", "summary": "A heartfelt romance about second chances and the healing power of love, set against the backdrop of a picturesque small town."},
        {"bookclub_category": "Romantic Hearts Book Club", "title": "Summer at the Shore", "author": "V.K. Sykes", "ISBN": "978-1455552556", "summary": "A charming and light-hearted summer romance that blossoms between two unlikely characters in a coastal town."},

        # Biography Buffs Circle
        {"bookclub_category": "Biography Buffs Circle", "title": "Echoes of Brilliance: The Life of Ada Lovelace", "author": "Helena Richardson", "ISBN": "978-1456782941", "summary": "This biography delves into the life of Ada Lovelace, the pioneering mathematician and daughter of Lord Byron, highlighting her significant contributions to early computing."},
        {"bookclub_category": "Biography Buffs Circle", "title": "Uncharted Waters: The Story of Jacques Cousteau", "author": "Martin Dupont", "ISBN": "978-1234567890", "summary": "An immersive account of the life and adventures of Jacques Cousteau, the renowned French naval officer, explorer, and filmmaker who opened the world's eyes to the wonders of the ocean."},
        {"bookclub_category": "Biography Buffs Circle", "title": "Trailblazer: The Inspiring Life of Wangari Maathai", "author": "Susan K. Lewis", "ISBN": "978-0987654321", "summary": "This inspiring biography chronicles the life of Wangari Maathai, the Kenyan environmentalist and Nobel Peace Prize laureate, who championed sustainable development, democracy, and women's rights, especially through her Green Belt Movement."}
    ]

    posts = [
        "Just finished reading '{}' and I'm amazed at how the story unfolded. Did anyone else catch that subtle clue?",
        "I'm halfway through '{}' and can't get enough of it. What are your thoughts on the character development?",
        "The portrayal in '{}' is incredibly inspiring. Has anyone read any other books about the subject?",
        "Started '{}' last night and it's already captivating. The historical details are so well-researched.",
        "I loved the twist in '{}'. It caught me completely off guard. Anyone else feel the same?",
        "Reading '{}' has been a wild ride. The descriptions are so vividly detailed.",
        "The blend of history and fiction in '{}' is perfect. It makes the past feel so alive.",
        "Just finished '{}' and it was such a heartwarming story. Does anyone have recommendations for similar books?",
        "The themes in '{}' are thought-provoking. What did others think about the portrayal?",
        "{}'s life is so fascinating. I'm learning so much about this topic.",
        "The narrative style in '{}' really stands out. How do others feel about the author's approach?",
        "I was deeply moved by the ending of '{}'. Did it have the same impact on anyone else?",
        "'{}' has such complex characters. Which character resonated with you the most?",
        "I'm intrigued by the world-building in '{}'. What elements stood out to you?",
        "The dialogue in '{}' is so sharp and witty. Which conversation was your favorite?",
        "I appreciate the cultural insights in '{}'. Has anyone visited the places mentioned in the book?",
        "The mystery element in '{}' kept me hooked. Did you guess the ending beforehand?",
        "I'm fascinated by the author's life story after reading '{}'. Has anyone read their biography?",
        "The philosophical questions raised in '{}' are quite intriguing. What's your take on them?",
        "The historical accuracy in '{}' is impressive. Who else loves historical fiction?",
        "Reading '{}' made me reflect on my own experiences. Has a book ever changed your perspective?",
        "The humor in '{}' is brilliant. Which part made you laugh the most?",
        "The evolution of the protagonist in '{}' is remarkable. How did you perceive their journey?",
        "I'm absorbed in the fantasy world of '{}'. Who else enjoys this genre?",
        "The scientific explanations in '{}' are enlightening. Did they enhance your understanding of the topic?",
        "The poetic language in '{}' is beautiful. Which passage was the most striking for you?",
        "The family dynamics in '{}' are so relatable. Could you see aspects of your own family in it?",
        "I'm learning so much from the non-fiction elements in '{}'. What new things did you discover?",
        "The suspense in '{}' is intense. How did you feel during the climactic moments?",
        "'{}' touches on important social issues. How do you think the book handles these topics?",
        "The romantic subplot in '{}' is quite engaging. Who else is a fan of romance in stories?",
        "I love the way '{}' intertwines multiple storylines. Was it easy for you to follow?",
        "The setting of '{}' is so vividly described. Could you visualize it as you read?",
        "The pacing in '{}' is perfect. Did it keep you engaged throughout?",
        "The action scenes in '{}' are thrilling. Which scene was the most exciting for you?",
        "Just finished '{}' and I'm in awe of the storytelling.",
        "Halfway through '{}' and the character development is outstanding.",
        "'{}' offers a unique perspective on its subject matter.",
        "Started reading '{}' last night; the historical accuracy is impressive.",
        "The twist in '{}' was unexpected and brilliantly executed.",
        "I'm thoroughly enjoying the vivid descriptions in '{}'.",
        "'{}' blends history and fiction seamlessly.",
        "I found '{}' to be a heartwarming and uplifting story.",
        "'{}' presents some thought-provoking themes.",
        "Learning about '{}' has been an enlightening experience.",
        "The narrative style of '{}' really enhances the story.",
        "The ending of '{}' left a lasting impact on me.",
        "The complex characters in '{}' are remarkably crafted.",
        "The world-building in '{}' is exceptional and immersive.",
        "Sharp and witty dialogue in '{}' makes it a memorable read.",
        "Cultural insights in '{}' add depth to the narrative.",
        "The mystery in '{}' is compelling and well-constructed.",
        "Learning about the author's life after reading '{}' was fascinating.",
        "Philosophical questions in '{}' are intriguing and engaging.",
        "Historical accuracy in '{}' adds a layer of realism.",
        "Reading '{}' prompted me to reflect on my own experiences.",
        "The humor in '{}' adds a light-hearted touch.",
        "The protagonist's evolution in '{}' is both complex and compelling.",
        "The fantasy elements in '{}' are imaginative and captivating.",
        "Scientific explanations in '{}' enhance the overall understanding."
    ]
    users = User.query.all()
    bookclubs = BookClub.query.all()
    bookclub_map = {bookclub.name: bookclub.id for bookclub in bookclubs}

    # Create a map from book title to book club ID
    book_to_bookclub = {}

    for book_data in books_data:
        bookclub_id = bookclub_map.get(book_data['bookclub_category'])
        book_to_bookclub[book_data['title']] = bookclub_id
    for user in users:
        for _ in range(6):
            book = choice(books_data)
            # Check if the association already exists
            association = UserBookClubAssociation.query.filter_by(user_id=user.id, bookclub_id=bookclub_id).first()
            if not association:
                association = UserBookClubAssociation(user_id=user.id, bookclub_id=bookclub_id)
                db.session.add(association)
                
            post_content = choice(posts).format(book['title'])
            post_date = fake.date_between(start_date='-30d', end_date='today')
            # Get the book club ID for this book
            bookclub_id = book_to_bookclub.get(book['title'])
            post = DiscussionPost(user_id=user.id, content=post_content, post_date=post_date, likes=randint(0, 100), bookclub_id=bookclub_id)
            
            db.session.add(post)
    db.session.commit()


def create_books():
    bookclubs = BookClub.query.all()
    bookclub_map = {bookclub.name: bookclub.id for bookclub in bookclubs}
    books_data = [
        # Mystery Masters
        {"bookclub_category": "Mystery Masters", "title": "Shadows Over Baker Street", "author": "Sarah J. Maas", "ISBN": "978-0316253031", "summary": "A thrilling mystery set in Victorian London, where a brilliant detective unravels a series of enigmatic crimes entangled with dark secrets."},
        {"bookclub_category": "Mystery Masters", "title": "The Last Alibi", "author": "David Ellis", "ISBN": "978-0425273501", "summary": "A gripping legal thriller about a defense attorney caught in a web of deceit, murder, and the struggle to clear his name."},
        {"bookclub_category": "Mystery Masters", "title": "Echoes in the Dark", "author": "Robin Cook", "ISBN": "978-0399158876", "summary": "A suspenseful tale following a journalist investigating a series of strange occurrences in a small town, revealing a conspiracy that runs deep."},

        # Fantasy Realm Readers
        {"bookclub_category": "Fantasy Realm Readers", "title": "The Crown of Stars", "author": "Kate Elliott", "ISBN": "978-0756407917", "summary": "An epic fantasy adventure set in a mythical world, where a young hero must navigate ancient prophecies and magical conflicts to save their kingdom."},
        {"bookclub_category": "Fantasy Realm Readers", "title": "Dragon's Legacy", "author": "Deborah A. Wolf", "ISBN": "978-1785651076", "summary": "In a realm where dragons rule the skies, a fierce warrior embarks on a quest to uncover her mysterious past and shape the fate of her world."},
        {"bookclub_category": "Fantasy Realm Readers", "title": "The Shadow Queen", "author": "C.J. Redwine", "ISBN": "978-0062360243", "summary": "A dark and compelling retelling of a classic fairy tale, filled with magic, betrayal, and a struggle for power in a cursed kingdom."},

        # Sci-Fi Explorers Club
        {"bookclub_category": "Sci-Fi Explorers Club", "title": "Galactic Outlaws", "author": "Michael Mammay", "ISBN": "978-0062694683", "summary": "A fast-paced space opera about a crew of outcasts and rebels fighting against a corrupt galactic empire."},
        {"bookclub_category": "Sci-Fi Explorers Club", "title": "Quantum Void", "author": "Douglas Phillips", "ISBN": "978-1542047084", "summary": "A thrilling journey through space and time, exploring the mysteries of quantum physics and the universe."},
        {"bookclub_category": "Sci-Fi Explorers Club", "title": "The Dystopia Chronicles", "author": "Matthew Mather", "ISBN": "978-1495273487", "summary": "In a future world ravaged by climate change and war, a group of survivors seeks to rebuild society amidst the ruins."},

        # Historical Fiction Chronicles
        {"bookclub_category": "Historical Fiction Chronicles", "title": "The Silk Weaver's Wife", "author": "Debbie Rix", "ISBN": "978-1786811565", "summary": "A sweeping historical saga spanning centuries, tracing the lives of two women connected by a mysterious piece of silk."},
        {"bookclub_category": "Historical Fiction Chronicles", "title": "Echoes of the Runes", "author": "Christina Courtenay", "ISBN": "978-1472268229", "summary": "A mesmerizing tale of love and destiny, weaving together the past and present through ancient Viking runes."},
        {"bookclub_category": "Historical Fiction Chronicles", "title": "The Painter's Apprentice", "author": "Laura Morelli", "ISBN": "978-0989367133", "summary": "Set in Renaissance Italy, this novel follows a young apprentice who becomes entangled in a dangerous world of art and intrigue."},

        # Romantic Hearts Book Club
        {"bookclub_category": "Romantic Hearts Book Club", "title": "Moonlight Over Paris", "author": "Jennifer Robson", "ISBN": "978-0062389824", "summary": "A poignant love story set in the 1920s, where a young woman discovers love and herself in the romantic city of Paris."},
        {"bookclub_category": "Romantic Hearts Book Club", "title": "The Memory of You", "author": "Jamie Beck", "ISBN": "978-1503901249", "summary": "A heartfelt romance about second chances and the healing power of love, set against the backdrop of a picturesque small town."},
        {"bookclub_category": "Romantic Hearts Book Club", "title": "Summer at the Shore", "author": "V.K. Sykes", "ISBN": "978-1455552556", "summary": "A charming and light-hearted summer romance that blossoms between two unlikely characters in a coastal town."},

        # Biography Buffs Circle
        {"bookclub_category": "Biography Buffs Circle", "title": "Echoes of Brilliance: The Life of Ada Lovelace", "author": "Helena Richardson", "ISBN": "978-1456782941", "summary": "This biography delves into the life of Ada Lovelace, the pioneering mathematician and daughter of Lord Byron, highlighting her significant contributions to early computing."},
        {"bookclub_category": "Biography Buffs Circle", "title": "Uncharted Waters: The Story of Jacques Cousteau", "author": "Martin Dupont", "ISBN": "978-1234567890", "summary": "An immersive account of the life and adventures of Jacques Cousteau, the renowned French naval officer, explorer, and filmmaker who opened the world's eyes to the wonders of the ocean."},
        {"bookclub_category": "Biography Buffs Circle", "title": "Trailblazer: The Inspiring Life of Wangari Maathai", "author": "Susan K. Lewis", "ISBN": "978-0987654321", "summary": "This inspiring biography chronicles the life of Wangari Maathai, the Kenyan environmentalist and Nobel Peace Prize laureate, who championed sustainable development, democracy, and women's rights, especially through her Green Belt Movement."}
    ]

    # Iterate over the books_data to create Book instances
    for book_data in books_data:
        # Extract the book club category from the book data
        bookclub_category = book_data['bookclub_category']

        # Find the corresponding bookclub_id using the mapping
        bookclub_id = bookclub_map.get(bookclub_category)

        # Check if a valid bookclub_id is found
        if bookclub_id:
            # Create a new Book instance with the provided data and the bookclub_id
            book = Book(
                title=book_data['title'],
                author=book_data['author'],
                ISBN=book_data['ISBN'],
                summary=book_data['summary'],
                bookclub_id=bookclub_id
            )
            # Add the new Book instance to the database session
            db.session.add(book)

    # Commit the session to save the changes to the database
    db.session.commit()

with app.app_context():
    db.drop_all()
    db.create_all()
    create_users()
    create_bookclubs()
    create_discussion_posts()
    create_books()