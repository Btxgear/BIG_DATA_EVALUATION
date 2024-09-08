package spark.batch;

import java.io.Serializable;

import org.apache.spark.SparkConf;
import org.apache.spark.api.java.JavaSparkContext;
import org.apache.spark.sql.Dataset;
import org.apache.spark.sql.Row;
import org.apache.spark.sql.SparkSession;
import org.apache.spark.sql.functions;

import com.google.common.base.Preconditions;

public class CountryRepartition implements Serializable {

    private static final long serialVersionUID = 1L;

    public static void main(String[] args) {
        Preconditions.checkArgument(args.length > 1,
                "Please provide the path of input file and output dir as parameters.");
        new CountryRepartition().run(args[0], args[1]);
    }

    public void run(String inputPath, String outputPath) {
        SparkConf conf = new SparkConf()
                .setAppName(CountryRepartition.class.getName())
                .set("spark.yarn.queue", "default");

        JavaSparkContext sc = new JavaSparkContext(conf);
        SparkSession spark = SparkSession.builder().config(conf).getOrCreate();

        Dataset<Row> df = spark.read()
                .option("header", "true")
                .option("inferSchema", "true")
                .option("sep", ";")
                .csv(inputPath);

        Dataset<Row> result = df
                .withColumn("country", functions.explode(functions.split(functions.col("country"), ", ")))
                .groupBy("country")
                .count()
                .orderBy(functions.desc("count"));

        result.write().option("header", "true").csv(outputPath);

        spark.stop();
        sc.close();
    }
}
