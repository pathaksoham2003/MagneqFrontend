import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

import { HiOutlineArchiveBox } from "react-icons/hi2";
import { PiCubeDuotone } from "react-icons/pi"; 
import { BsBriefcase } from "react-icons/bs";

import Card from '../card/Card';

const PurchaseMetrics = ()=>{
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
            toast.error('Failed to load purchase metrics');
        } finally {
            setLoading(false);
        }
        };
        getMetrics();
    }, []);
    const { Class_A,Class_B, Class_C } = metrics;
    if (loading) return null;
    return (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 ">
        <Card
            title="Class A"
            icon={HiOutlineArchiveBox}
            value={Class_A?.amount}
            className="min-h-[160px] p-6 bg-background text-text shadow-md rounded-xl"
        />
        <Card
            title="Class B"
            icon={PiCubeDuotone}
            value={Class_B?.amount}
            className="min-h-[160px] p-6 bg-background text-text shadow-md rounded-xl"
        />
        <Card
            title="Class C"
            icon={BsBriefcase}
            value={Class_C?.quantity}
            className="min-h-[160px] p-6 bg-background text-text shadow-md rounded-xl"
        />
        </div>
    );
}

export default PurchaseMetrics
