import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-md ">
                <img src="/assets/images/logo-pcs.png" alt="Logo" className="" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">
                    Inventaris PCS
                </span>
            </div>
        </>
    );
}
