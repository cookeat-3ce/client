import React, { useEffect, useState } from 'react';
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Line,
  ResponsiveContainer,
} from 'recharts';
import { gapi } from 'gapi-script';
import CustomText from '../../components/Text';
const Admin = () => {
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const analyticsPropertyId = process.env.REACT_APP_PROPERTY_ID;
  const [data, setData] = useState([]);
  const DISCOVERY_DOCS = [
    'https://analyticsdata.googleapis.com/$discovery/rest?version=v1beta',
  ];
  const SCOPES = 'https://www.googleapis.com/auth/analytics';

  useEffect(() => {
    const initializeGapi = async () => {
      try {
        await new Promise((resolve, reject) => {
          gapi.load('client:auth2', {
            callback: resolve,
            onerror: reject,
            timeout: 5000,
            ontimeout: () => reject(new Error('GAPI load timeout')),
          });
        });

        await gapi.client.init({
          clientId: clientId,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        });

        const authInstance = gapi.auth2.getAuthInstance();
        if (authInstance.isSignedIn.get()) {
          handleFetchData();
        } else {
          await handleLogin();
        }
      } catch (error) {
        console.error('Initialization error:', error);
      }
    };

    initializeGapi();
  }, [clientId]);

  const handleLogin = async () => {
    try {
      await gapi.auth2.getAuthInstance().signIn();
      handleFetchData();
    } catch (error) {
      console.error('Sign-in error:', error);
    }
  };

  const handleFetchData = async () => {
    try {
      const response =
        await gapi.client.analyticsdata.properties.batchRunReports({
          property: `properties/${analyticsPropertyId}`,
          resource: {
            requests: [
              {
                dateRanges: [
                  {
                    startDate: '14daysAgo',
                    endDate: 'today',
                  },
                ],
                metrics: [{ name: 'eventCount' }],
                dimensions: [{ name: 'date' }, { name: 'eventName' }],
                dimensionFilter: {
                  filter: {
                    fieldName: 'eventName',
                    inListFilter: {
                      values: [
                        'page_view',
                        'Longcook_upload',
                        'Sskcook_upload',
                        'Sign_up',
                      ],
                    },
                  },
                },
              },
            ],
          },
        });

      console.log(response);

      const rows = response.result?.reports[0]?.rows || [];
      const reportData = rows.map((row) => ({
        date: row.dimensionValues?.[0]?.value || 'Unknown',
        eventName: row.dimensionValues?.[1]?.value || 'Unknown',
        eventCount: Number(row.metricValues?.[0]?.value) || 0,
      }));

      const eventNames = [
        'page_view',
        'Longcook_upload',
        'Sskcook_upload',
        'Sign_up',
      ];
      const dates = [...new Set(reportData.map((data) => data.date))];

      const completeData = dates.flatMap((date) => {
        return eventNames.map((eventName) => {
          const existingData = reportData.find(
            (data) => data.date === date && data.eventName === eventName,
          );
          return (
            existingData || {
              date,
              eventName,
              eventCount: 0,
            }
          );
        });
      });

      setData(completeData);
    } catch (error) {
      console.error(error);
    }
  };

  const groupDataByEventName = (data) => {
    const groupedData = {};

    data.forEach((item) => {
      const { date, eventName, eventCount } = item;
      if (!groupedData[eventName]) {
        groupedData[eventName] = [];
      }
      groupedData[eventName].push({ date, eventCount });
    });

    return groupedData;
  };

  const AnalyticsEventData = ({ data }) => {
    const groupedData = groupDataByEventName(data);

    return (
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            width: '52vw',
          }}
        >
          {Object.keys(groupedData).map((eventName, index) => (
            <div
              key={eventName}
              style={{
                width: '20vw',
                display: 'flex',
                flexDirection: 'column',
                gap: '3vw',
              }}
            >
              <CustomText
                text={
                  eventName === 'page_view'
                    ? '조회 수'
                    : eventName === 'Sskcook_upload'
                      ? '슥쿡 업로드'
                      : eventName === 'Longcook_upload'
                        ? '롱쿡 업로드'
                        : '회원 가입 수'
                }
                fontFamily={'Happiness-Sans-Bold'}
                fontSize={'1vw'}
              />
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={groupedData[eventName]}>
                  <CartesianGrid strokeDasharray="4 4" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="eventCount" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return <AnalyticsEventData data={data} />;
};

export default Admin;
