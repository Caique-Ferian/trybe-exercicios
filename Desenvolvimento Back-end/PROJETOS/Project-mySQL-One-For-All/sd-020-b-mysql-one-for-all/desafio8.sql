SELECT a.nome_artista AS artista,
al.nome_album AS album FROM SpotifyClone.artista AS a
INNER JOIN SpotifyClone.albuns AS al
ON al.artista_id = a.artista_id
GROUP BY a.nome_artista, al.nome_album
HAVING a.nome_artista = 'Walter Phoenix'
ORDER BY album;