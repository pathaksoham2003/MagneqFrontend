import React from 'react';
import Button from '../../components/buttons/Button';
import { HiOutlineArchiveBox } from 'react-icons/hi2';

const QualityCard = () => {
  return (
    <div className="mt-10">
      <h2
        className=" mt-0 mb-0 text-left text-[1.4rem] font-semibold"
      >
        Quality Ticket Details
      </h2>
      <div
        className="bg-background p-5 border border-border text-gray-500 text-sm rounded-3xl max-w-[60vw] flex flex-col gap-10 text-left mt-5 "
      >
        <div className="flex flex-row gap-12 justify-starttext-sm ">
          <div className="min-w-[300px] text-sm text-gray-500 font-medium font-inherit ">
            <div>Vendor Name - Mohan Kumar</div>
            <div>Model - ADVD</div>
            <div>Date  - 22/06/2025</div>
            <div>Type - S</div>
            <div>Issue In -  S</div>
            <div className="mt-10">Vendor Contact : 91XXXXXXXXXX</div>
          </div>
          <div className="text-[1.1rem] text-gray-500 font-normal font-inherit max-w-[600px]">
            <div className="font-medium">Description :</div>
            <div className="whitespace-pre-line mt-1  text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-8 mt-6">
          <Button variant="primary" size="md" startIcon={<HiOutlineArchiveBox />} className="min-w-[180px] text-[1.1rem] font-medium text-gray-500">
            Edit Ticket
          </Button>
          <Button variant="primary" size="md" startIcon={<HiOutlineArchiveBox />} className="min-w-[180px] text-[1.1rem] font-medium text-gray-500">
            Delete Ticket
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QualityCard;