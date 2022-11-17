import React, { useContext, useEffect } from 'react';
import { AppContext } from '../services/AppProvider';
import { requestDelete } from '../services/utils';

export default function Table() {
  const { fetchUsers, users } = useContext(AppContext);

  const deleteUser = async (id) => {
    await requestDelete(`users/${id}`);
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers, users]);
  return (
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Nome</th>
          <th>E-mail</th>
          <th>Tipo</th>
          <th>Excluir</th>
        </tr>
      </thead>
      <tbody>
        {users.length && users.map((user, index) => (
          <tr key={ index }>
            <td
              data-testid={ `admin_manage__element-user-table-item-number-${index}` }
            >
              {user.id - 1}
            </td>
            <td
              data-testid={ `admin_manage__element-user-table-name-${index}` }
            >
              {user.name}
            </td>
            <td
              data-testid={ `admin_manage__element-user-table-email-${index}` }
            >
              {user.email}
            </td>
            <td
              data-testid={ `admin_manage__element-user-table-role-${index}` }
            >
              {user.role}
            </td>
            <td>
              <button
                data-testid={ `admin_manage__element-user-table-remove-${index}` }
                type="button"
                onClick={ () => deleteUser(user.id) }

              >
                Excluir

              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
