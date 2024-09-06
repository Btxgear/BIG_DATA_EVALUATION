# Projet de Groupe : Big Data avec Hadoop et Spark

**ESIEA 2024**

## Contexte

Dans le cadre de vos études sur le ***Big Data***, vous allez travailler sur un projet qui utilise ***Hadoop*** pour le stockage de données massives et ***Spark*** pour le traitement de ces données. L'objectif de ce projet est de comprendre et de maîtriser l'utilisation de ces technologies tout en créant une interface graphique pour visualiser les résultats.

## Objectif

Le but du projet est de stocker et traiter un grand volume de données en utilisant ***Hadoop*** et ***Spark***, puis de créer une interface graphique permettant d'explorer et de visualiser les données traitées. Vous aurez le choix des frameworks de programmation pour la création de l'interface graphique. De plus, le projet devra être dockerisé pour faciliter le déploiement et l'exécution.

## Description du Projet

1. **Stockage des données avec Hadoop** :
   
   - Installer et configurer un cluster ***Hadoop***.
   
   - Importer un jeu de données volumineux dans le ***HDFS*** (***Hadoop Distributed File System***). Vous pouvez utiliser un jeu de données de votre choix (par exemple, des logs de serveur web, des données de capteurs ***IoT***, des datasets de ***Kaggle***, etc.).
   
   - Les données doivent être structurées de manière appropriée pour le traitement ultérieur avec Spark.

2. **Traitement des données avec Spark** :
   
   - Installer et configurer ***Apache Spark*** sur le cluster ***Hadoop***.
   
   - Écrire des scripts ***Spark*** pour nettoyer, transformer et analyser les données stockées dans ***Hadoop***. 
   
   - Les scripts doivent être capables de répondre à plusieurs questions analytiques pertinentes en fonction des données choisies. Par exemple :
     
     - Analyse des tendances dans les données sur une période donnée.
     
     - Calcul des statistiques descriptives.

3. **Création de l'interface graphique** :
   
   - Développer une interface graphique pour visualiser les résultats des analyses.
   
   - Vous pouvez utiliser n'importe quel framework de votre choix pour l'interface graphique (par exemple, ***Flask/Django*** pour Python, ***Node.js/Express*** pour ***JavaScript***, Java avec ***Spring Boot***, etc.).
   
   - L'interface doit permettre aux utilisateurs de :
     
     - Visualiser des graphiques interactifs et des tableaux de bord.
     
     - Filtrer et explorer les données analysées.
     
     - Télécharger des rapports ou des visualisations au format ***PDF*** ou ***CSV***.

4. **Dockerisation du projet** :
   
   - Créer des ***Dockerfiles*** pour tous les composants du projet (***Hadoop***, ***Spark***, et l'interface graphique).
   
   - Configurer des conteneurs ***Docker*** pour chaque composant afin de faciliter le déploiement et l'exécution.
   
   - Utiliser ***Docker Compose*** pour orchestrer et gérer les différents conteneurs.

## Contraintes

1. **Travail en équipe** :
   
   - Le projet doit être réalisé par des groupes de ***3 à 5*** étudiants.
   
   - Une répartition claire des tâches doit être définie et respectée.

2. **Technologies utilisées** :
   
   - Utilisation obligatoire de ***Hadoop*** pour le stockage des données.
   
   - Utilisation obligatoire de ***Spark*** pour le traitement des données.
   
   - Choix libre du framework de programmation pour l'interface graphique.
   
   - Utilisation obligatoire de ***Docker*** pour la conteneurisation du projet.

3. **Documentation** :
   
   - Le code doit être bien commenté et suivre les meilleures pratiques de développement.
   
   - Une documentation détaillée doit être fournie, expliquant l'architecture du système, les étapes de configuration, et les instructions pour exécuter le projet.


## Livrables

1. **Code Source** :
   
   - Les scripts ***Hadoop*** et ***Spark***.
   
   - Le code de l'interface graphique.
   
   - Les ***Dockerfiles*** pour chaque composant.
   
   - Le fichier ***Docker Compose***.

2. **Documentation** :
   
   - Documentation technique détaillée.
   
   - Guide d'installation et d'exécution du projet.


## Critères d'évaluation

- **Fonctionnalité** : Capacité du système à stocker, traiter et visualiser les données.

- **Qualité du Code** : Propreté, organisation et commentaires du code.

- **Interface Utilisateur** : Facilité d'utilisation, interactivité et esthétique de l'interface graphique.

- **Documentation** : Complétude et clarté de la documentation fournie.

- **Travail d'Équipe** : Collaboration efficace et répartition équitable des tâches.

- **Dockerisation** : Qualité et fonctionnalité des conteneurs ***Docker***.

## Ressources

- Documentation ***Hadoop*** : [https://hadoop.apache.org/](https://hadoop.apache.org/)

- Documentation ***Spark*** : [https://spark.apache.org/docs/latest/](https://spark.apache.org/docs/latest/)

- Documentation ***Docker*** : [https://docs.docker.com/](https://docs.docker.com/)

- Frameworks :

  - Flask : [https://flask.palletsprojects.com/](https://flask.palletsprojects.com/)

  - Django : [https://www.djangoproject.com/](https://www.djangoproject.com/)

  - Node.js/Express : [https://expressjs.com/](https://expressjs.com/)

  - Spring Boot : [https://spring.io/projects/spring-boot](https://spring.io/projects/spring-boot)


### Dépôt du Homework
 
Veuillez déposer vos livrable sur Moodle.

Vous avez jusqu'au ***08/09 avant 23h59*** pour compléter/déposer ce projet. Bonne chance et bon travail en équipe !
