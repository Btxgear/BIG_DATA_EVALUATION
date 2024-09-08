package spark.batch;

import java.io.Serializable;

import org.apache.spark.SparkConf;
import org.apache.spark.api.java.JavaSparkContext;
import org.apache.spark.sql.Dataset;
import org.apache.spark.sql.Row;
import org.apache.spark.sql.SparkSession;
import org.apache.spark.sql.functions; // Importer org.apache.spark.sql.functions pour accéder aux fonctions SQL de Spark

import com.google.common.base.Preconditions;

public class ContentTypeRepartition implements Serializable {

        private static final long serialVersionUID = 1L; // Ajout de serialVersionUID pour Serializable

        public static void main(String[] args) {
                Preconditions.checkArgument(args.length > 1,
                                "Please provide the path of input file and output dir as parameters.");
                new ContentTypeRepartition().run(args[0], args[1]);
        }

        public void run(String inputDirectoryPath, String outputFilePath) {
                // Configuration pour le mode cluster YARN
                SparkConf conf = new SparkConf()
                                .setAppName(ContentTypeRepartition.class.getName())
                                .set("spark.yarn.queue", "default");

                JavaSparkContext sc = new JavaSparkContext(conf);
                SparkSession spark = SparkSession.builder().config(conf).getOrCreate();

                // Charger tous les fichiers CSV dans le répertoire d'entrée dans un DataFrame
                Dataset<Row> df = spark.read()
                                .option("header", "true")
                                .option("inferSchema", "true")
                                .option("sep", ";")
                                .csv(inputDirectoryPath); // Chemin du répertoire contenant les fichiers

                // Répartition des types de contenu (Films vs Séries TV)
                Dataset<Row> result = df.groupBy("type")
                                .count()
                                .orderBy(functions.desc("count"));

                // Sauvegarder les résultats dans un fichier de sortie
                result.write().option("header", "true").csv(outputFilePath);

                // Fermer la session Spark et le contexte Spark
                spark.stop();
                sc.close();
        }

}
