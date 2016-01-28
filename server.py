# -*- coding: utf-8 -*-

"""Weavler Webshop for creators.

This flask python web application let the creators
signup, singin and create and customize their
Webshop with weavler free service.

Author: Peramanathan Sathyamoorthy (prem@weavler.it)

:copyright: (c) 2016 by Weavler AB
"""

from flask import Flask, render_template, request, redirect, url_for


app = Flask(__name__)


@app.route('/', methods=['GET', 'POST'])
def index():
    """The landing page with user authentication."""
    error = None
    if request.method == 'POST':
        if request.form['email'] != 'admin' or \
                request.form['password'] != 'admin':
            error = 'Invalid Credentials. Please try again.'
        else:
            return redirect(url_for('dashboard'))
    return render_template('index.html', error=error)


@app.route('/dashboard')
def dashboard():
    """Dashboard for the specific user as Single Page Application(SPA)."""
    return render_template("dashboard.html")

if __name__ == '__main__':
    app.run(debug=True)
