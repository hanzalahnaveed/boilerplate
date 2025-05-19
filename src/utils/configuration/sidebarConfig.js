import IconDashboard from "@/assets/icons/icon-dashboard.svg";
import IconCustomers from "@/assets/icons/icon-customer.svg";
import IconAgent from "@/assets/icons/icon-agent.svg";
import IconAgentCompany from "@/assets/icons/icon-agent-company.svg";
import IconAgentIndividual from "@/assets/icons/icon-agent-individual.svg";
import IconHotels from "@/assets/icons/icon-hotels.svg";
import IconSystemManagement from "@/assets/icons/icon-system-management.svg";
import IconModuleManagement from "@/assets/icons/icon-module-management.svg";
import IconRoleManagement from "@/assets/icons/icon-role-management.svg";
import IconOrgManagement from "@/assets/icons/icon-org-management.svg";
import IconUserManagement from "@/assets/icons/icon-user-management.svg";
import IconSearch from "@/assets/icons/icon-search.svg";
import IconBooking from "@/assets/icons/icon-booking.svg";
import IconReservation from "@/assets/icons/icon-reservation.svg";

export const sidebarConfig = {
    "Dashboard": {
        icon: IconDashboard,
        route: "/dashboard/home",
        label: "Dashboard",
    },
    "Customers": {
        icon: IconCustomers,
        route: "/dashboard/customers",
        label: "Customers",
    },
    "Hotels": {
        icon: IconHotels,
        // route: "/dashboard/hotels",
        label: "Hotels",
    },
    "Search": {
        icon: IconSearch,
        route: "/dashboard/hotels",
        label: "Search",
    },
    "Bookings": {
        icon: IconBooking,
        route: "/dashboard/booking",
        label: "Bookings",
    },
    "Reservations": {
        icon: IconReservation,
        route: "/dashboard/reservation",
        label: "Reservations",
    },
    "Agents": {
        icon: IconAgent,
        label: "Agents",
    },
    "Company": {
        icon: IconAgentCompany,
        route: "/dashboard/agent/company",
        label: "Company",
    },
    "Individual": {
        icon: IconAgentIndividual,
        route: "/dashboard/agent/individual",
        label: "Individual",
    },
    "System-Management": {
        icon: IconSystemManagement,
        label: "System Management",
    },
    "Module-Management": {
        icon: IconModuleManagement,
        route: "/dashboard/system-management/module-management",
        label: "Module Management",
    },
    "Role-Management": {
        icon: IconRoleManagement,
        route: "/dashboard/system-management/role-management",
        label: "Role Management",
    },
    "Org-Management": {
        icon: IconOrgManagement,
        route: "/dashboard/org-management",
        label: "ORG Management",
    },
    "User-Management": {
        icon: IconUserManagement,
        route: "/dashboard/user-management",
        label: "User Management",
    },
};