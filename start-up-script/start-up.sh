#!/bin/bash
bash /root/start-hadoop.sh
hdfs dfs -mkdir -p input
hdfs dfs -put netflix-data.csv input
spark-submit --class spark.batch.DataCleaner --master yarn /root/netflix_processing.jar input/netflix-data.csv netflix_cleaned # CLEANING DATA
spark-submit --class spark.batch.ContentTypeRepartition --master yarn /root/netflix_processing.jar netflix_cleaned content_type_repartition # CONTENT TYPE REPARTITION
spark-submit --class spark.batch.CountryRepartition --master yarn /root/netflix_processing.jar netflix_cleaned country_repartition # COUNTRY REPARTITION
spark-submit --class spark.batch.YearsRepartition --master yarn /root/netflix_processing.jar netflix_cleaned release_year_repartition # RELEASE YEAR REPARTITION
spark-submit --class spark.batch.DirectorRepartition --master yarn /root/netflix_processing.jar netflix_cleaned director_repartition # DIRECTOR ANALYSIS
# spark-submit --class spark.batch.AddedDateRepartition --master yarn /root/netflix_processing.jar netflix_cleaned added_date_repartition # DATE ADDED DISTRIBUTION
python3 /root/api/bigdata_evaluation.py