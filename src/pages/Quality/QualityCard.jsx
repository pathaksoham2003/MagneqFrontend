import React from "react";
import Button from "../../components/buttons/Button";
import { HiOutlineArchiveBox } from "react-icons/hi2";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useQuality from "../../services/useQuality";

const formatDateDDMMYYYY = (dateString) => {
  const date = new Date(dateString).toLocaleDateString("en-GB");
  return date;
};

const QualityCard = () => {
  const { id } = useParams();
  const { getSpecificQualityIssue } = useQuality();

  const { data: issue, isLoading, isError } = useQuery({
    queryKey: ["quality-issue", id],
    queryFn: () => getSpecificQualityIssue(id),
    enabled: !!id,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p className="text-red-500">Failed to load quality issue.</p>;

  const showMaterialDetails = issue.issue_type === "Material";
  const showProcessDetails = issue.issue_type === "Process";
  const showEmployeeDetails = issue.issue_type === "Employee";
  const showDeliveryDetails = issue.issue_type === "Delivery";

  return (
    <div className="mt-10">
      <h2 className="mt-0 mb-0 text-left text-[1.4rem] font-semibold">
        Quality Ticket Details
      </h2>
      <div className="bg-background p-5 border border-border text-gray-500 text-sm rounded-3xl max-w-[60vw] flex flex-col gap-10 text-left mt-5 ">
        <div className="flex flex-row gap-12 justify-start text-sm ">
          <div className="min-w-[300px] text-sm text-gray-500 font-medium font-inherit ">
            <div>Vendor Name - {issue.vendor || "N/A"}</div>
            <div>Date - {formatDateDDMMYYYY(issue.created_at)}</div>
            <div>Issue Type - {issue.issue_type}</div>

            {showMaterialDetails && issue.finished_good?.length > 0 && (
              <>
                <div className="mt-2 font-semibold">Affected Finished Goods:</div>
                <ul className="list-disc ml-4">
                  {issue.finished_good.map((fg) => (
                    <li key={fg._id}>
                      Model: <strong>{fg.model}</strong> | Type: <strong>{fg.type}</strong> | Ratio: <strong>{fg.ratio}</strong> | Power: <strong>{fg.power?.$numberDecimal}</strong>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {showProcessDetails && (
              <>
                <div>Process-related issue, no finished goods linked.</div>
              </>
            )}

            {showEmployeeDetails && (
              <div>Employee-related issue. Additional fields can be shown here.</div>
            )}

            {showDeliveryDetails && (
              <div>Delivery-related issue. Additional fields can be shown here.</div>
            )}

            <div className="mt-10">Vendor Contact: 91XXXXXXXXXX</div>
          </div>

          <div className="text-[1.1rem] text-gray-500 font-normal font-inherit max-w-[600px]">
            <div className="font-medium">Description :</div>
            <div className="whitespace-pre-line mt-1 text-sm">
              {issue.issue || "No description provided"}
            </div>
          </div>
        </div>

        <div className="flex flex-row gap-8 mt-6">
          <Button
            variant="primary"
            size="md"
            startIcon={<HiOutlineArchiveBox />}
            className="min-w-[180px] text-[1.1rem] font-medium text-gray-500"
          >
            Edit Ticket
          </Button>
          <Button
            variant="primary"
            size="md"
            startIcon={<HiOutlineArchiveBox />}
            className="min-w-[180px] text-[1.1rem] font-medium text-gray-500"
          >
            Delete Ticket
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QualityCard;
