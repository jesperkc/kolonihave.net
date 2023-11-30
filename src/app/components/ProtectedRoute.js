import { useRouter } from "next/navigation";
import useAuth from "../hooks/useAuth";

export default function ProtectedRoute(Component) {
  return function WithAuth(props) {
    const user = useAuth();
    const router = useRouter();

    if (!user) {
      router.push("/admin");
      return null;
    }

    return <Component {...props} />;
  };
}
