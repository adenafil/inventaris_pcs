import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CustomeQr({
    qrConfig,
    setQrConfig,
}: {
    qrConfig: {
        logoImage: string;
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
    };
    setQrConfig: React.Dispatch<
        React.SetStateAction<{
            logoImage: string;
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
                    <Input
                        type="text"
                        value={qrConfig.logoImage}
                        onChange={(e) =>
                            setQrConfig({
                                ...qrConfig,
                                logoImage: e.target.value,
                            })
                        }
                        placeholder="/path/to/logo.png"
                        className="text-xs"
                    />
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
