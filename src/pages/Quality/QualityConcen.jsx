import React from "react";
import {useQuery} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";
import DaynamicTable from "../../components/common/Table";
import Badge from "../../components/common/Badge";
import useQuality from "../../services/useQuality";

const tableHeaders = [
  "Ticket ID",
  "Reported by",
  "Date",
  "Issue Type",
  "Status",
];

const formatCell = (cell, idx) => {
  if (idx === 3) {
    // Issue Type
    return (
      <Badge size="sm" color="primary">
        {cell}
      </Badge>
    );
  }
  
  if (idx === 4) {
    // Status
    const isResolved = cell === "YES" || cell === true;
    return (
      <Badge 
        size="sm" 
        color={isResolved ? "success" : "warning"}
      >
        {isResolved ? "Resolved" : "Pending"}
      </Badge>
    );
  }
  
  return cell;
};

const QualityConcen = () => {
  const {getAllQualityIssues} = useQuality();
  const navigate = useNavigate();

  const {data, isLoading, isError} = useQuery({
    queryKey: ["quality-issues"],
    queryFn: () => getAllQualityIssues(),
  });

  const tableData = {
    item: Array.isArray(data?.item)
      ? data.item.map((issue) => {
          return {
            id: issue.id,
            data: [
              issue.data[0] || issue.ticket_number || issue.id.slice(-8).toUpperCase(),
              issue.data[1] || issue.created_by?.name || "Unknown",
              issue.data[2] || "Invalid Date",
              issue.data[3] || issue.issue_type || "Unknown",
              issue.data[4] || issue.action_taken,
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
        Quality Issues
      </h2>

      {isLoading ? (
        <p className="text-center">Loading quality issues...</p>
      ) : isError ? (
        <p className="text-center text-red-500">Failed to load quality issues</p>
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
