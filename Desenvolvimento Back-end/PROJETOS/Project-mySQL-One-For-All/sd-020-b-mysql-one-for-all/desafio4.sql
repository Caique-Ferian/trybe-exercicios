SELECT DISTINCT u.nome AS usuario,
IF(hr.usuario_id IN (4,8,9), 'Usuário ativo','Usuário inativo') AS condicao_usuario
FROM SpotifyClone.usuario AS u
INNER JOIN SpotifyClone.historico_de_reproducao_usuario AS hr
ON u.usuario_id = hr.usuario_id
ORDER BY usuario;
