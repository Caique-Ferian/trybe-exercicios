SELECT COUNT(*) AS cancoes,
(SELECT COUNT(*) FROM SpotifyClone.artista) AS artistas,
(SELECT COUNT(*) FROM SpotifyClone.albuns) AS albuns FROM SpotifyClone.cancoes_album;
