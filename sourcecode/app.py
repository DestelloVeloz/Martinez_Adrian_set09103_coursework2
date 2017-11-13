from flask import Flask, render_template
app = Flask(__name__)
app.secret_key='\xd9\xa8\xf5\xafm\xec\xa2J\x11`\x8fH\xbeO\xeb\x86\x05\xaf"\xfc\x1c}s\xe0'

@app.route('/')
def home():
	return render_template('BT_test.html')

if __name__ == "__main__":
	app.run(host='0.0.0.0', port=9116 , debug=True)
