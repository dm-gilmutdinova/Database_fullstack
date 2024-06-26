import { useNavigate, useParams } from 'react-router-dom';
import { Employee } from '@prisma/client';
import { useState } from 'react';
import { Row } from 'antd';

import { EmployeeForm } from '../../components/employeeForm/EmployeeForm';
import { isErrorMsg } from '../../utils/isErrorMsg';
import { Layout } from '../../components/layout';
import { Paths } from '../../paths';
import {
  useEditEmployeeMutation,
  useGetEmployeeQuery,
} from '../../app/services/employees';

export const EditEmployee = () => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const [error, setError] = useState('');
  const { data, isLoading } = useGetEmployeeQuery(params.id || '');
  const [editEmployee] = useEditEmployeeMutation();

  if (isLoading) {
    return <span>Loading..</span>;
  }

  const handleEditUser = async (employee: Employee) => {
    try {
      const editedEmployee = {
        ...data,
        ...employee,
      };

      await editEmployee(editedEmployee).unwrap();
      navigate(`${Paths.status}/updated`);
    } catch (error) {
      const maybeError = isErrorMsg(error);
      if (maybeError) {
        setError(error.data.message);
      } else {
        setError('Unknown error');
      }
    }
  };

  return (
    <Layout>
      <Row align='middle' justify='center'>
        <EmployeeForm
          title='Edit employee'
          btnText='Edit'
          error={error}
          employee={data}
          onFinish={handleEditUser}
        />
      </Row>
    </Layout>
  );
};
