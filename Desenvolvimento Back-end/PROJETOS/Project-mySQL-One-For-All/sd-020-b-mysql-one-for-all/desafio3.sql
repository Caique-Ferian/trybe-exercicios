SELECT nome AS usuario,
(
	SELECT COUNT(*) FROM SpotifyClone.historico_de_reproducao_usuario 
	WHERE historico_de_reproducao_usuario.usuario_id = u.usuario_id
) AS qtde_musicas_ouvidas,
(
	SELECT FORMAT(SUM(duracao_segundos)/60,2) FROM SpotifyClone.cancoes_album AS ca
	WHERE (
		SELECT cancao_id FROM SpotifyClone.historico_de_reproducao_usuario 
			WHERE historico_de_reproducao_usuario.cancao_id = ca.cancao_id
			AND historico_de_reproducao_usuario.usuario_id = u.usuario_id
	)
) AS total_minutos 
FROM SpotifyClone.usuario AS u
ORDER BY usuario;
