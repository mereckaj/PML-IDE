from .. import db
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
	__tablename__ = 'users'
	id = db.Column(db.Integer, primary_key=True)
	email = db.Column(db.String, unique=True)
	first_name = db.Column(db.String)
	last_name = db.Column(db.String)
	pw_hash = db.Column(db.String)
	
	def __init__(self, email, first_name=None, last_name=None,password=None):
		self.email = email.lower()
		self.first_name = first_name
		self.last_name = last_name
		self.set_password(password)

	def set_password(self, password):
		self.pw_hash = generate_password_hash(password)

	def check_password(self, password):
		return check_password_hash(self.pw_hash, password)

	# These four methods are for Flask-Login
	def is_authenticated(self):
		return True

	def is_active(self):
		return True

	def is_anonymous(self):
		return False

	def get_id(self):
		return str(self.id)
