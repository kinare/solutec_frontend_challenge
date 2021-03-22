import Auth from "@/modules/auth/views/Auth";
import Login from "@/modules/auth/views/Login";
import Register from "@/modules/auth/views/Register";
import ForgotPassword from "@/modules/auth/views/ForgotPassword";
import ResetPassword from "@/modules/auth/views/ResetPassword";
import Finish from "@/modules/auth/views/Finish";

export default [
  {
    path: "/auth",
    component: Auth,
    children: [
      {
        path: "",
        component: Login,
        name: "Login"
      },
      {
        path: "register",
        component: Register,
        name: "Register"
      },
      {
        path: "finish",
        component: Finish,
        name: "Finish"
      },
      {
        path: "forgot-password",
        component: ForgotPassword,
        name: "ForgotPassword"
      },
      {
        path: "reset-password",
        component: ResetPassword,
        name: "ResetPassword"
      }
    ]
  }
];
