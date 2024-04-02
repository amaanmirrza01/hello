/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [searchData, setSearchData] = useState(false);
  const handleInputChange = async (e, value) => {
    e.preventDefault();
    const response = await fetch(`/api/search?searchTerm=${value}`);
    const result = await response.json();
    setSearchData(result);
  };
  return (
    <nav className="topNavbar container-fluid py-3">
      <div className="navContainer">
        <div className="row">
          <div className="col-3">
            <Link className="navbar-brand" href="/">
              <img
                src="assets/superX-New-Logo.png"
                width="80"
                height="32"
                alt="logo"
              />
            </Link>
          </div>
          <div className="col-7">
            <div className="navSearchBar bg-white rounded-pill shadow">
              <form action="">
                <div className="input-group ">
                  <div className="input-group-prepend rounded-pill border-0">
                    <button
                      id="button-addon4"
                      type="button"
                      className="btn btn-link text-dark"
                    >
                      <i className="fa fa-search"></i>
                    </button>
                  </div>
                  <input
                    type="search"
                    className="form-control rounded-pill border-0 bg-none "
                    placeholder="What're you searching for?"
                    aria-describedby="button-addon4"
                    onChange={(e) => handleInputChange(e, e.target.value)}
                  />
                </div>
              </form>
              {searchData.length > 0 && (
                <div className="searchResults">
                  <ul>
                    {searchData.map((item) => (
                      <li key={item.id}>
                        <Link href="#">
                          <p>{item.name}</p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="col-2 sideUserProfile text-center d-flex justify-content-center ">
            <Link
              href="#"
              className="navbar-toggler "
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#staticBackdrop"
              aria-controls="staticBackdrop"
            >
              <i className="fa-solid fa-user text-light"></i>
            </Link>
            {/* <!-- ----- side Navbar -------- --> */}
            <div
              className="offcanvas offcanvas-end"
              data-bs-backdrop="static"
              tabIndex="-1"
              id="staticBackdrop"
              aria-labelledby="staticBackdropLabel"
            >
              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="staticBackdropLabel"></h5>
                <button
                  type="button"
                  className="btn-close text-white"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                >
                  <i className="fa-solid fa-x text-white opacity-100"></i>
                </button>
              </div>
              <div className="offcanvas-body">
                <div className="sideInfoNavBar">
                  <div className="profileDetailsCard">
                    <div className="row g-0">
                      <div className="col-5 text-start">
                        <img
                          src="/assets/brandImg.jpg"
                          className="img-fluid rounded-circle"
                          alt="..."
                        />
                      </div>
                      <div className="col-7">
                        <div className="profileCardDetails">
                          <h6>SuperX User</h6>
                          <p className="mb-1">9123456780</p>
                          <p className="mb-1">26 Year</p>
                          <p className="mb-1">
                            102, Lorem Ipsum has been the industry&apos;s
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="sideNavLinks">
                    <p>
                      <Link href="#">Login</Link>
                    </p>
                    <p>
                      <Link href="#">Terms and Conditions</Link>
                    </p>
                    <p>
                      <Link href="#">FAQ</Link>
                    </p>
                    <p>
                      <Link href="#">Privacy Policy</Link>
                    </p>
                    <p>
                      <Link href="#">Contact Us</Link>
                    </p>
                    <p>
                      {" "}
                      <Link href="#">Logout</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
