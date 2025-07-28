import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import usePurchase from '../../services/usePurchase';
import { HiOutlineArchiveBox } from "react-icons/hi2";
import { PiCubeDuotone } from "react-icons/pi"; 
import { BsBriefcase } from "react-icons/bs";

import Card from '../card/Card';

const PurchaseMetrics = () => {
    const {getPurchaseStats} = usePurchase();
  const { data: metrics, isLoading, isError } = useQuery({
    queryKey: ['purchase-metrics'],
    queryFn: getPurchaseStats,
    onError: () => toast.error('Failed to load purchase metrics'),
    staleTime: 5 * 60 * 1000, 
  });
  console.log(metrics);
  if (isLoading || !metrics) return "null";
  if (isError) return "completing";

  const { total_purchases, total_purchases_change, total_payable_amount,pending_orders,pending_orders_change,total_payable_amount_change } = metrics;

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 ">
      <Card
        title="Class A"
        icon={HiOutlineArchiveBox}
        value={`₹ ${parseFloat(total_purchases).toLocaleString()}`}
        percent={total_purchases_change}
        className="min-h-[160px] p-6 bg-background text-text shadow-md rounded-xl"
      />
      <Card
        title="Total Payable Amount"
        icon={PiCubeDuotone}
        value={`₹ ${parseFloat(total_payable_amount).toLocaleString()}`}
        percent={total_payable_amount_change}
        className="min-h-[160px] p-6 bg-background text-text shadow-md rounded-xl"
      />
      <Card
        title="Class C"
        icon={BsBriefcase}
        value={pending_orders}
        percent={pending_orders_change}
        className="min-h-[160px] p-6 bg-background text-text shadow-md rounded-xl"
      />
    </div>
  );
    };

export default PurchaseMetrics;
