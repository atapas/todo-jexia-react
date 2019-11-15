import React, { useState, useEffect } from 'react';

import { list } from './index';

const useFetch = (dataSet) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    async function fetchData() {
        console.log('fetchData');
        let records = await list(dataSet);
        setData(records);
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, [dataSet]);

    return [ data, loading ];
};

export { useFetch };