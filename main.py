import webapp2
import jinja2
import os
import re
import hashlib
import hmac

from google.appengine.ext import db

#base template start

template_dir = os.path.join(os.path.dirname(__file__), 'templates')
jinja_env = jinja2.Environment(loader = jinja2.FileSystemLoader(template_dir),
                               autoescape = True)

def render_str(template, **params):
    t = jinja_env.get_template(template)
    return t.render(params)

cook=''

class BaseHandler(webapp2.RequestHandler):
    def write(self, *a, **kw):
        self.response.out.write(*a, **kw)

    def render_str(self, template, **params):
        # params['user'] = self.user
        return render_str(template, **params)

    def render(self, template, **kw):
        self.write(self.render_str(template, **kw))
	
	



#base template end

class User(db.Model):
	name = db.StringProperty(required=True)
	pw = db.StringProperty(required=True)
	email = db.StringProperty()
	@classmethod
	def by_id(cls, uid):
		return User.get_by_id(uid, parent = users_key())
	@classmethod
	def by_name(cls, name):
		u = User.all().filter('name =', name).get()
		return u

	@classmethod
	def register(cls, name, pw, email = None):
		return User(name = name,
                    pw = pw,
                    email = email)

#functions for basic sign-up

USER_RE = re.compile(r"^[a-zA-Z0-9_-]{3,20}$")
def valid_username(username):
    return username and USER_RE.match(username)

PASS_RE = re.compile(r"^.{3,20}$")
def valid_password(password):
    return password and PASS_RE.match(password)

EMAIL_RE  = re.compile(r'^[\S]+@[\S]+\.[\S]+$')
def valid_email(email):
    return not email or EMAIL_RE.match(email)

class SignUp(BaseHandler):
    def get(self):
        self.render('signup-form.html')

    def post(self):
    	uname = self.request.get('username')
    	password = self.request.get('password')
    	verify = self.request.get('verify')
    	email = self.request.get('email')

    	# self.username = uname
    	# self.password = password
    	# self.email = email
    	
    	have_error = False
    	
    	params = dict(username = uname,
                      email = email)
    	if not valid_username(uname):
            params['error_username'] = "That's not a valid username."
            have_error = True

        if not valid_password(password):
            params['error_password'] = "That wasn't a valid password."
            have_error = True
        elif password != verify:
            params['error_verify'] = "Your passwords didn't match."
            have_error = True

        if not valid_email(email):
            params['error_email'] = "That's not a valid email."
            have_error = True

        if have_error:
            self.render('signup-form.html', **params)
        else:
        	# cooked = 'name=' + uname + ';Path=/'
        	# self.response.headers.add_header('Set-Cookie',str(cooked))
        	# self.set_cook('name', uname)
        	u = User.by_name(self.username)
	        if u:
	            msg = 'That user already exists.'
	            self.render('signup-form.html', error_username = msg)
	        else:
	        	cooked = 'name=' + uname + ';Path=/'
        		self.response.headers.add_header('Set-Cookie',str(cooked))
	            u = User.register(uname, password, email)
	            u.put()
	            self.redirect('/welcome')

	            # self.login(u)
	            # self.redirect('/blog')



class Welcome(BaseHandler):
    def get(self):
        username = self.request.cookies.get('name')
        # if valid_username(username):
        if username:            
            self.render('welcome.html', username = username)
        else:
            self.redirect('/sign_up')

app = webapp2.WSGIApplication([
    ('/sign_up', SignUp),
    # ('/login', Login),	
    ('/welcome', Welcome)
], debug=True)
