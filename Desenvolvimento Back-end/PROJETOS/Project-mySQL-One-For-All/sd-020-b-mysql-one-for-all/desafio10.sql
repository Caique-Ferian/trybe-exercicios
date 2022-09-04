SELECT ca.nome_cancao AS nome,
COUNT(hr.cancao_id) AS reproducoes FROM SpotifyClone.cancoes_album AS ca
INNER JOIN SpotifyClone.historico_de_reproducao_usuario AS hr
ON hr.cancao_id = ca.cancao_id
INNER JOIN SpotifyClone.usuario AS u
ON u.usuario_id = hr.usuario_id AND u.plano_id IN (1,3)
GROUP BY ca.nome_cancao;
