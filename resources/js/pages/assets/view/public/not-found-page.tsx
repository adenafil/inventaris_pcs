import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { home } from '@/routes';
import { Head, Link } from '@inertiajs/react';
import { AlertCircle, ArrowLeft, Home, Package, Search } from 'lucide-react';

export default function Page() {
    return (
        <>
            <Head title="Asset Not Found" />
            <div className="flex min-h-screen flex-col ">
                {/* Navbar */}
                <nav className="sticky top-0 z-50 border-b bg-white/80 shadow-sm backdrop-blur-sm dark:border-gray-800 dark:bg-gray-950/80">
                    <div className="mx-auto flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                        <div className="flex items-center gap-4">
                            <img
                                src="/assets/images/logo.png"
                                alt="Logo PCS"
                                className="h-10 w-auto dark:hidden"
                            />
                            <div className="flex flex-col">
                                <h1 className="text-lg font-bold text-gray-900 sm:text-xl dark:text-gray-100">
                                    Inventaris PCS
                                </h1>
                                <p className="hidden text-xs text-gray-600 sm:block dark:text-gray-400">
                                    Petrokopindo Cipta Selaras
                                </p>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Main Content */}
                <div className="flex flex-1 items-center justify-center p-4">
                    <div className="w-full max-w-2xl">
                        <Card className="border-2 shadow-xl">
                            <CardContent className="p-8 sm:p-12">
                                {/* Icon and Status */}
                                <div className="mb-8 flex flex-col items-center justify-center">
                                    <div className="relative mb-6">
                                        <div className="absolute inset-0 animate-ping rounded-full bg-red-400 opacity-20"></div>
                                        <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30">
                                            <Package className="h-12 w-12 text-red-600 dark:text-red-400" />
                                            <div className="absolute right-0 bottom-0 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 shadow-lg">
                                                <AlertCircle className="h-5 w-5 text-white" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-center">
                                        <h1 className="mb-2 text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">
                                            Asset Not Found
                                        </h1>
                                        <p className="text-lg font-medium text-red-600 dark:text-red-400">
                                            404 - Data Tidak Ditemukan
                                        </p>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="mb-8 space-y-4 rounded-lg bg-gradient-to-br from-slate-50 to-slate-100 p-6 dark:from-slate-800/50 dark:to-slate-900/50">
                                    <div className="flex items-start gap-3">
                                        <Search className="mt-1 h-5 w-5 flex-shrink-0 text-slate-600 dark:text-slate-400" />
                                        <div>
                                            <h3 className="mb-1 font-semibold text-gray-900 dark:text-white">
                                                Asset yang Anda cari tidak
                                                ditemukan
                                            </h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Kemungkinan penyebab:
                                            </p>
                                            <ul className="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                                                <li className="flex items-center gap-2">
                                                    <span className="h-1.5 w-1.5 rounded-full bg-slate-400"></span>
                                                    QR Code sudah tidak valid
                                                    atau kedaluwarsa
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <span className="h-1.5 w-1.5 rounded-full bg-slate-400"></span>
                                                    Asset telah dihapus dari
                                                    sistem
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <span className="h-1.5 w-1.5 rounded-full bg-slate-400"></span>
                                                    Link yang Anda akses salah
                                                    atau rusak
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* Support Info */}
                                <div className="mt-8 border-t pt-6 text-center">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Butuh bantuan?{' '}
                                        <a
                                            href="nafilie9@gmail.com"
                                            className="font-medium text-blue-600 hover:underline dark:text-blue-400"
                                        >
                                            Hubungi Tim IT
                                        </a>
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Additional Info */}
                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-500 dark:text-gray-500">
                                Sistem Inventaris PCS © 2025
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
