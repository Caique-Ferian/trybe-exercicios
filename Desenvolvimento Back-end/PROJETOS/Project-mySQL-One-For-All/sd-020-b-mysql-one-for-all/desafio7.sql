SELECT a.nome_artista AS artista,
al.nome_album AS album,
COUNT(sa.usuario_id) AS seguidores FROM SpotifyClone.artista AS a
INNER JOIN SpotifyClone.albuns AS al
ON al.artista_id = a.artista_id
INNER JOIN SpotifyClone.seguindo_artista AS sa
ON sa.artista_id = a.artista_id
GROUP BY a.nome_artista, al.nome_album
ORDER BY seguidores DESC, artista, album;