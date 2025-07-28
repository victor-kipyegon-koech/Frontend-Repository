 
// // import React, { useEffect, useState } from 'react';
// // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// // import { Button } from '@/components/ui/button';
// // import {
// //   Select,
// //   SelectContent,
// //   SelectItem,
// //   SelectTrigger,
// //   SelectValue,
// // } from '@/components/ui/select';
// // import {
// //   Download,
// //   TrendingUp,
// //   DollarSign,
// //   Calendar,
// //   Users,
// //   FileText,
// // } from 'lucide-react';

// // type TopEvent = {
// //   name: string;
// //   revenue: number;
// //   bookings: number;
// // };

// // type SalesReport = {
// //   totalRevenue: number;
// //   totalBookings: number;
// //   averageOrderValue: number;
// //   topEvents: TopEvent[];
// // };

// // export const AdminReportsPage: React.FC = () => {
// //   const [reportType, setReportType] = useState('sales');
// //   const [dateRange, setDateRange] = useState('30days');
// //   const [reportData, setReportData] = useState<any | null>(null);
// //   const [loading, setLoading] = useState(false);

// //   const reportTypes = [
// //     { value: 'sales', label: 'Sales Report' },
// //     { value: 'events', label: 'Event Performance' },
// //     { value: 'users', label: 'User Analytics' },
// //     { value: 'revenue', label: 'Revenue Analysis' },
// //   ];

// //   const dateRanges = [
// //     { value: '7days', label: 'Last 7 Days' },
// //     { value: '30days', label: 'Last 30 Days' },
// //     { value: '90days', label: 'Last 3 Months' },
// //     { value: '1year', label: 'Last Year' },
// //   ];

// //   useEffect(() => {
// //     const fetchReport = async () => {
// //       try {
// //         setLoading(true);
// //         const res = await fetch(
// //           `http://localhost:5000/api/reports/${reportType}?range=${dateRange}`
// //         );
// //         if (!res.ok) throw new Error('Failed to fetch report');
// //         const data = await res.json();
// //         console.log('Fetched report data:', data);
// //         setReportData(data);
// //       } catch (err) {
// //         console.error(err);
// //         setReportData(null);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchReport();
// //   }, [reportType, dateRange]);

// //   const handleExport = async () => {
// //     try {
// //       const res = await fetch(
// //         `http://localhost:5000/api/reports/${reportType}/download?range=${dateRange}`
// //       );
// //       if (!res.ok) throw new Error('Failed to download PDF');

// //       const blob = await res.blob();
// //       const urlBlob = window.URL.createObjectURL(blob);
// //       const link = document.createElement('a');
// //       link.href = urlBlob;
// //       link.download = `${reportType}-report.pdf`;
// //       document.body.appendChild(link);
// //       link.click();
// //       link.remove();
// //     } catch (err) {
// //       alert('Export failed.');
// //       console.error(err);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-900">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// //         <div className="flex justify-between items-center mb-8">
// //           <div>
// //             <h1 className="text-3xl font-bold text-white mb-2">Reports</h1>
// //             <p className="text-gray-400">Generate and export reports by type and time period</p>
// //           </div>
// //           <Button
// //             className="bg-green-600 hover:bg-green-700"
// //             onClick={handleExport}
// //             disabled={!reportData}
// //           >
// //             <Download className="w-4 h-4 mr-2" />
// //             Export Report
// //           </Button>
// //         </div>

// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
// //           <Select value={reportType} onValueChange={setReportType}>
// //             <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
// //               <SelectValue placeholder="Select report type" />
// //             </SelectTrigger>
// //             <SelectContent>
// //               {reportTypes.map((type) => (
// //                 <SelectItem key={type.value} value={type.value}>
// //                   {type.label}
// //                 </SelectItem>
// //               ))}
// //             </SelectContent>
// //           </Select>

// //           <Select value={dateRange} onValueChange={setDateRange}>
// //             <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
// //               <SelectValue placeholder="Select date range" />
// //             </SelectTrigger>
// //             <SelectContent>
// //               {dateRanges.map((range) => (
// //                 <SelectItem key={range.value} value={range.value}>
// //                   {range.label}
// //                 </SelectItem>
// //               ))}
// //             </SelectContent>
// //           </Select>
// //         </div>

// //         {loading ? (
// //           <p className="text-gray-400">Loading...</p>
// //         ) : reportType === 'sales' && reportData ? (
// //           <>
// //             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
// //               <Card className="bg-gray-800 border-gray-700">
// //                 <CardContent className="p-6">
// //                   <div className="flex items-center justify-between">
// //                     <div>
// //                       <p className="text-sm text-gray-400">Total Revenue</p>
// //                       <p className="text-2xl font-bold text-white">${reportData.totalRevenue.toLocaleString()}</p>
// //                     </div>
// //                     <DollarSign className="w-6 h-6 text-green-400" />
// //                   </div>
// //                 </CardContent>
// //               </Card>

// //               <Card className="bg-gray-800 border-gray-700">
// //                 <CardContent className="p-6">
// //                   <div className="flex items-center justify-between">
// //                     <div>
// //                       <p className="text-sm text-gray-400">Total Bookings</p>
// //                       <p className="text-2xl font-bold text-white">{reportData.totalBookings}</p>
// //                     </div>
// //                     <Users className="w-6 h-6 text-blue-400" />
// //                   </div>
// //                 </CardContent>
// //               </Card>

// //               <Card className="bg-gray-800 border-gray-700">
// //                 <CardContent className="p-6">
// //                   <div className="flex items-center justify-between">
// //                     <div>
// //                       <p className="text-sm text-gray-400">Avg Order Value</p>
// //                       <p className="text-2xl font-bold text-white">${reportData.averageOrderValue.toFixed(2)}</p>
// //                     </div>
// //                     <TrendingUp className="w-6 h-6 text-purple-400" />
// //                   </div>
// //                 </CardContent>
// //               </Card>
// //             </div>

// //             <Card className="bg-gray-800 border-gray-700">
// //               <CardHeader>
// //                 <CardTitle className="text-white flex items-center">
// //                   <FileText className="w-5 h-5 mr-2" />
// //                   Top Events
// //                 </CardTitle>
// //               </CardHeader>
// //               <CardContent>
// //                 <div className="overflow-x-auto">
// //                   <table className="w-full">
// //                     <thead>
// //                       <tr className="border-b border-gray-700 text-left text-gray-400">
// //                         <th className="py-2 px-4">Event</th>
// //                         <th className="py-2 px-4">Revenue</th>
// //                         <th className="py-2 px-4">Bookings</th>
// //                         <th className="py-2 px-4">Avg Ticket Price</th>
// //                       </tr>
// //                     </thead>
// //                     <tbody>
// //                       {reportData.topEvents.map((event: TopEvent, idx: number) => (
// //                         <tr key={idx} className="border-b border-gray-700 hover:bg-gray-700">
// //                           <td className="py-2 px-4 text-white">{event.name}</td>
// //                           <td className="py-2 px-4 text-green-400">${event.revenue.toLocaleString()}</td>
// //                           <td className="py-2 px-4 text-white">{event.bookings}</td>
// //                           <td className="py-2 px-4 text-white">${(event.revenue / event.bookings).toFixed(2)}</td>
// //                         </tr>
// //                       ))}
// //                     </tbody>
// //                   </table>
// //                 </div>
// //               </CardContent>
// //             </Card>
// //           </>
// //         ) : (
// //           <p className="text-gray-400"> No display</p> 
        

 
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// import React, { useEffect, useState } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import {
//   Download,
//   TrendingUp,
//   DollarSign,
//   Users,
//   FileText,
// } from 'lucide-react';

// type TopEvent = {
//   name: string;
//   revenue: number;
//   bookings: number;
//   avgTicketPrice?: number;
// };

// type RevenueByMonth = {
//   month: string;
//   revenue: number;
// };

// type AdminReportData =
//   | {
//       totalRevenue: number;
//       totalBookings: number;
//       averageOrderValue: number;
//       topEvents: TopEvent[];
//     }
//   | {
//       topPerformingEvents: TopEvent[];
//     }
//   | {
//       newUsers: number;
//       totalUsers: number;
//       activeUsers?: number;
//     }
//   | {
//       totalRevenue: number;
//       revenueByMonth: RevenueByMonth[];
//     };

// export const AdminReportsPage: React.FC = () => {
//   const [reportType, setReportType] = useState('sales');
//   const [dateRange, setDateRange] = useState('30days');
//   const [reportData, setReportData] = useState<AdminReportData | null>(null);
//   const [loading, setLoading] = useState(false);

//   const reportTypes = [
//     { value: 'sales', label: 'Sales Report' },
//     { value: 'events', label: 'Event Performance' },
//     { value: 'users', label: 'User Analytics' },
//     { value: 'revenue', label: 'Revenue Analysis' },
//   ];

//   const dateRanges = [
//     { value: '7days', label: 'Last 7 Days' },
//     { value: '30days', label: 'Last 30 Days' },
//     { value: '90days', label: 'Last 3 Months' },
//     { value: '1year', label: 'Last Year' },
//   ];

//   useEffect(() => {
//     const fetchReport = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch(
//           `http://localhost:5000/api/reports/${reportType}?range=${dateRange}`
//         );
//         if (!res.ok) throw new Error('Failed to fetch report');
//         const data = await res.json();
//         console.log('Fetched report data:', data);
//         setReportData(data);
//       } catch (err) {
//         console.error(err);
//         setReportData(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReport();
//   }, [reportType, dateRange]);

//   const handleExport = async () => {
//     try {
//       const res = await fetch(
//         `http://localhost:5000/api/reports/${reportType}/download?range=${dateRange}`
//       );
//       if (!res.ok) throw new Error('Failed to download PDF');

//       const blob = await res.blob();
//       const urlBlob = window.URL.createObjectURL(blob);
//       const link = document.createElement('a');
//       link.href = urlBlob;
//       link.download = `${reportType}-report.pdf`;
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//     } catch (err) {
//       alert('Export failed.');
//       console.error(err);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-900">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="flex justify-between items-center mb-8">
//           <div>
//             <h1 className="text-3xl font-bold text-white mb-2">Reports</h1>
//             <p className="text-gray-400">Generate and export reports by type and time period</p>
//           </div>
//           <Button
//             className="bg-green-600 hover:bg-green-700"
//             onClick={handleExport}
//             disabled={!reportData}
//           >
//             <Download className="w-4 h-4 mr-2" />
//             Export Report
//           </Button>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
//           <Select value={reportType} onValueChange={setReportType}>
//             <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
//               <SelectValue placeholder="Select report type" />
//             </SelectTrigger>
//             <SelectContent>
//               {reportTypes.map((type) => (
//                 <SelectItem key={type.value} value={type.value}>
//                   {type.label}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>

//           <Select value={dateRange} onValueChange={setDateRange}>
//             <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
//               <SelectValue placeholder="Select date range" />
//             </SelectTrigger>
//             <SelectContent>
//               {dateRanges.map((range) => (
//                 <SelectItem key={range.value} value={range.value}>
//                   {range.label}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>

//         {loading ? (
//           <p className="text-gray-400">Loading...</p>
//         ) : reportType === 'sales' && reportData && 'topEvents' in reportData ? (
//           <>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//               <Card className="bg-gray-800 border-gray-700">
//                 <CardContent className="p-6">
//                   <p className="text-sm text-gray-400">Total Revenue</p>
//                   <p className="text-2xl font-bold text-white">
//                     ${reportData.totalRevenue.toLocaleString()}
//                   </p>
//                 </CardContent>
//               </Card>
//               <Card className="bg-gray-800 border-gray-700">
//                 <CardContent className="p-6">
//                   <p className="text-sm text-gray-400">Total Bookings</p>
//                   <p className="text-2xl font-bold text-white">
//                     {reportData.totalBookings}
//                   </p>
//                 </CardContent>
//               </Card>
//               <Card className="bg-gray-800 border-gray-700">
//                 <CardContent className="p-6">
//                   <p className="text-sm text-gray-400">Avg Order Value</p>
//                   <p className="text-2xl font-bold text-white">
//                     ${reportData.averageOrderValue.toFixed(2)}
//                   </p>
//                 </CardContent>
//               </Card>
//             </div>

//             <Card className="bg-gray-800 border-gray-700">
//               <CardHeader>
//                 <CardTitle className="text-white flex items-center">
//                   <FileText className="w-5 h-5 mr-2" />
//                   Top Events
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <table className="w-full">
//                   <thead>
//                     <tr className="text-left text-gray-400 border-b border-gray-700">
//                       <th className="py-2 px-4">Event</th>
//                       <th className="py-2 px-4">Revenue</th>
//                       <th className="py-2 px-4">Bookings</th>
//                       <th className="py-2 px-4">Avg Ticket Price</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {reportData.topEvents.map((event, idx) => (
//                       <tr key={idx} className="border-b border-gray-700 hover:bg-gray-700">
//                         <td className="py-2 px-4 text-white">{event.name}</td>
//                         <td className="py-2 px-4 text-green-400">
//                           ${event.revenue.toFixed(2)}
//                         </td>
//                         <td className="py-2 px-4 text-white">{event.bookings}</td>
//                         <td className="py-2 px-4 text-white">
//                           ${((event.revenue / event.bookings) || 0).toFixed(2)}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </CardContent>
//             </Card>
//           </>
//         ) : reportType === 'events' && reportData && Array.isArray(reportData) ? (
//           <Card className="bg-gray-800 border-gray-700">
//             <CardHeader>
//               <CardTitle className="text-white flex items-center">
//                 <TrendingUp className="w-5 h-5 mr-2" />
//                 Event Performance
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <table className="w-full">
//                 <thead>
//                   <tr className="text-left text-gray-400 border-b border-gray-700">
//                     <th className="py-2 px-4">Event</th>
//                     <th className="py-2 px-4">Revenue</th>
//                     <th className="py-2 px-4">Bookings</th>
//                     <th className="py-2 px-4">Avg Ticket Price</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {reportData.map((event: TopEvent, idx: number) => (
//                     <tr key={idx} className="border-b border-gray-700 hover:bg-gray-700">
//                       <td className="py-2 px-4 text-white">{event.name}</td>
//                       <td className="py-2 px-4 text-green-400">
//                         ${event.revenue.toFixed(2)}
//                       </td>
//                       <td className="py-2 px-4 text-white">{event.bookings}</td>
//                       <td className="py-2 px-4 text-white">
//                         ${event.avgTicketPrice?.toFixed(2)}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </CardContent>
//           </Card>
//         ) : reportType === 'users' && reportData && 'totalUsers' in reportData ? (
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <Card className="bg-gray-800 border-gray-700">
//               <CardContent className="p-6">
//                 <p className="text-sm text-gray-400">New Users</p>
//                 <p className="text-2xl font-bold text-white">{reportData.newUsers}</p>
//               </CardContent>
//             </Card>
//             <Card className="bg-gray-800 border-gray-700">
//               <CardContent className="p-6">
//                 <p className="text-sm text-gray-400">Total Users</p>
//                 <p className="text-2xl font-bold text-white">{reportData.totalUsers}</p>
//               </CardContent>
//             </Card>
//             <Card className="bg-gray-800 border-gray-700">
//               <CardContent className="p-6">
//                 <p className="text-sm text-gray-400">Active Users</p>
//                 <p className="text-2xl font-bold text-white">
//                   {reportData.activeUsers ?? 'N/A'}
//                 </p>
//               </CardContent>
//             </Card>
//           </div>
//         ) : reportType === 'revenue' && reportData && 'revenueByMonth' in reportData ? (
//           <Card className="bg-gray-800 border-gray-700">
//             <CardHeader>
//               <CardTitle className="text-white flex items-center">
//                 <DollarSign className="w-5 h-5 mr-2" />
//                 Revenue by Month
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <table className="w-full">
//                 <thead>
//                   <tr className="text-left text-gray-400 border-b border-gray-700">
//                     <th className="py-2 px-4">Month</th>
//                     <th className="py-2 px-4">Revenue</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {reportData.revenueByMonth.map((item, idx) => (
//                     <tr key={idx} className="border-b border-gray-700 hover:bg-gray-700">
//                       <td className="py-2 px-4 text-white">{item.month}</td>
//                       <td className="py-2 px-4 text-green-400">
//                         ${item.revenue.toFixed(2)}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </CardContent>
//           </Card>
//         ) : (
//           <p className="text-gray-400">No display</p>
//         )}
//       </div>
//     </div>
//   );
// };
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download,  FileText } from 'lucide-react';

type TopEvent = {
  name: string;
  revenue: number;
  bookings: number;
};

type SalesReport = {
  totalRevenue: number;
  totalBookings: number;
  averageOrderValue: number;
  topEvents: TopEvent[];
};

export const AdminReportsPage: React.FC = () => {
  const [dateRange, setDateRange] = useState('30days');
  const [reportData, setReportData] = useState<SalesReport | null>(null);
  const [loading, setLoading] = useState(false);

  const dateRanges = [
    { value: '7days', label: 'Last 7 Days' },
    { value: '30days', label: 'Last 30 Days' },
    { value: '90days', label: 'Last 3 Months' },
    { value: '1year', label: 'Last Year' },
  ];

  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:5000/api/reports/sales?range=${dateRange}`);
        if (!res.ok) throw new Error('Failed to fetch report');
        const data = await res.json();
        setReportData(data);
      } catch (err) {
        console.error(err);
        setReportData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [dateRange]);

  const handleExport = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/reports/sales/download?range=${dateRange}`
      );
      if (!res.ok) throw new Error('Failed to download PDF');

      const blob = await res.blob();
      const urlBlob = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = urlBlob;
      link.download = `sales-report.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert('Export failed.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Sales Report</h1>
            <p className="text-gray-400">Generate and export sales data by time period</p>
          </div>
          <Button
            className="bg-green-600 hover:bg-green-700"
            onClick={handleExport}
            disabled={!reportData}
          >
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>

        <div className="mb-6">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded"
          >
            {dateRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : reportData ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <p className="text-sm text-gray-400">Total Revenue</p>
                  <p className="text-2xl font-bold text-white">
                    ${reportData.totalRevenue.toLocaleString()}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <p className="text-sm text-gray-400">Total Bookings</p>
                  <p className="text-2xl font-bold text-white">{reportData.totalBookings}</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <p className="text-sm text-gray-400">Avg Order Value</p>
                  <p className="text-2xl font-bold text-white">
                    ${reportData.averageOrderValue.toFixed(2)}
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Top Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-gray-400 border-b border-gray-700">
                      <th className="py-2 px-4">Event</th>
                      <th className="py-2 px-4">Revenue</th>
                      <th className="py-2 px-4">Bookings</th>
                      <th className="py-2 px-4">Avg Ticket Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.topEvents.map((event, idx) => (
                      <tr key={idx} className="border-b border-gray-700 hover:bg-gray-700">
                        <td className="py-2 px-4 text-white">{event.name}</td>
                        <td className="py-2 px-4 text-green-400">
                          ${event.revenue.toFixed(2)}
                        </td>
                        <td className="py-2 px-4 text-white">{event.bookings}</td>
                        <td className="py-2 px-4 text-white">
                          ${(event.revenue / event.bookings).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </>
        ) : (
          <p className="text-gray-400">No report data available.</p>
        )}
      </div>
    </div>
  );
};
