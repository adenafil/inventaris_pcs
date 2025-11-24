import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export default function CustomeQr({
    qrConfig,
    setQrConfig,
}: {
    qrConfig: {
        logoImage: string;
        ecLevel: string;
        imageBinary: string;
        enableCors: boolean;
        size: number;
        quietZone: number;
        bgColor: string;
        fgColor: string;
        logoWidth: number;
        logoHeight: number;
        logoOpacity: number;
        qrStyle: string;
        removeQrCodeBehindLogo: boolean;
        logoPadding: number;
        logoPaddingStyle: string;
        logoPaddingRadius: number;
    };
    setQrConfig: React.Dispatch<
        React.SetStateAction<{
            logoImage: string;
            imageBinary: string ;
            ecLevel: string;
            enableCors: boolean;
            size: number;
            quietZone: number;
            bgColor: string;
            fgColor: string;
            logoWidth: number;
            logoHeight: number;
            logoOpacity: number;
            qrStyle: string;
            removeQrCodeBehindLogo: boolean;
            logoPadding: number;
            logoPaddingStyle: string;
            logoPaddingRadius: number;
        }>
    >;
}) {
    return (
        <div className="h-64 w-full space-y-2 overflow-auto pt-4">
            <div className="space-y-3">
                {/* Logo Image */}
                <div className="space-y-1">
                    <Label className="text-xs font-medium">Logo Image</Label>
                    <div className="relative flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6 transition-colors hover:border-gray-400 hover:bg-gray-50">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onload = (event) => {
                                        const binaryData = event.target
                                            ?.result as string;
                                        setQrConfig({
                                            ...qrConfig,
                                            imageBinary: binaryData,
                                            logoImage: file.name,
                                        });
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }}
                            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                        />
                        <div className="pointer-events-none text-center">
                            <svg
                                className="mx-auto h-8 w-8 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                            <p className="mt-1 text-xs font-medium text-gray-600">
                                {qrConfig.logoImage !==
                                '/assets/images/logo-pcs.png'
                                    ? qrConfig.logoImage
                                    : 'Upload image'}
                            </p>
                            <p className="text-xs text-gray-500">
                                PNG, JPG, GIF
                            </p>
                        </div>
                    </div>
                </div>

                {/* EC Level */}
                <div className="space-y-1">
                    <Label className="text-xs font-medium">EC Level</Label>
                    <Select
                        value={qrConfig.ecLevel}
                        onValueChange={(value) =>
                            setQrConfig({
                                ...qrConfig,
                                ecLevel: value as 'L' | 'M' | 'Q' | 'H',
                            })
                        }
                    >
                        <SelectTrigger className="text-xs">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="L">L</SelectItem>
                            <SelectItem value="M">M</SelectItem>
                            <SelectItem value="Q">Q</SelectItem>
                            <SelectItem value="H">H</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Enable CORS */}
                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        id="enableCors"
                        checked={qrConfig.enableCors}
                        onChange={(e) =>
                            setQrConfig({
                                ...qrConfig,
                                enableCors: e.target.checked,
                            })
                        }
                        className="h-4 w-4"
                    />
                    <Label htmlFor="enableCors" className="text-xs font-medium">
                        Enable CORS
                    </Label>
                </div>

                {/* Size */}
                <div className="space-y-1">
                    <Label className="text-xs font-medium">
                        Size: {qrConfig.size}
                    </Label>
                    <input
                        type="range"
                        min="128"
                        max="512"
                        value={qrConfig.size}
                        onChange={(e) =>
                            setQrConfig({
                                ...qrConfig,
                                size: parseInt(e.target.value),
                            })
                        }
                        className="w-full"
                    />
                </div>

                {/* Quiet Zone */}
                <div className="space-y-1">
                    <Label className="text-xs font-medium">
                        Quiet Zone: {qrConfig.quietZone}
                    </Label>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={qrConfig.quietZone}
                        onChange={(e) =>
                            setQrConfig({
                                ...qrConfig,
                                quietZone: parseInt(e.target.value),
                            })
                        }
                        className="w-full"
                    />
                </div>

                {/* BG Color */}
                <div className="space-y-1">
                    <Label className="text-xs font-medium">BG Color</Label>
                    <input
                        type="color"
                        value={qrConfig.bgColor}
                        onChange={(e) =>
                            setQrConfig({
                                ...qrConfig,
                                bgColor: e.target.value,
                            })
                        }
                        className="h-8 w-12 cursor-pointer"
                    />
                </div>

                {/* FG Color */}
                <div className="space-y-1">
                    <Label className="text-xs font-medium">FG Color</Label>
                    <input
                        type="color"
                        value={qrConfig.fgColor}
                        onChange={(e) =>
                            setQrConfig({
                                ...qrConfig,
                                fgColor: e.target.value,
                            })
                        }
                        className="h-8 w-12 cursor-pointer"
                    />
                </div>

                {/* Logo Width */}
                <div className="space-y-1">
                    <Label className="text-xs font-medium">
                        Logo Width: {qrConfig.logoWidth}
                    </Label>
                    <input
                        type="range"
                        min="20"
                        max="150"
                        value={qrConfig.logoWidth}
                        onChange={(e) =>
                            setQrConfig({
                                ...qrConfig,
                                logoWidth: parseInt(e.target.value),
                            })
                        }
                        className="w-full"
                    />
                </div>

                {/* Logo Height */}
                <div className="space-y-1">
                    <Label className="text-xs font-medium">
                        Logo Height: {qrConfig.logoHeight}
                    </Label>
                    <input
                        type="range"
                        min="20"
                        max="150"
                        value={qrConfig.logoHeight}
                        onChange={(e) =>
                            setQrConfig({
                                ...qrConfig,
                                logoHeight: parseInt(e.target.value),
                            })
                        }
                        className="w-full"
                    />
                </div>

                {/* Logo Opacity */}
                <div className="space-y-1">
                    <Label className="text-xs font-medium">
                        Logo Opacity: {qrConfig.logoOpacity}
                    </Label>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={qrConfig.logoOpacity}
                        onChange={(e) =>
                            setQrConfig({
                                ...qrConfig,
                                logoOpacity: parseFloat(e.target.value),
                            })
                        }
                        className="w-full"
                    />
                </div>

                {/* QR Style */}
                <div className="space-y-1">
                    <Label className="text-xs font-medium">QR Style</Label>
                    <Select
                        value={qrConfig.qrStyle}
                        onValueChange={(value) =>
                            setQrConfig({
                                ...qrConfig,
                                qrStyle: value as 'squares' | 'dots' | 'fluid',
                            })
                        }
                    >
                        <SelectTrigger className="text-xs">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="squares">Squares</SelectItem>
                            <SelectItem value="dots">Dots</SelectItem>
                            <SelectItem value="fluid">Fluid</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Remove QR Code Behind Logo */}
                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        id="removeQrCodeBehindLogo"
                        checked={qrConfig.removeQrCodeBehindLogo}
                        onChange={(e) =>
                            setQrConfig({
                                ...qrConfig,
                                removeQrCodeBehindLogo: e.target.checked,
                            })
                        }
                        className="h-4 w-4"
                    />
                    <Label
                        htmlFor="removeQrCodeBehindLogo"
                        className="text-xs font-medium"
                    >
                        Remove QR Code Behind Logo
                    </Label>
                </div>

                {/* Logo Padding */}
                <div className="space-y-1">
                    <Label className="text-xs font-medium">
                        Logo Padding: {qrConfig.logoPadding}
                    </Label>
                    <input
                        type="range"
                        min="0"
                        max="20"
                        value={qrConfig.logoPadding}
                        onChange={(e) =>
                            setQrConfig({
                                ...qrConfig,
                                logoPadding: parseInt(e.target.value),
                            })
                        }
                        className="w-full"
                    />
                </div>

                {/* Logo Padding Style */}
                <div className="space-y-1">
                    <Label className="text-xs font-medium">
                        Logo Padding Style
                    </Label>
                    <Select
                        value={qrConfig.logoPaddingStyle}
                        onValueChange={(value) =>
                            setQrConfig({
                                ...qrConfig,
                                logoPaddingStyle: value as 'square' | 'circle',
                            })
                        }
                    >
                        <SelectTrigger className="text-xs">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="square">Square</SelectItem>
                            <SelectItem value="circle">Circle</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Logo Padding Radius */}
                <div className="space-y-1">
                    <Label className="text-xs font-medium">
                        Logo Padding Radius: {qrConfig.logoPaddingRadius}
                    </Label>
                    <input
                        type="range"
                        min="0"
                        max="20"
                        value={qrConfig.logoPaddingRadius}
                        onChange={(e) =>
                            setQrConfig({
                                ...qrConfig,
                                logoPaddingRadius: parseInt(e.target.value),
                            })
                        }
                        className="w-full"
                    />
                </div>
            </div>
        </div>
    );
}
