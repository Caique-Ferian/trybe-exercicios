SELECT FORMAT(MIN(valor_plano),2) AS faturamento_minimo,
FORMAT(MAX(valor_plano),2) AS faturamento_maximo,
FORMAT(AVG(valor_plano),2) AS faturamento_medio,
FORMAT(SUM(valor_plano),2) AS faturamento_total FROM SpotifyClone.plano_usuario AS pu
INNER JOIN SpotifyClone.usuario AS u
ON pu.plano_id = u.plano_id;
