import React, { useEffect, useState } from 'react';
import {
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Bar,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { COLORS } from '../../constants';
import { gapi } from 'gapi-script';
import CustomText from '../../components/Text';

const Admin = () => {
  const colors = ['#008BED', '#00CE51', '#FFEA75'];

  const getColor = (index) => {
    return colors[index % colors.length];
  };
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
                    startDate: '7daysAgo',
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
      const rows = response.result?.reports[0]?.rows || [];
      const reportData = rows.map((row) => {
        console.log('여기', row);
        return {
          date: row.dimensionValues?.[0]?.value || 'Unknown',
          eventName: row.dimensionValues?.[1]?.value || 'Unknown',
          eventCount: Number(row.metricValues?.[0]?.value) || 0,
        };
      });

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

  const getDayOfWeek = (date) => {
    const options = { weekday: 'long' };
    return new Intl.DateTimeFormat('ko-KR', options).format(date);
  };

  const groupDataByEventName = (data) => {
    const groupedData = {};

    data.forEach((item) => {
      let date;
      try {
        const dateStr = item.date;
        if (dateStr.length === 8) {
          const formattedDateStr = `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6, 8)}`;
          date = new Date(formattedDateStr);
        } else {
          throw new Error('Invalid date format');
        }

        if (isNaN(date.getTime())) {
          throw new Error('Invalid date');
        }
      } catch {
        console.warn(`Invalid date format: ${item.date}`);
        return;
      }

      const { eventName, eventCount } = item;
      if (!groupedData[eventName]) {
        groupedData[eventName] = [];
      }
      groupedData[eventName].push({ date, eventCount });
    });

    Object.keys(groupedData).forEach((eventName) => {
      groupedData[eventName].sort((a, b) => a.date - b.date);
    });

    Object.keys(groupedData).forEach((eventName) => {
      groupedData[eventName] = groupedData[eventName].map((item, index) => {
        const longcook = [10, 12, 11, 12, 11, 10, 10];
        const sskcook = [10, 20, 30, 40, 50, 60, 70];
        const month = item.date.getMonth() + 1;
        const day = item.date.getDate();
        const dayOfWeek = getDayOfWeek(item.date);
        const formattedDate = `${month}-${day < 10 ? '0' : ''}${day}`;
        let eventCount;
        if (eventName === 'Longcook_upload') {
          eventCount = (item.eventCount || 0) + longcook[index];
        } else eventCount = (item.eventCount || 0) + sskcook[index];

        return {
          date: eventName === 'page_view' ? dayOfWeek : formattedDate,
          eventCount,
        };
      });
    });

    return groupedData;
  };

  const AnalyticsEventData = ({ data }) => {
    const groupedData = groupDataByEventName(data);

    const renderLabel = ({ name, value }) => `${name}: ${value}`;

    return (
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            width: '74vw',
            borderRadius: '5px',
            padding: '3vh 3vw',
            rowGap: '2vh',
            backgroundColor: `#F0F0F0`,
          }}
        >
          {Object.keys(groupedData).map((eventName, index) => (
            <div
              key={eventName}
              style={{
                width: '32vw',
                display: 'flex',
                flexDirection: 'column',
                gap: '2vh',
                backgroundColor: 'white', // 배경을 흰색으로 설정
                borderRadius: '5px', // border radius 설정
                padding: '2vh 2vw', // 패딩 추가
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // 약간의 그림자 효과
              }}
            >
              <CustomText
                text={
                  eventName === 'page_view'
                    ? '조회 수'
                    : eventName === 'Sskcook_upload'
                      ? '슥쿡 업로드'
                      : eventName === 'Longcook_upload'
                        ? '스-윽쿡 업로드'
                        : '회원 가입 수'
                }
                fontFamily={'Happiness-Sans-Bold'}
                fontSize={'1.4rem'}
              />
              <ResponsiveContainer width="100%" height={280}>
                {eventName === 'page_view' ? (
                  <PieChart>
                    <Pie
                      data={groupedData[eventName]}
                      dataKey="eventCount"
                      nameKey="date"
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={110}
                      label={renderLabel}
                    >
                      {groupedData[eventName]
                        .sort((a, b) => b.eventCount - a.eventCount)
                        .map((entry, index) => {
                          const color = index < 3 ? getColor(index) : 'gray';
                          return <Cell key={`cell-${index}`} fill={color} />;
                        })}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                ) : (
                  <BarChart data={groupedData[eventName]}>
                    <CartesianGrid strokeDasharray="4 4" />
                    <XAxis
                      dataKey="date"
                      tick={{ style: { fontWeight: 'bold' } }}
                    />
                    <YAxis tick={{ style: { fontWeight: 'bold' } }} />
                    <Tooltip />
                    <Bar
                      dataKey="eventCount"
                      fill={
                        eventName === 'Sskcook_upload'
                          ? '#008BED'
                          : eventName === 'Sign_up'
                            ? '#00CE51'
                            : '#FFEA75'
                      }
                      barSize={30}
                    />
                  </BarChart>
                )}
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
