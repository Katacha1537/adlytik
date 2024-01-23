import { useEffect, useState } from 'react';

const useGetAdAccounts = (accessToken) => {
  const [adAccounts, setAdAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdAccounts = async () => {
      try {
        const response = await fetch(`https://graph.facebook.com/v18.0/me?fields=name,adaccounts{name}&access_token=${accessToken}`);
        const data = await response.json();

        if (data.error) {
          throw new Error(data.error.message);
        }

        if (data.adaccounts && data.adaccounts.data) {
          setAdAccounts(data.adaccounts.data);
        } else {
          throw new Error('Unable to fetch ad accounts.');
        }

        setLoading(false);
        setError(null);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (accessToken) {
      fetchAdAccounts();
    }
  }, [accessToken]);

  return { adAccounts, loading, error };
};

export default useGetAdAccounts;
