import DashboardLayout from "@/layout/dashboardLayout/DashboardLayout";
import Dashboard from "@/modules/dashboard/views/Dashboard";
import Auth from "../../router/middleware/Auth";
import Products from "./views/Products";
import Suppliers from "./views/Suppliers";
import Orders from "./views/Orders";

export default [
  {
    path: "/dashboard",
    component: DashboardLayout,
    children: [
      {
        path: "",
        name: "Dashboard",
        component: Dashboard,
        meta: { middleware: [Auth] }
      },
      {
        path: "products",
        name: "Products",
        component: Products,
        meta: { middleware: [Auth] }
      },
      {
        path: "suppliers",
        name: "Suppliers",
        component: Suppliers,
        meta: { middleware: [Auth] }
      },
      {
        path: "orders",
        name: "Orders",
        component: Orders,
        meta: { middleware: [Auth] }
      }
    ]
  }
];
