import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export function WelcomeSection() {
    const userName = 'Admin'; // 
    const userRole = 'Admin IT';

    const getCurrentGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Selamat Pagi';
        if (hour < 15) return 'Selamat Siang';
        if (hour < 18) return 'Selamat Sore';
        return 'Selamat Malam';
    };

    return (
        <div className="px-4 lg:px-6">
            <Card className="border-none bg-gradient-to-r from-primary/10 via-primary/5 to-transparent shadow-sm">
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <div className="space-y-2">
                            <h1 className="text-2xl font-bold text-foreground md:text-3xl">
                                {getCurrentGreeting()}, {userName}! 👋
                            </h1>
                            <p className="text-muted-foreground">
                                Selamat datang di Sistem Inventaris PCS
                            </p>
                        </div>
                        <Badge
                            variant="secondary"
                            className="text-sm font-medium"
                        >
                            {userRole}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground">
                        Kelola dan pantau inventaris barang-barang dengan mudah.
                        Semoga hari Anda produktif!
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
