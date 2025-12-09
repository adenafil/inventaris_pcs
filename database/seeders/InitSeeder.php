<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class InitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Admin IT',
            'username' => 'adminit',
            'email' => 'adminit@pcs.com',
            'password' => bcrypt('rahasiadong'),
            'role' => 'admin_it',
        ]);

        User::create([
            'name' => 'Admin Kantor',
            'username' => 'adminkantor',
            'email' => 'admin.kantor@pcs.com',
            'password' => bcrypt('rahasiadong'),
            'role' => 'admin_kantor',
        ]);

        User::create([
            'name' => 'superadmin',
            'username' => 'superadmin',
            'email' => 'superadmin@pcs.com',
            'password' => bcrypt('rahasiadong'),
            'role' => 'superadmin',
    ]);

    // Seed initial data
        $this->seedDataTypes();
        $this->seedOrgUnits();
        $this->seedLocations();
        $this->seedEmployees();
        $this->seedPrefixes();
        $this->seedAssetModels();
    }

    /**
     * Seed Data Types for asset categorization.
     */
    private function seedDataTypes(): void
    {
        $dataTypes = [
            ['code' => 'COMP', 'name' => 'Computer'],
            ['code' => 'LAPT', 'name' => 'Laptop'],
            ['code' => 'PRNT', 'name' => 'Printer'],
            ['code' => 'SCAN', 'name' => 'Scanner'],
            ['code' => 'NETW', 'name' => 'Network Equipment'],
            ['code' => 'SERV', 'name' => 'Server'],
            ['code' => 'MONR', 'name' => 'Monitor'],
            ['code' => 'KEYB', 'name' => 'Keyboard'],
            ['code' => 'MOUS', 'name' => 'Mouse'],
            ['code' => 'STOR', 'name' => 'Storage Device'],
            ['code' => 'PHON', 'name' => 'Phone'],
            ['code' => 'TABL', 'name' => 'Tablet'],
            ['code' => 'PROJ', 'name' => 'Projector'],
            ['code' => 'UPS', 'name' => 'UPS'],
            ['code' => 'ACCS', 'name' => 'Accessories'],
        ];

        foreach ($dataTypes as $type) {
            \App\Models\DataType::create($type);
        }
    }

    /**
     * Seed Organization Units.
     */
    private function seedOrgUnits(): void
    {
        $orgUnits = [
            ['code' => 'IT', 'name' => 'IT Department'],
            ['code' => 'HR', 'name' => 'Human Resources'],
            ['code' => 'FIN', 'name' => 'Finance'],
            ['code' => 'OPS', 'name' => 'Operations'],
            ['code' => 'SALE', 'name' => 'Sales'],
            ['code' => 'MKT', 'name' => 'Marketing'],
            ['code' => 'PROD', 'name' => 'Production'],
            ['code' => 'QA', 'name' => 'Quality Assurance'],
            ['code' => 'RND', 'name' => 'Research & Development'],
            ['code' => 'LOG', 'name' => 'Logistics'],
            ['code' => 'PROC', 'name' => 'Procurement'],
            ['code' => 'LEGAL', 'name' => 'Legal'],
            ['code' => 'CS', 'name' => 'Customer Service'],
            ['code' => 'PM', 'name' => 'Project Management'],
            ['code' => 'SEC', 'name' => 'Security'],
        ];

        foreach ($orgUnits as $unit) {
            \App\Models\OrgUnit::create($unit);
        }
    }

    /**
     * Seed Locations.
     */
    private function seedLocations(): void
    {
        $locations = [
            ['code' => 'HQ-01', 'name' => 'Head Office - Floor 1'],
            ['code' => 'HQ-02', 'name' => 'Head Office - Floor 2'],
            ['code' => 'HQ-03', 'name' => 'Head Office - Floor 3'],
            ['code' => 'HQ-04', 'name' => 'Head Office - Floor 4'],
            ['code' => 'HQ-05', 'name' => 'Head Office - Floor 5'],
            ['code' => 'HQ-B1', 'name' => 'Head Office - Basement'],
            ['code' => 'WH-01', 'name' => 'Warehouse Jakarta'],
            ['code' => 'WH-02', 'name' => 'Warehouse Bekasi'],
            ['code' => 'WH-03', 'name' => 'Warehouse Tangerang'],
            ['code' => 'BR-BD', 'name' => 'Branch Bandung'],
            ['code' => 'BR-SB', 'name' => 'Branch Surabaya'],
            ['code' => 'BR-MD', 'name' => 'Branch Medan'],
            ['code' => 'BR-MK', 'name' => 'Branch Makassar'],
            ['code' => 'BR-PLG', 'name' => 'Branch Palembang'],
            ['code' => 'BR-SMG', 'name' => 'Branch Semarang'],
            ['code' => 'BR-YK', 'name' => 'Branch Yogyakarta'],
            ['code' => 'BR-DPS', 'name' => 'Branch Denpasar'],
            ['code' => 'BR-BDO', 'name' => 'Branch Banjarmasin'],
            ['code' => 'DC-01', 'name' => 'Data Center Jakarta'],
            ['code' => 'DC-02', 'name' => 'Data Center Surabaya'],
            ['code' => 'RMT-01', 'name' => 'Remote Office'],
        ];

        foreach ($locations as $location) {
            \App\Models\Location::create($location);
        }
    }

    /**
     * Seed Employees.
     */
    private function seedEmployees(): void
    {
        $employees = [
            // IT Department
            ['nip' => 'EMP001', 'name' => 'Budi Santoso', 'email' => 'budi.santoso@pcs.com', 'org_unit_id' => 1],
            ['nip' => 'EMP002', 'name' => 'Siti Nurhaliza', 'email' => 'siti.nurhaliza@pcs.com', 'org_unit_id' => 1],
            ['nip' => 'EMP003', 'name' => 'Andi Wijaya', 'email' => 'andi.wijaya@pcs.com', 'org_unit_id' => 1],
            ['nip' => 'EMP004', 'name' => 'Rina Kusuma', 'email' => 'rina.kusuma@pcs.com', 'org_unit_id' => 1],
            // HR
            ['nip' => 'EMP005', 'name' => 'Ahmad Yani', 'email' => 'ahmad.yani@pcs.com', 'org_unit_id' => 2],
            ['nip' => 'EMP006', 'name' => 'Dewi Sartika', 'email' => 'dewi.sartika@pcs.com', 'org_unit_id' => 2],
            ['nip' => 'EMP007', 'name' => 'Fadli Rahman', 'email' => 'fadli.rahman@pcs.com', 'org_unit_id' => 2],
            // Finance
            ['nip' => 'EMP008', 'name' => 'Rudi Hartono', 'email' => 'rudi.hartono@pcs.com', 'org_unit_id' => 3],
            ['nip' => 'EMP009', 'name' => 'Lina Wijaya', 'email' => 'lina.wijaya@pcs.com', 'org_unit_id' => 3],
            ['nip' => 'EMP010', 'name' => 'Hendra Saputra', 'email' => 'hendra.saputra@pcs.com', 'org_unit_id' => 3],
            ['nip' => 'EMP011', 'name' => 'Nina Anggraini', 'email' => 'nina.anggraini@pcs.com', 'org_unit_id' => 3],
            // Operations
            ['nip' => 'EMP012', 'name' => 'Eko Prasetyo', 'email' => 'eko.prasetyo@pcs.com', 'org_unit_id' => 4],
            ['nip' => 'EMP013', 'name' => 'Maya Sari', 'email' => 'maya.sari@pcs.com', 'org_unit_id' => 4],
            ['nip' => 'EMP014', 'name' => 'Tono Sukirman', 'email' => 'tono.sukirman@pcs.com', 'org_unit_id' => 4],
            // Sales
            ['nip' => 'EMP015', 'name' => 'Joko Widodo', 'email' => 'joko.widodo@pcs.com', 'org_unit_id' => 5],
            ['nip' => 'EMP016', 'name' => 'Sri Mulyani', 'email' => 'sri.mulyani@pcs.com', 'org_unit_id' => 5],
            ['nip' => 'EMP017', 'name' => 'Dodi Setiawan', 'email' => 'dodi.setiawan@pcs.com', 'org_unit_id' => 5],
            ['nip' => 'EMP018', 'name' => 'Lia Amelia', 'email' => 'lia.amelia@pcs.com', 'org_unit_id' => 5],
            // Marketing
            ['nip' => 'EMP019', 'name' => 'Bambang Susilo', 'email' => 'bambang.susilo@pcs.com', 'org_unit_id' => 6],
            ['nip' => 'EMP020', 'name' => 'Ratna Sari', 'email' => 'ratna.sari@pcs.com', 'org_unit_id' => 6],
            ['nip' => 'EMP021', 'name' => 'Indra Gunawan', 'email' => 'indra.gunawan@pcs.com', 'org_unit_id' => 6],
            // Production
            ['nip' => 'EMP022', 'name' => 'Agus Salim', 'email' => 'agus.salim@pcs.com', 'org_unit_id' => 7],
            ['nip' => 'EMP023', 'name' => 'Fitri Handayani', 'email' => 'fitri.handayani@pcs.com', 'org_unit_id' => 7],
            ['nip' => 'EMP024', 'name' => 'Wawan Setiawan', 'email' => 'wawan.setiawan@pcs.com', 'org_unit_id' => 7],
            ['nip' => 'EMP025', 'name' => 'Sari Dewi', 'email' => 'sari.dewi@pcs.com', 'org_unit_id' => 7],
            // QA
            ['nip' => 'EMP026', 'name' => 'Hendra Gunawan', 'email' => 'hendra.gunawan@pcs.com', 'org_unit_id' => 8],
            ['nip' => 'EMP027', 'name' => 'Nisa Amalia', 'email' => 'nisa.amalia@pcs.com', 'org_unit_id' => 8],
            ['nip' => 'EMP028', 'name' => 'Roni Hermawan', 'email' => 'roni.hermawan@pcs.com', 'org_unit_id' => 8],
            // R&D
            ['nip' => 'EMP029', 'name' => 'Irfan Hakim', 'email' => 'irfan.hakim@pcs.com', 'org_unit_id' => 9],
            ['nip' => 'EMP030', 'name' => 'Putri Handayani', 'email' => 'putri.handayani@pcs.com', 'org_unit_id' => 9],
            ['nip' => 'EMP031', 'name' => 'Yusuf Hidayat', 'email' => 'yusuf.hidayat@pcs.com', 'org_unit_id' => 9],
            ['nip' => 'EMP032', 'name' => 'Diana Puspita', 'email' => 'diana.puspita@pcs.com', 'org_unit_id' => 9],
            // Logistics
            ['nip' => 'EMP033', 'name' => 'Dedi Supriadi', 'email' => 'dedi.supriadi@pcs.com', 'org_unit_id' => 10],
            ['nip' => 'EMP034', 'name' => 'Rina Kartika', 'email' => 'rina.kartika@pcs.com', 'org_unit_id' => 10],
            ['nip' => 'EMP035', 'name' => 'Dani Firmansyah', 'email' => 'dani.firmansyah@pcs.com', 'org_unit_id' => 10],
            // Procurement
            ['nip' => 'EMP036', 'name' => 'Citra Lestari', 'email' => 'citra.lestari@pcs.com', 'org_unit_id' => 11],
            ['nip' => 'EMP037', 'name' => 'Faisal Akbar', 'email' => 'faisal.akbar@pcs.com', 'org_unit_id' => 11],
            // Legal
            ['nip' => 'EMP038', 'name' => 'Nurul Hidayah', 'email' => 'nurul.hidayah@pcs.com', 'org_unit_id' => 12],
            ['nip' => 'EMP039', 'name' => 'Reza Pratama', 'email' => 'reza.pratama@pcs.com', 'org_unit_id' => 12],
            // Customer Service
            ['nip' => 'EMP040', 'name' => 'Lisa Permata', 'email' => 'lisa.permata@pcs.com', 'org_unit_id' => 13],
            ['nip' => 'EMP041', 'name' => 'Ari Wibowo', 'email' => 'ari.wibowo@pcs.com', 'org_unit_id' => 13],
            ['nip' => 'EMP042', 'name' => 'Mira Salsabila', 'email' => 'mira.salsabila@pcs.com', 'org_unit_id' => 13],
            // Project Management
            ['nip' => 'EMP043', 'name' => 'Fahmi Ramadhan', 'email' => 'fahmi.ramadhan@pcs.com', 'org_unit_id' => 14],
            ['nip' => 'EMP044', 'name' => 'Ayu Lestari', 'email' => 'ayu.lestari@pcs.com', 'org_unit_id' => 14],
            ['nip' => 'EMP045', 'name' => 'Bayu Prasetya', 'email' => 'bayu.prasetya@pcs.com', 'org_unit_id' => 14],
            // Security
            ['nip' => 'EMP046', 'name' => 'Iwan Setiawan', 'email' => 'iwan.setiawan@pcs.com', 'org_unit_id' => 15],
            ['nip' => 'EMP047', 'name' => 'Dian Pratiwi', 'email' => 'dian.pratiwi@pcs.com', 'org_unit_id' => 15],
            ['nip' => 'EMP048', 'name' => 'Fikri Abdullah', 'email' => 'fikri.abdullah@pcs.com', 'org_unit_id' => 15],
            ['nip' => 'EMP049', 'name' => 'Sinta Maharani', 'email' => 'sinta.maharani@pcs.com', 'org_unit_id' => 15],
            ['nip' => 'EMP050', 'name' => 'Anton Wijaya', 'email' => 'anton.wijaya@pcs.com', 'org_unit_id' => 1],
        ];

        foreach ($employees as $employee) {
            \App\Models\Employee::create($employee);
        }
    }

    /**
     * Seed Prefixes for asset numbering.
     */
    private function seedPrefixes(): void
    {
        $prefixes = [
            ['code' => 'PC', 'name' => 'Computer', 'description' => 'Computer prefix'],
            ['code' => 'LT', 'name' => 'Laptop', 'description' => 'Laptop prefix'],
            ['code' => 'PR', 'name' => 'Printer', 'description' => 'Printer prefix'],
            ['code' => 'SC', 'name' => 'Scanner', 'description' => 'Scanner prefix'],
            ['code' => 'NW', 'name' => 'Network Equipment', 'description' => 'Network Equipment prefix'],
            ['code' => 'SV', 'name' => 'Server', 'description' => 'Server prefix'],
            ['code' => 'MN', 'name' => 'Monitor', 'description' => 'Monitor prefix'],
            ['code' => 'KB', 'name' => 'Keyboard', 'description' => 'Keyboard prefix'],
            ['code' => 'MS', 'name' => 'Mouse', 'description' => 'Mouse prefix'],
            ['code' => 'ST', 'name' => 'Storage Device', 'description' => 'Storage Device prefix'],
        ];

        foreach ($prefixes as $prefix) {
            \App\Models\Prefix::create($prefix);
        }
    }

    /**
     * Seed Asset Models.
     */
    private function seedAssetModels(): void
    {
        $assetModels = [
            // Computers (type_id = 1)
            ['type_id' => 1, 'brand' => 'Dell', 'model' => 'OptiPlex 7090', 'details' => 'Intel Core i7, 16GB RAM, 512GB SSD'],
            ['type_id' => 1, 'brand' => 'HP', 'model' => 'ProDesk 600 G6', 'details' => 'Intel Core i5, 8GB RAM, 256GB SSD'],
            ['type_id' => 1, 'brand' => 'Lenovo', 'model' => 'ThinkCentre M720', 'details' => 'Intel Core i5, 16GB RAM, 1TB HDD'],
            ['type_id' => 1, 'brand' => 'Asus', 'model' => 'ExpertCenter D500MA', 'details' => 'Intel Core i3, 8GB RAM, 256GB SSD'],
            ['type_id' => 1, 'brand' => 'Acer', 'model' => 'Veriton M200', 'details' => 'AMD Ryzen 5, 8GB RAM, 512GB SSD'],
            
            // Laptops (type_id = 2)
            ['type_id' => 2, 'brand' => 'Dell', 'model' => 'Latitude 5420', 'details' => '14", Intel Core i7, 16GB RAM, 512GB SSD'],
            ['type_id' => 2, 'brand' => 'HP', 'model' => 'EliteBook 840 G8', 'details' => '14", Intel Core i5, 16GB RAM, 256GB SSD'],
            ['type_id' => 2, 'brand' => 'Lenovo', 'model' => 'ThinkPad T14', 'details' => '14", Intel Core i7, 16GB RAM, 512GB SSD'],
            ['type_id' => 2, 'brand' => 'Asus', 'model' => 'ZenBook 14', 'details' => '14", Intel Core i5, 8GB RAM, 512GB SSD'],
            ['type_id' => 2, 'brand' => 'Acer', 'model' => 'TravelMate P214', 'details' => '14", Intel Core i3, 8GB RAM, 256GB SSD'],
            ['type_id' => 2, 'brand' => 'Apple', 'model' => 'MacBook Pro 14"', 'details' => 'M1 Pro, 16GB RAM, 512GB SSD'],
            ['type_id' => 2, 'brand' => 'Apple', 'model' => 'MacBook Air 13"', 'details' => 'M2, 8GB RAM, 256GB SSD'],
            
            // Printers (type_id = 3)
            ['type_id' => 3, 'brand' => 'HP', 'model' => 'LaserJet Pro M404dn', 'details' => 'Monochrome, Network, Duplex'],
            ['type_id' => 3, 'brand' => 'Canon', 'model' => 'imageRUNNER 2530i', 'details' => 'Multifunction, Color, Network'],
            ['type_id' => 3, 'brand' => 'Epson', 'model' => 'EcoTank L3150', 'details' => 'Color, WiFi, Print/Scan/Copy'],
            ['type_id' => 3, 'brand' => 'Brother', 'model' => 'MFC-L2750DW', 'details' => 'Monochrome, Laser, Multifunction'],
            ['type_id' => 3, 'brand' => 'Xerox', 'model' => 'WorkCentre 3335', 'details' => 'Multifunction, Network, Duplex'],
            
            // Scanners (type_id = 4)
            ['type_id' => 4, 'brand' => 'Canon', 'model' => 'DR-C225W', 'details' => 'Document Scanner, WiFi, 25ppm'],
            ['type_id' => 4, 'brand' => 'Epson', 'model' => 'DS-530', 'details' => 'Document Scanner, USB 3.0, 35ppm'],
            ['type_id' => 4, 'brand' => 'Fujitsu', 'model' => 'ScanSnap iX1500', 'details' => 'WiFi, Touch Screen, 30ppm'],
            
            // Network Equipment (type_id = 5)
            ['type_id' => 5, 'brand' => 'Cisco', 'model' => 'Catalyst 2960X-48TS-L', 'details' => '48-Port Gigabit Switch'],
            ['type_id' => 5, 'brand' => 'TP-Link', 'model' => 'TL-SG1024DE', 'details' => '24-Port Gigabit Smart Switch'],
            ['type_id' => 5, 'brand' => 'Ubiquiti', 'model' => 'UniFi Switch 48', 'details' => '48-Port PoE+ Gigabit Switch'],
            ['type_id' => 5, 'brand' => 'MikroTik', 'model' => 'CRS328-24P-4S+RM', 'details' => '24-Port PoE Switch with SFP+'],
            ['type_id' => 5, 'brand' => 'Cisco', 'model' => 'RV340', 'details' => 'Dual WAN VPN Router'],
            
            // Servers (type_id = 6)
            ['type_id' => 6, 'brand' => 'Dell', 'model' => 'PowerEdge R740', 'details' => '2x Xeon Gold 6230, 128GB RAM, 4x 2TB SAS'],
            ['type_id' => 6, 'brand' => 'HP', 'model' => 'ProLiant DL380 Gen10', 'details' => '2x Xeon Gold 5218, 64GB RAM, 4x 1TB SATA'],
            ['type_id' => 6, 'brand' => 'Lenovo', 'model' => 'ThinkSystem SR650', 'details' => '2x Xeon Silver 4214, 32GB RAM, 2x 1TB SATA'],
            ['type_id' => 6, 'brand' => 'Supermicro', 'model' => 'SuperServer 6029P', 'details' => '2x Xeon Gold 6248, 256GB RAM, 8x 4TB SAS'],
            
            // Monitors (type_id = 7)
            ['type_id' => 7, 'brand' => 'Dell', 'model' => 'P2422H', 'details' => '24" Full HD IPS, HDMI/DP'],
            ['type_id' => 7, 'brand' => 'HP', 'model' => 'E24 G4', 'details' => '24" Full HD IPS, VGA/HDMI/DP'],
            ['type_id' => 7, 'brand' => 'LG', 'model' => '27UK850-W', 'details' => '27" 4K IPS, USB-C/HDMI/DP'],
            ['type_id' => 7, 'brand' => 'Samsung', 'model' => 'S24R350', 'details' => '24" Full HD IPS, HDMI/VGA'],
            ['type_id' => 7, 'brand' => 'BenQ', 'model' => 'GW2480', 'details' => '24" Full HD IPS, Eye-Care Technology'],
            
            // Keyboards (type_id = 8)
            ['type_id' => 8, 'brand' => 'Logitech', 'model' => 'K120', 'details' => 'USB Wired Keyboard'],
            ['type_id' => 8, 'brand' => 'Dell', 'model' => 'KB216', 'details' => 'USB Wired Multimedia Keyboard'],
            
            // Mouse (type_id = 9)
            ['type_id' => 9, 'brand' => 'Logitech', 'model' => 'M170', 'details' => 'Wireless Mouse, 2.4GHz'],
            ['type_id' => 9, 'brand' => 'HP', 'model' => 'X3500', 'details' => 'Wireless Mouse, USB Receiver'],
            
            // Storage Devices (type_id = 10)
            ['type_id' => 10, 'brand' => 'Western Digital', 'model' => 'My Passport 2TB', 'details' => 'External HDD, USB 3.0'],
            ['type_id' => 10, 'brand' => 'Seagate', 'model' => 'Backup Plus 4TB', 'details' => 'External HDD, USB 3.0'],
            ['type_id' => 10, 'brand' => 'Samsung', 'model' => 'T7 Portable SSD 1TB', 'details' => 'External SSD, USB 3.2 Gen 2'],
            ['type_id' => 10, 'brand' => 'SanDisk', 'model' => 'Extreme Portable SSD 500GB', 'details' => 'External SSD, USB-C'],
            
            // Projectors (type_id = 13)
            ['type_id' => 13, 'brand' => 'Epson', 'model' => 'EB-X49', 'details' => '3600 lumens, XGA, HDMI'],
            ['type_id' => 13, 'brand' => 'BenQ', 'model' => 'MH535A', 'details' => '3600 lumens, Full HD, HDMI'],
            ['type_id' => 13, 'brand' => 'ViewSonic', 'model' => 'PA503S', 'details' => '3800 lumens, SVGA, HDMI'],
            
            // UPS (type_id = 14)
            ['type_id' => 14, 'brand' => 'APC', 'model' => 'Smart-UPS 1500VA', 'details' => '1500VA/980W, LCD Display'],
            ['type_id' => 14, 'brand' => 'CyberPower', 'model' => 'CP1500PFCLCD', 'details' => '1500VA/1000W, Pure Sine Wave'],
            ['type_id' => 14, 'brand' => 'Eaton', 'model' => '5S 1500VA', 'details' => '1500VA/900W, Line Interactive'],
        ];

        foreach ($assetModels as $model) {
            \App\Models\AssetModel::create($model);
        }
    }
}
