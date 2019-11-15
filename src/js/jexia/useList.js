import React, { useState, useEffect } from 'react';

import { list } from './index';

const useList = (dataSet) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    async function listData() {
        console.log('useList');
        let records = await list(dataSet);
        setData(records);
        setLoading(false);
    }

    useEffect(() => {
        listData();
    }, [dataSet]);

    return [ data, loading ];
};

export { useList };