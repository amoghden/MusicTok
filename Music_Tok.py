from gevent import monkey
monkey.patch_all()

import requests
import spotipy
import flask
import sqlite3
import os
from TikTokApi import TikTokApi
from spotipy import oauth2
from flask import jsonify


#Globally initiallizing tiktok API object
tiktok_api = TikTokApi.get_instance()

#Authentication tokens
audio_recognition_api_token = '[REDACTED]'
SPOTIPY_CLIENT_ID = '[REDACTED]'
SPOTIPY_CLIENT_SECRET = '[REDACTED]'
SPOTIPY_REDIRECT_URI = 'http://127.0.0.1:5000/'


#Check's the user's Spotify playlist for a playlist named "MusicTok" (which is the playlist to which this application adds)
def does_musictok_playlist_exist():
    
    SCOPE = 'user-library-modify'

    sp_oauth = oauth2.SpotifyOAuth( SPOTIPY_CLIENT_ID, SPOTIPY_CLIENT_SECRET,SPOTIPY_REDIRECT_URI,scope=SCOPE)
    sp = spotipy.Spotify(auth_manager=sp_oauth)
    
    results = sp.current_user_playlists(limit=50, offset=0)
    
    for idx, item in enumerate(results['items']):  # @UnusedVariable
        name = item['name']
        if name == 'MusicTok':
            return True
    
    return False


#Return's the Spotify ID corresponding to logged in user's MusicTok playlist
def get_musictok_playlist_id():
    
    SCOPE = 'user-library-modify'

    sp_oauth = oauth2.SpotifyOAuth( SPOTIPY_CLIENT_ID, SPOTIPY_CLIENT_SECRET,SPOTIPY_REDIRECT_URI,scope=SCOPE)
    sp = spotipy.Spotify(auth_manager=sp_oauth)
    
    results = sp.current_user_playlists(limit=50, offset=0)
    
    for idx, item in enumerate(results['items']):  # @UnusedVariable
        name = item['name']
        if name == 'MusicTok':
            return(str(item['id']))
     

    return(None)


#Create's a playlist titled "MusicTok" for the currently authenticated user
def create_musictok_playlist():

    SCOPE = 'playlist-modify-public'
    sp_oauth = oauth2.SpotifyOAuth( SPOTIPY_CLIENT_ID, SPOTIPY_CLIENT_SECRET,SPOTIPY_REDIRECT_URI,scope=SCOPE)
    sp = spotipy.Spotify(auth_manager=sp_oauth)
    sp.user_playlist_create(user=sp.current_user()['id'], name="MusicTok", public=True, collaborative=False, description='This is your MusicTok playlist! All saved songs or playlist curations will be added here!')



#Create's a playlist titled "MusicTok" for the currently authenticated user
def add_song_to_musictok_playlist(song_data):

    SCOPE = 'playlist-modify-public'
    sp_oauth = oauth2.SpotifyOAuth( SPOTIPY_CLIENT_ID, SPOTIPY_CLIENT_SECRET,SPOTIPY_REDIRECT_URI,scope=SCOPE)
    sp = spotipy.Spotify(auth_manager=sp_oauth)
    
    
    sp.playlist_add_items(playlist_id=get_musictok_playlist_id(), items=song_data)


#Makes a call to TikTok's API to parse the mp3 link of the video's audio
def fetch_mp3_link(tiktok_url):
    
    tiktok_data = tiktok_api.getTikTokByUrl(tiktok_url, language='en', proxy=None, custom_verifyFp="verify_khy8ycxz_BIdBe2I7_dWPe_4bk8_BpPM_k2aK1Zzm2EKA")
    song_url = tiktok_data['itemInfo']['itemStruct']['music']['playUrl']
    return song_url


#Makes a call to TikTok's API to determine top 25 recommended songs. Parses and returns a list of mp3 links for trending songs
def get_recommended_tiktok_music():
    
    tiktok_data = tiktok_api.getSuggestedMusicbyID(count=25, userId='amoghden', language='en', proxy=None)
    i=0
    mp3_list = []
     
    for item in tiktok_data:  # @UnusedVariable
        mp3_list.append(tiktok_data[i]['extraInfo']['playUrl'][0])
        i = i+1
    return mp3_list

#Makes a call to TikTok's API to determine top 10 trending songs. Parses and returns a list of mp3 links for trending songs
def get_trending_tiktok_music():
    
    tiktok_data = tiktok_api.discoverMusic(language='en', proxy=None)
    i=0
    mp3_list = []
    
    for item in tiktok_data:  # @UnusedVariable
        mp3_list.append(tiktok_data[i]['cardItem']['extraInfo']['playUrl'][0])
        i = i+1
    return mp3_list


#Takes list of mp3 links for trending audios, sends to audio recognition API and immediately sends to Spotify API
def add_discovered_tiktok_music(mp3_list):
    
    dummy_tiktok_url = 'https://www.tiktok.com/@charlidamelio/video/6865053934281575686?lang=en'
    i = 0
    spotify_id_list = []
    
    for entry in mp3_list: # @UnusedVariable
        song_data = audio_recognition(mp3_list[i], dummy_tiktok_url)
        
        if 'spotify' in song_data['result']:
            spotify_id_list.append(song_data['result']['spotify']['uri'])
        i=i+1
    
    #print(spotify_id_list)
    if(does_musictok_playlist_exist()):
        add_song_to_musictok_playlist(spotify_id_list)
    else:
        create_musictok_playlist()
        add_song_to_musictok_playlist(spotify_id_list)



#Takes in mp3 link + link to original TikTok and makes a call to Audd.io API for song recognition
#If song is unrecognized, the function reconstructs song information from TikTok's data and returns
def audio_recognition(song_url, tiktok_url):
    
    query = {
    'url': song_url,
    'api_token': audio_recognition_api_token,
    'return': 'spotify',
    }
    song_data = requests.post('https://api.audd.io/', data=query)
    
    song_data = song_data.json()

    #If audio recognittion API is unable to detect
    if str(song_data['result']) == 'None' or str(song_data['result']) == 'null':
        tiktok_data = tiktok_api.getTikTokByUrl(tiktok_url, language='en', proxy=None, custom_verifyFp="verify_khi5j3na_a3esnsg1_Tjfo_4F0M_8CsF_O3g5v8sGJk0Q")
        song_data = {"status" : "fail",
                    "artist": tiktok_data['itemInfo']['itemStruct']['music']['authorName'],
                    "title" : tiktok_data['itemInfo']['itemStruct']['music']['title'],
                    "album" : tiktok_data['itemInfo']['itemStruct']['music']['album'],
                    "album_art_medium" : tiktok_data['itemInfo']['itemStruct']['music']['coverMedium'],
                    "song_link": song_url}
        return song_data
     
    return song_data


#Takes in Python dict with key-value mappings for song data. Puts into sqlite database
def json_to_sqlite(song_json):
    
    db = sqlite3.connect("musictok.sqlite")
    c = db.cursor()

    #Extracting all keys and values from dictionary
    sql_table_headers = []
    sql_table_data = []
    json_keys = song_json.keys()
    for key in json_keys:
        if key not in sql_table_headers:
            sql_table_headers.append(key)
        data = song_json.get(key)
        sql_table_data.append(data)
    
    #building query
    filename = "musictok"
    create_query = "create table if not exists " + filename + " (Song Name text, Artist text, Album text, Art text)"
    insert_query = "insert into " + filename + " values (?,?,?,?)"

    #Executing query and closing connection to database
    c.execute(create_query)
    c.execute(insert_query, sql_table_data)
    sql_table_data.clear()
    db.commit()
    c.close()
    
    
#Connects to SQLite3 database and retrieves data. Parses and returns as a list of JSON formatted entries.
def get_from_sqlite():
    
    db = sqlite3.connect("musictok.sqlite")
    c = db.cursor()
    
    c.execute("SELECT * FROM musictok")
    rows = c.fetchall()
    
    return_json = {}
    final_list = []
    
    for row in rows:
        return_json.update({"Song Name" : row[0]})
        return_json.update({"Artist" : row[1]})
        return_json.update({"Album" : row[2]})
        return_json.update({"Art" : row[3]})
        final_list.append(return_json.copy())

    return final_list

    
#Initializing FLASK server
app = flask.Flask(__name__)
app.config["DEBUG"] = True
     
     
#FLASK endpoint for identifying song based on TikTok URL passed in as argument
@app.route('/query/<path:attr>', methods =['GET'])
def query_tiktok_api(attr):
        
    tiktok_url = str(attr)
    song_url = fetch_mp3_link(tiktok_url)
    song_data = audio_recognition(song_url, tiktok_url)
    return jsonify(song_data)
    
    
#FLASK endpoint for adding a song to Spotify playlist based on TikTok URL passed in as argument
@app.route('/addsong/<path:attr>', methods =['GET'])
def add_to_playlist_api(attr):
        
    tiktok_url = str(attr)
    song_url = fetch_mp3_link(tiktok_url)
    song_data = audio_recognition(song_url, tiktok_url)
       
    spotify_id_list = []
    if 'spotify' in song_data['result']:
        spotify_id_list.append(song_data['result']['spotify']['uri'])
       
    if(does_musictok_playlist_exist()):
        add_song_to_musictok_playlist(spotify_id_list)
           
    else:
        create_musictok_playlist()
        add_song_to_musictok_playlist(spotify_id_list)
        
    return jsonify("success")
   
   
#FLASK endpoint to add trending TikTok songs to Spotify playlist
@app.route('/addtrending', methods =['GET'])
def add_trending_to_playlist_api():
        
    add_discovered_tiktok_music(get_trending_tiktok_music())
    return jsonify("success")

   
#FLASK endpoint to add recommended TikTok songs to Spotify playlist
@app.route('/addrecommended', methods =['GET'])
def add_recommended_to_playlist_api():
        
    mp3_list = get_recommended_tiktok_music()
    add_discovered_tiktok_music(mp3_list)
    return jsonify("success")

   
#FLASK endpoint to save song (identifiable by three arguments) to SQLite3 database
@app.route('/savesong/<songname>/<artist>/<album>/<path:url>', methods =['GET'])
def save_song_to_db(songname, artist, album, url):
      
    song_json = {
        'Song Name' : songname,
        'Artist' : artist,
        'Album' : album,
        'Art' : url
    }
      
    json_to_sqlite(song_json)
    return jsonify("success")

   
#FLASK endpoint to query SQLite database and retrieve all saved songs
@app.route('/getsaved', methods =['GET'])
def retrieve_saved_songs():
    sqlite_as_list = get_from_sqlite()
    return jsonify(sqlite_as_list)

   
   
#Start FLASK server
app.run(host=os.getenv('IP', '0.0.0.0'), 
            port=int(os.getenv('PORT', 4444)))
