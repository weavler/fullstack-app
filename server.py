# -*- coding: utf-8 -*-

"""Weavler Webshop for creators.

This flask python web application let the creators
signup, singin and create and customize their
Webshop with weavler free service.

Author: Peramanathan Sathyamoorthy (prem@weavler.it)

:copyright: (c) 2016 by Weavler AB
"""

from flask import Flask, render_template

# By default flask looks `static` folder for assests
# and `templates` folder for index and other html templates.
# NB: Changing this default config will lead us to rewrite assests Path
# in all the html templates with `url_for('static')` in all html files.
# <script src="js/script.min.js"> should be written
# <script src="{{ url_for('static', filename=js/script.min.js")}}"">
app = Flask(__name__, static_folder='app', template_folder='app')


@app.route('/')
def index():
    """The landing page."""
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
