# thesis
This is the github reposotiry of the Master's thesis of Alexander Joossens (Master in Engineering: Computer Science, main option AI)

The repository contains the code for a node.js webapplication named: A playlist-based Group Music Recommender System. With this application, 2 users can select their favorite Spotify playlists to generate a new playlist based on their mutual interests. On the final page both the users will get to see their final playlist with explaining visualizations for all of the songs, together with a Previeuw button to listen to the song. The users can also use a button to easily add the playlist to their Spotify account. For this purpose, 2 recommendation algorithms are implemented and also 2 different visualizations. The code uses the Spotify Web API.

The webapplication uses nodejs(dockerized container) and mysql(dockerized container).

# Pre-requisites
None. Everything is included in the docker container.

# Running the application
```
docker-compose up --build
```
This will start 2 dockerized containers: mysql and nodejs (using a docker-compose file).

**nodejs container** will connect to **mysql** running inside the container.

The app will be running on http://localhost:5000
