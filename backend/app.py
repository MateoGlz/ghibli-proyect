import requests
from flask import Flask, jsonify, request

app = Flask(__name__)

# Ruta para la raíz '/'
@app.route('/')
def home():
    return "Bienvenido a la API de Flask!"

@app.route('/api/films')
def get_films():
    try:
        # Hacer una solicitud GET a la API de Ghibli
        response = requests.get('https://ghibli.rest/films')
        
        # Verificar que la solicitud fue exitosa
        if response.status_code == 200:
            data = response.json()  # Convertir la respuesta a JSON
            return jsonify(data)  # Devolver los datos en formato JSON
        else:
            return jsonify({"error": "No se pudo obtener la información"}), response.status_code
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run()
