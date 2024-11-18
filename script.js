async function fetchSpotifyData() {
    try {
      const response = await fetch('config.txt');
      const config = await response.text();
      const spotifyToken = config.match(/spotifyToken=(\S+)/)?.[1];
      
      if (!spotifyToken) {
        throw new Error('Spotify API token not found.');
      }
      
      // Call to Spotify API to get the last played track (placeholder)
      const res = await fetch(`https://api.spotify.com/v1/me/player/recently-played?limit=1`, {
        headers: {
          'Authorization': `Bearer ${spotifyToken}`
        }
      });
  
      const data = await res.json();
      const track = data.items[0];
  
      if (track) {
        document.getElementById('spotify-status').innerHTML = `Last played: ${track.track.name} by ${track.track.artists.map(artist => artist.name).join(', ')}`;
      } else {
        document.getElementById('spotify-status').innerHTML = "No recent track found.";
      }
    } catch (error) {
      document.getElementById('spotify-status').innerHTML = "Unable to fetch Spotify details. Please check API token.";
    }
  }
  
  async function fetchSteamData() {
    try {
      const response = await fetch('config.txt');
      const config = await response.text();
      const steamApiKey = config.match(/steamApiKey=(\S+)/)?.[1];
      const steamId = config.match(/steamId=(\S+)/)?.[1];
  
      if (!steamApiKey || !steamId) {
        throw new Error('Steam API key or Steam ID not found.');
      }
  
      // Call to Steam API to get currently playing game (placeholder)
      const res = await fetch(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${steamApiKey}&steamids=${steamId}`);
      const data = await res.json();
      const currentGame = data.response.players[0].gameextrainfo;
  
      if (currentGame) {
        document.getElementById('steam-status').innerHTML = `Currently playing: ${currentGame}`;
      } else {
        document.getElementById('steam-status').innerHTML = "Not playing any game currently.";
      }
    } catch (error) {
      document.getElementById('steam-status').innerHTML = "Unable to fetch Steam details. Please check API key or Steam ID.";
    }
  }
  
  // Call the functions to fetch data
  fetchSpotifyData();
  fetchSteamData();
  