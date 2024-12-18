import Link from "next/link";
import Breadcrumbs from "../components/breadcrumbs";

function AdminHeader({ title, breadcrumbs }) {
  return (
    <>
      {breadcrumbs && <Breadcrumbs crumbs={breadcrumbs} />}
      <h4>{title}</h4>
      <br />
      <br />
    </>
  );
}

export default AdminHeader;
