from flask import Flask, request, jsonify
import google.generativeai as genai

app = Flask(__name__)

# Configure the API key
genai.configure(api_key="AIzaSyDsyaX_Hf1mjYoSeBs4IJkpa-IwKjG0Wt8")
model = genai.GenerativeModel('gemini-1.0-pro-latest')
# print(model.generate_content("give a paragrap on anstronomy and some refference links give it in inside a div form"))
@app.route('/generate', methods=['POST'])
def generate():
    data = request.json
    prompt = data.get('prompt')

    if not prompt:
        return jsonify({'error': 'Prompt is required'}), 400

    response = model.generate_content(prompt)
    return jsonify({'text': response.text})

if __name__ == '__main__':
    app.run(port=8888)