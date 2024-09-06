#!/bin/bash

while ! nc -z hadoop-worker1 8042; do
  sleep 5
done

while ! nc -z hadoop-worker2 8042; do
  sleep 5
done

bash /root/start-hadoop.sh

hdfs dfs -put input/netflix-data.csv

spark-submit --class spark.batch.DataCleaner --master yarn /root/netflix_processing.jar input/netflix-data.csv netflix_cleaned # CLEANING DATA

spark-submit --class spark.batch.ContentTypeRepartition --master yarn /root/netflix_processing.jar netflix_cleaned content_type # CONTENT TYPE REPARTITION

spark-submit --class spark.batch.CountryRepartition --master yarn /root/netflix_processing.jar netflix_cleaned country_repartition # COUNTRY REPARTITION

spark-submit --class spark.batch.YearsRepartition --master yarn /root/netflix_processing.jar netflix_cleaned release_year_repartition # RELEASE YEAR REPARTITION

spark-submit --class spark.batch.DirectorRepartition --master yarn /root/netflix_processing.jar netflix_cleaned director_repartition # DIRECTOR ANALYSIS

spark-submit --class spark.batch.AddedDateRepartition --master yarn /root/netflix_processing.jar netflix_cleaned added_date_repartition # DATE ADDED DISTRIBUTION

python3 /root/bigdata_evaluation.py

