def count_servers(matrix):
    servers_in_contact = 0
    column, line = len(matrix[0]), len(matrix)

    for i in range(column):
        for j in range(line):
            if matrix[i][i] == 1 and matrix[j][i] == 1 and j > 1:
                servers_in_contact += 1
            elif matrix[i][i] == 1 and matrix[i][j] == 1:
                servers_in_contact += 1
    return servers_in_contact
