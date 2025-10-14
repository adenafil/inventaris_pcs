import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Computer, Monitor, Shield, Users } from 'lucide-react';


export function SectionCards({ totalAsset, totalPegawai, totalModel, role }: { totalAsset: number; totalPegawai: number; totalModel: number; role: string }) {
    const stats = [
        {
            title: 'Total Assets',
            description: 'Jumlah aset terdaftar',
            value: totalAsset.toString(),
            icon: Computer,
            trend: 'Assets',
            trendType: 'neutral' as const,
        },
        {
            title: 'Role User',
            description: 'Role pengguna saat ini',
            value: role,
            icon: Shield,
            trend: role === "superadmin" ? 'Admin Tertinggi' : "User Biasa",
            trendType: 'positive' as const,
        },
        {
            title: 'Total Pegawai',
            description: 'Jumlah pegawai terdaftar',
            value: totalPegawai.toString(),
            icon: Users,
            trend: 'Active',
            trendType: 'positive' as const,
        },
        {
            title: 'Total Model',
            description: 'Model perangkat tersedia',
            value: totalModel.toString(),
            icon: Monitor,
            trend: 'Models',
            trendType: 'neutral' as const,
        },
    ];

    const getTrendColor = (type: string) => {
        switch (type) {
            case 'positive':
                return 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20';
            case 'negative':
                return 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20';
            default:
                return 'text-gray-600 bg-gray-50 dark:text-gray-400 dark:bg-gray-900/20';
        }
    };

    return (
        <div className="grid grid-cols-1 gap-4 px-4 md:grid-cols-2 lg:px-6">
            {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                    <Card
                        key={index}
                        className="@container/card bg-gradient-to-t from-primary/5 to-card shadow-xs transition-shadow duration-200 hover:shadow-md dark:bg-card"
                    >
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <CardDescription className="text-sm font-medium">
                                    {stat.title}
                                </CardDescription>
                                <IconComponent className="h-4 w-4 text-muted-foreground" />
                            </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <div className="space-y-2">
                                <CardTitle className="text-2xl font-bold tabular-nums @[250px]/card:text-3xl">
                                    {stat.value}
                                </CardTitle>
                                <div className="flex items-center gap-2">
                                    <Badge
                                        variant="secondary"
                                        className={`px-2 py-1 text-xs ${getTrendColor(stat.trendType)}`}
                                    >
                                        {stat.trend}
                                    </Badge>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    {stat.description}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}
