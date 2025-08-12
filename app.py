from flask import Flask, render_template, send_from_directory
import os

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('web.html')  # looks in /templates

@app.route('/static/pdfs/<path:filename>')
def serve_pdf(filename):
    pdf_dir = os.path.join(app.static_folder, 'pdfs')
    return send_from_directory(pdf_dir, filename)

@app.route('/health')
def health():
    return "OK", 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))
