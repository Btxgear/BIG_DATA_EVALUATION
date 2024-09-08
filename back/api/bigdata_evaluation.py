from flask import Flask, send_file, jsonify
from flask_cors import CORS
from pyspark.sql import SparkSession
import tempfile
import subprocess
import os


app = Flask(__name__)
CORS(app)

# Initialisation de SparkSession
spark = SparkSession.builder \
    .appName("NetflixDataAPI") \
    .config("spark.sql.execution.arrow.pyspark.enabled", "true") \
    .getOrCreate()

@app.route('/netflix-data-file', methods=['GET'])
def get_netflix_data_file():
    try:
        # Chemin HDFS du fichier
        hdfs_path = "hdfs://hadoop-master:9000/user/root/netflix_cleaned/"

        # Créer un répertoire temporaire local
        with tempfile.TemporaryDirectory() as temp_dir:
            local_path = os.path.join(temp_dir, "netflix_data_cleaned.csv")

            # Utiliser la commande Hadoop pour copier le fichier localement
            hadoop_command = f"hadoop fs -getmerge {hdfs_path} {local_path}"
            process = subprocess.Popen(hadoop_command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
            stdout, stderr = process.communicate()

            if process.returncode != 0:
                return jsonify({"error": f"Erreur lors de la récupération du fichier: {stderr.decode()}"}), 500

            if os.path.exists(local_path):
                return send_file(local_path, as_attachment=True)
            else:
                return jsonify({"error": "Fichier CSV non trouvé après la copie"}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/get-content-type-repartition', methods=['GET'])
def get_content_type_repartition():
    try:
        df = spark.read.csv("hdfs://hadoop-master:9000/user/root/content_type_repartition/", header=True, inferSchema=True)

        return df.toPandas().to_json(orient="records")

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/get-country-repartition', methods=['GET'])
def get_country_repartition():
    try:
        df = spark.read.csv("hdfs://hadoop-master:9000/user/root/country_repartition/", header=True, inferSchema=True)

        return df.toPandas().to_json(orient="records")

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/get-year-repartition', methods=['GET'])
def get_year_repartition():
    try:
        df = spark.read.csv("hdfs://hadoop-master:9000/user/root/release_year_repartition/", header=True, inferSchema=True)

        return df.toPandas().to_json(orient="records")

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/get-director-repartition', methods=['GET'])
def get_director_repartition():
    try:
        df = spark.read.csv("hdfs://hadoop-master:9000/user/root/director_repartition/", header=True, inferSchema=True)

        return df.toPandas().to_json(orient="records")

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/get-added-datetime-distribution', methods=['GET'])
def get_added_datetime_distribution():
    try:
        df = spark.read.csv("hdfs://hadoop-master:9000/user/root/added_date_repartition/", header=True, inferSchema=True)

        return df.toPandas().to_json(orient="records")

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Démarrer le serveur Flask
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)