import React from "react";
import {useQuery} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";
import DaynamicTable from "../../components/common/Table";
import useQuality from "../../services/useQuality";

const tableHeaders = [
  "Ticket ID",
  "Vendor name",
  "Date",
  "Issue",
  "Action Taken",
];

const formatCell = (cell, idx) => {
  if (idx === 4) {
    const isYes = cell === "YES";
    return (
      <span
        style={{
          color: isYes ? "#34C759" : "#FFA500",
          background: isYes ? "rgba(52,199,89,0.08)" : "rgba(255,165,0,0.08)",
          padding: "2px 12px",
          borderRadius: "12px",
          fontWeight: 500,
          fontSize: "14px",
        }}
      >
        {cell}
      </span>
    );
  }
  return cell;
};

const QualityConcen = () => {
  const {getAllQualityIssues} = useQuality();
  const navigate = useNavigate();

  const {data, isLoading, isError} = useQuery({
    queryKey: ["quality-issues"],
    queryFn: () => getAllQualityIssues({}),
  });

  const tableData = {
    item: Array.isArray(data?.item)
      ? data.item.map((issue) => {
          return {
            id: issue.id,
            data: [
              issue.data[0] || issue.ticket_number || issue.id.slice(-5),
              issue.data[1] || issue.vendor || "—",
              issue.data[2] || "Invalid Date",
              issue.data[3] || issue.issue || issue.issue_type || "—",
              issue.data[4] === "YES" || issue.data[4] === "NO"
                ? issue.data[4]
                : issue.action_taken
                ? "YES"
                : "NO",
            ],
          };
        })
      : [],
  };

  const handleRowClick = ({item_id}) => {
    navigate(`/quality/${item_id}`);
  };

  return (
    <div className="mt-4">
      <h2
        style={{
          fontSize: "1.5rem",
          fontWeight: 700,
          marginBottom: "2rem",
          color: "var(--color-text)",
        }}
      >
        Quality Concerns
      </h2>

      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : isError ? (
        <p className="text-center text-red-500">Failed to load data</p>
      ) : (
        <DaynamicTable
          header={tableHeaders}
          tableData={tableData}
          formatCell={formatCell}
          onRowClick={handleRowClick}
        />
      )}
    </div>
  );
};

export default QualityConcen;
