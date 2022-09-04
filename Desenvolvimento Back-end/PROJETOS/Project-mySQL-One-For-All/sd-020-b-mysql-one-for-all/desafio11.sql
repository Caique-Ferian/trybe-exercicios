SELECT nome_cancao AS nome_musica,
CASE 
	WHEN nome_cancao LIKE '%Streets%' THEN REPLACE(nome_cancao, 'Streets', 'Code Review')
    WHEN nome_cancao LIKE '%Her Own%' THEN REPLACE(nome_cancao, 'Her Own', 'Trybe')
    WHEN nome_cancao LIKE '%Inner Fire%' THEN REPLACE(nome_cancao, 'Inner Fire', 'Project')
    WHEN nome_cancao LIKE '%Silly%' THEN REPLACE(nome_cancao, 'Silly', 'Nice')
    WHEN nome_cancao LIKE '%Circus%' THEN REPLACE(nome_cancao, 'Circus', 'Pull Request')
    ELSE nome_cancao
END AS novo_nome
FROM SpotifyClone.cancoes_album
WHERE nome_cancao LIKE '%Streets%'
OR nome_cancao LIKE '%Her Own%'
OR nome_cancao LIKE '%Inner Fire%'
OR nome_cancao LIKE '%Silly%'
OR nome_cancao LIKE '%Circus%'
ORDER BY nome_cancao;
