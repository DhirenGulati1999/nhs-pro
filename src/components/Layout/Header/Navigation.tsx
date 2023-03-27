import { useAppSelector } from "@/state/hooks";
import { RootState } from "@/state/store";
import Link from "next/link";

function Navigation() {
  const { Partner } = useAppSelector((state: RootState) => state.partner);

  return (
    <div>
      <ul>
        <li>
          <Link
            href={
              Partner.PartnerId == 88
                ? "/"
                : Partner.PrivateLabelSite
                ? `/${Partner.PrivateLabelSite}`
                : "/"
            }
          >
            Home
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
