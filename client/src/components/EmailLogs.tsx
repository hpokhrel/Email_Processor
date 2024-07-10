import React, { useEffect, useState } from "react";
import axios from "axios";

interface EmailLogProps {
  email: string;
  status: string;
  error?: string;
  date: string;
}

const EmailLogs: React.FC = () => {
  const [logs, setLogs] = useState<EmailLogProps[]>([]);

  useEffect(() => {
    const fetchLogs = async () => {
      const response = await axios.get(
        "http://localhost:5000/api/templates/logs",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setLogs(response.data);
    };
    fetchLogs();
  }, []);

  return (
    <>
      <div className="container mx-auto ">
        <button className="mt-6 block  mb-4 select-none rounded-full bg-green-800 py-3 px-6 text-center align-middle uppercase text-white shadow-md shadow-green-800/20 transition-all hover:shadow-lg hover:shadow-green-800/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
          <a href="/dashboard">Go Back</a>
        </button>
        <table className="border-collapse w-full">
          <thead>
            <tr>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                S.No
              </th>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                Email
              </th>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                Status
              </th>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                Date
              </th>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                Error
              </th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index: number) => (
              <tr
                key={index}
                className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0"
              >
                <td className="w-full lg:w-auto text-center p-3 text-gray-800 border border-b block lg:table-cell relative lg:static">
                  {index + 1}
                </td>
                <td className="w-full lg:w-auto p-3 text-gray-800 border border-b text-center block lg:table-cell relative lg:static">
                  {log.email}
                </td>
                <td className="w-full lg:w-auto p-3 text-gray-800 border border-b text-center block lg:table-cell relative lg:static">
                  {log.status}
                </td>
                <td className="w-full lg:w-auto p-3 text-gray-800 border border-b text-center block lg:table-cell relative lg:static">
                  {log.date}
                </td>
                <td className="w-full lg:w-auto p-3 text-gray-800 border border-b text-center block lg:table-cell relative lg:static">
                  {log.error || "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EmailLogs;
