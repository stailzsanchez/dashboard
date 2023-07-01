import { Link } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import { ROUTES } from '../../routing';
import { useNavigate } from 'react-router-dom';
import { TokenContext } from '../../context/index';
import { useTokenContext } from '../../context/index';
import { useDashboard } from './useDashboard';
import { useEffect } from 'react';
import { OperationVariables, useQuery } from 'react-apollo';
import { GET_DASHBOARD } from '../../graphql/query/getDashboard';
import { useLazyQuery } from '@apollo/client';
import './Dashboard.css';
import Diagram from '../../components/Diagram/Diagram';
import { DiagramInfoType } from '../../components/Diagram/Diagram';
// import { Chart } from 'chart.js';
import LOGOUT_IMG from '../../assets/logout.svg';

const mockData = {
  scenarios: {
    active: 12,
    inactive: 2,
    completed: 4,
  },
  lists: {
    active: 24,
    inactive: 1,
    completed: 4,
  },
  dialogs: {
    active: 34,
    inactive: 7,
    completed: 0,
  },
};

const Dashboard = () => {
  const navigate = useNavigate();

  const { token, setToken } = useTokenContext();

  const { dashboard, error, getDashboard, loading } = useDashboard();
  const Logout = () => {
    setToken('');
    localStorage.removeItem('token');
    navigate(ROUTES.LOGIN);
  };

  // useEffect(() => {
  //   getDashboard();
  // }, []);

  if (error) {
    return <div>error - {error}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard__page">
      <div className="container">
        <div className="dashboard__nav">
          <div className="dashboard__title">Сводка</div>
          <div className="dashboard__logout" onClick={Logout}>
            <img src={LOGOUT_IMG} alt="logout-img" />
          </div>
        </div>
        <div className="dashboard">
          {mockData &&
            // {dashboard &&
            Object.entries(mockData).map(([title, info]) => (
              <Diagram title={title} info={info as any} />
              // <Diagram title={title} info={info as DiagramInfoType} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
