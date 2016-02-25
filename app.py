import os

from flask import Flask, render_template,request

from lib.helper import mail, minify


#----------------------------------------
# initialization
#----------------------------------------

app = Flask(__name__)

app.config['pages'] = ['home', 'about', 'speak', 'travel', 'history', 'contact']


#----------------------------------------
# routes
#----------------------------------------

@app.route('/')
@app.route('/index')
@app.route('/index.html')
@app.route('/home')
@app.route('/home.html')
def index():
    return minify(render_template('layouts/default.pyhtml', curr_page=0))

@app.route('/about')
@app.route('/about.html')
def about():
    return minify(render_template('layouts/default.pyhtml', curr_page=1))

@app.route('/speak')
@app.route('/speak.html')
def speak():
    return minify(render_template('layouts/default.pyhtml', curr_page=2))

@app.route('/travel')
@app.route('/travel.html')
def travel():
    return minify(render_template('layouts/default.pyhtml', curr_page=3))

@app.route('/history')
@app.route('/history.html')
def history():
    return minify(render_template('layouts/default.pyhtml', curr_page=4))

@app.route('/contact', methods=['GET', 'POST'])
@app.route('/contact.html', methods=['GET', 'POST'])
def contact():
    if request.method == 'GET':
        return minify(render_template('layouts/default.pyhtml', curr_page=5))
    else:
        email = request.form['email']
        message = request.form['message']
        mail(email, message)
        return minify(render_template('layouts/default.pyhtml', curr_page=5, post=True))



@app.errorhandler(404)
def error_404(e):
    return error(404)

@app.errorhandler(Exception)
def error_500(e=None):
    return error(500)

@app.route('/nginxerror.html')
def nginx_error():
    code = int(request.args.get('c'))
    return error(code)

def error(code):
    return minify(render_template("layouts/error.pyhtml", curr_page=-1, code=code)), code



#----------------------------------------
# launch
#----------------------------------------

if __name__ == '__main__':
    app.config.update(DEBUG = True)
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
