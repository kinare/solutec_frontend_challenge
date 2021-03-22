import { AuthService } from "@/modules/auth";
export default function auth({ next, router }) {
  if (!AuthService.check()) {
    return router.push({ name: `Login` });
  }
  return next();
}
