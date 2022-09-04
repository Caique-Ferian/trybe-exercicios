SELECT cb.nome_cancao AS cancao,
COUNT(*) AS reproducoes FROM SpotifyClone.cancoes_album AS cb
INNER JOIN SpotifyClone.historico_de_reproducao_usuario AS hr
ON cb.cancao_id = hr.cancao_id
GROUP BY cb.nome_cancao
ORDER BY reproducoes DESC, cancao
LIMIT 2;
