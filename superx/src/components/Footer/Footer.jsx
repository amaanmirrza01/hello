import Link from "next/link";

export default function Footer() {
  return (
    <div className="bottomNavbar">
      <div className="BottomNavMenu">
        <Link href="/" type="button" className="NavTabIcnButton active">
          <i className="fa-solid fa-house gradient"></i>
          <p className="mb-0 pt-1 NavmenuText">Home</p>
        </Link>
        <Link href="/" type="button" className="inCenter">
          <i className="fa-solid fa-bolt inCenterIcn"></i>
        </Link>
        <Link href="/favourite" type="button" className="NavTabIcnButton">
          <i className="fa-solid fa-heart"></i>
          <p className="mb-0 pt-1 NavmenuText">Favourite</p>
        </Link>
      </div>
    </div>
  );
}
