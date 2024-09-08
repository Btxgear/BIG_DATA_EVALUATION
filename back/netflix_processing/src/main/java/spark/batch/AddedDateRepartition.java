package spark.batch;

import java.io.Serializable;
import org.apache.spark.SparkConf;
import org.apache.spark.api.java.JavaSparkContext;
import org.apache.spark.sql.Dataset;
import org.apache.spark.sql.Row;
import org.apache.spark.sql.SparkSession;
import org.apache.spark.sql.functions; // Import Spark SQL functions
import com.google.common.base.Preconditions;

public class AddedDateRepartition implements Serializable {

        private static final long serialVersionUID = 1L; // Adding serialVersionUID for Serializable

        public static void main(String[] args) {
                Preconditions.checkArgument(args.length > 1,
                                "Please provide the path of input file and output dir as parameters.");
                new AddedDateRepartition().run(args[0], args[1]);
        }

        public void run(String inputDirectoryPath, String outputFilePath) {
                // Spark configuration
                SparkConf conf = new SparkConf()
                                .setAppName(AddedDateRepartition.class.getName())
                                .set("spark.yarn.queue", "default");

                JavaSparkContext sc = new JavaSparkContext(conf);
                SparkSession spark = SparkSession.builder().config(conf).getOrCreate();

                // Load the CSV file into a DataFrame
                Dataset<Row> df = spark.read()
                                .option("header", "true")
                                .option("inferSchema", "true")
                                .option("sep", ";")
                                .csv(inputDirectoryPath);

                // Convert 'date_added' to a date type and extract year and month
                Dataset<Row> result = df.withColumn("year_month",
                                functions.date_format(functions.col("date_added"), "yyyy-MM"))
                                .groupBy("year_month")
                                .count()
                                .orderBy(functions.desc("year_month"));

                // Save the results as CSV
                result.write().option("header", "true").csv(outputFilePath);

                // Close Spark session and context
                spark.stop();
                sc.close();
        }
}