import { Layout } from '../../components/layout';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Employee } from '@prisma/client';
import { Row } from 'antd';

import { EmployeeForm } from '../../components/employeeForm/EmployeeForm';
import { useAddEmployeeMutation } from '../../app/services/employees';
import { selectUser } from '../../features/auth/authSlice';
import { Paths } from '../../paths';
import { isErrorMsg } from '../../utils/isErrorMsg';
import { idText } from 'typescript';

export const AddEmployee = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [addEmployee] = useAddEmployeeMutation();

  useEffect(() => {
    if (!user) {
      navigate('/home');
    }
  }, [navigate, user]);

  const handleAddEmployee = async (data: Employee) => {
    try {
      await addEmployee(data).unwrap();
      navigate(`${Paths.status}/created`);
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
          title='Add employee'
          btnText='Add'
          onFinish={handleAddEmployee}
          error={error}
        />
      </Row>
    </Layout>
  );
};
