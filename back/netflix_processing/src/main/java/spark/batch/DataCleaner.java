package spark.batch;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.apache.spark.SparkConf;
import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.api.java.JavaSparkContext;
import org.apache.spark.api.java.function.FlatMapFunction;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.common.base.Preconditions;

public class DataCleaner implements Serializable {

    private static final Logger LOGGER = LoggerFactory.getLogger(DataCleaner.class);

    public static void main(String[] args) {
        Preconditions.checkArgument(args.length > 1,
                "Please provide the path of input file and output dir as parameters.");
        new DataCleaner().run(args[0], args[1]);
    }

    public void run(String inputFilePath, String outputFilePath) {
        // Configuration pour le mode cluster YARN
        SparkConf conf = new SparkConf()
                .setAppName(DataCleaner.class.getName())
                .set("spark.yarn.queue", "default");

        JavaSparkContext sc = new JavaSparkContext(conf);

        // Lire les données du fichier d'entrée
        JavaRDD<String> textFile = sc.textFile(inputFilePath);

        // Nettoyer les données sans utiliser filter
        JavaRDD<String> cleanedData = textFile.mapPartitions(new FlatMapFunction<Iterator<String>, String>() {
            @Override
            public Iterator<String> call(Iterator<String> lines) {
                List<String> result = new ArrayList<>();

                // Lire l'en-tête
                String header = lines.next();
                result.add(header); // Garder l'en-tête dans les résultats

                while (lines.hasNext()) {
                    String line = lines.next().trim();
                    String[] columns = line.split(";", -1); // Utiliser le paramètre -1 pour garder les champs vides

                    // Vérifier si le titre (3ème colonne) est vide
                    if (columns.length > 2 && !columns[2].trim().isEmpty()) {
                        // Remplacer les valeurs manquantes par "NOM_DE_LA_COLONNE_EN_FR non définie"
                        for (int i = 0; i < columns.length; i++) {
                            if (columns[i].trim().isEmpty()) {
                                switch (i) {
                                    case 3: // "director" index
                                        columns[i] = "réalisateur non défini";
                                        break;
                                    case 4: // "cast" index
                                        columns[i] = "distribution non définie";
                                        break;
                                    case 5: // "country" index
                                        columns[i] = "pays non défini";
                                        break;
                                    case 6: // "date_added" index
                                        columns[i] = "date d'ajout non définie";
                                        break;
                                    case 7: // "release_year" index
                                        columns[i] = "année de sortie non définie";
                                        break;
                                    case 8: // "rating" index
                                        columns[i] = "classification non définie";
                                        break;
                                    case 9: // "duration" index
                                        columns[i] = "durée non définie";
                                        break;
                                    case 10: // "listed_in" index
                                        columns[i] = "catégorie non définie";
                                        break;
                                    case 11: // "description" index
                                        columns[i] = "description non définie";
                                        break;
                                    default:
                                        break;
                                }
                            }
                        }
                        // Rejoindre les colonnes nettoyées et les ajouter au résultat
                        result.add(String.join(";", columns));
                    }
                }
                return result.iterator();
            }
        });

        // Sauvegarder les données nettoyées
        cleanedData.saveAsTextFile(outputFilePath);

        // Fermer le contexte Spark
        sc.close();
    }

}
