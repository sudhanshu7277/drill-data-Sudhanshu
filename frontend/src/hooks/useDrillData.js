import { useEffect, useState } from 'react';
import axios from 'axios';

const useDrillData = () => {
    const [drillData, setDrillData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDrillData = async () => {
            try {
                const response = await axios.get('http://localhost:2000/api/features');
                console.log('Check if getting data in drill hook from nodejs API  :  ', response);
                setDrillData(response.data);
            } catch (err) {
                console.error('Failed to fetch drill data:', err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchDrillData();
    }, []);

    return { drillData, loading, error };
};

export default useDrillData;