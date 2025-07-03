import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { HiOutlineArchiveBox } from "react-icons/hi2";//sales box
import { PiCubeDuotone } from "react-icons/pi"; //production
import { BsBriefcase } from "react-icons/bs";

import Card from '../../card/Card';

const Metrics = ()=>{
    const [metrics, setMetrics] = useState({
       TotalSales: null,
       Outstandings: null,
       OverduePayments:null,
    });
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const getMetrics = async () => {
        try {
            const res = await axios.get('/api/metrics');
            setMetrics(res.data);
        } catch (err) {
            console.error('Failed to fetch metrics:', err);
        } finally {
            setLoading(false);
        }
        };
        getMetrics();
    }, []);
    const { TotalSales,Outstandings, OverduePayments } = metrics;
    if (loading) return null;
    return (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 ">
        <Card
            title="Total Sales"
            icon={HiOutlineArchiveBox}
            value={TotalSales?.amount}
            className="min-h-[160px] p-6 bg-background text-text shadow-md rounded-xl"
        />
        <Card
            title="Outstanding"
            icon={PiCubeDuotone}
            value={Outstandings?.amount}
            className="min-h-[160px] p-6 bg-background text-text shadow-md rounded-xl"
        />
        <Card
            title="Overdue Payments"
            icon={BsBriefcase}
            value={OverduePayments?.quantity}
            className="min-h-[160px] p-6 bg-background text-text shadow-md rounded-xl"
        />
        </div>
    );
}

export default Metrics
