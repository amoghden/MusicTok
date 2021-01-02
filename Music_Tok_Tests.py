import unittest
import json

import TTMusic as TTMusic

#reading JSON data from file into "data" variable
#Shower by Becky G was arbitrarily chosen for this test suite
with open('MusicTok_Test_Base.json') as f:
    data = json.load(f)


class TestTikTokQuery(unittest.TestCase):
    
    #Tests status returned
    def test_return_status(self):
        status = data['status']
        self.assertEqual('success', status)

    #Tests artist
    def test_artist(self):
        artist = data['result']['artist']
        self.assertEqual('Becky G', artist)

    #Tests title
    def test_title(self):
        title = data['result']['title']
        self.assertEqual('Shower', title)
    
    #Tests album
    def test_album(self):
        album = data['result']['album']
        self.assertEqual('Shower', album)
    
    #Tests release date
    def test_release_date(self):
        rd = data['result']['release_date']
        self.assertEqual('2014-04-23', rd)
    
    #Tests timecode
    def test_timecode(self):
        tc = data['result']['timecode']
        self.assertEqual('00:39', tc)

    #Tests label
    def test_label(self):
        label = data['result']['label']
        self.assertEqual('Kemosabe Records/RCA Records', label)
        
    #Tests song link
    def test_song_link(self):
        sl = data['result']['song_link']
        self.assertEqual('https://lis.tn/Shower', sl)
        
        
    #Tests Spotify URI
    def test_spotify_uri(self):
        uri = data['result']['spotify']['uri']
        self.assertEqual('spotify:track:3DmW6y7wTEYHJZlLo1r6XJ', uri)
        
    #Tests album art
    def test_album_art(self):
        url = data['result']['spotify']['album']['images'][0]['url']
        self.assertEqual('https://i.scdn.co/image/ab67616d0000b273f7f5503cfc6a54d31e65b112', url)
        
    #Tests querying tiktok trending
    def test_trending_tiktok_query(self):
        query_list = TTMusic.get_trending_tiktok_music()
        self.assertEqual(True,query_list.len() > 0)
    
    #Tests querying tiktok recommended
    def test_recommended_tiktok_query(self):
        query_list = TTMusic.get_recommended_tiktok_music()
        self.assertEqual(True,query_list.len() > 0)
    
    #Tests querying SQLite3 database
    def test_sqlite_query(self):
        sqlite = TTMusic.get_from_sqlite()        
        self.assertEqual(True, sqlite.len() > 0)
        
        