 

// import React, { useEffect, useState } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Badge } from '@/components/ui/badge';
// import { Switch } from '@/components/ui/switch';
// import { useToast } from '@/components/ui/use-toast';
// import {
//   CreditCard,
//   Settings,
//   Zap,
//   Globe,
// } from 'lucide-react';

// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// type PaymentStats = {
//   totalTransactions: number;
//   successfulPayments: number;
//   failedPayments: number;
//   totalRevenue: number;
//   averageTransaction: number;
//   refunds: number;
// };

// type StripeConfig = {
//   publishableKey: string;
//   secretKey: string;
//   webhookEndpoint: string;
//   currency: string;
//   testMode: boolean;
//   stripeEnabled: boolean;
//   paymentMethods: string[];
// };

// type WebhookLog = {
//   id: string;
//   event: string;
//   status: string;
//   receivedAt: string;
// };

// export const AdminPaymentsPage: React.FC = () => {
//   const [paymentStats, setPaymentStats] = useState<PaymentStats | null>(null);
//   const [stripeConfig, setStripeConfig] = useState<StripeConfig | null>(null);
//   const [webhookLogs, setWebhookLogs] = useState<WebhookLog[]>([]);
//   const { toast } = useToast();

//   useEffect(() => {
//     let ignore = false;
//     const fetchData = async () => {
//       try {
//         const stats = await fetch(`${API_URL}/api/payment/stats`).then((res) => res.json());
//         const config = await fetch(`${API_URL}/api/payment/config`).then((res) => res.json());
//         const logs = await fetch(`${API_URL}/api/payment/webhooks`).then((res) => res.json());
//         if (!ignore) {
//           setPaymentStats(stats);
//           setStripeConfig(config);
//           setWebhookLogs(logs);
//         }
//       } catch {
//         toast({ title: 'Failed to load payment data', variant: 'destructive' });
//       }
//     };
//     fetchData();
//     return () => {
//       ignore = true;
//     };
//   }, []);

//   const saveConfiguration = async () => {
//     try {
//       const res = await fetch(`${API_URL}/api/payment/config`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(stripeConfig),
//       });
//       if (!res.ok) throw new Error('Failed to update');
//       toast({ title: 'Stripe config updated' });
//     } catch {
//       toast({ title: 'Error saving config', variant: 'destructive' });
//     }
//   };

//   const formatCurrency = (value?: number) => {
//     return value !== undefined ? `$${value.toLocaleString()}` : '$0';
//   };

//   if (!paymentStats || !stripeConfig) {
//     return <div className="text-center text-gray-400 py-20">Loading payment ...</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-900">
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <h1 className="text-3xl font-bold text-white mb-2">Payment </h1>
//         <p className="text-gray-400 mb-8">Manage Stripe configuration and monitor payments</p>

//         <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
//           <StatCard label="Total Transactions" value={paymentStats.totalTransactions} />
//           <StatCard label="Successful" value={paymentStats.successfulPayments} color="text-green-400" />
//           <StatCard label="Failed" value={paymentStats.failedPayments} color="text-red-400" />
//           <StatCard label="Total Revenue" value={formatCurrency(paymentStats.totalRevenue)} />
//           <StatCard label="Avg Transaction" value={formatCurrency(paymentStats.averageTransaction)} />
//           <StatCard label="Refunds" value={paymentStats.refunds} color="text-yellow-400" />
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           <Card className="bg-gray-800 border-gray-700">
//             <CardHeader>
//               <CardTitle className="flex items-center text-white">
//                 <CreditCard className="w-5 h-5 mr-2" /> Stripe Configuration
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <ToggleRow label="Enable Stripe" value={stripeConfig.stripeEnabled ?? false} onChange={(v) => setStripeConfig({ ...stripeConfig, stripeEnabled: v })} />
//               <ToggleRow label="Test Mode" value={stripeConfig.testMode ?? false} onChange={(v) => setStripeConfig({ ...stripeConfig, testMode: v })} />
//               <InputField label="Publishable Key" value={stripeConfig.publishableKey ?? ''} onChange={(v) => setStripeConfig({ ...stripeConfig, publishableKey: v })} />
//               <InputField label="Secret Key" value={stripeConfig.secretKey ?? ''} type="password" onChange={(v) => setStripeConfig({ ...stripeConfig, secretKey: v })} />
//               <InputField label="Webhook Endpoint" value={stripeConfig.webhookEndpoint ?? ''} onChange={(v) => setStripeConfig({ ...stripeConfig, webhookEndpoint: v })} />
//               <Button onClick={saveConfiguration} className="w-full bg-blue-600 hover:bg-blue-700">
//                 <Settings className="w-4 h-4 mr-2" /> Save Configuration
//               </Button>
//             </CardContent>
//           </Card>

//           <div className="space-y-6">
//             <Card className="bg-gray-800 border-gray-700">
//               <CardHeader>
//                 <CardTitle className="flex items-center text-white">
//                   <Zap className="w-5 h-5 mr-2" /> Payment Methods
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 {stripeConfig.paymentMethods?.length > 0 ? (
//                   stripeConfig.paymentMethods.map((method) => (
//                     <div key={method} className="flex items-center justify-between">
//                       <div className="text-white flex items-center space-x-2">
//                         <Globe className="w-4 h-4 text-blue-300" />
//                         <span>{method.replace('_', ' ')}</span>
//                       </div>
//                       <Badge className="bg-green-600 text-white">Enabled</Badge>
//                     </div>
//                   ))
//                 ) : (
//                   <p className="text-gray-400">No payment methods configured</p>
//                 )}
//               </CardContent>
//             </Card>

//             <Card className="bg-gray-800 border-gray-700">
//               <CardHeader>
//                 <CardTitle className="text-white">Webhook Logs</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-2">
//                 {webhookLogs.length > 0 ? (
//                   webhookLogs.slice(0, 5).map((log) => (
//                     <div key={log.id} className="text-sm text-gray-300">
//                       <span className="font-bold">{log.event}</span> – {log.status} – {new Date(log.receivedAt).toLocaleString()}
//                     </div>
//                   ))
//                 ) : (
//                   <p className="text-gray-500">No logs yet.</p>
//                 )}
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const StatCard = ({ label, value, color = 'text-white' }: { label: string; value: number | string; color?: string }) => (
//   <Card className="bg-gray-800 border-gray-700">
//     <CardContent className="p-6 text-center">
//       <div className={`text-2xl font-bold ${color}`}>{value}</div>
//       <div className="text-sm text-gray-400">{label}</div>
//     </CardContent>
//   </Card>
// );

// const ToggleRow = ({ label, value, onChange }: { label: string; value: boolean; onChange: (val: boolean) => void }) => (
//   <div className="flex items-center justify-between">
//     <div>
//       <Label className="text-white">{label}</Label>
//       <p className="text-sm text-gray-400">Toggle {label.toLowerCase()}</p>
//     </div>
//     <Switch checked={value} onCheckedChange={onChange} />
//   </div>
// );

// const InputField = ({ label, value, onChange, type = 'text' }: { label: string; value: string; onChange: (v: string) => void; type?: string }) => (
//   <div>
//     <Label className="text-white">{label}</Label>
//     <Input
//       type={type}
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//       className="bg-gray-700 border-gray-600 text-white mt-1"
//     />
//   </div>
// );
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { CreditCard, Settings, Zap, Globe } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

type PaymentStats = {
  totalTransactions: number;
  successfulPayments: number;
  failedPayments: number;
  totalRevenue: number;
  averageTransaction: number;
  refunds: number;
};

type StripeConfig = {
  publishableKey: string;
  secretKey: string;
  webhookEndpoint: string;
  currency: string;
  testMode: boolean;
  stripeEnabled: boolean;
  paymentMethods: string[];
};

type WebhookLog = {
  id: string;
  event: string;
  status: string;
  receivedAt: string;
};

const defaultStripeConfig: StripeConfig = {
  publishableKey: '',
  secretKey: '',
  webhookEndpoint: '',
  currency: 'usd',
  testMode: false,
  stripeEnabled: false,
  paymentMethods: [],
};

export const AdminPaymentsPage: React.FC = () => {
  const [paymentStats, setPaymentStats] = useState<PaymentStats | null>(null);
  const [stripeConfig, setStripeConfig] = useState<StripeConfig>(defaultStripeConfig);
  const [webhookLogs, setWebhookLogs] = useState<WebhookLog[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      try {
        const [statsRes, configRes, logsRes] = await Promise.all([
          fetch(`${API_URL}/api/payment/stats`),
          fetch(`${API_URL}/api/payment/config`),
          fetch(`${API_URL}/api/payment/webhooks`),
        ]);

        if (!statsRes.ok || !configRes.ok || !logsRes.ok) throw new Error();

        const stats = await statsRes.json();
        const config = await configRes.json();
        const logs = await logsRes.json();

        if (!ignore) {
          setPaymentStats(stats);
          setStripeConfig({ ...defaultStripeConfig, ...config });
          setWebhookLogs(logs);
        }
      } catch {
        toast({ title: 'Failed to load payment data', variant: 'destructive' });
      }
    };

    fetchData();
    return () => {
      ignore = true;
    };
  }, []);

  const saveConfiguration = async () => {
    try {
      const res = await fetch(`${API_URL}/api/payment/config`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(stripeConfig),
      });

      if (!res.ok) throw new Error();
      toast({ title: 'Stripe config updated successfully' });
    } catch {
      toast({ title: 'Error saving config', variant: 'destructive' });
    }
  };

  const formatCurrency = (value?: number) =>
    typeof value === 'number' ? `$${value.toLocaleString()}` : '$0';

  if (!paymentStats) {
    return <div className="text-center text-gray-400 py-20">Loading payment data...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-2">Payment</h1>
        <p className="text-gray-400 mb-8">Manage Stripe configuration and monitor payments</p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
          <StatCard label="Total Transactions" value={paymentStats.totalTransactions} />
          <StatCard label="Successful" value={paymentStats.successfulPayments} color="text-green-400" />
          <StatCard label="Failed" value={paymentStats.failedPayments} color="text-red-400" />
          <StatCard label="Total Revenue" value={formatCurrency(paymentStats.totalRevenue)} />
          <StatCard label="Avg Transaction" value={formatCurrency(paymentStats.averageTransaction)} />
          <StatCard label="Refunds" value={paymentStats.refunds} color="text-yellow-400" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Stripe Config */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <CreditCard className="w-5 h-5 mr-2" /> Stripe Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <ToggleRow
                label="Enable Stripe"
                value={stripeConfig.stripeEnabled}
                onChange={(v) => setStripeConfig({ ...stripeConfig, stripeEnabled: v })}
              />
              <ToggleRow
                label="Test Mode"
                value={stripeConfig.testMode}
                onChange={(v) => setStripeConfig({ ...stripeConfig, testMode: v })}
              />
              <InputField
                label="Publishable Key"
                value={stripeConfig.publishableKey}
                onChange={(v) => setStripeConfig({ ...stripeConfig, publishableKey: v })}
              />
              <InputField
                label="Secret Key"
                type="password"
                value={stripeConfig.secretKey}
                onChange={(v) => setStripeConfig({ ...stripeConfig, secretKey: v })}
              />
              <InputField
                label="Webhook Endpoint"
                value={stripeConfig.webhookEndpoint}
                onChange={(v) => setStripeConfig({ ...stripeConfig, webhookEndpoint: v })}
              />
              <Button onClick={saveConfiguration} className="w-full bg-blue-600 hover:bg-blue-700">
                <Settings className="w-4 h-4 mr-2" /> Save Configuration
              </Button>
            </CardContent>
          </Card>

          {/* Payment Methods & Webhooks */}
          <div className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Zap className="w-5 h-5 mr-2" /> Payment Methods
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {stripeConfig.paymentMethods.length > 0 ? (
                  stripeConfig.paymentMethods.map((method) => (
                    <div key={method} className="flex items-center justify-between">
                      <div className="text-white flex items-center space-x-2">
                        <Globe className="w-4 h-4 text-blue-300" />
                        <span>{method.replace('_', ' ')}</span>
                      </div>
                      <Badge className="bg-green-600 text-white">Enabled</Badge>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400">No payment methods configured</p>
                )}
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Webhook Logs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {webhookLogs.length > 0 ? (
                  webhookLogs.slice(0, 5).map((log) => (
                    <div key={log.id} className="text-sm text-gray-300">
                      <span className="font-bold">{log.event}</span> – {log.status} –{' '}
                      {new Date(log.receivedAt).toLocaleString()}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No logs yet.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

// Stat Card Component
const StatCard = ({
  label,
  value,
  color = 'text-white',
}: {
  label: string;
  value: number | string;
  color?: string;
}) => (
  <Card className="bg-gray-800 border-gray-700">
    <CardContent className="p-6 text-center">
      <div className={`text-2xl font-bold ${color}`}>{value}</div>
      <div className="text-sm text-gray-400">{label}</div>
    </CardContent>
  </Card>
);

// Toggle Switch Component
const ToggleRow = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (val: boolean) => void;
}) => (
  <div className="flex items-center justify-between">
    <div>
      <Label className="text-white">{label}</Label>
      <p className="text-sm text-gray-400">Toggle {label.toLowerCase()}</p>
    </div>
    <Switch checked={value} onCheckedChange={onChange} />
  </div>
);

// Input Field Component
const InputField = ({
  label,
  value,
  onChange,
  type = 'text',
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) => (
  <div>
    <Label className="text-white">{label}</Label>
    <Input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-gray-700 border-gray-600 text-white mt-1"
    />
  </div>
);
