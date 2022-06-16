import { useLazyQuery } from '@apollo/client';
import { useState } from 'react';
import { GET_DASHBOARD } from '../../graphql/query/getDashboard';
import { DiagramInfoType } from '../../components/Diagram/Diagram';

export type GetDashboardType = {
  dialogs: DiagramInfoType;
  lists: DiagramInfoType;
  scenarios: DiagramInfoType;
};

export type GetDashboardDataType = {
  dashboard: GetDashboardType;
};

export const useDashboard = () => {
  const [dashboard, setDashboard] = useState({});
  const [error, setError] = useState('');
  const [getDashboardGQL, { data: dashboardData, loading }] = useLazyQuery(
    GET_DASHBOARD,
    {
      // onCompleted: ({ dataDashboard }) => {
      //   const { dialogs, lists, scenarios } = dashboardData?.dashboard;
      //   const diagramList = { scenarios, lists, dialogs };
      //   setDashboard(diagramList);
      // },
      // onError: (e) => {
      //   setError(e.message);
      // },
    }
  );

  const getDashboard = () => {
    getDashboardGQL()
      .then(({ data }) => {
        const { dialogs, lists, scenarios } = data.dashboard;
        const diagramList: GetDashboardType = { scenarios, lists, dialogs };
        setDashboard(diagramList);
      })
      .catch((e) => {
        setError(e.message);
      });
  };

  return {
    getDashboard,
    dashboard,
    loading,
    error,
  };
};
